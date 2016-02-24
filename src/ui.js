// ui.js is responsible for all of the interactions between the user and the application

/* jshint
 esversion: 6, ignore:line,
 esnext: true, ignore:line,
 expr: true
*/

// [main menu] About
var showAbout = function (back_to, msg) {
  var parent = "";
  if (back_to === "main_menu") {
    parent = "'showMainMenu()'";
  } else if (back_to === "ingame_menu") {
    parent = "'showInGameMenu()'";
  }
  swal({   title: "<span style='line-height:10px;'>PONGO<br><small>p o n g</small></span>",
           showConfirmButton: false,
           allowEscapeKey: false,
           allowOutsideClick: false,
           closeOnCancel: false,
           closeOnConfirm: false,
           html: true,
           text: "<a href='http://pboueke.github.io/b/'>by pboueke</a> " +
                 "<a href='https://github.com/pboueke'><img width='30px' src='images/githubprofile.png' /></a>" +
                 "<br><br>This is a project for the Computer Graphics course at UFRJ.<br><br>Found a <code>bug</code>?<br>Here's  my " +
                 "<a href='http://pboueke.github.io/b/about/'>info page</a>.<br><br>" +
                 "<a rel='license' href='http://creativecommons.org/licenses/by-nc/4.0/''>" +
                 "<img alt='Creative Commons License' style='border-width:0' src='https://i.creativecommons.org/l/by-nc/4.0/88x31.png' />" +
                 "</a><br><br><small>This work is licensed under a " +
                 "<a rel='license' href='http://creativecommons.org/licenses/by-nc/4.0/'>Creative Commons Attribution-NonCommercial 4.0 International License</a>.</small> <br><br>" +
                 "Source:<br><a href='https://github.com/pboueke/CG0X'><img width='100px' src='images/GitHub-Logo.png' /></a><br><br><small>version 1.0</small><br><br>" +
                 "<div onclick=" + parent + " class='fkbtn fkbtn-grey'><h1>" + msg + " <span class=\"glyphicon glyphicon-menu-hamburger\" aria-hidden=\"true\"></span></h1></div>"
        });
};

var setSoundOptions = function (id, returns) {
  // if returns is false: toggle sound configuration, if rturns is true: returns the html an class of the toggle buttons
  var inner_html = "";
  var css_class = "";
  if (id === "sfx") {
    if ((sound_options.sfx_enabled && !returns) || (!sound_options.sfx_enabled && returns)) {
      inner_html = "<del style='color: white'><h1>S<br><small style='color: white'>Sound</small></h1></del>";
      css_class = "fkbtn fkbtn-half fkbtn-half-left fkbtn-strong-red";
    } else {
      inner_html = "<h1>S<br><small style='color: white'>Sound</small></h1>";
      css_class = "fkbtn fkbtn-half fkbtn-half-left fkbtn-strong-blue";
    }
    if (!returns) {
      sound_options.sfx_enabled = sound_options.sfx_enabled ? false : true;
      document.getElementById('sfxBtn').innerHTML = inner_html;
      document.getElementById('sfxBtn').className = css_class;
    }
  } else if (id === "music") {
    if ((sound_options.music_enabled && !returns) || (!sound_options.music_enabled && returns)) {
      inner_html = "<del style='color: white'><h1>M<br><small style='color: white'>Music</small></h1></del>";
      css_class = "fkbtn fkbtn-half fkbtn-half-left fkbtn-strong-red";
    } else {
      inner_html = "<h1>M<br><small style='color: white'>Music</small></h1>";
      css_class = "fkbtn fkbtn-half fkbtn-half-left fkbtn-strong-blue";
    }
    if (!returns) {
      sound_options.music_enabled = sound_options.music_enabled ? false : true;
      document.getElementById('musicBtn').innerHTML = inner_html;
      document.getElementById('musicBtn').className = css_class;
    }
  }
  if (returns) {
    return [inner_html, css_class];
  }
};

