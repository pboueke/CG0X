function Ball () {
  var obj_name = ball_options.name + "_" + ball_options.type + "_" + id.Get();
  var magnus_factor = (ball_options.type === "curveball") ? ball_options.magnus_constant : 0.0;
  var gravity_factor = ball_options.mass;
  this.on_game = false;
  this.sphere = BABYLON.Mesh.CreateSphere(obj_name , ball_options.segments, ball_options.diameter, scene);
  objects.push(obj_name);
  this.sphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: gravity_factor, friction: ball_options.friction, restitution: ball_options.restitution});
  this.sphere.position = new BABYLON.Vector3(wall_options.position.x, wall_options.position.y, wall_options.position.z);
  if (ball_options.type === "gravitational") {
    scene.setGravity(new BABYLON.Vector3(0, physics_options.gravity, 0));
  } else {
    scene.setGravity(new BABYLON.Vector3(0, 0, 0));
  }
  this.sphere.rotation = new BABYLON.Vector3.Zero();
  this.sphere.rotationQuaternion = new BABYLON.Quaternion(1);
  this.light = new BABYLON.PointLight("ball_ligth", new BABYLON.Vector3(0, 0, 0), scene);
  this.light.diffuse = new BABYLON.Color3(1, 0, 0);
  this.light.specular = new BABYLON.Color3(1, 1, 1);
  this.light.intensity = 0.1;
  this.light.parent = this.sphere;
}

function Racket (player) {
  var faceColors = new Array(6);
  var colors = (player === 1) ? racket_options.colors : racket_options.enemy_colors;
  for (i = 0; i < faceColors.length; i++) {
    faceColors[i] = new BABYLON.Color4(colors.plane.r, colors.plane.g, colors.plane.b, colors.plane.a);
  }
  var options = {
    width: 1,
    heigth: 1,
    depth: 1,
    faceColors: faceColors,
  };
  var obj_name = racket_options.name + "_" + racket_options.type + "_" + id.Get();
  var ball_material = new BABYLON.StandardMaterial("collider_material", scene);
  ball_material.diffuseColor = new BABYLON.Color3(racket_options.colors.plane.r, racket_options.colors.plane.g, racket_options.colors.plane.b);
  ball_material.specularColor = new BABYLON.Color3(racket_options.colors.plane.r, racket_options.colors.plane.g, racket_options.colors.plane.b);
  ball_material.alpha = racket_options.colors.plane.a;
  this.plane = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  this.plane.material = ball_material;
  objects.push(obj_name);
  this.plane.position = new BABYLON.Vector3(wall_options.position.x, wall_options.position.y, wall_options.position.z);
  this.plane.scaling = new BABYLON.Vector3(racket_options.width, racket_options.heigth, racket_options.thickness);
  this.plane.position.z = (player === 1 ) ? -wall_options.length/2 + wall_options.thickness/3 : wall_options.length/2 - wall_options.thickness/3;
  this.plane.position.z = (player === 3 ) ? wall_options.length : this.plane.position.z;
  //top frame
  faceColors = new Array(6);
  for (i = 0; i < faceColors.length; i++) {
    faceColors[i] = new BABYLON.Color4(colors.frame.r, colors.frame.g, colors.frame.b, colors.frame.a);
  }
  options = {
    width: 1,
    heigth: 1,
    depth: 1,
    faceColors: faceColors,
  };
  obj_name = wall_options.name + "_frame_" + id.Get();
  var top_frame = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  top_frame.scaling = new BABYLON.Vector3(racket_options.width/3.5 , racket_options.frame_thickness/2, 0.1);
  top_frame.parent = this.plane;
  top_frame.position.y += racket_options.heigth/4;
  top_frame.position.z += (player === 1 ) ? -1 : 1;
  //middle horizontal frame
  obj_name = wall_options.name + "_frame_" + id.Get();
  var middle_hor_frame = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  middle_hor_frame.scaling = new BABYLON.Vector3(racket_options.width/3.5 , racket_options.frame_thickness/2, 0.1);
  middle_hor_frame.parent = this.plane;
  middle_hor_frame.position.z += (player === 1 ) ? -1 : 1;
  // bottom frame
  obj_name = wall_options.name + "_frame_" + id.Get();
  var bottom_frame = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  bottom_frame.scaling = new BABYLON.Vector3(racket_options.width/3.5 , racket_options.frame_thickness/2, 0.1);
  bottom_frame.parent = this.plane;
  bottom_frame.position.y -= racket_options.heigth/4;
  bottom_frame.position.z += (player === 1 ) ? -1 : 1;
  //left frame
  obj_name = wall_options.name + "_frame_" + id.Get();
  var left_frame = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  left_frame.scaling = new BABYLON.Vector3(racket_options.frame_thickness/3 , racket_options.heigth/2, 0.1);
  left_frame.parent = this.plane;
  left_frame.position.x -= racket_options.width/7.1;
  left_frame.position.z += (player === 1 ) ? -1 : 1;
  // middle ver frame
  obj_name = wall_options.name + "_frame_" + id.Get();
  var midle_ver_frame = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  midle_ver_frame.scaling = new BABYLON.Vector3(racket_options.frame_thickness/3 , racket_options.heigth/2, 0.1);
  midle_ver_frame.parent = this.plane;
  midle_ver_frame.position.z += (player === 1 ) ? -1 : 1;
  // right_frame
  obj_name = wall_options.name + "_frame_" + id.Get();
  var right_frame = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  right_frame.scaling = new BABYLON.Vector3(racket_options.frame_thickness/3 , racket_options.heigth/2, 0.1);
  right_frame.parent = this.plane;
  right_frame.position.x += racket_options.width/7.1;
  right_frame.position.z += (player === 1 ) ? -1 : 1;
}

