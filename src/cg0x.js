//global
var container, camera, controls, scene, renderer, light;

//auxiliar and status
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
INTERSECTED, SELECTED, ROTATING;
var ROTATION = false;
var rotationmsg;

init();
render();


function start() {
    //initializes most variables
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    //THREE js initialparameters
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    //scene
    scene = new THREE.Scene();
    scene.add( new THREE.AmbientLight( 0x505050 ) );

    //lighting
    light = new THREE.SpotLight( 0xffffff, 1.0 );
    light.position.set( 0, 500, 2000 );
    light.castShadow = true;
    light.shadowCameraNear = 200;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 50;
    light.shadowBias = -0.00022;
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;
    scene.add( light );

    // reference plane 
    plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 10000, 10000, 8, 8 ),
        new THREE.MeshBasicMaterial( { visible: false } )
        );
    scene.add( plane );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0x232226 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.sortObjects = false;
    container.appendChild( renderer.domElement );

    // add event listeners
    renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
    renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
    renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
    window.addEventListener( 'keydown', onDocumentKeyPressed, false );
    window.addEventListener( 'resize', onWindowResize, false );
}