// ui.js is responsible for all of the interactions between the user and the application

/* jshint
 esversion: 6, ignore:line,
 esnext: true, ignore:line,
 expr: true
*/

// [main menu] About
var showAbout = function (back_to) {
  var parent = "";
  if (back_to === "main_menu") {
    parent = "'showMainMenu()'";
  } else if (back_to === "ingame_menu") {
    parent = "'showInGameMenu()'";
  }
  swal({   title: "CG0X",
           showConfirmButton: false,
           allowEscapeKey: false,
           allowOutsideClick: false,
           closeOnCancel: false,
           closeOnConfirm: false,
           html: true,
           text: "<a href='http://pboueke.github.io/b/'>by pboueke</a> " +
                 "<a href='https://github.com/pboueke'><img width='30px' src='images/githubprofile.png' /></a>" +
                 "<br><br>This is a project for the Computer Graphics course at UFRJ.<br><br>Feel free to contact me at " +
                 "<br><code>p h b o u e k e 'at' g m a i l . c o m</code><br><br>There's also my " +
                 "<a href='http://pboueke.github.io/b/about/'>info page</a>.<br><br>" +
                 "<a rel='license' href='http://creativecommons.org/licenses/by-nc/4.0/''>" +
                 "<img alt='Creative Commons License' style='border-width:0' src='https://i.creativecommons.org/l/by-nc/4.0/88x31.png' />" +
                 "</a><br><br><small>This work is licensed under a " +
                 "<a rel='license' href='http://creativecommons.org/licenses/by-nc/4.0/'>Creative Commons Attribution-NonCommercial 4.0 International License</a>.</small> <br><br><br>" +
                 "Source:<br><a href='https://github.com/pboueke/CG0X'><img width='100px' src='images/GitHub-Logo.png' /></a><br><br>" +
                 "<div onclick=" + parent + " class='fkbtn fkbtn-grey'><h1>Go Back <span class=\"glyphicon glyphicon-menu-hamburger\" aria-hidden=\"true\"></span></h1></div> <br>"
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
           text: "<b>Audio:</b><br><br>" +
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
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
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
                 "<div onclick=\"\" class='fkbtn fkbtn-strong-red'><h1>A.I.</h1></div> <br>" +
                 "<div onclick=\"\" class='fkbtn fkbtn-strong-green'><h1>Self</h1></div> <br>" +
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
                 "<div onclick=\"\" class='fkbtn fkbtn-strong-orange'><h1>Squash</h1></div> <br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<br><br>" +
                 "<div onclick='showMainMenu()' class='fkbtn fkbtn-grey'><h1>Go Back <span class=\"glyphicon glyphicon-menu-hamburger\" aria-hidden=\"true\"></span></h1></div> <br>"
        });
};

// [master] Main menu
var showMainMenu = function  () {
  swal({   title: "Main Menu",
           width: 500,
           showConfirmButton: false,
           allowEscapeKey: false,
           allowOutsideClick: false,
           closeOnCancel: false,
           closeOnConfirm: false,
           html: true,
           text: "<br><br>" +
                 "<div onclick=\"showModeSelector()\" class='fkbtn fkbtn-strong-blue'><h1>Play <span class=\"glyphicon glyphicon-play\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=\"showOptions('main_menu')\" class='fkbtn fkbtn-weak-orange'><h1>Options <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=\"showControls('main_menu')\" class='fkbtn fkbtn-weak-green'><h1>Controls <span class=\"glyphicon glyphicon-education\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=\"showAbout('main_menu')\" class='fkbtn fkbtn-grey'><h1>About <span class=\"glyphicon glyphicon-info-sign\" aria-hidden=\"true\"></span></h1></div> <br>"
        });
};

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
