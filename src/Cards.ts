import {
  Container,
  Application,
  Sprite,
  Loader,
  LoaderResource,
} from 'pixi.js';
import dispatcher from './utils/dispatcher';
import {gsap} from 'gsap'; // used to tween card movement

class Cards extends Container {
  private game: Application;
  private stageContent: Container = new Container();
  private deck: Sprite[] = [];
  interval: NodeJS.Timeout | undefined;


  constructor(game: Application) {
    super();

    this.game = game;
    this.game.stage.addChild(this.stageContent);

    dispatcher.once("onHome", this.clearStage.bind(this));

    this.createDeck();
  }

  // Create deck of cards from spritesheet and start moving cards one by one
  createDeck(): void {
    const sheet: LoaderResource = Loader.shared.resources.cards;
    let index: number = 0;
    for (let i: number = 0; i < 144; i++) {
      if (index > 53) index = 0;
      let sprite = new Sprite(sheet.textures!["card_spritesheet-" + index + ".png"]);
      sprite.position.set(100, 100);
      this.deck.push(sprite);
      this.stageContent.addChild(sprite);
      index++;
    }

    // When all cards are moved remove the interval
    this.interval = setInterval(() => {
      this.startMoving();
      if (this.deck.length == 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  // Use gsap tween to move the cards
  startMoving(): void {
    if (this.deck.length > 0) {
      const sprite = this.deck.pop();
      gsap.to(sprite!, {x: 500, duration: 2, ease: 'linear'});
      this.stageContent.addChild(sprite!);
    }
  }

  clearStage(): void {
    if (this.interval) clearInterval(this.interval);
    this.stageContent.removeChildren();
  }
}

export default Cards;