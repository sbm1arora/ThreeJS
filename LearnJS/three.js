import * as THREE from './node_modules/three/build/three.module.js'

// random color circle.

function main() {
    // getting canvas and creating a renderer.
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    // creating a scene.
    const scene = new THREE.Scene();

    // creating a camera.
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 10;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    {
        const intensity = 1;
        const color = 0xFFFFFF;
        const light = new THREE.DirectionalLight(color, intensity);
        scene.add(light);
        light.position.set(-1, 2, 4);
    }

    // change color
    function render(time) {
        const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
        const radius = 1;
        const geometry = new THREE.CircleGeometry(radius);

        const hue = Math.random();
        const satu = 1;
        const lumi = 0.5;
        material.color.setHSL(hue, satu, lumi);
        const circle = new THREE.Mesh(geometry, material);
        scene.add(circle);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();