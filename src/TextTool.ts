import {
  Container,
  Application,
  Sprite,
  Loader,
  Text,
} from 'pixi.js';
import dispatcher from './utils/dispatcher';

class TextTool extends Container {
  private game: Application;
  private stageContent: Container = new Container();
  private possibleImages: string[] = ["dog", "emoji", "money"];
  private possibleTexts: string[] = ["Adam", "SoftGames", "40", "99999", "12jowd2j03 d23dsxsqx"];
  interval: NodeJS.Timeout | undefined;


  constructor(game: Application) {
    super();

    this.game = game;
    this.game.stage.addChild(this.stageContent);

    dispatcher.once("onHome", this.clearStage.bind(this));

    this.createRandomObjects();
  }

  createRandomObjects(): void {
    this.stageContent.removeChildren();

    // use this value to add new objects beside each other respectively based on x pos. the number provided is the initial position.
    let accumulativeWidth: number = 0;

    // loop 3 time to create 3 random objects, sprites or texts
    for (let i = 0; i < 3; i++) {
      let rndNumber: number = Math.round(Math.random()); // 1 = sprite, 0 = text


      if (rndNumber == 1) {
        // get a random texture based on one of the possible image keys above
        const sprite: Sprite = new Sprite(Loader.shared.resources[this.possibleImages[Math.floor(Math.random() * this.possibleImages.length)]].texture);

        sprite.anchor.set(0, 0.5);
        sprite.position.set(accumulativeWidth, 350);
        sprite.position.x = accumulativeWidth;
        accumulativeWidth += sprite.width;
        this.stageContent.addChild(sprite);
      } else {
        const text: Text = new Text(this.possibleTexts[Math.floor(Math.random() * this.possibleTexts.length)], {
          fontFamily: 'Arial',
          fontSize: Math.floor(20 + Math.random() * 50),
          fill: 0xFF8000,
          align: 'center',
        });
        text.anchor.set(0, 0.5);
        text.position.set(accumulativeWidth, 350);
        accumulativeWidth += text.width;
        this.stageContent.addChild(text);
      }

      // center the whole stage to avoid things going off screen
      this.stageContent.x = (1280 - accumulativeWidth) / 2;
    }

    this.interval = setTimeout(() => {
      this.createRandomObjects();
    }, 2000);

  }

  clearStage(): void {
    if (this.interval) clearInterval(this.interval);
    this.stageContent.removeChildren();
  }
}

export default TextTool;