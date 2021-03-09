import * as THREE from './node_modules/three/build/three.module.js'

// font rotator.

function main() {
    // if we do not pass a canvas three js itself gives the canvas to the renderer.
    const canvas = document.querySelector('#c');
    // setting up the renderer.
    const renderer = new THREE.WebGLRenderer({ canvas });
    // setting up the scene.
    const scene = new THREE.Scene();
    // now setting up the camera.
    const fov = 80;
    const aspect = 2;
    const near = 0.1;
    const far = 50;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 15;

    {
        const intensity = 1;
        const color = 0xFFFFFF;
        const light = new THREE.DirectionalLight(color, intensity);
        scene.add(light);
        light.position.set(-1, 2, 4);
    }

    // phong material needs light to be seen.

    const height = 1;
    const length = 1;
    const width = 1;
    const geometry = new THREE.BoxGeometry(length, width, height);
    const material = new THREE.MeshBasicMaterial({ color: 0x44FFFF });
    const cube = new THREE.Mesh(geometry, material);

    const loader = new THREE.FontLoader();
    loader.load('./node_modules/three/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        const text = 'three.js';
        const geometry = new THREE.TextGeometry(text, {
            font: font,
            size: 3,
            height: 0.2,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-4, 0, 0)
        scene.add(mesh);


        // animation of this object would come here.

        function render(time) {
            time *= 0.001;
            mesh.rotation.x = time;
            mesh.rotation.y = time / 10;
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);


        renderer.render(scene, camera);
    });
}

main();