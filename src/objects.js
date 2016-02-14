function Racket () {
  var faceColors = new Array(6);
  for (i = 0; i < faceColors.length; i++) {
    faceColors[i] = new BABYLON.Color4(racket_options.colors.plane.r, racket_options.colors.plane.g, racket_options.colors.plane.b, racket_options.colors.plane.a);
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
  //box.scaling = new BABYLON.Vector3(width, height, depth)
  this.plane.scaling = new BABYLON.Vector3(racket_options.width, racket_options.heigth, racket_options.thickness);
  this.plane.position.z = -wall_options.length/2 + wall_options.thickness/3;
  //this.plane.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: racket_options.mass, restitution: racket_options.restitution, friction: racket_options.friction});
  //this.plane.applyGravity = false;
}

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
}

function Walls () {
  //top
  var faceColors = new Array(6);
  for (i = 0; i < faceColors.length; i++) {
    faceColors[i] = new BABYLON.Color4(wall_options.colors.top.r, wall_options.colors.top.g, wall_options.colors.top.b, wall_options.colors.top.a);
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
    faceColors[i] = new BABYLON.Color4(wall_options.colors.bottom.r, wall_options.colors.bottom.g, wall_options.colors.bottom.b, wall_options.colors.bottom.a);
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
    faceColors[i] = new BABYLON.Color4(wall_options.colors.left.r, wall_options.colors.left.g, wall_options.colors.left.b, wall_options.colors.left.a);
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
    faceColors[i] = new BABYLON.Color4(wall_options.colors.rigth.r, wall_options.colors.rigth.g, wall_options.colors.rigth.b, wall_options.colors.rigth.a);
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
      faceColors[i] = new BABYLON.Color4(wall_options.colors.squash.r, wall_options.colors.squash.g, wall_options.colors.squash.b, wall_options.colors.squash.a);
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
  this.collider_front.scaling = new BABYLON.Vector3(wall_options.width, wall_options.heigth, 0.01);
  this.collider_front.position.z -= (wall_options.length/2 + ball_options.diameter) ;
  //this.collider_front.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: 100, restitution: 0, friction: 1});
  // collider_back
  obj_name = wall_options.name + "_colliderB_" + id.Get();
  this.collider_back = BABYLON.Mesh.CreateBox(obj_name, options, scene);
  this.collider_back.material = collider_material;
  objects.push(obj_name);
  this.collider_back.position = new BABYLON.Vector3(wall_options.position.x, wall_options.position.y, wall_options.position.z);
  this.collider_back.scaling = new BABYLON.Vector3(wall_options.width, wall_options.heigth, 0.01);
  this.collider_back.position.z += (wall_options.length/2 + ball_options.diameter) ;
  //this.collider_back.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {mass: wall_options.mass, restitution: wall_options.restitution, friction: wall_options.friction});
}
