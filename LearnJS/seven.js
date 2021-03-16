// import * as THREE from './node_modules/three/build/three.module.js'
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';


function main()
{
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    
    
    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    
    const controls = new OrbitControls(camera, renderer.domElement);


    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const skyBoxMaterials = [
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/penguins/arid_ft.jpg'),side : THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/penguins/arid_bk.jpg'),side : THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/penguins/arid_up.jpg'),side : THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/penguins/arid_dn.jpg'),side : THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/penguins/arid_rt.jpg'),side : THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('images/penguins/arid_lt.jpg'),side : THREE.DoubleSide})
    ];

    const cube = new THREE.Mesh(geometry, skyBoxMaterials);

    scene.add(cube);

    {
        const light = new THREE.PointLight(0xFFFFFF, 1);
        scene.add(light);
    }

    const update = function() {
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
    }

    const render = function() {
        renderer.render(scene, camera);
    }

    function loop()
    {
        requestAnimationFrame(loop);

        update();
        render();
    }

    loop();
    
}

main();