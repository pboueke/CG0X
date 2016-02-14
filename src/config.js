// config.js stores all the configuration and global variables

// objects loaded in the babylon canvas
var objects = [];

var ui_scene = {
  current: "welcome_area",
  next: "main_menu"
};

var score = {
  player1: 0,
  player2: 0,
  points: 0,
};

var sound_options = {
  sfx_enabled: true,
  music_enabled: true
  };

var racket_options = {

};

var ball_options = {
  name: "ball",
  // ball type values: traditional, gravitational, curveball
  type: "traditional",
  // multiplicative factor of the magnus effect
  magnus_constant: 1.0,
  // Babylon sphere parameters
  segments: 16.0,
  diameter: 1.5,
  // Babylon physics parameters
  mass: 1.0,
  restitution: 0.9,
  friction: 0.01,
};

var wall_options = {
  name: "wall",
  // wall type values: squash, versus
  type: "squash",
  width: 14,
  heigth: 9,
  length: 45,
  thickness: 0.5,
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  colors: {
    top: {r:1, g:0, b:0, a:1},
    bottom: {r:1, g:0, b:0, a:1},
    rigth: {r:0, g:1, b:0, a:1},
    left: {r:0, g:1, b:0, a:1},
    squash: {r:0, g:0, b:1, a:1},
  },
  // Babylon physics parameters
  mass: 0.0,
  restitution: 0.9,
  friction: 0.0001,
};

// Simply increments an variable, which is used as an id
function IdHandler() {
  this.id = 0;
}
IdHandler.prototype.Get = function () {
  this.id += 1;
  return String(this.id);
};
id = new IdHandler();

var random_number = function (min, max) {
    return Math.random() * (max - min) + min;
};
