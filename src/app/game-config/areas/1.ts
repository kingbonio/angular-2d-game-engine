import { IAreaElement } from "../../game/area/interfaces";
import { IWeaponSlots } from "../../game/item/interfaces";
import { CharacterState, Direction, ElementClass, ObjectType } from "../../game/shared/enums";
import { armour, keyItems, weapons } from "../items";
import { player } from "../characters";
import { BackgroundMusic } from "../../shared/enums";

export default {
    room: 1,
    backgroundMusic: BackgroundMusic.gameMusic,
    floorImageFileName: "pavement.png",
    areaVisited: false,
    areaLoadMessage: "Welcome to the game engine demo! This enemy has a green key on them. Remember you can use Interact (E default), Attack (Space Default), Defend (Ctrl Default) and Speak (Q Default).",
    areaElements: [
        player,
        {
            type: ElementClass.enemy,
            elementProperties: {
                id: "cbdd6e52-dc3e-4059-b9b6-e231fdd775a1",
                maxHp: 30,
                baseDamage: 2,
                lowHealthThreshold: 18,
                attackPauseDuration: 1,
                name: "Gary The Dick",
                startingDirection: Direction.S,
                directionsForPatrol: [
                    Direction.S,
                    Direction.W,
                    Direction.W,
                    Direction.W,
                    Direction.N,
                    Direction.N,
                    Direction.N,
                    Direction.W,
                    Direction.W,
                    Direction.W,
                    Direction.S,
                    Direction.S,
                    Direction.S,
                    Direction.E,
                    Direction.E,
                    Direction.E,
                    Direction.N,
                    Direction.N,
                    Direction.N,
                    Direction.E,
                    Direction.E,
                    Direction.E,
                    Direction.S,
                    Direction.S,
                ],
                maxHuntingDuration: 3,
                startingState: CharacterState.patrolling,
                speechResponse: "I'm gonna kill you",
                sleepResponse: "Zzzzzzzzzzzzzzzz",
                armour: {
                    head: armour.leatherHelmet,
                    arms: null,
                    hands: null,
                    torso: null,
                    legs: null,
                    boots: armour.leatherBoots,
                },
                weapons: {
                    primary: weapons.basicKnife,
                } as IWeaponSlots,
                loot: [
                    keyItems.greenDoorKey
                ],
                imageFileName: "shadow-enemy.png",
                startingLocation: "d7",
            },
            startingPositionY: "d",
            startingPositionX: 7,
        },
        // Left block
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 3,
            startingPositionY: "e",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.S,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 3,
            startingPositionY: "d",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.W,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 2,
            startingPositionY: "d",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 2,
            startingPositionY: "e",
        },
        // Right block
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.E,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 6,
            startingPositionY: "e",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.S,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 6,
            startingPositionY: "d",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.W,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 5,
            startingPositionY: "d",
        },
        {
            type: ElementClass.object,
            elementProperties: {
                name: "Corner Wall",
                startingDirection: Direction.N,
                isInteractive: false,
                imageFileName: "wall-corner.png",
            },
            startingPositionX: 5,
            startingPositionY: "e",
        },
    ] as IAreaElement[]
};
