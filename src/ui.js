// ui.js is responsible for all of the interactions between the user and the application

// [navbar] About
var showAbout = function (back_to) {
  var parent = "";
  if (back_to === "main_menu") {
    parent = "'showMainMenu()'";
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
                 "<a href='http://pboueke.github.io/b/about/'>info page</a>.<br><br><br>" +
                 "<a rel='license' href='http://creativecommons.org/licenses/by-nc/4.0/''>" +
                 "<img alt='Creative Commons License' style='border-width:0' src='https://i.creativecommons.org/l/by-nc/4.0/88x31.png' />" +
                 "</a><br><br /><small>This work is licensed under a " +
                 "<a rel='license' href='http://creativecommons.org/licenses/by-nc/4.0/'>Creative Commons Attribution-NonCommercial 4.0 International License</a>.</small> <br><br><br>" +
                 "<div onclick=" + parent + " class='fkbtn fkbtn-sm fkbtn-grey'><h3>Go Back <span class=\"glyphicon glyphicon-menu-hamburger\" aria-hidden=\"true\"></span></h3></div> <br>"
        });
};

// [game] Main menu
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
                 "<div onclick=\"showAbout('main_menu')\" class='fkbtn fkbtn-blue'><h1>Play <span class=\"glyphicon glyphicon-play\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=\"showAbout('main_menu')\" class='fkbtn fkbtn-orange'><h1>Options <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=\"showAbout('main_menu')\" class='fkbtn fkbtn-green'><h1>Controls <span class=\"glyphicon glyphicon-education\" aria-hidden=\"true\"></span></h1></div> <br>" +
                 "<div onclick=\"showAbout('main_menu')\" class='fkbtn fkbtn-grey'><h1>About <span class=\"glyphicon glyphicon-info-sign\" aria-hidden=\"true\"></span></h1></div> <br>"
        });
};

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
