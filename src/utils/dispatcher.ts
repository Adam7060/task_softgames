/*
This is a an event dispatcher for the app which for now is going to be used only on the home button
*/

import * as PIXI from 'pixi.js';

const dispatcher = new PIXI.utils.EventEmitter();

export default dispatcher;