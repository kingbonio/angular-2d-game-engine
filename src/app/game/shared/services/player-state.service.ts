import defaults from '../../../shared/defaults';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Direction, ElementClass, ObjectType, ItemClass, CharacterState } from '../enums';
import { IPlayerStateData, IInventoryItem } from '../interfaces';
import { AreaStateService } from './area-state.service';
import { DialogueService } from './dialogue.service';
import { UserInteractionTypes } from '../../../shared/enums';
import { MovementComponent } from '../util/movement/movement.component';
import { BattleCalculatorService } from './battle-calculator.service';
import { WeaponType, PotionType } from '../../item/enums';
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';
import { Character } from '../../character-classes/character';
import { Dice } from '../util/dice';
import { PotionEffectType } from '../../item/enums/potion-effect-type';
import { InventoryManagerService } from '../../item/services/inventory-manager.service';
import { GridHelper } from '../util/area/grid-helper';
import { IGridData } from '../../area/interfaces';
import { AreaExitStatus } from '../../area/enums';

@Injectable()
export class PlayerStateService {
  @Output() openLootingModal: EventEmitter<any> = new EventEmitter();
  @Output() openMessageModal: EventEmitter<any> = new EventEmitter();

  public health: number;
  public maxHealth: number;
  private exp: number = defaults.initialPlayerStats.exp;
  public locationX: number;
  public locationY: string;
  public direction: Direction = Direction.N;
  public lastKnownLocation: string;
  // TODO default (maybe even scrap the whole options for now)
  // TODO maybe move this to equipment manager
  public selectedWeaponSlot: WeaponType = WeaponType.primary;
  // public location: string;

  constructor(
    private areaStateService: AreaStateService,
    private dialogueService: DialogueService,
    private movement: MovementComponent,
    private battleCalculatorService: BattleCalculatorService,
    private equipmentManagerService: EquipmentManagerService,
    private inventoryManagerService: InventoryManagerService,
    // private userInputService: UserInputService,

  ) {
    // Pull defaults from defaults file and assign initial values
    this.health = defaults.initialPlayerStats.health;
    this.maxHealth = defaults.initialPlayerStats.maxHealth;
    this.direction = defaults.initialPlayerStats.direction;
  }

  onInit() {
  }

  get level() {
    return Math.ceil(defaults.playerMultipliers.levelCalculation(this.exp));
  }

  get levelMultiplier(): number {
    return this.level * defaults.playerMultipliers.levelStatMultiplier;
  }

  public itemTooHighLevel(item: IInventoryItem): boolean {
    return item.level > this.level;
  }

  /**
   * Attempts to move the character in a direction
   * @param direction The direction to attempt to move
   */
  public move(direction: Direction, isOneHandedControls: boolean) {

    // Two handed controls need direction as part of the move
    if (isOneHandedControls) {
      this.direction = direction;
    }

    // TODO Might be worth getting location of player from area state service
    const newLocation = GridHelper.getNextLocation(this.locationY, this.locationX, direction, this.areaStateService.locations);

    // TODO Might be worth moving this somewhere more apprpriate, maybe listener in movement component
    if (newLocation.isTargetAreaExit) {

      // If it's closed don't allow through
      if (this.areaStateService.locations[this.locationY + this.locationX].areaExit.status === AreaExitStatus.closed) {

        return;
      }
      // If it's locked, don't allow access
      if (this.areaStateService.locations[this.locationY + this.locationX].areaExit.status === AreaExitStatus.locked) {
        this.dialogueService.displayDialogueMessage({
          text: defaults.dialogue.areaExitLocked,
          character: defaults.dialogue.computerCharacterType,
          name: defaults.dialogue.computerName
        });
        return;
      } else {
        // Emit event that new location access attempted, pass areaExit
        this.areaStateService.locations[this.locationY + this.locationX].areaExit.status = AreaExitStatus.open;
        this.areaStateService.loadNewArea(this.areaStateService.locations[this.locationY + this.locationX].areaExit.destination);
        return;
      }

    }

    // Update area state
    if (newLocation && newLocation.locationX && newLocation.locationY && newLocation.isLocationFree) {
      this.areaStateService.repositionCharacter(newLocation.locationY + newLocation.locationX, this.locationY + this.locationX);
      this.locationY = newLocation.locationY;
      this.locationX = newLocation.locationX;

    } else {
      // TODO: Possibly inform user you cannot move here
      // this.dialogueService.displaySpeech(
      //   {
      //     text: defaults.dialogue.nullElementResponse,
      //     character: defaults.dialogue.computerCharacterType,
      //     name: defaults.dialogue.computerName
      //   }
      // );
    }
    // this.direction = direction;

  }

