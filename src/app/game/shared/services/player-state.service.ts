import defaults from '../../../shared/defaults';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Direction, ElementClass } from '../enums';
import { IPlayerStateData, IInventoryItem } from '../interfaces';
import { AreaStateService } from './area-state.service';
import { DialogueService } from './dialogue.service';
import { UserInteractionTypes } from '../../../shared/enums';
import { MovementComponent } from '../util/movement/movement.component';
import { BattleCalculatorService } from './battle-calculator.service';
import { WeaponType } from '../../item/enums';
import { EquipmentManagerService } from '../../item/services/equipment-manager.service';

@Injectable()
export class PlayerStateService {
  @Output() openLootingModal: EventEmitter<any> = new EventEmitter();

  private _health: number;
  private _maxHealth: number;
  private _strength: number;
  private _dexterity: number;
  private _magicka: number;
  private _exp: number = defaults.initialPlayerStats.exp;
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
  }

  onInit() {
    // Pull defaults from defaults file and assign initial values
    this._health = defaults.initialPlayerStats.health;
    this._maxHealth = defaults.initialPlayerStats.maxHealth;
    this._strength = defaults.initialPlayerStats.strength;
    this._dexterity = defaults.initialPlayerStats.dexterity;
    this._magicka = defaults.initialPlayerStats.magicka;
    this.direction = defaults.initialPlayerStats.direction;
  }

  get health() {
    return this._health;
  }

  set health(newHealth) {
    this._health = newHealth;
  }

  get maxHealth() {
    return this._maxHealth;
  }

  set maxHealth(newMaxHealth) {
    this._maxHealth = newMaxHealth;
  }

  get strength() {
    return this._strength;
  }

  set strength(newStrength) {
    this._strength = newStrength;
  }

  get dexterity() {
    return this._dexterity;
  }

  set dexterity(newDexterity) {
    this._dexterity = newDexterity;
  }

  get magicka() {
    return this._magicka;
  }

  set magicka(newMagicka) {
    this._magicka = newMagicka;
  }

  get exp() {
    return this._exp;
  }

  set exp(newExp) {
    this._exp = newExp;
  }

  get inventoryCapacity() {
    return this._strength * defaults.playerMultiplyers.inventoryStorageMultiplyer;
  }

  get level() {
    return defaults.playerMultiplyers.levelCalculation(this.exp);
  }

  get levelMultiplyer(): number {
    return this.level * defaults.playerMultiplyers.levelStatMultiplyer;
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
      const target = this.areaStateService.locations[targetReference.locationY + targetReference.locationX];

      if (target) {
        if (target.isDead()) {
          this.dialogueService.displayDialogueMessage({
            text: defaults.dialogue.nullElementResponse,
            character: defaults.dialogue.computerCharacterType,
            name: defaults.dialogue.computerName
          });
          return;
        }

        const damage = this.battleCalculatorService.calculateDamageToEnemy(target, this.selectedWeaponSlot, this.levelMultiplyer);

        if (damage) {
          // No need to assign this
          target.respond(UserInteractionTypes.attack, this.movement.getDirectionToFace(this.direction), damage);

          this.dialogueService.displayDialogueMessage({
            text: defaults.dialogue.attackSuccess + damage,
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
    const target: any = this.areaStateService.locations[targetReference.locationY + targetReference.locationX];
    if (target) {
      if (target.type === ElementClass.object) {
        const activeItem = this.equipmentManagerService.activeItem;
        // TODO Maybe organise these ifs
        if (activeItem && activeItem.itemReference) {
          if (target.itemReferenceNeeded === activeItem.itemReference) {
            this.openLootingModal.emit(target);
          } else {
            this.dialogueService.displayDialogueMessage({
              text: defaults.dialogue.keyItemNotActive,
              character: defaults.dialogue.computerCharacterType,
              name: defaults.dialogue.computerName
            });
            return;
          }
        }
      } else {
        if (target.loot) {
          // Loot body if dead
          if (target.isDead()) {
            // Load a modal with the contents of the character's inventory
            // this.modalService.open("type");

            // Emit event for looting modal
            this.openLootingModal.emit(target);

            // TODO
            // this.areaStateService
            return;
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
      const target = this.areaStateService.locations[nextGridLocation.locationY + nextGridLocation.locationX];

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
