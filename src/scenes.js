// scenes.js is responsible for loading objects into the scene

var clearScene = function () {
  for (i = 0; i < objects.length; i++) {
    // remove babyon object
    scene.getMeshByName(objects[i]).dispose();
    // remove name from list
  }
  ball_options.status = "off";
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

  var walls = new Walls();
  var ball = new Ball();
  var racket = new Racket(1);
  var enemy = null;

  ball_options.status = "onGame";

  if (ui_scene.current === "versus_ai" || ui_scene.current === "versus_self"){
    enemy = new Racket(2);
  } else {
    enemy = new Racket(3);
  }

  var allow_movement = false;
  var allow_ai_movement = true;

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
  window.addEventListener("keydown", function (e) {
    var evt = e || window.event;
      if (evt.keyCode === 82) {
        ball.on_game = false;
        ball_options.status = "toBeReseted";
        reset_ball("");
      }
  });

  var move = function() {
    ball.on_game = true;
    ball.sphere.applyImpulse(new BABYLON.Vector3(random_number(ball_options.impulse.sec_axis.min, ball_options.impulse.sec_axis.max),
                                                 random_number(ball_options.impulse.sec_axis.min, ball_options.impulse.sec_axis.max),
                                                 random_number(ball_options.impulse.main_axis.min, ball_options.impulse.main_axis.max)),
                                                 ball.sphere.position);
  };

  //setTimeout(move, 10000);

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

  var axis_direction = function (a, b, axis) {
    //there must be a better, mathematical, way, but I'm in a hurry
    if (a >= 0) {
      if (b >= 0) {
        if (Math.abs(a) > Math.abs(b)) {
          return 1 * axis;
        } else {
          return -1 * axis;
        }
      } else {
        return 1 * axis;
      }
    } else {
      if (b >= 0) {
          return -1 * axis;
      } else {
        if (Math.abs(a) > Math.abs(b)) {
          return -1 * axis;
        } else {
        return 1 * axis;
        }
      }
    }
    return 0;
  };

  var hit_timer = Math.floor(Date.now() / 1000);

  var reset_ball = function (player) {
    if (ball_options.status === "toBeReseted") {
      allow_ai_movement = true;
      hit_timer = Math.floor(Date.now() / 1000);
      objects.splice(objects.indexOf(ball.sphere.name), 1);
      ball.light.dispose();
      ball.sphere.dispose();
      ball = new Ball();
      if (player === "player1" && score.limit !== -1) {
        score.player2 -= 1;
      } else if (player === "player2" && score.limit !== -1) {
        score.player1 -= 1;
      } else if (player === "player1" && score.limit === -1) {
        score.player1 += 1;
      } else if (player === "player2" && score.limit === -1) {
        score.player2 += 1;
      }
      if (score.player1 < 0 && score.limit !== -1) {
        engine.stopRenderLoop();
        swal( {
          title:"You Lost",
          text:"<h3><span style='color:black;'>Your score: " + score.points.toString() + "</span></h3><br><br><br>" +
          "<div onclick=\"location.reload()\" class='fkbtn fkbtn-strong-blue'><h1>Main Menu <span class=\"glyphicon glyphicon-menu-hamburger\" aria-hidden=\"true\"></span></h1></div> <br>",
          type:"error",
          width: 500,
          showConfirmButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          closeOnCancel: false,
          closeOnConfirm: true,
          html: true
        });
      } else if (score.player2 < 0 && score.limit != -1) {
        engine.stopRenderLoop();
        swal( {
          title:"Winner!",
          text:"<h3><span style='color:black;'>Your score: " + score.points.toString() + "</span></h3><br><br><br>" +
          "<div onclick=\"location.reload()\" class='fkbtn fkbtn-strong-blue'><h1>Main Menu <span class=\"glyphicon glyphicon-menu-hamburger\" aria-hidden=\"true\"></span></h1></div> <br>",
          type:"success",
          width: 500,
          showConfirmButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          closeOnCancel: false,
          closeOnConfirm: true,
          html: true
        });
      }
      setTimeout(move, 1000);
      ball_options.status = "onGame";
    }
  };

  var update_racket = function () {
    var vec = new BABYLON.Vector3 (mouse.x_past - mouse.x_current, mouse.y_past - mouse.y_current, 0).normalize();
    racket.plane.position.x += vec.x * racket_options.speed;
    racket.plane.position += vec.y * racket_options.speed;
  };

  var update_ball_agunlar_velocity = function () {
    var quarConjugate = new BABYLON.Quaternion(-ball.sphere.rotationQuaternion.x, -ball.sphere.rotationQuaternion.y, -ball.sphere.rotationQuaternion.z, ball.sphere.rotationQuaternion.w);
    var quarDiff = ball.sphere.rotationQuaternion.subtract(ball_options.last_quaternion);
    quarDiff = new BABYLON.Quaternion (quarDiff.x * 2, quarDiff.y * 2, quarDiff.z * 2, quarDiff.w * 2);
    var res = quarDiff.multiply(quarConjugate);
    ball_options.angular_velocity.x = res.y;
    ball_options.angular_velocity.y = res.z;
    ball_options.angular_velocity.z = res.w;
    ball_options.last_quaternion = ball.sphere.rotationQuaternion;

    setTimeout(update_ball_agunlar_velocity, delta_time);
  };

  var contact = {
    made: false,
    frame_counter: 0,
    frame_limit: 20,
  };

  var update_ball_velocity = function () {
    ball_options.velocity.value.x = ball_options.velocity.last_x - ball.sphere.position.x;
    ball_options.velocity.value.y = ball_options.velocity.last_y - ball.sphere.position.y;
    ball_options.velocity.value.z = ball_options.velocity.last_z - ball.sphere.position.z;
    ball_options.velocity.last_x = ball.sphere.position.x;
    ball_options.velocity.last_y = ball.sphere.position.y;
    ball_options.velocity.last_z = ball.sphere.position.z;
  };

  var update_racket_velocity = function () {
    //palyer
    racket_options.velocity.value.x = racket_options.velocity.last_x - racket.plane.position.x;
    racket_options.velocity.value.y = racket_options.velocity.last_y - racket.plane.position.y;
    racket_options.velocity.value.z = racket_options.velocity.last_z - racket.plane.position.z;
    racket_options.velocity.last_x = racket.plane.position.x;
    racket_options.velocity.last_y = racket.plane.position.y;
    racket_options.velocity.last_z = racket.plane.position.z;
    //enemy
    if (ui_scene.current === "versus_ai" || ui_scene.current === "versus_self"){
      racket_options.enemy_velocity.value.x = racket_options.enemy_velocity.last_x - enemy.plane.position.x;
      racket_options.enemy_velocity.value.y = racket_options.enemy_velocity.last_y - enemy.plane.position.y;
      racket_options.enemy_velocity.value.z = racket_options.enemy_velocity.last_z - enemy.plane.position.z;
      racket_options.enemy_velocity.last_x = enemy.plane.position.x;
      racket_options.enemy_velocity.last_y = enemy.plane.position.y;
      racket_options.enemy_velocity.last_z = enemy.plane.position.z;
    }
    setTimeout(update_racket_velocity, delta_time);
  };

  setTimeout(update_racket_velocity, delta_time);

  if (ball_options.type === "curveball") {
    update_ball_agunlar_velocity();
  }

  scene.registerBeforeRender(function () {
  if (!contact.made) {
    update_ball_velocity();
  }
    var gravity_defactor = (ball_options.type === "gravitational") ? 1 : 1;
    // ball and delimiter intersections
    if (ball.sphere.intersectsMesh(walls.collider_front, false) && ball.on_game) {
      hit_timer = Math.floor(Date.now() / 1000);
      ball_options.status = "toBeReseted";
      ball.on_game = false;
      allow_ai_movement = false;
      setTimeout(function() {reset_ball("player2");}, 2000);
    }
    if (ball.sphere.intersectsMesh(walls.collider_back, true) && ball.on_game) {
      hit_timer = Math.floor(Date.now() / 1000);
      ball.on_game = false;
      ball_options.status = "toBeReseted";
      allow_ai_movement = false;
      setTimeout(function() {reset_ball("player1");}, 1000);
    }
    //ball intersection with player's racket
    if (ball.sphere.intersectsMesh(racket.plane, true)) {
      hit_timer = Math.floor(Date.now() / 1000);
      if (!contact.made) {

        var imp = new BABYLON.Vector3(gravity_defactor * clamp_number(-2.5*(clamp_number(ball_options.velocity.value.x, -1, 1) * contact_multiplier.lateral_ball + (racket_options.velocity.value.x * contact_multiplier.lateral_racket)), -contact_multiplier.max_lateral_impulse, contact_multiplier.max_lateral_impulse),
                                      gravity_defactor * clamp_number(-2.5*(clamp_number(ball_options.velocity.value.y, -1, 1) * contact_multiplier.lateral_ball + (racket_options.velocity.value.y * contact_multiplier.lateral_racket)), -contact_multiplier.max_lateral_impulse, contact_multiplier.max_lateral_impulse),
                                      gravity_defactor * clamp_number(2*(Math.abs(clamp_number(ball_options.velocity.value.z, -1, 1)) * contact_multiplier.frontal_ball + (Math.sqrt(Math.pow(clamp_number(racket_options.velocity.value.x, -1, 1), 2)+Math.pow(clamp_number(racket_options.velocity.value.y,-1,1), 2))) * contact_multiplier.frontal_racket), contact_multiplier.min_frontal_impulse, contact_multiplier.max_frontal_impulse));
        ball.sphere.applyImpulse(imp, ball.sphere.position);
        ball.sphere.rotationQuaternion = new BABYLON.Quaternion (racket_options.velocity.value.y, racket_options.velocity.value.x, 0, (Math.sqrt(Math.pow(racket_options.velocity.value.x, 2)+Math.pow(racket_options.velocity.value.y, 2))));
        score.points += Math.ceil(Math.sqrt(Math.pow(ball_options.velocity.value.x,2) + Math.pow(ball_options.velocity.value.y,2) + Math.pow(ball_options.velocity.value.z,2)) * 100);
      }
      contact.made = true;
    } else {
      contact.frame_counter += 1;
      if (contact.frame_counter === contact.frame_limit) {
        contact.frame_counter = 0;
        contact.made = false;
      }
    }
    // ball intersection with enemy's racket
    if (ui_scene.current === "versus_ai" || ui_scene.current === "versus_self") {
      if (ball.sphere.intersectsMesh(enemy.plane, true)) {
        hit_timer = Math.floor(Date.now() / 1000);
        if (!contact.made) {
          var imp2 = new BABYLON.Vector3(gravity_defactor * clamp_number(-2.5*clamp_number(ball_options.velocity.value.x, -1, 1) * contact_multiplier.lateral_ball + (racket_options.enemy_velocity.value.x * contact_multiplier.lateral_racket), contact_multiplier.min_lateral_impulse, contact_multiplier.max_lateral_impulse),
                                         gravity_defactor * clamp_number(-2.5*clamp_number(ball_options.velocity.value.y, -1, 1) * contact_multiplier.lateral_ball + (racket_options.enemy_velocity.value.y * contact_multiplier.lateral_racket), contact_multiplier.min_lateral_impulse, contact_multiplier.max_lateral_impulse),
                                         -1 * gravity_defactor * clamp_number(2*Math.abs(ball_options.velocity.value.z, -1, 1) * contact_multiplier.frontal_ball + (Math.sqrt(Math.pow(clamp_number(racket_options.enemy_velocity.value.x, -1, 1), 2)+Math.pow(clamp_number(racket_options.enemy_velocity.value.y,-1,1), 2))) * contact_multiplier.frontal_racket, contact_multiplier.min_frontal_impulse, contact_multiplier.max_frontal_impulse));
          ball.sphere.applyImpulse(imp2, ball.sphere.position);
          //ball.sphere.rotationQuaternion.add(new BABYLON.Quaternion (racket_options.enemy_velocity.value.y, racket_options.enemy_velocity.value.x, 0, (Math.sqrt(Math.pow(racket_options.enemy_velocity.value.x, 2)+Math.pow(racket_options.enemy_velocity.value.y, 2)))));
        }
        contact.made = true;
      } else {
        contact.frame_counter += 1;
        if (contact.frame_counter === contact.frame_limit) {
          contact.frame_counter = 0;
          contact.made = false;
        }
      }
    }
    if (allow_movement) {
      //player's racket movement
      var x_dif = mouse.x_past - mouse.x_current;
      var y_dif = mouse.y_past - mouse.y_current;
      var vec = new BABYLON.Vector3 (mouse.x_current, -mouse.y_current, 0).normalize();
      var vic = new BABYLON.Vector3(clamp_number(vec.x  * racket_options.speed + racket.plane.position.x, -wall_options.width/2 + racket_options.width/2, wall_options.width/2 - racket_options.width/2),
                                    clamp_number(vec.y  * racket_options.speed + racket.plane.position.y, -wall_options.heigth/2 + racket_options.heigth/2, wall_options.heigth/2 - racket_options.heigth/2),
                                    -wall_options.length/2 + wall_options.thickness/3);
      mouse.x_dif = x_dif;
      mouse.y_dif = y_dif;
      racket.plane.setAbsolutePosition(vic);//.z = -wall_options.length/2 + wall_options.thickness/3;
      // versus racket movement
      if (ui_scene.current === "versus_self") {
        vic = new BABYLON.Vector3(clamp_number(vec.x  * racket_options.speed + racket.plane.position.x, -wall_options.width/2 + racket_options.width/2, wall_options.width/2 - racket_options.width/2),
                                  clamp_number(vec.y  * racket_options.speed + racket.plane.position.y, -wall_options.heigth/2 + racket_options.heigth/2, wall_options.heigth/2 - racket_options.heigth/2),
                                  wall_options.length/2 - wall_options.thickness/3);
        enemy.plane.setAbsolutePosition(vic);
      }
      allow_movement = false;
    }
    // ai racket's movement
    if (allow_ai_movement) {
      if (ui_scene.current === "versus_ai") {
        if (BABYLON.Vector2.Distance(new BABYLON.Vector2 (ball.sphere.position.x, ball.sphere.position.y, 0), new BABYLON.Vector2 (enemy.plane.position.x, enemy.plane.position.y, 0)) > racket_options.width/5) {
          var x_dir = axis_direction(ball.sphere.position.x, enemy.plane.position.x, 1);
          var y_dir = axis_direction(ball.sphere.position.y, enemy.plane.position.y, 1);
          var vaic = new BABYLON.Vector3(clamp_number(x_dir * difficulty * racket_options.speed + enemy.plane.position.x, -wall_options.width/2 + racket_options.width/2, wall_options.width/2 - racket_options.width/2),
                                        clamp_number(y_dir * difficulty  * racket_options.speed + enemy.plane.position.y, -wall_options.heigth/2 + racket_options.heigth/2, wall_options.heigth/2 - racket_options.heigth/2),
                                        wall_options.length/2 - wall_options.thickness/3);
          enemy.plane.setAbsolutePosition(vaic);
        }
      }
    }
    // magnus effect
    if (ball_options.type == "curveball") {
      var magnus_coefficient = ball_options.magnus_constant;
      var linear_velocity = new BABYLON.Vector3 (ball_options.velocity.value.x, ball_options.velocity.value.y, ball_options.velocity.value.z);
      var angular_velocity = new BABYLON.Vector3 (ball_options.angular_velocity.x, ball_options.angular_velocity.y, ball_options.angular_velocity.z);
      var force = linear_velocity.multiply(angular_velocity);
      force = new BABYLON.Vector3 (magnus_coefficient * force.x, magnus_coefficient * force.y, magnus_coefficient * force.z);
      ball.sphere.applyImpulse(force, ball.sphere.position);
    }
    // resets ball if it is lost or stops
    if (Math.floor(Date.now() / 1000) - hit_timer > 15) {
      hit_timer = Math.floor(Date.now() / 1000);
      ball.on_game = false;
      allow_ai_movement = false;
      ball_options.status = "toBeReseted";
      reset_ball("");
    }
    //console.log(ball.sphere.rotationQuaternion);
  });
};

var loadSceneMainMenu = function () {

};
