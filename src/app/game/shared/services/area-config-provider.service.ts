import { Injectable } from '@angular/core';
import { IAreaConfig } from '../../../game-config/interfaces';
import * as areaConfig from "../../../game-config/areas";

@Injectable()
export class AreaConfigProviderService {

  private areaConfig: any;

  constructor() {
    // TODO: This needs fixing
    this.areaConfig = areaConfig;
  }

  /**
   * Retrieves the specific config file for the area requested
   * @param id reference for the area
   * @returns the area config object
   */
  public getConfig(id: number): any {
    // TODO: Should be returning IAreaConfig
    return areaConfig;
  }

}
