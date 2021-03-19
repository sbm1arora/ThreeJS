import * as THREE from './node_modules/three/build/three.module.js'
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';

main();

function main()
{
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    const scene = new THREE.Scene();
    camera.position.z = 8;

    const controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    {
        const intensity = 1;
        const light = new THREE.AmbientLight(intensity, 0xFFFFFF);
        light.position.set(0, -1, 1);
        scene.add(light);
    }

    {
        const sgeo = new THREE.SphereGeometry(0.25, 24, 24);
    }

    const geometry = new THREE.SphereGeometry(3, 32, 32);
    const material = new THREE.MeshBasicMaterial();
    const loader = new THREE.TextureLoader();
    material.map = loader.load('images/over.jpg');
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);


    function animate(time)
    {
        cube.rotation.y = time / 1000;
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