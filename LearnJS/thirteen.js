import * as THREE from './node_modules/three/build/three.module.js'
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';

class BoxGameObject
{
    constructor(length, height, depth, color)
    {
        this.length = length;
        this.height = height;
        this.depth = depth;
        this.geometry = new THREE.BoxGeometry(this.length, this.height, this.depth);
        this.material = new THREE.MeshBasicMaterial({color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
    update(speed)
    {
        // moving forward.
        this.mesh.position.z -= (speed) / 100;
    }
    left()
    {
        this.mesh.position.x -= 0.2;
    }
    right()
    {
        this.mesh.position.x += 0.2;
    }
    didCollide(object)
    {
        let xCol = true;
        let yCol = true;
        let zCol = true;
        if ((this.mesh.position.x - (this.length) / 2 > object.mesh.position.x + (object.length) / 2) || (this.mesh.position.x + (this.length) / 2 < object.mesh.position.x - (object.length) / 2))
        {
            xCol = false;
        }
        if ((this.mesh.position.y - (this.height) / 2 > object.mesh.position.y + (object.height) / 2) || (this.mesh.position.y + (this.height) / 2 < object.mesh.position.y - (object.height) / 2))
        {
            yCol = false;
        }
        if ((this.mesh.position.z - (this.depth) / 2 > object.mesh.position.z + (object.depth) / 2 || this.mesh.position.z + (this.depth) / 2 < object.mesh.position.z - (object.depth) / 2))
        {
            zCol = false;
        }
        // console.log(xCol, yCol, zCol);
        return (xCol && yCol && zCol);
    }
}

main();

// main function
function main()
{

    // this is the basic setup for the game.
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const scene = new THREE.Scene();
    const startScene = new THREE.Scene();
    

    // temporary 
    const controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window,innerHeight;
        camera.updateProjectionMatrix();
    })

    // making a space background.
    // adding stars.
    {
        const Sgeometry = new THREE.SphereGeometry(0.2, 12, 12);
        for (let i = 0;i < 1000;i++)
        {
            const material = new THREE.MeshBasicMaterial({color:0xFFFFFF});
            const star = new THREE.Mesh(Sgeometry, material);
            // now to scatter them lets assume we are in a 3D box. then we scatter them all around the box.
            // size of the box matters.
            star.position.set(600 * Math.random() - 300, 600 * Math.random() - 300, 600 * Math.random() - 300);
            scene.add(star);
        }
    }

    // game objects.
    // player object.
    // const cubeGeo = new THREE.BoxGeometry(.5, .5, .5);
    // const cubeMat = new THREE.MeshBasicMaterial({color:'red'});
    // const cube = new THREE.Mesh(cubeGeo, cubeMat);
    // scene.add(cube);
    

    const player = new BoxGameObject(0.5, 0.5, 0.5, 'red');
    scene.add(player.mesh);

    // base object.
    const baseGeo = new THREE.BoxGeometry(5, 1, 500);
    const baseMat = new THREE.MeshBasicMaterial({color:0xFFFF00});
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.set(0, -.75, -49.75);
    player.mesh.add(camera);
    camera.position.set(0, 0.75, 3);
    scene.add(base);


    // setting up the enemies.
    const enemies = [];
    {
        let startPos = 10;
        for (let i = 0;i < 20;i++)
        {
            const enemy = new BoxGameObject(0.5, 0.5, 0.5, 'blue')
            enemy.mesh.position.set(4 * Math.random() - 2, 0, -startPos);
            startPos += 10 * Math.random() + 5;
            scene.add(enemy.mesh);
            enemies.push(enemy);
        }
    }

    // here we'll apply all the movemets and shiz to all the game objects.
    // we do not need to make this function but just for help.
    function animate(time)
    {
        player.update(10, time);
        
        if (player.mesh.position.z <= -200)
        {
            player.mesh.position.z = 0;
        }

        document.onkeypress = function (event) {
            if (event.keyCode == 97)
            {
                player.left();
            }
            else if (event.keyCode == 100)
            {
                player.right();
            }
        }
    }
    
    // this function renders all the changes and the scene.
    function render(scene)
    {
        renderer.render(scene, camera);
    }
    
    // update function or the looping function.
    // this function is called every frame to call all the other functions reqd.
    function update(time)
    {
        animate(time);
        enemies.forEach( (enemy) => {
            if (enemy.didCollide(player))
            {
                renderer.render(startScene, camera);
            }
        })  
        // starting the loop for each frame.
        // this is used other than simply calling the update function as this stops rendering when away from the tab.
        requestAnimationFrame(update);
    }
    update();

}