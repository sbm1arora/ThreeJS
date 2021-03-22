import * as THREE from './node_modules/three/build/three.module.js'
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';

// const dx = Math.random() * 2;
// const dy = Math.random() * 2;

// setup for displaying frame rate.
function CreateStats()
{
    var stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';

    return stats;
}

class SceneManager
{
    constructor(scene, camera, renderer)
    {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
    }
    render()
    {
        this.renderer.render(this.scene, this.camera);
    }
}

class Ball
{
    constructor(size, color, texture, dx, dy)
    {
        this.dx = dx;
        this.dy = dy;
        this.incSpeed = 0.1;
        this.radius = size / 2;
        this.geometry = new THREE.SphereGeometry(size, 24, 24);
        this.material = new THREE.MeshBasicMaterial({color});
        // this.material.map = texture;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, 0);
    }
    move()
    {
        this.mesh.position.x += (this.dx * (1 / 60) );
        this.mesh.position.y += (this.dy * (1 / 60) );
    }
    wallCollision()
    {
        if (this.mesh.position.y + this.radius > 3.5 || this.mesh.position.y - this.radius < -3.5)
        {
            this.dy *= -1
        }
    }
    restart(paddle1, paddle2)
    {
        if (this.mesh.position.x > 8)
        {
            this.dx *= -1;
            this.reset();
            paddle2.lives -= 1;
        }
        if (this.mesh.position.x < -8)
        {
            this.dx *= -1;
            this.reset();
            paddle1.lives -= 1;
        }
    }
    reset()
    {
        const sx = this.dx > 0 ? 1 : -1;
        const sy = this.dy > 0 ? 1 : -1;
    
        const dx = sx * ( Math.random() * 2 + this.incSpeed );
        const dy = sy * ( Math.random() * 2 + this.incSpeed );
        this.mesh.position.set(0, 0, 0);
    }
    paddleCollision(paddle)
    {
        let xCol = true;
        let yCol = true;
        if (this.mesh.position.x + this.radius < paddle.mesh.position.x - paddle.length/2 || this.mesh.position.x - this.radius > paddle.mesh.position.x + paddle.length/2)
        {
            xCol = false;
        }
        if (this.mesh.position.y + this.radius < paddle.mesh.position.y - paddle.breadth/2 || this.mesh.position.y - this.radius > paddle.mesh.position.y + paddle.breadth/2)
        {
            yCol = false;
        }
        return xCol && yCol;
    }
}

class Paddle
{
    constructor(x, y, length, breadth, color)
    {
        this.dy = 0.1;
        this.length = length;
        this.breadth = breadth;
        this.lives = 3;
        this.geometry = new THREE.BoxGeometry(length, breadth, 0.000001);
        this.material = new THREE.MeshBasicMaterial({color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, 0);
    }
    moveUp()
    {
        this.mesh.position.y += this.dy;
    }
    moveDown()
    {
        this.mesh.position.y -= this.dy;
    }
}

main();
function main()
{
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);

    const gameCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    const gameScene = new THREE.Scene();
    gameCamera.position.z = 5;

    const sceneManager = new SceneManager(gameScene, gameCamera, renderer);


    let stats = new CreateStats();
    document.body.appendChild(stats.domElement);

    window.addEventListener('resize', function() {
        sceneManager.renderer.setSize(window.innerWidth, window.innerHeight);
        sceneManager.camera.aspect = window.innerWidth / window.innerHeight;
        sceneManager.camera.updateProjectionMatrix();
    });

    const ball = new Ball(0.15, 0xFFFFFF, NaN, Math.random() * 10, Math.random() * 10);
    sceneManager.scene.add(ball.mesh);

    const paddle1 = new Paddle(-6.5, 0, 0.25, 2, 0xFFFF00);
    sceneManager.scene.add(paddle1.mesh);
    const paddle2 = new Paddle(6.5, 0, 0.25, 2, 0xFFFF00);
    sceneManager.scene.add(paddle2.mesh);

    document.body.appendChild(sceneManager.renderer.domElement);
    const controls = new OrbitControls(sceneManager.camera, sceneManager.renderer.domElement);

    // Bounding Box.
    // {
    //     const size = 2;
    //     const widthSegments = 2;
    //     const heightSegments = 2;
    //     const depthSegments = 2;
    //     const boxGeometry = new THREE.BoxGeometry(
    //         size, size, size,
    //         widthSegments, heightSegments, depthSegments);
    //     const geometry = new THREE.EdgesGeometry(boxGeometry);
    //     const material = new THREE.MeshBasicMaterial({color:'white'});
    //     const base = new THREE.Mesh(geometry, material);
    //     sceneManager.scene.add(base);
    // }


    function animate()
    {
        ball.move();
        ball.wallCollision();
        ball.restart(paddle1, paddle2);
        if (ball.paddleCollision(paddle1))
        {
            ball.dx *= -1;
            ball.dy *= -1;
        }
        if (ball.paddleCollision(paddle2))
        {
            ball.dx *= -1;
            ball.dy *= -1;
        }

        document.onkeypress = function (key) {
            console.log(key.keyCode);
            switch (key.keyCode)
            {
                case 119:
                    paddle1.moveUp();
                    break;
                case 115:
                    paddle1.moveDown();
                    break;
                case 56:
                    paddle2.moveUp();
                    break;
                case 50:
                    paddle2.moveDown();
                    break;
            }
        }
    }

    function render()
    {
        sceneManager.render();
    }

    function update(time)
    {
        if (paddle1.lives > 0 && paddle2.lives > 0)
        {
            animate();
        }
        stats.update();
        render();
        requestAnimationFrame(update);
    }
    update(0);
}