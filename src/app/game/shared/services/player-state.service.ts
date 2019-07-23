import defaults from '../../../shared/defaults';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Direction, ElementClass, ObjectType, ItemClass } from '../enums';
import { IPlayerStateData, IInventoryItem } from '../interfaces';
import { AreaStateService } from './area-state.service';
import { DialogueService } from './dialogue.service';
import { UserInteractionTypes } from '../../../shared/enums';
import { MovementComponent } from '../util/movement/movement.component';
import { BattleCalculatorService } from './battle-calculator.service';
import { WeaponType, PotionType } from '../../item/enums';
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';
import { IAreaElement } from '../../area/interfaces';
import { Character } from '../../character-classes/character';
import { Dice } from '../util/dice';

@Injectable()
export class PlayerStateService {
  @Output() openLootingModal: EventEmitter<any> = new EventEmitter();

  public health: number;
  public maxHealth: number;
  private strength: number;
  private dexterity: number;
  private magicka: number;
  private exp: number = defaults.initialPlayerStats.exp;
  public locationX: number;
  public locationY: string;
  public direction: Direction = Direction.N;
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

  ) {
    // Pull defaults from defaults file and assign initial values
    this.health = defaults.initialPlayerStats.health;
    this.maxHealth = defaults.initialPlayerStats.maxHealth;
    this.strength = defaults.initialPlayerStats.strength;
    this.dexterity = defaults.initialPlayerStats.dexterity;
    this.magicka = defaults.initialPlayerStats.magicka;
    this.direction = defaults.initialPlayerStats.direction;
  }

  onInit() {
  }

  get inventoryCapacity() {
    return this.strength * defaults.playerMultipliers.inventoryStorageMultiplier;
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
  public move(direction: Direction) {

    // TODO Might be worth getting location of player from area state service
    const newLocation = this.movement.getNextLocation(this.locationY, this.locationX, direction);

    // Update area state
    if (newLocation && newLocation.locationX && newLocation.locationY && newLocation.isLocationFree) {
      this.areaStateService.moveCharacter(newLocation.locationY + newLocation.locationX, this.locationY + this.locationX);
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
    if (this.equipmentManagerService.getWeaponType(this.selectedWeaponSlot)) {
      const targetReference = this.movement.getNextLocation(this.locationY, this.locationX, this.direction);
      const target = this.areaStateService.locations[targetReference.locationY + targetReference.locationX].element;

      if (target && (target.type === ElementClass.enemy || target.type === ElementClass.npc)) {
        if (target.isDead()) {
          this.dialogueService.displayDialogueMessage({
            text: defaults.dialogue.nullElementResponse,
            character: defaults.dialogue.computerCharacterType,
            name: defaults.dialogue.computerName
          });
          return;
        }

        const damage = this.battleCalculatorService.getDamageToEnemy(target, this.selectedWeaponSlot);

        if (damage) {
          // No need to assign this
          target.respond(UserInteractionTypes.attack, this.movement.getDirectionToFace(this.direction), damage);

          this.dialogueService.displayDialogueMessage({
            text: defaults.dialogue.attackSuccess(damage),
            character: defaults.dialogue.computerCharacterType,
            name: defaults.dialogue.computerName
          });

          if (target.isDead()) {
            this.dialogueService.displayDialogueMessage({
              text: defaults.dialogue.targetDead + target.name,
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
    } else {
      this.dialogueService.displayDialogueMessage(
        {
          text: defaults.dialogue.noWeaponEquipped,
          character: defaults.dialogue.computerCharacterType,
          name: defaults.dialogue.computerName
        }
      );
    }
  }

  /**
   * Interact with the object in the direction player is facing
   */
  public interact() {
    const targetReference = this.movement.getNextLocation(this.locationY, this.locationX, this.direction);
    // TODO Types
    const target: any = this.areaStateService.locations[targetReference.locationY + targetReference.locationX].element;
    if (target) {
      if (target.type === ElementClass.object) {
        const activeItem = this.equipmentManagerService.activeItem;
        // TODO Maybe organise these ifs
        if (activeItem && activeItem.itemReference && target.itemReferenceNeeded === activeItem.itemReference) {
          switch (target.objectType) {
            case ObjectType.lootObject:
              this.openLootingModal.emit(target);
              break;
            case ObjectType.door:
              this.areaStateService.removeElementFromArea(target, targetReference.locationY + targetReference.locationX);
              break;
            default:
              // Do nothing...
              break;
          }
        } else {
          this.dialogueService.displayDialogueMessage({
            text: defaults.dialogue.keyItemNotActive,
            character: defaults.dialogue.computerCharacterType,
            name: defaults.dialogue.computerName
          });
          return;
        }
      } else {
        if (target.loot) {
          // Loot body if dead
          if (target.isDead()) {
            // Emit event for looting modal
            this.openLootingModal.emit(target);
            return;
          } else if (target.isAsleep) {
            const stealSuccess = this.attemptSteal(target);
            if (stealSuccess) {
              this.openLootingModal.emit(target);
            } else {
              this.dialogueService.displayDialogueMessage(
                {
                  text: defaults.dialogue.stealAttemptFail,
                  character: defaults.dialogue.computerCharacterType,
                  name: defaults.dialogue.computerName
                }
              );
              target.isAsleep = false;
              target.isAngry = true;
            }
          } else {
            this.dialogueService.displayDialogueMessage(
              {
                text: target.respond(UserInteractionTypes.speak, this.movement.getDirectionToFace(this.direction)),
                character: target.type,
                name: target.name
              }
            );
          }
        }
      }
      // TODO else...
    }
  }

  /**
   * Guard against an attack from the direction you are facing
   */
  public guard() {

  }

  /**
   * speak to the object in the direction player is facing
   */
  public speak() {
    const nextGridLocation = this.movement.getNextLocation(this.locationY, this.locationX, this.direction);
    // TODO rename this
    if (nextGridLocation) {
      const target = this.areaStateService.locations[nextGridLocation.locationY + nextGridLocation.locationX].element;

      if (target.isDead()) {
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
            text: target.respond(UserInteractionTypes.speak, this.movement.getDirectionToFace(this.direction)),
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
    if (diceRoll > defaults.playerMultipliers.stealSuccessRequirement && this.level >= target.level) {
      return true;
    }
    return false;
    // const successChanceMultiplier = target.isAsleep ? defaults.playerMultipliers.
  }

  public receiveAttack(character: Character) {
    const damage = this.battleCalculatorService.getDamageToPlayer(character, this.equipmentManagerService.armour);
    if (damage) {

      this.health -= damage;

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

  public useConsumable(item: IInventoryItem) {
    if (item.class === ItemClass.potion) {
      switch (item.type) {
        case PotionType.healing:
          this.health += item.properties.healing;
      }
      this.dialogueService.displayDialogueMessage({
        text: defaults.dialogue.consumedHealthPotion(item.name, item.properties.healing),
        character: defaults.dialogue.computerCharacterType,
        name: defaults.dialogue.computerName
      });
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
      strength: this.strength,
      dexterity: this.dexterity,
      magicka: this.magicka,
      exp: this.exp,
      locationX: this.locationX,
      locationY: this.locationY,
      direction: this.direction
    };
  }

  /**
   * Applies state data to this service
   * @param newState settings from storage to push to this state service
   */
  public applyState(newState: IPlayerStateData): void {
    for (const stateSetting in newState) {
      if (this.hasOwnProperty(stateSetting)) {
        this[stateSetting] = newState[stateSetting];
      }
    }
  }
}
