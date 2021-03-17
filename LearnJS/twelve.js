import * as THREE from './node_modules/three/build/three.module.js'
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';

main();

function main()
{
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    const scene = new THREE.Scene();

    const controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });


    // lets try to make a stars.
    // starts are white points floating in space.
    // lets make 10 spheres.
    // scatter them randomly to make them look like stars.

    const geometry = new THREE.SphereGeometry(0.25, 12, 12);
    for (let i = 0;i < 100;i++)
    {
        const material = new THREE.MeshBasicMaterial({color:0xFFFFFF});
        const star = new THREE.Mesh(geometry, material);
        // now to scatter them lets assume we are in a 3D box. then we scatter them all around the box.
        // size of the box matters.
        star.position.set(200 * Math.random() - 100, 200 * Math.random() - 100, 200 * Math.random() - 100);
        scene.add(star);
    }

    function animate(time)
    {

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