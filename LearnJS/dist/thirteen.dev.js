"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var THREE = _interopRequireWildcard(require("./node_modules/three/build/three.module.js"));

var _OrbitControls = require("https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

main(); // main function

function main() {
  // this is the basic setup for the game.
  var canvas = document.querySelector('#c');
  var renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var scene = new THREE.Scene();
  var startScene = new THREE.Scene(); // temporary 

  var controls = new _OrbitControls.OrbitControls(camera, renderer.domElement);
  window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window, innerHeight;
    camera.updateProjectionMatrix();
  }); // making a space background.
  // adding stars.

  {
    var Sgeometry = new THREE.SphereGeometry(0.2, 12, 12);

    for (var i = 0; i < 1000; i++) {
      var material = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF
      });
      var star = new THREE.Mesh(Sgeometry, material); // now to scatter them lets assume we are in a 3D box. then we scatter them all around the box.
      // size of the box matters.

      star.position.set(600 * Math.random() - 300, 600 * Math.random() - 300, 600 * Math.random() - 300);
      scene.add(star);
    }
  } // game objects.
  // player object.

  var cubeGeo = new THREE.BoxGeometry(.5, .5, .5);
  var cubeMat = new THREE.MeshBasicMaterial({
    color: 'red'
  });
  var cube = new THREE.Mesh(cubeGeo, cubeMat);
  scene.add(cube);
  cube.add(camera);
  camera.position.set(0, 0.75, 3); // base object.

  var baseGeo = new THREE.BoxGeometry(5, 1, 500);
  var baseMat = new THREE.MeshBasicMaterial({
    color: 0xFFFF00
  });
  var base = new THREE.Mesh(baseGeo, baseMat);
  base.position.set(0, -.75, -49.75);
  scene.add(base); // setting up the enemies.

  {
    var startPos = 10;

    for (var _i = 0; _i < 20; _i++) {
      var geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      var mat = new THREE.MeshBasicMaterial({
        color: 'blue'
      });
      var enemy = new THREE.Mesh(geo, mat);
      enemy.position.set(4 * Math.random() - 2, 0, -startPos);
      startPos += 10 * Math.random() + 5;
      scene.add(enemy);
    }
  } // here we'll apply all the movemets and shiz to all the game objects.
  // we do not need to make this function but just for help.

  function animate(time) {
    // moving forward.
    cube.position.z = -(time * 10) / 2000; // moving left and right.

    document.onkeydown = function (key) {
      switch (key.keyCode) {
        case 37:
          cube.position.x -= 0.2;
          break;

        case 39:
          cube.position.x += 0.2;
          break;
      }
    };
  } // this function renders all the changes and the scene.


  function render() {
    renderer.render(startScene, camera);
  } // update function or the looping function.
  // this function is called every frame to call all the other functions reqd.


  function update(time) {
    // animate(time);
    render(); // starting the loop for each frame.
    // this is used other than simply calling the update function as this stops rendering when away from the tab.

    requestAnimationFrame(update);
  }

  update();
}