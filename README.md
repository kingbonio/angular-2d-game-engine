# Main

An engine written with prospects of RPG game story and characters. This will be forked into a game once the engine is finished.

# DEMO

You can play the game in its current "master" branch form here:

https://kingbonio.github.io/angular-rpg-game-engine/


# Running

Clone the repo using `git clone https://github.com/kingbonio/angular-rpg-game-engine.git`

Run `npm install` in the repo folder and then `ng serve`, this will launch the engine at the location `localhost:4200`.


# Defaults

Numerous default settings can be found in the src/app/shared/defaults/index.ts, setting starting parameters and multipliers

## Default Controls

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


# Persistence

The application uses local storage to persist game element states


# Current presentation

Please check out the following Youtube channel for the most recent additions to functionality:

https://www.youtube.com/channel/UCmU68D0OK6fXo351hs3qqjQ


# Change Log

v0.10.0a

* Added movement animations to charactrs changing location
* Blocked movement for characters if they're currently in a movement animation
* Resolved bug where you could tap on the input control and accidentally highlight the text