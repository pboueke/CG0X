// check if browser is compatible
if (!BABYLON.Engine.isSupported()) {
  sweetAlert("Oops...", "WebGL is not supported in your browser... nothing is going to work :( <br> <code>[error_code:bb-000]</code>", "error");
} else {
  showAbout('main_menu', 'Main Menu');
}

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

// This creates a basic Babylon Scene object (non-mesh)
var scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
scene.enablePhysics(new BABYLON.Vector3(0, -20, 0), new BABYLON.OimoJSPlugin());

// This creates and positions a free camera (non-mesh)
var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0.5, -34), scene);

// This targets the camera to scene origin
camera.setTarget(BABYLON.Vector3.Zero());

// This attaches the camera to the canvas
//camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(14, 9, -44), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;

var loadedscene = loadSphereDemoScene();

engine.runRenderLoop(function () {
  scene.render();
});