var goToMainMenu = function () {
  clearScene();
  showMainMenu();
};

var toggle_scene_status = function () {
  if (ui_scene.status === "paused") {
    ui_scene.status = "running";
    engine.runRenderLoop(function () {
      scene.render();
    });
  } else if (ui_scene.status === "running") {
    engine.stopRenderLoop();
    ui_scene.status = "paused";
  }
};

var resumeGame = function () {
  swal.close();
  hit_timer = Math.floor(Date.now() / 1000);
  setTimeout(toggle_scene_status(), 1000);
};

var showInGameMenu = function () {
  swal({   title: "Game Paused",
           width: 500,
           showConfirmButton: false,
           allowEscapeKey: false,
           allowOutsideClick: false,
           closeOnCancel: false,
           closeOnConfirm: true,
           html: true,
           text: "<br><br>" +
                 "<div onclick=\"showControls('ingame_menu')\" class='fkbtn fkbtn-weak-green'><h1>Controls <span class=\"glyphicon glyphicon-education\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=\"showOptions('ingame_menu')\" class='fkbtn fkbtn-weak-orange'><h1>Options <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=\"location.reload()\" class='fkbtn fkbtn-strong-red'><h1>Main Menu <span class=\"glyphicon glyphicon-menu-hamburger\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=\"resumeGame()\" class='fkbtn fkbtn-weak-blue'><h1>Resume <span class=\"glyphicon glyphicon-play\" aria-hidden=\"true\"></span></h1></div> <br>"
        });
};

// [menu] Options
var showOptions = function (back_to) {
  if (back_to === "main_menu") {
    parent = "'showMainMenu()'";
  } else if (back_to === "ingame_menu") {
    parent = "'showInGameMenu()'";
  }
  var sfx_options = setSoundOptions("sfx", true);
  var music_options = setSoundOptions("music", true);
  swal({   title: "Options",
           showConfirmButton: false,
           allowEscapeKey: false,
           allowOutsideClick: false,
           closeOnCancel: false,
           closeOnConfirm: false,
           html: true,
           text: "<b>Audio (currently unavailable):</b><br><br>" +
                 "<div id='musicBtn' onclick=\"setSoundOptions('music', false)\" class='"+music_options[1]+"'>"+music_options[0]+"</div>" +
                 "<div id='sfxBtn' onclick=\"setSoundOptions('sfx', false)\" class='"+sfx_options[1]+"'>"+sfx_options[0]+"</div> <br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br>" +
                 "<div onclick=" + parent + " class='fkbtn fkbtn-grey'><h1>Go Back <span class=\"glyphicon glyphicon-menu-hamburger\" aria-hidden=\"true\"></span></h1></div> <br>"
         });
};

var startGame = function () {

  swal.close();

  ui_scene.current = ui_scene.next;

  // lock cursor
  canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock ||
                            canvas.webkitRequestPointerLock;
  canvas.requestPointerLock();

  clearScene();
  loadGameScene();
  engine.stopRenderLoop();
  setTimeout(toggle_scene_status, 1000);
};

var changeBallType = function (type) {
  var div_seleted_class = "fkbtn fkbtn-third fkbtn-strong-red";
  var non_seleted_class = "fkbtn fkbtn-third fkbtn-weak-blue";
  ball_options.type = (type === "curveball") ? "traditional" : type;
  document.getElementById('traditionalballBtn').className = ((ball_options.type === "traditional") ? div_seleted_class : non_seleted_class);
  document.getElementById('gravitationalballBtn').className = ((ball_options.type === "gravitational") ? div_seleted_class : non_seleted_class);
  document.getElementById('curveballBtn').className = ((ball_options.type === "curveball") ? div_seleted_class : non_seleted_class);
};

