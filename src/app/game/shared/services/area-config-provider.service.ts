import { Injectable, OnInit } from '@angular/core';
import * as areaConfigs from "../../../game-config/areas";
import * as maps from "../../../game-config/areas/map";

@Injectable()
export class AreaConfigProviderService implements OnInit {

    private areas: any;
    private map: any;

    constructor(
    ) {
        this.areas = areaConfigs;
        this.map = maps.default;
    }

    ngOnInit() {
    }

    // TODO Probably move this to another class
    private assignEquipmentToPlayer() {
        // TODO This might be useful when properly setting equipment
        // this.equipmentManagerService.setWeaponType(Weapons.cutthroatRazor);
    }

    private assignItemsToInventory() {
        // TODO Do this for defaults, hook it in to that
    }

    /**
     * Retrieves the specific config file for the area requested
     * @param id reference for the area
     * @returns the area config object
     */
    public getAreaConfig(id?: number): any {
        // TODO: Should be returning IAreaConfig
        return this.areas["area" + id].default;
    }

    public getAreaExits(id?: number): any {
        // TODO Should get from id
        return this.map[id];
    }

}
