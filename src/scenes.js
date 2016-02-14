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
    ball.sphere.applyImpulse(new BABYLON.Vector3(random_number(5, 10), random_number(5, 10), random_number(10,20)), ball.sphere.position);
  };

  setTimeout(move, 1000);

  // intersections
  scene.registerBeforeRender(function () {

  var reset_ball = function (player) {
    
  };

  if (ball.sphere.intersectsMesh(walls.collider_front, false)) {
      balloon1.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
  }
  if (ball.sphere.intersectsMesh(walls.collider_back, true)) {
      balloon2.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
  }


  });

};

var loadSceneMainMenu = function () {

};