var changeDifficulty = function (lvl) {
  var div_seleted_class = "fkbtn-thin fkbtn-third fkbtn-strong-red";
  var non_seleted_class = "fkbtn-thin fkbtn-third fkbtn-weak-blue";
  difficulty = lvl;
  document.getElementById('easy').className = ((difficulty === 2) ? div_seleted_class : non_seleted_class);
  document.getElementById('medium').className = ((difficulty === 3) ? div_seleted_class : non_seleted_class);
  document.getElementById('hard').className = ((difficulty === 4) ? div_seleted_class : non_seleted_class);
  document.getElementById('harder').className = ((difficulty === 5) ? div_seleted_class : non_seleted_class);
};

var getGameDiffucultyLayout = function () {
  return "<br><b>Difficulty:</b><br><br><div class='row' id='difficultyBtns'>" +
        "<div class='col-md-3'><div id='easy' onclick=\"changeDifficulty(2)\" class=''><h4>Easy</h4></div></div>" +
        "<div class='col-md-3'><div id='medium' onclick=\"changeDifficulty(3)\" class=''><h4>Medium</h4></div></div>" +
        "<div class='col-md-3'><div id='hard' onclick=\"changeDifficulty(4)\" class=''><h4>Hard</h4></div></div>" +
        "<div class='col-md-3'><div id='harder' onclick=\"changeDifficulty(5)\" class=''><h4>Harder</h4></div></div> <br>" +
        "</div><br>";
};

var changeBallsNumber = function (nmb) {
  var div_seleted_class = "fkbtn-thin fkbtn-third fkbtn-strong-red";
  var non_seleted_class = "fkbtn-thin fkbtn-third fkbtn-weak-blue";
  score.limit = nmb;
  score.player1 = ((score.limit === -1) ? 0 : score.limit);
  score.player2 = ((score.limit === -1) ? 0 : score.limit);
  document.getElementById('7b').className = ((score.limit === 7) ? div_seleted_class : non_seleted_class);
  document.getElementById('15b').className = ((score.limit === 15) ? div_seleted_class : non_seleted_class);
  document.getElementById('21b').className = ((score.limit === 21) ? div_seleted_class : non_seleted_class);
  document.getElementById('30b').className = ((score.limit === 30) ? div_seleted_class : non_seleted_class);
  document.getElementById('infb').className = ((score.limit === -1) ? div_seleted_class : non_seleted_class);
};

var getBallsNumberLayout = function () {
  return "<b>Number of balls:</b><br><br><div class='row' id='difficultyBtns'>" +
        "<div class='col-md-2 col-md-offset-1'><div id='7b' onclick=\"changeBallsNumber(7)\" class=''><h4>7</h4></div></div>" +
        "<div class='col-md-2'><div id='15b' onclick=\"changeBallsNumber(15)\" class=''><h4>15</h4></div></div>" +
        "<div class='col-md-2'><div id='21b' onclick=\"changeBallsNumber(21)\" class=''><h4>21</h4></div></div>" +
        "<div class='col-md-2'><div id='30b' onclick=\"changeBallsNumber(30)\" class=''><h4>30</h4></div></div>" +
        "<div class='col-md-2'><div id='infb' onclick=\"changeBallsNumber(-1)\" class=''><h4>∞</h4></div></div> <br>" +
        "</div><br><br>";
};

