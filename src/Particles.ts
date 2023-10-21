import {Application, Container, Loader} from 'pixi.js';
import * as particles from '@pixi/particle-emitter';
import dispatcher from './utils/dispatcher';

class Particles extends Container {
  private game: Application;
  private stageContent: Container = new Container();
  emitter: particles.Emitter | undefined;

  constructor(game: Application) {
    super();

    this.game = game;
    this.game.stage.addChild(this.stageContent);

    dispatcher.once("onHome", this.clearStage.bind(this))
    this.createEmitter();
  }

  createEmitter() {
    if (this.emitter) {
      this.emitter.emit = true;
    } else {
      // pass in 2 arguments, the host container and the configs. After that call the ticker.
      this.emitter = new particles.Emitter(
        this.stageContent,
        {
          "lifetime": {
            "min": 0.25,
            "max": 0.45
          },
          "frequency": 0.05,
          "emitterLifetime": 0,
          "maxParticles": 10,
          "addAtBack": false,
          "pos": {
            "x": 640,
            "y": 500
          },
          "behaviors": [
            {
              "type": "alpha",
              "config": {
                "alpha": {
                  "list": [
                    {
                      "time": 0,
                      "value": 0.5
                    },
                    {
                      "time": 1,
                      "value": 0
                    }
                  ]
                }
              }
            },
            {
              "type": "moveSpeedStatic",
              "config": {
                "min": 100,
                "max": 100
              }
            },
            {
              "type": "scale",
              "config": {
                "scale": {
                  "list": [
                    {
                      "time": 0,
                      "value": 0.25
                    },
                    {
                      "time": 1,
                      "value": 0.75
                    }
                  ]
                },
                "minMult": 1
              }
            },
            {
              "type": "color",
              "config": {
                "color": {
                  "list": [
                    {
                      "time": 0,
                      "value": "fff191"
                    },
                    {
                      "time": 1,
                      "value": "ff622c"
                    }
                  ]
                }
              }
            },
            {
              "type": "rotation",
              "config": {
                "accel": 0,
                "minSpeed": 20,
                "maxSpeed": 20,
                "minStart": 265,
                "maxStart": 280
              }
            },
            {
              "type": "textureSingle",
              "config": {
                "texture": Loader.shared.resources.fire.texture
              }
            },
          ]
        }
      );

      // date is used for time delta
      let elapsed = Date.now();
      this.game.ticker.add(() => {
        let now = Date.now();
        this.emitter!.update((now - elapsed) * 0.001);
        elapsed = now;
      });
    }
  }

  clearStage(): void {
    if (this.emitter) this.emitter.emit = false;
    this.stageContent.removeChildren();
  }
}

export default Particles;