// config.js stores all the configuration and global variables

// objects loaded in the babylon canvas
var objects = [];

var delta_time = 10;

var difficulty = 2;

var contact_multiplier = {
  lateral_ball: 5,
  frontal_ball: 40,
  lateral_racket: 20,
  frontal_racket: 60,
  max_frontal_impulse: 80,
  min_frontal_impulse: 40,
  max_lateral_impulse: 30,
  min_lateral_impulse: 5,
};

var mouse = {
  x_past: 0,
  y_past: 0,
  x_current: 0,
  y_current: 0,
  x_dif: 0,
  y_dif: 0,
};

var ui_scene = {
  current: "welcome_area",
  next: "main_menu",
  status: "paused", //paused, running or menu
};

var score = {
  limit: 7,
  player1: 7,
  player2: 7,
  points: 0,
};

var sound_options = {
  sfx_enabled: true,
  music_enabled: true
  };

var racket_options = {
  name: "racket",
  // wall type values: squash, versus
  type: "plane",
  width: 3.5,
  heigth: 2,
  thickness: 0.01,
  frame_thickness: 0.05,
  colors: {
    plane: {r:1, g:1, b:1, a:0.2},
    frame: {r:0, g:0, b:1, a:1},
  },
  enemy_colors: {
    plane: {r:1, g:0, b:0, a:0.2},
    frame: {r:1, g:0, b:0, a:1},
  },
  // Babylon physics parameters
  mass: 1000000.0,
  restitution: 1,
  friction: 1,
  speed: 0.05,
  velocity: {
    last_x: 0,
    last_y: 0,
    last_z: 0,
    value: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  enemy_velocity: {
    last_x: 0,
    last_y: 0,
    last_z: 0,
    value: {
      x: 0,
      y: 0,
      z: 0,
    },
  }
};

var ball_options = {
  status: "nok",
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
  impulse: {
    main_axis: {
      max: 40,
      min: 20,
    },
    sec_axis: {
      max: 15,
      min: 5,
    },
  },
  velocity: {
    last_x: 0,
    last_y: 0,
    last_z: 0,
    value: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  last_quaternion: new BABYLON.Quaternion (0,0,0,0),
  angular_velocity: {
    x: 0,
    y: 0,
    z: 0,
  }
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
    top: {r:255, g:197, b:57, a:1}, //255, 197, 57
    bottom: {r:255, g:88, b:57, a:1}, //255, 88, 57
    rigth: {r:255, g:159, b:57, a:1}, //255, 159, 57
    left: {r:255, g:159, b:57, a:1},
    squash: {r:255, g:164, b:4, a:1}, //255, 164, 4
  },
  // Babylon physics parameters
  mass: 0.0,
  restitution: 0.9,
  friction: 0.0001,
};

physics_options = {
  gravity: -20,
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

function random_number(min, max) {
    var res = Math.random() * (max - min) + min;
    var side = Math.floor(Math.random() * (max - min + 1)) + min;
    if (side%2 === 0) {
      res *= -1;
    }
    return res;
}
