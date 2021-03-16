import * as THREE from './node_modules/three/build/three.module.js'
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';


main();

function main()
{
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 5;

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    const scene = new THREE.Scene();
    const controls = new OrbitControls(camera, renderer.domElement);
    
    // lighting for the scene.
    {
        const intensity = 1;
        const light = new THREE.AmbientLight('yellow', intensity);
        const sunLight = new THREE.AmbientLight('blue', intensity);
        sunLight.position.x = 2;
        scene.add(light);
        scene.add(sunLight);
    }

    // object added in here would have the effect of rotation.
    let objs = [];

    const orbit = new THREE.Object3D();
    objs.push(orbit);
    scene.add(orbit);

    const earthOribt = new THREE.Object3D();
    earthOribt.position.x = 3;
    orbit.add(earthOribt);
    objs.push(earthOribt);

    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.y = 1;
    earthOribt.add(moonOrbit);
    objs.push(moonOrbit);


    // Sun
    const geometry = new THREE.SphereGeometry(1, 25, 25);
    const material = new THREE.MeshPhongMaterial();
    material.map = THREE.ImageUtils.loadTexture('images/sunmap.jpg');
    const sun = new THREE.Mesh(geometry, material);
    orbit.add(sun);

    // Earth
    const Egeometry = new THREE.SphereGeometry(0.5, 25, 25);
    const Ematerial = new THREE.MeshPhongMaterial()
    Ematerial.map = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg')
    const earth = new THREE.Mesh(Egeometry, Ematerial);
    earthOribt.add(earth);

    // Moon
    const Mgeometry = new THREE.SphereGeometry(0.25, 25, 25);
    const Mmaterial = new THREE.MeshPhongMaterial({color:'white'});
    const moon = new THREE.Mesh(Mgeometry, Mmaterial);
    earthOribt.add(moonOrbit);
    moonOrbit.add(moon);

    
    function animate(time)
    {
        objs.forEach( (object, idx) => {
            object.rotation.z = (time / 2000) * (idx + 1);
        });
    }
    
    function render()
    {
        renderer.render(scene, camera);
    }
    
    function update(time)
    {
        animate(time);
        render();
        requestAnimationFrame(update);
    }

    update(1);
}