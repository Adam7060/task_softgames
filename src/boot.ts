/* 
  Boot file will start our game. We will create the base canvas object, configuration for device responsivness and laod the assets.
*/
import {Loader, Application} from 'pixi.js';
import Menu from './Menu';


/* Base width and height. This is the default height and width. We're going to use the resize method to calculate the ratio for our app view with respect to these height and width values
*/
const MAX_WIDTH: number = 1280;
const MAX_HEIGHT: number = 720;

// Game config
const game: Application = new Application({
  backgroundColor: 0X0000,
  width: window.innerWidth,
  height: window.innerHeight
});

// Start game after loading page
document.addEventListener('DOMContentLoaded', function () {

  // Create game app
  document.body.appendChild(game.view);

  // Load assets
  Loader.shared
    .add('cards', 'src/assets/cards/card_spritesheet.json')
    .add('dog', 'src/assets/random/dog.png')
    .add('emoji', 'src/assets/random/emoji.png')
    .add('money', 'src/assets/random/money.png')
    .add('fire', 'src/assets/fire.png')
    .load(onload.bind(this));

}, false);

// Method called after all assets are loaded
function onload(): void {
  new Menu(game);

  // Resizing method
  resize();
  window.addEventListener('resize', resize);
}

/*
 Scale the stage based on a predetermined height and width. Keep the game full screen.
 This is just one simple way to dynamically scale the game, ofcourse when the game is bigger then there will be multiple ways 
 To scale the game by implementing the resize function for each scene indivudally and use
 a scaling mechenism as needed, for ex: background don't always need to be on the whole screen
 so they would use other formulas than the game objects.
*/
function resize(): void {
  game.renderer.resize(window.innerWidth, window.innerHeight);

  /* The max width and height are just standard values used for web games which mostly target mobile, it doesn't mean the
    game won't be able to go higher than these values. Also would like to note there's some magic numbers regarding positions
    in other classes, we can instead of magic numbers using multiple ways, such as multiplying current width and height
    by a number between 0 and 1 (inside the visible screen) for x and y respectively, but I kept it simple for the sake 
    of this demo.
  */
  const ratio: number = MAX_WIDTH / MAX_HEIGHT;
  const currentRatio: number = window.innerWidth / window.innerHeight;
  let newWidth: number;
  let newHeight: number;
  let scaleTo: number;

  if (currentRatio < ratio) {
    newWidth = Math.max(MAX_WIDTH, MAX_HEIGHT);
    newHeight = newWidth / ratio;
    scaleTo = window.innerWidth / MAX_WIDTH;
  } else {
    newHeight = Math.max(MAX_HEIGHT, window.innerHeight);
    newWidth = newHeight * ratio;
    scaleTo = window.innerHeight / MAX_HEIGHT;
  }

  game.stage.scale.set(scaleTo);
}