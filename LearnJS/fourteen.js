// for making objects using constructors.

import * as THREE from './node_modules/three/build/three.module.js'
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';


// object class
class BoxMesh
{
    constructor(length, height, depth, color)
    {
        // for physics we need mass
        // for checking lets just use the mass as 1. 
        this.mass = 1;
        this.GRAVITY = -0.01;
        this.dy = 0;
        this.length = length;
        this.height = height;
        this.depth = depth;
        this.geometry = new THREE.BoxGeometry(length, height, depth);
        this.material = new THREE.MeshBasicMaterial({color})
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
    applyGravity()
    {
        // adding gravity to the object.
        this.dy += this.GRAVITY * (1 / 60);
        this.mesh.position.y += this.dy;
    }
    didCollide(object)
    {
        let xCol = true;
        let yCol = true;
        let zCol = true;
        if ((this.mesh.position.x - (this.length) / 2 > object.mesh.position.x + (object.length) / 2) || (this.mesh.position.x + (this.length) / 2 < object.mesh.position.x - (object.length) / 2))
        {
            xCol = false;
        }
        if ((this.mesh.position.y - (this.height) / 2 > object.mesh.position.y + (object.height) / 2) || (this.mesh.position.y + (this.height) / 2 < object.mesh.position.y - (object.height) / 2))
        {
            yCol = false;
        }
        if ((this.mesh.position.z - (this.depth) / 2 > object.mesh.position.z + (object.depth) / 2 || this.mesh.position.z + (this.depth) / 2 < object.mesh.position.z - (object.depth) / 2))
        {
            zCol = false;
        }
        console.log(xCol, yCol, zCol);
        return (xCol && yCol && zCol);
    }
}


main();

function main()
{
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 2;

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;    
        camera.updateProjectionMatrix();
    });

    const controls = new OrbitControls(camera, renderer.domElement);

    const box = new BoxMesh(0.25, 0.25, 0.25, 'white');
    const secondBox = new BoxMesh(3, 0.25, 10, 'red');
    secondBox.mesh.position.set(0, -3, 0);
    scene.add(box.mesh);
    scene.add(secondBox.mesh);

    function animate()
    {
        box.applyGravity();
        if (box.didCollide(secondBox))
        {
            console.log("collision");
        }
    }

    function render()
    {
        renderer.render(scene, camera);
    }
    
    function update(time)
    {
        animate();
        render();
        requestAnimationFrame(update);
    }
    
    requestAnimationFrame(update);
}