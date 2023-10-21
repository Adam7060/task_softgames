/* 
  This is the main menu. It will act as a gateway to the other 3 tasks. It also hosts the fps counter and hom button which both are created
  once and used accross all scenes.
*/
import {
  Container,
  Text,
  Application,
  Ticker
} from 'pixi.js';

import Cards from './Cards';
import Particles from './Particles';
import TextTool from './TextTool';
import dispatcher from './utils/dispatcher';

class Menu extends Container {
  private FPS: Text = new Text();
  private game: Application;
  private stageContent: Container = new Container();


  constructor(game: Application) {
    super();

    this.game = game;

    this.game.stage.addChild(this.stageContent);

    this.createFPSCounter(); // counter is always peresent on screen accross all scenes

    this.createStage(); // remove once a task is clicked, recreate this stage once home is pressed
  }

  createFPSCounter(): void {
    this.FPS = new Text('FPS: ', {
      fontFamily: 'Arial',
      fontSize: 40,
      fill: 0xffffff,
      align: 'center',
    });
    this.FPS.setTransform(50, 50);
    this.game.stage.addChild(this.FPS); // we put it in main stage because it's for all stages

    this.game.ticker.add(() => this.update());
  }

  update(): void {
    this.FPS.text = `FPS: ${Ticker.shared.FPS.toFixed(0).toString()}`;
  }

  createStage(): void {
    this.createButton(540, 250, 'Part 1: Cards', this.onPart1);
    this.createButton(540, 350, 'Part 2: TextTool', this.onPart2);
    this.createButton(540, 450, 'Part 3: Particles', this.onPart3);

    this.createButton(1100, 50, 'HOME', this.onHome, true);
  }
  createButton(x: number, y: number, text: string, callBack: Function, isGlobal = false): void {
    const object: Text = new Text(text, {
      fontFamily: 'Arial',
      fontSize: 40,
      fill: 0xffffff,
      align: 'center',

    });
    object.setTransform(x, y);
    object.interactive = true;
    object.buttonMode = true;
    object.on('mousedown', callBack.bind(this)).on('touchstart', callBack.bind(this));
    isGlobal ? this.game.stage.addChild(object) : this.stageContent.addChild(object);
  }

  onPart1(): void {
    new Cards(this.game);
    this.stageContent.removeChildren();
  }

  onPart2(): void {
    new TextTool(this.game);
    this.stageContent.removeChildren();
  }

  onPart3(): void {
    new Particles(this.game);
    this.stageContent.removeChildren();
  }

  onHome(): void {
    dispatcher.emit('onHome');
    this.createStage();
  }
}

export default Menu;