// scenes.js is responsible for loading objects into the scene

var clearScene = function () {
  for (i = 0; i < objects.length; i++) {
    // remove babyon object
    scene.getMeshByName(objects[i]).dispose();
    // remove name from list
  }
  objects = [];
};

var loadSphereDemoScene = function () {
  // Built-in 'sphere' shape. Params: name, subdivs, size, scene
  var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
  objects.push("sphere1");
  // Move the sphere upward 1/2 its height

  // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
  var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
  objects.push("ground1");
};

var loadGameScene = function () {

  walls = new Walls();
  ball = new Ball();
  racket = new Racket();

  var allow_movement = false;

  var update_mouse = function (e) {
    mouse.x_current = e.movementX ||
          e.mozMovementX          ||
          e.webkitMovementX       ||
          0;

    mouse.y_current = e.movementY ||
        e.mozMovementY      ||
        e.webkitMovementY   ||
        0;
        var x_dif = mouse.x_past - mouse.x_current;
        var y_dif = mouse.y_past - mouse.y_current;
        var vec = new BABYLON.Vector3 (mouse.x_current, -mouse.y_current, 0).normalize();
        var vic = new BABYLON.Vector3(vec.x  * racket_options.speed + racket.plane.position.x, vec.y  * racket_options.speed + racket.plane.position.y, -wall_options.length/2 + wall_options.thickness/3);
        mouse.x_dif = x_dif;
        mouse.y_dif = y_dif;
        racket.plane.setAbsolutePosition(vic);
    allow_movement = true;
  };

  try {
    document.removeEventListener("mousemove", update_mouse);
  } catch (e) {console.log(e);}
  document.addEventListener("mousemove", update_mouse);

  var move = function() {
    ball.on_game = true;
    ball.sphere.applyImpulse(new BABYLON.Vector3(random_number(ball_options.impulse.sec_axis.min, ball_options.impulse.sec_axis.max),
                                                 random_number(ball_options.impulse.sec_axis.min, ball_options.impulse.sec_axis.max),
                                                 random_number(ball_options.impulse.main_axis.min, ball_options.impulse.main_axis.max)),
                                                 ball.sphere.position);
  };

  setTimeout(move, 1000);

  var increment_score = function (player) {
    if (player === "player1") {
      score.player1 += 1;
    } else if (player === "player2") {
      score.player2 += 1;
    }
  };

  var clamp_number = function (num, min, max) {
    var res = num;
    if (res < min) {
      res = min;
    }
    if (res > max) {
      res = max;
    }
    return res;
  };

  var reset_ball = function (player) {
    objects.splice(objects.indexOf(ball.sphere.name), 1);
    ball.sphere.dispose();
    increment_score();
    ball = new Ball();
    setTimeout(move, 1000);
  };

  var update_racket = function () {
    var vec = new BABYLON.Vector3 (mouse.x_past - mouse.x_current, mouse.y_past - mouse.y_current, 0).normalize();
    racket.plane.position.x += vec.x * racket_options.speed;
    racket.plane.position += vec.y * racket_options.speed;
  };

  var made_contact = false;

  var update_ball_velocity = function () {
    if (!made_contact){
      ball_options.velocity.value.x = ball_options.velocity.last_x - ball.sphere.position.x;
      ball_options.velocity.value.y = ball_options.velocity.last_y - ball.sphere.position.y;
      ball_options.velocity.value.z = ball_options.velocity.last_z - ball.sphere.position.z;
      ball_options.velocity.last_x = ball.sphere.position.x;
      ball_options.velocity.last_y = ball.sphere.position.y;
      ball_options.velocity.last_z = ball.sphere.position.z;
    }
    setTimeout(update_ball_velocity, delta_time);
  };

  var update_racket_velocity = function () {
    racket_options.velocity.value.x = racket_options.velocity.last_x - racket.plane.position.x;
    racket_options.velocity.value.y = racket_options.velocity.last_y - racket.plane.position.y;
    racket_options.velocity.value.z = racket_options.velocity.last_z - racket.plane.position.z;
    racket_options.velocity.last_x = racket.plane.position.x;
    racket_options.velocity.last_y = racket.plane.position.y;
    racket_options.velocity.last_z = racket.plane.position.z;
    setTimeout(update_racket_velocity, delta_time);
  };

  setTimeout(update_ball_velocity, delta_time);
  setTimeout(update_racket_velocity, delta_time);

  scene.registerBeforeRender(function () {

    // intersections
    if (ball.sphere.intersectsMesh(walls.collider_front, false) && ball.on_game) {
      ball.on_game = false;
      setTimeout(function() {reset_ball("player2");}, 2000);
    }
    if (ball.sphere.intersectsMesh(walls.collider_back, true) && ball.on_game) {
      ball.on_game = false;
      setTimeout(function() {reset_ball("player1");}, 1000);
    }
    if (ball.sphere.intersectsMesh(racket.plane, true)) {
      var imp = new BABYLON.Vector3(-ball_options.velocity.value.x + (racket_options.velocity.value.x),
                                    -ball_options.velocity.value.y + (racket_options.velocity.value.y),
                                     ball_options.velocity.value.z + (racket_options.velocity.value.z));
      ball.sphere.applyImpulse(imp, ball.sphere.position);
      made_contact = true;
    } else {
      made_contact = false;
    }
    if (allow_movement) {
      console.log("foi");
      var x_dif = mouse.x_past - mouse.x_current;
      var y_dif = mouse.y_past - mouse.y_current;
      var vec = new BABYLON.Vector3 (mouse.x_current, -mouse.y_current, 0).normalize();
      var vic = new BABYLON.Vector3(clamp_number(vec.x  * racket_options.speed + racket.plane.position.x, -wall_options.width/2 + racket_options.width/2, wall_options.width/2 - racket_options.width/2),
                                    clamp_number(vec.y  * racket_options.speed + racket.plane.position.y, -wall_options.heigth/2 + racket_options.heigth/2, wall_options.heigth/2 - racket_options.heigth/2),
                                    -wall_options.length/2 + wall_options.thickness/3);
      mouse.x_dif = x_dif;
      mouse.y_dif = y_dif;
      racket.plane.setAbsolutePosition(vic);//.z = -wall_options.length/2 + wall_options.thickness/3;
      var s = racket.plane.position;
      //console.log(vec);
      allow_movement = false;
    }
  });

};

var loadSceneMainMenu = function () {

};