// [game] Game Options
var showGameOptions = function (back_to, next_area) {
  var parent = (back_to === "versus_type") ? "showVersusTypeSelector()" : "showModeSelector()";
  var difficulty = "<br><br><br><br><br><br><br><br>";
  ui_scene.next = next_area;
  if (next_area.indexOf("squash") > -1) {
    wall_options.type = "squash";
  } else if (next_area.indexOf("versus") > -1) {
    wall_options.type = "versus";
    if (next_area.indexOf("ai") > -1) {
      difficulty = getGameDiffucultyLayout();
    }
  }
  swal({   title: "Game Options",
           showConfirmButton: false,
           allowEscapeKey: false,
           allowOutsideClick: false,
           closeOnCancel: false,
           closeOnConfirm: false,
           html: true,
           text: "<b>Ball Type:</b><br><br><div class='row'>" +
                 "<div class='col-md-4'><div id='traditionalballBtn' onclick=\"changeBallType('traditional')\" class=''><h4>Traditional<br>ball</h4></div></div>" +
                 "<div class='col-md-4'><div id='gravitationalballBtn' onclick=\"changeBallType('gravitational')\" class=''><h4>Gravitational<br>ball</h4></div></div>" +
                 "<div class='col-md-4'><div id='curveballBtn' onclick=\"changeBallType('curveball')\" class=''><h4>Curve ball<br>(not available)</h4></div></div> <br>" +
                 "</div>" +
                 difficulty +
                 getBallsNumberLayout() +
                 "<div onclick=\"startGame()\" class='fkbtn fkbtn-strong-green'><h1>Start <span class=\"glyphicon glyphicon-play\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=" + parent + " class='fkbtn fkbtn-grey'><h1>Go Back <span class=\"glyphicon glyphicon-menu-hamburger\" aria-hidden=\"true\"></span></h1></div> <br>"
         });
         changeBallType (ball_options.type);
         if (next_area.indexOf("ai") > -1) {
           changeDifficulty(2);
         }
         changeBallsNumber(7);
};

// [menu] Controls
var showControls = function (back_to) {
  var parent = "";
  if (back_to === "main_menu") {
    parent = "'showMainMenu()'";
  } else if (back_to === "ingame_menu") {
    parent = "'showInGameMenu()'";
  }
  swal({   title: "Controls",
           showConfirmButton: false,
           allowEscapeKey: false,
           allowOutsideClick: false,
           closeOnCancel: false,
           closeOnConfirm: false,
           html: true,
           text: "<br><br>" +
                 "Press '<b>L</b>' to lock the mouse cursor (very important!)." +
                 "<br><br>" +
                 "Press '<b>Esc</b>' to unlock the mouse cursor." +
                 "<br><br>" +
                 "Press '<b>Esc</b>' or '<b>'</b>' to open the in game menu." +
                 "<br><br>" +
                 "Move the racket with your mouse." +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<div onclick=" + parent + " class='fkbtn fkbtn-grey'><h1>Go Back <span class=\"glyphicon glyphicon-menu-hamburger\" aria-hidden=\"true\"></span></h1></div> <br>"
         });
};

// [versus] Type Selection
var showVersusTypeSelector = function () {
  swal({   title: "Versus Type",
           showConfirmButton: false,
           allowEscapeKey: false,
           allowOutsideClick: false,
           closeOnCancel: false,
           closeOnConfirm: false,
           html: true,
           text: "<br><br>" +
                 "<div onclick=\"showGameOptions('versus_type', 'versus_ai')\" class='fkbtn fkbtn-strong-red'><h1>A.I.</h1></div> <br>" +
                 "<div onclick=\"showGameOptions('versus_type', 'versus_self')\" class='fkbtn fkbtn-strong-green'><h1>Self</h1></div> <br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<div onclick='showModeSelector()' class='fkbtn fkbtn-grey'><h1>Go Back <span class=\"glyphicon glyphicon-menu-hamburger\" aria-hidden=\"true\"></span></h1></div> <br>"
        });
};

// [menu] Mode Selection
var showModeSelector = function () {
  swal({   title: "Mode",
           showConfirmButton: false,
           allowEscapeKey: false,
           allowOutsideClick: false,
           closeOnCancel: false,
           closeOnConfirm: false,
           html: true,
           text: "<br><br>" +
                 "<div onclick=\"showVersusTypeSelector()\" class='fkbtn fkbtn-weak-blue'><h1>Versus</h1></div> <br>" +
                 "<div onclick=\"showGameOptions('', 'squash')\" class='fkbtn fkbtn-strong-orange'><h1>Squash</h1></div> <br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<div onclick='showMainMenu()' class='fkbtn fkbtn-grey'><h1>Go Back <span class=\"glyphicon glyphicon-menu-hamburger\" aria-hidden=\"true\"></span></h1></div> <br>"
        });
};

