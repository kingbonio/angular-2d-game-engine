import { Injectable } from '@angular/core';
import { backgroundMusic } from '../../game-config/audio';
import { IAudioEngine } from '../interfaces';
import { BackgroundMusic } from '../enums';
import { GameSettingsService } from './game-settings.service';

@Injectable({
    providedIn: 'root'
})
export class BackgroundMusicService {
    private backgroundMusicInstances = {};
    private currentlyActiveMusic: BackgroundMusic;

    constructor(
    ) {
        for (const backgroundMusicName in BackgroundMusic) {
            if (BackgroundMusic.hasOwnProperty(backgroundMusicName)) {
                this.backgroundMusicInstances[backgroundMusicName] = new Audio() as IAudioEngine;
                this.backgroundMusicInstances[backgroundMusicName].loop = true;
                this.backgroundMusicInstances[backgroundMusicName].src = backgroundMusic[backgroundMusicName];
                this.backgroundMusicInstances[backgroundMusicName].load();
            }
        }
    }

    /**
     * Stops playing all types of music on service
     */
    public stopMusic(): void {
        for (const backgroundMusicInstance in this.backgroundMusicInstances) {
            if (this.backgroundMusicInstances.hasOwnProperty(backgroundMusicInstance)) {
                this.backgroundMusicInstances[backgroundMusicInstance].load();
            }
        }
        this.currentlyActiveMusic = null;
    }

    /**
     * Starts playing the music type provided
     *
     * @param {BackgroundMusic} musicName The reference for the music type
     */
    public startMusic(musicName: BackgroundMusic): void {
        if (this.currentlyActiveMusic !== musicName) {
            for (const backgroundMusicInstance in this.backgroundMusicInstances) {
                if (this.backgroundMusicInstances.hasOwnProperty(backgroundMusicInstance)) {
                    this.backgroundMusicInstances[backgroundMusicInstance].load();
                    if (backgroundMusicInstance === musicName) {
                        this.backgroundMusicInstances[backgroundMusicInstance].play();
                        this.currentlyActiveMusic = musicName;
                    }
                }
            }
        }
    }

    /**
     * Sets the volume for all types of music on this service
     *
     * @param {number} newVolume The volume we're setting the music to
     */
    public setVolume(newVolume: number): void {
        for (const backgroundMusicInstance in this.backgroundMusicInstances) {
            if (this.backgroundMusicInstances.hasOwnProperty(backgroundMusicInstance)) {
                this.backgroundMusicInstances[backgroundMusicInstance].volume = newVolume;
            }
        }
    }
}
