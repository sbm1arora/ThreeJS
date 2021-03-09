import * as THREE from './node_modules/three/build/three.module.js';

// making cubes rotate.

function main() {
    const canvas = document.querySelector('#c');
    // setting up the renderer.
    const renderer = new THREE.WebGLRenderer({ canvas });

    const scene = new THREE.Scene();

    // for camera setup 
    // we need the view frustum containing fov, aspect, near, rear.
    // all this is for the Prespective camera, for orthographic camera it might be different.
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const rear = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, rear);
    camera.position.z = 2;

    // lets add a mesh to the scene.
    // for that first we two things -> material and geometry.
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // material maker.
    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.position.x = x;

        return cube;
    }

    // creating cubes.
    const cubes = [
        makeInstance(geometry, 0x44aa88, -2),
        makeInstance(geometry, 0x8844aa, 0),
        makeInstance(geometry, 0xaa8844, 2),
    ]

    // lets add lighting.
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    // requestAnimationFrame takes a function as an argument to animate something.
    // function passed as the argument is the task that we want to animate.
    function render(time) {

        // time is passed in milliseconds.
        time *= 0.001; // convert time to seconds.

        // looping over each cube.
        cubes.forEach((cube, ndx) => {
            // making cube rotate at different speeds.
            const speed = 1 + ndx * 0.1;
            const rot = speed * time;
            // setting cube rotation.
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        // rendering scene after every change in the scene.
        renderer.render(scene, camera);
        // calling the reqestAnimationFrame to keep the animations going.
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);


    // rendereing on the screen.
    // renderer.render(scene, camera);
}

main();
