# Description

A game engine for creating room-based sneak/action games with puzzle elements

# Technical Demo

You can play a technical demo of the game engine in its current "master" branch form here:

https://kingbonio.github.io/angular-rpg-game-engine/


# Running Locally

**Running this respository locally requires [Angular CLI 8](https://angular.io/cli) to be installed on your machine**

Clone the repo using `git clone https://github.com/kingbonio/angular-rpg-game-engine.git`

Run `npm install` in the repo folder and then `ng serve`, this will launch the engine at the location `localhost:4200`.


# Setting Up Your Game

## Setting The Game Config Defaults

### Configuring Battle Damage Calculators


### Adding Starting Items

---

## Setting The Background Music For Areas


---

## Setting The Sound Effects


---

## Creating A Room

### Setting The Floor Pattern


### Adding The Area Exits


### Placing Character Start Location


### Placing Enemies


### Placing NPCs


### Placing Walls


### Placing Internal Doors


### Placing Chests


### Linking Rooms


### Setting Room Entrance Notices

---

## Creating Items

In the folder game/game-config/items you will find 4 files, armour, key-item, potions, weapons.

To add an armour item you will need to open the armour.ts file, and add a new object in to the `armour` object where the key is the name of the item (in camel-case).

You will need to use the Enums (ItemClass and ArmourType) provided to determine what class and armour slot the armour will use.

Ensure the `properties` property on the object for the item contains a `defense` property which will be a number (Used to determine the reduction in received attack damage)


### Creating Keys For Doors And Chests


---

## Assets

### Setting your images

You will need to add your image files in to their relevant locations in the assets/images folder

If you create an item or element in any of the map config which requires an image file, you must add this image file

### Setting the animation images

The animations are SVGs and I recommend replacing the existing images with svgs if you wish to use your own.

If you wish to switch the images for a file format other than svg, then the dimensions should be 80x80.

You have three animations which require an image:

* Guard           
* Receive Attack
* Slash

### Image dimensions

All items:

30x30

All characters:

80x80

All elements:

80x80

Save icon:

80x80

Ground effects:

80x80

Floor styles:

80x80

Animations:

80x80


---

# Default Controls

### Movement:

      W: Move north
      D: Move east
      S: Move south
      A: Move west

### Direction:

      W: Face north
      D: Face east
      S: Face south
      A: Face west

### Interaction:

      Q:     Speak
      E:     Interact
      Space: Attack
      Ctrl:  Defend


# Save Games

The application uses local storage to persist game element/room states


# Current Presentation

Please check out the following Youtube channel for the most recent additions to functionality:

https://www.youtube.com/channel/UCmU68D0OK6fXo351hs3qqjQ


# Change Log

v0.12.1a

* Added background music
* Fixed routing so now defaults to main menu


## Background Music credits

* https://www.youtube.com/watch?v=ykye8Hw1TgA
* https://freesound.org/people/Magmi.Soundtracks/sounds/475737/

## Sound credits

* https://freesound.org/people/dkiller2204/sounds/422975/
* https://freesound.org/people/Slanesh/sounds/31769/
* https://freesound.org/people/InspectorJ/sounds/431117/
* https://freesound.org/people/LukeSharples/sounds/209085/
* https://freesound.org/people/loudernoises/sounds/334169/
* https://freesound.org/people/Abyssmal/sounds/35213/
* https://freesound.org/people/rabban625/sounds/436465/
