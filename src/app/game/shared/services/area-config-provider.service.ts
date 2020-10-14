import { Injectable } from '@angular/core';
import * as areaConfigs from "../../../game-config/areas";
import * as maps from "../../../game-config/areas/map";
import { IAreaConfig, IAreaExits } from '../../../game-config/interfaces';
import { Helper } from '../../../shared/util/helper';

@Injectable()
export class AreaConfigProviderService {

    private areas: any;
    private map: any;

    constructor(
    ) {
        this.areas = areaConfigs;
        this.map = maps.default;
    }

    /**
     * Retrieves the specific config file for the area requested
     *
     * @param {number} id The reference for the area we're retrieving
     *
     * @returns {IAreaConfig}
     */
    public getAreaConfig(id?: number): IAreaConfig {

        return Helper.cloneObject(this.areas["area" + id].default) as IAreaConfig;
    }

    /**
     * Retrieves the specific config file for the area requested
     *
     * @param {number} id The reference for the area we're retrieving area exits for
     *
     * @returns {IAreaExits}
     */
    public getAreaExits(id: number): IAreaExits {

        return this.map[id];
    }
}
