import * as PIXI from 'pixi.js';

const app = new PIXI.Application<HTMLCanvasElement>({width: 1280, height: 720});
document.body.appendChild(app.view);

const message = new PIXI.Text('Hello, PixiJS!', {
  fontSize: 36,
  fill: 0xff0000,
});
message.anchor.set(0.5);
message.x = app.screen.width / 2;
message.y = app.screen.height / 2;

app.stage.addChild(message);

// The game loop
app.ticker.add(() => {
  message.rotation += 0.01;
});