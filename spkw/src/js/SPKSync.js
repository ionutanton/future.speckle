
var $           = require('jquery');

var SPKSync = function () {

  var SPKSync = this;

  SPKSync.instances = [];
  SPKSync.pause = false;

  SPKSync.addInstance = function (instance) {

    SPKSync.instances.push(instance);

    $(".toggle-grid").on("click", SPKSync.toggleGrid);
    $(".toggle-plane").on("click", SPKSync.toggleGroundplane);
    $(".toggle-shadows").on("click", SPKSync.toggleShadows);
    $(".toggle-zoom").on("click", SPKSync.zoomExtents);

  }

  SPKSync.syncCamera = function (camera) {

    for( var  i = 0; i < SPKSync.instances.length; i++ ) {

      if( camera != SPKSync.instances[i].VIEWER.camera ) {
        
        var camToSync = SPKSync.instances[i].VIEWER.camera;

        camToSync.position.x = camera.position.x;
        camToSync.position.y = camera.position.y;
        camToSync.position.z = camera.position.z;
        
        camToSync.quaternion._w = camera.quaternion._w;
        camToSync.quaternion._x = camera.quaternion._x;
        camToSync.quaternion._y = camera.quaternion._y;
        camToSync.quaternion._z = camera.quaternion._z;

        camToSync.updateProjectionMatrix();
      }
    }

  }
  
  SPKSync.zoomExtents = function() {
    
    for( var  i = 0; i < SPKSync.instances.length; i++ ) {
      
      SPKSync.instances[i].zoomExtents();

    }

  }  

  SPKSync.toggleShadows = function() {
    
    for( var  i = 0; i < SPKSync.instances.length; i++ ) {
      console.log(i + " / " + SPKSync.instances[i].SCENE.shadows);
      if( SPKSync.instances[i].SCENE.shadows ) {
        SPKSync.instances[i].SCENE.shadowlight.shadowDarkness = 0;
        SPKSync.instances[i].SCENE.shadows = false;
      }
      else {
        SPKSync.instances[i].SCENE.shadowlight.shadowDarkness = 0.15;
        SPKSync.instances[i].SCENE.shadows = true;
      }

    }

  }

  SPKSync.toggleGrid = function() {
    
    for( var  i = 0; i < SPKSync.instances.length; i++ ) {
      
      SPKSync.instances[i].SCENE.grid.visible = ! SPKSync.instances[i].SCENE.grid.visible;

    }

  }

  SPKSync.toggleGroundplane = function () {

    for( var  i = 0; i < SPKSync.instances.length; i++ ) {
      
      SPKSync.instances[i].SCENE.plane.visible = ! SPKSync.instances[i].SCENE.plane.visible;

    }

  }

  // centralising key presses in SPKSync 
  // Allows for distributed control events to all poss instances


  $(document).keyup(function(e) {

    if(SPKSync.pause) return;

    if(e.keyCode == 71) 
      SPKSync.toggleGrid();

    if(e.keyCode == 80)
      SPKSync.toggleGroundplane();

    if(e.keyCode == 83)
      SPKSync.toggleShadows();

    if(e.keyCode == 32) 
      SPKSync.zoomExtents();

  });



}

module.exports = new SPKSync();