  public changeDirection(direction: Direction) {
    this.direction = direction;
  }

  /**
   * Perform an attack in the direction player is facing
   */
  public attack() {

    // Allow the player attack animation
    this.areaStateService.locations[this.areaStateService.playerLocation].element.attack();

    // if (this.equipmentManagerService.getWeaponType(this.selectedWeaponSlot)) {
    const targetReference = GridHelper.getNextLocation(this.locationY, this.locationX, this.direction, this.areaStateService.locations);
    const targetLocation = this.areaStateService.locations[targetReference.locationY + targetReference.locationX];

    if (targetLocation && targetLocation.element && (targetLocation.element.type === ElementClass.enemy || targetLocation.element.type === ElementClass.npc)) {
      const targetElement = targetLocation.element;

      const damage = this.battleCalculatorService.getDamageToEnemy(targetElement, this.selectedWeaponSlot, targetElement.isGuarding, this.equipmentManagerService.activeBuff);

      if (damage) {
        // No need to assign this
        targetElement.respond(UserInteractionTypes.attack, GridHelper.getDirectionToFace(this.direction), damage);

        // Allow the character to animate receiving an attack
        targetElement.receiveAttack();

        this.dialogueService.displayDialogueMessage({
          text: defaults.dialogue.attackSuccess(damage),
          character: defaults.dialogue.computerCharacterType,
          name: defaults.dialogue.computerName
        });

        if (targetElement.isDead()) {

          this.areaStateService.removeCharacterFromHuntingList(targetElement);

          // Remove element and leave trace of the character on the grid
          GridHelper.decomposeCharacter(targetElement, targetReference.locationY + targetReference.locationX, this.areaStateService.locations);

          this.dialogueService.displayDialogueMessage({
            text: defaults.dialogue.targetDead + targetElement.name,
            character: defaults.dialogue.computerCharacterType,
            name: defaults.dialogue.computerName
          });
        }
      } else {
        this.dialogueService.displayDialogueMessage({
          text: defaults.dialogue.attackFailure,
          character: defaults.dialogue.computerCharacterType,
          name: defaults.dialogue.computerName
        });
      }
    }
  }

