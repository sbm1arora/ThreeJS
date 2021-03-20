import * as THREE from './node_modules/three/build/three.module.js'
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';


main();

function main()
{
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    const scene = new THREE.Scene();
    camera.position.z = 20;

    const controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    const size = 8;
    const widthSegments = 5
    const heightSegments = 5;
    const depthSegments = 5;
    const boxGeometry = new THREE.BoxGeometry(
        size, size, size,
        widthSegments, heightSegments, depthSegments);
    const geometry = new THREE.EdgesGeometry(boxGeometry);
    const material = new THREE.MeshBasicMaterial({color:0xFFFFFF});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


    function animate()
    {

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

    update(0);
}