function Walls () {
  //top
  var faceColors = new Array(6);
  for (i = 0; i < faceColors.length; i++) {
    faceColors[i] = BABYLON.Color4.FromInts(wall_options.colors.top.r, wall_options.colors.top.g, wall_options.colors.top.b, wall_options.colors.top.a);
  }
  var options = {
    width: 1,
    heigth: 1,
    depth: 1,
    faceColors: faceColors,
  };
  var obj_name = wall_options.name + "_top_" + id.Get();
  var top_wall = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  objects.push(obj_name);
  top_wall.position = new BABYLON.Vector3(wall_options.position.x, wall_options.position.y, wall_options.position.z);
  //box.scaling = new BABYLON.Vector3(width, height, depth)
  top_wall.scaling = new BABYLON.Vector3(wall_options.width + wall_options.thickness, wall_options.thickness, wall_options.length);
  top_wall.position.y += wall_options.heigth/2;
  top_wall.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: wall_options.mass, restitution: wall_options.restitution, friction: wall_options.friction});
  //bottom
  faceColors = new Array(6);
  for (i = 0; i < faceColors.length; i++) {
    faceColors[i] = BABYLON.Color4.FromInts(wall_options.colors.bottom.r, wall_options.colors.bottom.g, wall_options.colors.bottom.b, wall_options.colors.bottom.a);
  }
  options = {
    width: 1,
    heigth: 1,
    depth: 1,
    faceColors: faceColors,
  };
  obj_name = wall_options.name + "_bottom_" + id.Get();
  var bottom_wall = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  objects.push(obj_name);
  bottom_wall.position = new BABYLON.Vector3(wall_options.position.x, wall_options.position.y, wall_options.position.z);
  bottom_wall.scaling = new BABYLON.Vector3(wall_options.width + wall_options.thickness, wall_options.thickness, wall_options.length);
  bottom_wall.position.y -= wall_options.heigth/2;
  bottom_wall.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: wall_options.mass, restitution: wall_options.restitution, friction: wall_options.friction});
  //left
  faceColors = new Array(6);
  for (i = 0; i < faceColors.length; i++) {
    faceColors[i] = BABYLON.Color4.FromInts(wall_options.colors.left.r, wall_options.colors.left.g, wall_options.colors.left.b, wall_options.colors.left.a);
  }
  options = {
    width: 1,
    heigth: 1,
    depth: 1,
    faceColors: faceColors,
  };
  obj_name = wall_options.name + "_left_" + id.Get();
  var left_wall = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  objects.push(obj_name);
  left_wall.position = new BABYLON.Vector3(wall_options.position.x, wall_options.position.y, wall_options.position.z);
  left_wall.scaling = new BABYLON.Vector3(wall_options.thickness, wall_options.heigth + wall_options.thickness, wall_options.length - 0.001);
  left_wall.position.x -= wall_options.width/2;
  left_wall.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: wall_options.mass, restitution: wall_options.restitution, friction: wall_options.friction});
  //right
  faceColors = new Array(6);
  for (i = 0; i < faceColors.length; i++) {
    faceColors[i] = BABYLON.Color4.FromInts(wall_options.colors.rigth.r, wall_options.colors.rigth.g, wall_options.colors.rigth.b, wall_options.colors.rigth.a);
  }
  options = {
    width: 1,
    heigth: 1,
    depth: 1,
    faceColors: faceColors,
  };
  obj_name = wall_options.name + "_rigth_" + id.Get();
  var rigth_wall = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  objects.push(obj_name);
  rigth_wall.position = new BABYLON.Vector3(wall_options.position.x, wall_options.position.y, wall_options.position.z);
  rigth_wall.scaling = new BABYLON.Vector3(wall_options.thickness, wall_options.heigth + wall_options.thickness, wall_options.length - 0.001);
  rigth_wall.position.x += wall_options.width/2;
  rigth_wall.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: wall_options.mass, restitution: wall_options.restitution, friction: wall_options.friction});
  //squash
  if (wall_options.type === "squash") {
    faceColors = new Array(6);
    for (i = 0; i < faceColors.length; i++) {
      faceColors[i] = BABYLON.Color4.FromInts(wall_options.colors.squash.r, wall_options.colors.squash.g, wall_options.colors.squash.b, wall_options.colors.squash.a);
    }
    options = {
      width: 1,
      heigth: 1,
      depth: 1,
      faceColors: faceColors,
    };
    obj_name = wall_options.name + "_squash_" + id.Get();
    var squash_wall = BABYLON.Mesh.CreateBox(obj_name, options, scene);
    objects.push(obj_name);
    squash_wall.position = new BABYLON.Vector3(wall_options.position.x, wall_options.position.y, wall_options.position.z);
    squash_wall.scaling = new BABYLON.Vector3(wall_options.width, wall_options.heigth, wall_options.thickness);
    squash_wall.position.z += wall_options.length/2;
    squash_wall.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: wall_options.mass, restitution: wall_options.restitution, friction: wall_options.friction});
  }
  // collider_front
  obj_name = wall_options.name + "_colliderF_" + id.Get();
  var collider_material = new BABYLON.StandardMaterial("collider_material", scene);
  collider_material.diffuseColor = new BABYLON.Color3(0, 0, 1);
  collider_material.specularColor = new BABYLON.Color3(0, 0, 1);
  collider_material.alpha = 0.0;
  this.collider_front = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  this.collider_front.material = collider_material;
  objects.push(obj_name);
  this.collider_front.position = new BABYLON.Vector3(wall_options.position.x, wall_options.position.y, wall_options.position.z);
  this.collider_front.scaling = new BABYLON.Vector3(20*wall_options.width, 20*wall_options.heigth, 0.01);
  this.collider_front.position.z -= (wall_options.length/2 + 2 * ball_options.diameter) ;
  //this.collider_front.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 100, restitution: 0, friction: 1});
  // collider_back
  obj_name = wall_options.name + "_colliderB_" + id.Get();
  this.collider_back = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  this.collider_back.material = collider_material;
  objects.push(obj_name);
  this.collider_back.position = new BABYLON.Vector3(wall_options.position.x, wall_options.position.y, wall_options.position.z);
  this.collider_back.scaling = new BABYLON.Vector3(20*wall_options.width, 20*wall_options.heigth, 0.01);
  this.collider_back.position.z += (wall_options.length/2 + 2 * ball_options.diameter) ;
  //this.collider_back.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: wall_options.mass, restitution: wall_options.restitution, friction: wall_options.friction});
}
