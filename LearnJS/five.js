import * as THREE from './node_modules/three/build/three.module.js'

function main()
{
    // getting canvas and creating renderer.
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    // creating a scene(lol, its getting old)
    const scene = new THREE.Scene();

    // creating a camera
    const fov = 90;
    const aspect = 2;
    const near = 0.5;
    const rear = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, rear);
    camera.position.set(0, 10, 0);
    camera.up.set(0, 0, 1); // setting the up to be the z axis not the y.
    camera.lookAt(0, 0, 0);

    {
        const intensity = 1;
        const color = 0xFFFFFF;
        const light = new THREE.PointLight(color, intensity);
        scene.add(light);
    }

    // array of objects to be looped on.
    const objs = [];
    
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objs.push(solarSystem);

    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    const sunGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const sunMaterial = new THREE.MeshPhongMaterial({emissive : 0xFFFF00});
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.scale.set(5, 5, 5);
    solarSystem.add(sun);
    objs.push(sun);

    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objs.push(earthOrbit);
    
    const earthGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const earthMaterial = new THREE.MeshPhongMaterial({color : 0x2233FF, emissive : 0x112244});
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);

    earthOrbit.add(earth);
    objs.push(earth);


    const moonGeometry = new THREE.SphereGeometry(0.5, widthSegments, heightSegments);
    const moonMaterial = new THREE.MeshPhongMaterial({color : 0x888888, emissive : 0x222222});
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.x = 2;
    objs.push(moon);

    earthOrbit.add(moon);

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

    function render(time)
    {
        time *= 0.001;
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }        
        objs.forEach( (mesh) => {
            mesh.rotation.y = -time;
        });
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);


    // renderer.render(scene, camera);
}

main();