// [master] Main menu
var showMainMenu = function  () {
  toggle_scene_status();
  swal({   title: "Main Menu",
           width: 500,
           showConfirmButton: false,
           allowEscapeKey: false,
           allowOutsideClick: false,
           closeOnCancel: false,
           closeOnConfirm: true,
           html: true,
           text: "<br><br>" +
                 "<div onclick=\"showModeSelector()\" class='fkbtn fkbtn-strong-blue'><h1>Play <span class=\"glyphicon glyphicon-play\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=\"showOptions('main_menu')\" class='fkbtn fkbtn-weak-orange'><h1>Options <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=\"showControls('main_menu')\" class='fkbtn fkbtn-weak-green'><h1>Controls <span class=\"glyphicon glyphicon-education\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=\"showAbout('main_menu', 'Go Back')\" class='fkbtn fkbtn-grey'><h1>About <span class=\"glyphicon glyphicon-info-sign\" aria-hidden=\"true\"></span></h1></div> <br>"
        });
  ui_scene.current = "main_menu";
  setTimeout(toggle_scene_status, 200);
};

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});

window.addEventListener("keydown", function (e) {
  var evt = e || window.event;
  if (evt.keyCode === 32) { // space bar
      toggle_scene_status();
    }
    if (evt.keyCode === 76) { //r
      canvas.requestPointerLock = canvas.requestPointerLock ||
                                canvas.mozRequestPointerLock ||
                                canvas.webkitRequestPointerLock;
      canvas.requestPointerLock();
    }
    if (evt.keyCode === 192 || evt.keyCode === 80 || evt.keyCode === 27) { // ' and p and esc
      if (ui_scene.current === "versus_ai" || ui_scene.current === "versus_self" || ui_scene.current === "squash") {
        if (ui_scene.status === "running") {
          toggle_scene_status();
          showInGameMenu();
        } else {
          resumeGame();
        }
      }
    }
});

var update_score = function() {
  var icon = (score.limit !== -1) ? "<span class=\"glyphicon glyphicon-heart\" aria-hidden=\"true\"></span>" : "<span class=\"glyphicon glyphicon-screenshot\" aria-hidden=\"true\"></span>";
  if (ui_scene.current === "versus_ai" || ui_scene.current === "versus_self") {
    document.getElementById("player1score").innerHTML = "<h4><span style=\"color:black;\">Player1: </span> <span style=\"color:blue;\">"+score.player1.toString()+"x"+icon+"</h4>";
    document.getElementById("points").innerHTML = "<h4><span style=\"color:black;\">Score: </span> <span style=\"color:purple;\">"+score.points.toString()+"</span></h4>";
    document.getElementById("player2score").innerHTML = "<h4><span style=\"color:black;\">Player2: </span><span style=\"color:red;\">"+score.player2.toString()+"x"+icon+"</h4>";
  } else if (ui_scene.current === "squash") {
    document.getElementById("player1score").innerHTML = "<h4><span style=\"color:black;\">Player1: </span> <span style=\"color:blue;\">"+score.player1.toString()+"x"+icon+"</h4>";
    document.getElementById("points").innerHTML = "<h4><span style=\"color:black;\">Score: </span> <span style=\"color:purple;\">"+score.points.toString()+"</span></h4>";
    document.getElementById("player2score").innerHTML = "";
  } else {
    document.getElementById("player1score").innerHTML = "";
    document.getElementById("points").innerHTML = "";
    document.getElementById("player2score").innerHTML = "";
  }
  setTimeout(update_score, 500);
};

update_score();
