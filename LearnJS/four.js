import * as THREE from './node_modules/three/build/three.module.js'

// making earth rotate around sun.

function main()
{
    // making the renderer.
    const canvas = document.querySelector("#c");
    const renderer = new THREE.WebGLRenderer({canvas});

    // creating camera.
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const rear = 50
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, rear);
    camera.position.z = 6;

    // making a scene(still lol).
    const scene = new THREE.Scene();

    // objects whose rotation is to be updated.
    const objs = [];
    
    
    // adding a point light.
    {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.PointLight(color, intensity);
        scene.add(light);
    }

    function createSphere(radius, widthSegments, heightSegments)
    {
        const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        return geometry;    
    }
    
    
    const sunGeometry = createSphere(1, 6, 6);
    const earthGeometry = createSphere(0.35, 6, 6);

    const sunMaterial = new THREE.MeshPhongMaterial({emissive : 0xFFFF00});
    const earthMaterial = new THREE.MeshPhongMaterial({color : 0x344277});

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    

    objs.push(sun);
    // objs.push(earth);
    sun.add(earth);

    // adding each object to the scene.
    objs.forEach( (mesh) => {
        scene.add(mesh);
    });

    earth.position.x = 2.5

    function render(time)
    {
        // converting time to seconds.
        time *= 0.001;
        

        // rotating every object around its z axis;
        objs.forEach( (mesh, idx) => {
            const speed = 1 + idx * 0.5;
            mesh.rotation.z = -time * speed;
        });

        // earth.position.x = -2.5 * Math.sin((Math.PI / 4) * time);
        // earth.position.y = -2.5 * Math.cos((Math.PI / 4) * time);

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    renderer.render(scene, camera);
}

// calling main function.
main();