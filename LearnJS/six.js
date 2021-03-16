import * as THREE from './node_modules/three/build/three.module.js'

function main()
{
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    const scene = new THREE.Scene();
    const fov = 75;
    const aspect = 2;
    const near = 0.5;
    const rear = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, rear);
    camera.position.z = 2;

    const length = 1;
    const width = 1;
    const depth = 1;
    const geometry = new THREE.BoxGeometry(length, width, depth);

    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
    map: loader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg')
    });
    const box = new THREE.Mesh(geometry, material);

    scene.add(box);
    renderer.render(scene, camera);
}

main();