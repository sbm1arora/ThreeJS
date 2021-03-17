import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';

main();

function main()
{
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const scene = new THREE.Scene();
    const contol = new OrbitControls(camera, renderer.domElement)

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // setting up lighting.
    {
        const intensity = 1;
        const light = new THREE.AmbientLight(0xFFFFFF, intensity);
        scene.add(light);
    }

    // apply rotation on all objects in this array.
    const objs = [];

    // // setting up stars.
    // const starGeo = new THREE.Geometry();
    // for (let i = 0;i < 6000;i++)
    // {
    //     let star = new THREE.Vector3(
    //         Math.random() * 600 - 300,
    //         Math.random() * 600 - 300,
    //         Math.random() * 600 - 300
    //     );
    //     starGeo.vertices.push(star);
    // } 

    // let sprite = new THREE.TextureLoader.load('images/star.jpg');
    // let starMaterial = new THREE.PointsMaterial({
    //     color:0xaaaaaa,
    //     size:0.7,
    //     map:sprite
    // });
    // stars = new THREE.Points(starMaterial, starGeo);
    // scene.add(stars);

    const Sgeometry = new THREE.SphereGeometry(0.25, 12, 12);
    for (let i = 0;i < 500;i++)
    {
        const material = new THREE.MeshBasicMaterial({color:0xFFFFFF});
        const star = new THREE.Mesh(Sgeometry, material);
        // now to scatter them lets assume we are in a 3D box. then we scatter them all around the box.
        // size of the box matters.
        star.position.set(200 * Math.random() - 100, 200 * Math.random() - 100, 200 * Math.random() - 100);
        scene.add(star);
        objs.push(star);
    }

    // const geometry = new THREE.SphereGeometry(100, 32, 32);
    // const material = new THREE.MeshPhongMaterial();
    // material.side = THREE.BackSide;
    // material.map = THREE.ImageUtils.loadTexture('images/stars.jpg');
    // const stars = new THREE.Mesh(geometry, material);
    // scene.add(stars);

    const Egeometry = new THREE.SphereGeometry(1, 32, 32);
    const Ematerial = new THREE.MeshPhongMaterial({side:THREE.DoubleSide});
    Ematerial.map = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg');
    Ematerial.bumpMap = THREE.ImageUtils.loadTexture('images/earthbump1k.jpg');
    Ematerial.bumpScale = 0.05;
    Ematerial.specularMap = THREE.ImageUtils.loadTexture('images/earthspec1k.jpg');
    Ematerial.specular = new THREE.Color('grey');
    const earth = new THREE.Mesh(Egeometry, Ematerial);
    scene.add(earth);
    objs.push(earth)

    // animate here.
    function animate(time)
    {
        objs.forEach((obj, idx) => {
            obj.rotation.y = time / 2000;
        })
    }

    // render here.
    function render()
    {
        renderer.render(scene, camera);
    }

    // update function.
    function update(time)
    {
        animate(time);
        render();
        requestAnimationFrame(update);
    }

    update(1);

}