  /**
   * Interact with the object in the direction player is facing
   */
  public interact() {
    const targetReference = GridHelper.getNextLocation(this.locationY, this.locationX, this.direction, this.areaStateService.locations);
    const currentLocation = this.areaStateService.locations[this.locationY + this.locationX];
    const activeItem = this.equipmentManagerService.activeItem;

    if (GridHelper.isTargetLocationOutOfBounds(targetReference.locationY + targetReference.locationX)) {

      // If target is an area exit:
      if (targetReference.isTargetAreaExit) {
        if ((currentLocation.areaExit.status === AreaExitStatus.closed) ||
          (currentLocation.areaExit.status === AreaExitStatus.locked &&
            activeItem &&
            activeItem.itemReference &&
            currentLocation.areaExit.itemReferenceNeeded === activeItem.itemReference)) {

          // Open the door
          currentLocation.areaExit.status = AreaExitStatus.opening;
        } else {
          this.dialogueService.displayDialogueMessage({
            text: defaults.dialogue.areaExitKeyNotActive(currentLocation.areaExit.keyColourNeeded),
            character: defaults.dialogue.computerCharacterType,
            name: defaults.dialogue.computerName
          });

        }
      }

      return;
    }

    // Otherwise it's an actual location
    const targetLocation: IGridData = this.areaStateService.locations[targetReference.locationY + targetReference.locationX];
    const targetElement: any = targetLocation.element;

    // If there's no target and there are ground items
    if (!targetElement && targetLocation.groundItem) {
      this.openLootingModal.emit(targetLocation);

      return;
    }

    if (targetElement) {
      if (targetElement.type === ElementClass.object) {

        // Target is an inanimate object
        if (targetElement.itemReferenceNeeded && targetElement.isLocked) {

          if (activeItem && activeItem.itemReference === targetElement.itemReferenceNeeded) {

            // React to loot objects or doors differently
            switch (targetElement.objectType) {
              case ObjectType.lootObject:

                // Open the item modal
                this.openLootingModal.emit(targetLocation);
                targetElement.unlock(activeItem);

                break;
              case ObjectType.door:
                this.areaStateService.removeElementFromArea(targetElement, targetReference.locationY + targetReference.locationX);

                break;
              default:
                // Do nothing...
                break;
            }

            if (activeItem.destroyedOnUse) {
              this.equipmentManagerService.destroyActiveItem();

              this.dialogueService.displayDialogueMessage({
                text: defaults.dialogue.keyItemDestroyed,
                character: defaults.dialogue.computerCharacterType,
                name: defaults.dialogue.computerName
              });
            }
          } else if (targetElement.lockedDialogue) {

            // Open message modal
            this.openMessageModal.emit(targetElement.lockedDialogue);
          } else {
            this.dialogueService.displayDialogueMessage({
              text: defaults.dialogue.keyItemNotActive,
              character: defaults.dialogue.computerCharacterType,
              name: defaults.dialogue.computerName
            });
          }

        } else if (targetElement.loot && (!targetElement.itemReferenceNeeded || !targetElement.locked)) {
          this.openLootingModal.emit(targetLocation);
        }
      } else {

        // Otherwise target is a character
        if (!GridHelper.isTargetFacingSource(targetElement, this.direction)) {
          const stealSuccess = this.attemptSteal(targetElement);

          if (stealSuccess) {
            this.openLootingModal.emit(targetLocation);
          } else {
            this.dialogueService.displayDialogueMessage({
              text: defaults.dialogue.stealAttemptFail,
              character: defaults.dialogue.computerCharacterType,
              name: defaults.dialogue.computerName
            });

            // Set the character to hunting player
            targetElement.currentState = CharacterState.hunting;
          }
        }
      }

      return;
    }
  }

  /**
   * Guard against an attack from the direction you are facing
   */
  public guard() {

    // Allow the player attack animation
    this.areaStateService.locations[this.areaStateService.playerLocation].element.guard();
  }

  /**
   * speak to the object in the direction player is facing
   */
  public speak() {
    const nextGridLocation = GridHelper.getNextLocation(this.locationY, this.locationX, this.direction, this.areaStateService.locations);
    // TODO rename this
    if (nextGridLocation && !GridHelper.isTargetLocationOutOfBounds(nextGridLocation.locationY + nextGridLocation.locationX)) {
      const target = this.areaStateService.locations[nextGridLocation.locationY + nextGridLocation.locationX].element;

      if (target && target.isDead()) {
        this.dialogueService.displayDialogueMessage({
          text: defaults.dialogue.nullElementResponse,
          character: defaults.dialogue.computerCharacterType,
          name: defaults.dialogue.computerName
        });
        return;
      }

      if (!target) {
        this.dialogueService.displayDialogueMessage(
          {
            text: defaults.dialogue.nullElementResponse,
            character: defaults.dialogue.computerCharacterType,
            name: defaults.dialogue.computerName
          }
        );
      } else {
        this.dialogueService.displayDialogueMessage(
          {
            text: target.respond(UserInteractionTypes.speak, GridHelper.getDirectionToFace(this.direction)),
            character: target.type,
            name: target.name
          }
        );
      }
    }
  }

  private attemptSteal(target: Character): boolean {
    // TODO Work this out properly
    const diceRoll = Dice.roll1d20();
    if (diceRoll > defaults.playerMultipliers.stealSuccessRequirement) {
      return true;
    }
    return false;
    // const successChanceMultiplier = target.isAsleep ? defaults.playerMultipliers.
  }

