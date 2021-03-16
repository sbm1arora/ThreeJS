import * as THREE from './node_modules/three/build/three.module.js'

function main()
{
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(0, 300, 0, 150, -1, 1);
    camera.zoom = 1;

    scene.background

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color : 0xFFFFFF});
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);
    box.position.set(0, 0, 0);

    renderer.render(scene, camera);
}

main();