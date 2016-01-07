// scenes.js is responsible for loading objects into the scene

var loadSphereDemoScene = function () {

      // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
      var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

      // Move the sphere upward 1/2 its height
      sphere.position.y = 1;

      // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
      var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
};

var loadSceneMainMenu = function () {

};