  public receiveAttack(character: Character) {

    const player = this.areaStateService.locations[this.areaStateService.playerLocation].element;

    let damage = this.battleCalculatorService.getDamageToPlayer(character, this.equipmentManagerService.armour, !!player.isGuarding, this.equipmentManagerService.activeBuff);
    if (damage) {

      // Allow the player to animate receiving an attack
      player.receiveAttack();

      if (this.equipmentManagerService.activeBuff &&
        this.equipmentManagerService.activeBuff.properties.effectType === PotionEffectType.healthOvercharge &&
        damage <= this.equipmentManagerService.activeBuff.properties.remainingEffect) {

        // Take any damage off the health buff first
        this.equipmentManagerService.activeBuff.properties.remainingEffect -= damage;
      } else {

        if (this.equipmentManagerService.activeBuff &&
          this.equipmentManagerService.activeBuff.properties.effectType === PotionEffectType.healthOvercharge) {

          // Reduce the damage by what remains after health buff used
          damage = damage - this.equipmentManagerService.activeBuff.properties.remainingEffect;
          this.equipmentManagerService.activeBuff.properties.remainingEffect = 0;
        }

        // Reduce health by remaining damage
        this.health -= damage;
      }

      this.dialogueService.displayDialogueMessage({
        text: defaults.dialogue.enemyAttacks(damage, character.name),
        character: defaults.dialogue.computerCharacterType,
        name: defaults.dialogue.computerName
      });
    } else {
      this.dialogueService.displayDialogueMessage({
        text: defaults.dialogue.enemyFailsAttack(character.name),
        character: defaults.dialogue.computerCharacterType,
        name: defaults.dialogue.computerName
      });
    }
    if (this.health <= 0) {
      // YOU ARE DEAD!
    }
  }

  public useConsumable(item: IInventoryItem, itemSlot: any) {
    if (item.class === ItemClass.potion) {
      switch (item.type) {
        case PotionType.healing:
          if ((this.maxHealth - this.health) > 0) {

            // We only want to add additional health remaining
            if (item.properties.effectAmount > (this.maxHealth - this.health)) {
              this.health += (this.maxHealth - this.health);
            } else {
              this.health += item.properties.effectAmount;
            }

            this.dialogueService.displayDialogueMessage({
              text: defaults.dialogue.consumedHealthPotion(item.name, item.properties.effectAmount),
              character: defaults.dialogue.computerCharacterType,
              name: defaults.dialogue.computerName
            });

            this.inventoryManagerService.locations[itemSlot] = null;
          } else {
            this.dialogueService.displayDialogueMessage({
              text: defaults.dialogue.alreadyAtFullHealth,
              character: defaults.dialogue.computerCharacterType,
              name: defaults.dialogue.computerName
            });
          }
          break;
        case PotionType.buff:
          this.equipmentManagerService.activeBuff = item;
          this.equipmentManagerService.startBuffTimer(item.properties.effectDuration);

          this.dialogueService.displayDialogueMessage({
            text: defaults.dialogue.consumedBuffPotion(item.name, item.properties.effectDuration),
            character: defaults.dialogue.computerCharacterType,
            name: defaults.dialogue.computerName
          });

          // Set the target if became invisible while being hunted
          if (item.properties.effectType === PotionEffectType.invisibility) {
            this.lastKnownLocation = this.locationY + this.locationX;
          }

          this.inventoryManagerService.locations[itemSlot] = null;
          break;
      }
    }
  }

  /**
   * Return the player state for storage
   * @returns the state data relevant to this service
   */
  public gatherState(): IPlayerStateData {
    return {
      health: this.health,
      maxHealth: this.maxHealth,
      exp: this.exp,
      locationX: this.locationX,
      locationY: this.locationY,
      direction: this.direction,
      selectedWeaponSlot: this.selectedWeaponSlot,
    };
  }

  /**
   * Applies state data to this service
   * @param newState settings from storage to push to this state service
   */
  public applyState(newState: IPlayerStateData): void {
    for (const stateSetting in newState) {
      if (newState.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }
}
