import { Injectable } from '@angular/core';
import * as areas from '../../../game-config/areas';

@Injectable({
    providedIn: 'root'
})
export class AssetLoaderService {

    public areas: any;
    public assets = [];
    public assetsLoaded = false;

    constructor() {
        this.areas = areas;
    }

    /**
     * Collect all asset locations and load into local storage
     */
    public loadAssets(): void {
        for (const area in areas) {
            if (this.areas.hasOwnProperty(area)) {
                this.areas[area].default.areaElements.forEach(element => {
                    if (element.elementProperties && element.elementProperties.imageFileName) {
                        this.assets.push(element.elementProperties.imageFileName);
                    }
                });
            }
        }

        this.assetsLoaded = true;
    }
}
