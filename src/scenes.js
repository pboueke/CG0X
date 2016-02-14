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

  var move = function() {
    ball.on_game = true;
    ball.sphere.applyImpulse(new BABYLON.Vector3(random_number(5, 10), random_number(5, 10), random_number(10,20)), ball.sphere.position);
  };

  setTimeout(move, 1000);

  var reset_ball = function (player) {
    objects.splice(objects.indexOf(ball.sphere.name), 1);
    ball.sphere.dispose();
    ball = new Ball();
    setTimeout(move, 1000);
  };

  // intersections
  scene.registerBeforeRender(function () {
    if (ball.sphere.intersectsMesh(walls.collider_front, false) && ball.on_game) {
      ball.on_game = false;
      setTimeout(function() {reset_ball("player2");}, 2000);
    }
    if (ball.sphere.intersectsMesh(walls.collider_back, true) && ball.on_game) {
      ball.on_game = false;
      setTimeout(function() {reset_ball("player1");}, 1000);
    }
  });

};

var loadSceneMainMenu = function () {

};
