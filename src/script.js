import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import _fragmentShader from '../shaders/fragment.glsl.js'
import _vertexShader from '../shaders/vertex.glsl.js'
import _glowFragmentShader from '../shaders/glowFragment.glsl.js'
import _glowVertexShader from '../shaders/glowVertex.glsl.js'

// ---Canvas 1--- //

// Loading
const textureLoader1 = new THREE.TextureLoader()
const normalTexture1 = textureLoader1.load('/textures/PlanetNormalMap3.jpg')

// Canvas
const canvas1 = document.querySelector('canvas.canvas-1')

// Scene    
const scene1 = new THREE.Scene()

// Objects
const planetGeometry1 = new THREE.SphereBufferGeometry( 1.5, 138, 138)
const sunGeometry = new THREE.SphereBufferGeometry( 0.5, 138, 138)
const glowGeometry = new THREE.SphereBufferGeometry( 0.5, 138, 138)

sunGeometry.computeVertexNormals()

// Materials

const planetMaterial1 = new THREE.MeshStandardMaterial({
    metalness: 0,
    roughness: 1,
    normalMap: normalTexture1,
    color: new THREE.Color(0x3d3d3d)
})

const sunMaterial = new THREE.ShaderMaterial({
    vertexShader: _vertexShader,
    fragmentShader: _fragmentShader,
    uniforms: {
        sunTexture2: {
            value: new THREE.TextureLoader().load('textures/sunTexture3.png')
        }
    }
})

const glowMaterial = new THREE.ShaderMaterial({
    vertexShader: _glowVertexShader,
    fragmentShader: _glowFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
})

// Mesh
const sphere1 = new THREE.Mesh(planetGeometry1, planetMaterial1)
const sphere2 = new THREE.Mesh(sunGeometry, sunMaterial)
const glow = new THREE.Mesh(glowGeometry, glowMaterial)

glow.scale.set(1.5, 1.5, 1.5)

// Position
sphere1.position.set(-1.8, 0, 0.8)

// Lights
const pointLight1 = new THREE.PointLight(0xffd500)
pointLight1.position.set(0, 0, -0.6)
pointLight1.intensity = 4

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera1.aspect = sizes.width / sizes.height
    camera1.updateProjectionMatrix()
    
    // Update renderer
    renderer1.setSize(sizes.width, sizes.height)
    renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Base camera
const camera1 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera1.position.set(0, 0, 2)
scene1.add(camera1, pointLight1, sphere1, sphere2, glow)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer1 = new THREE.WebGLRenderer({
    canvas: canvas1,
    antialias: true,
    alpha: true,
})
renderer1.setSize(sizes.width, sizes.height)
renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Scene1 animations
const clock = new THREE.Clock()

const updateSphere = (event) => {
    pointLight1.position.x = window.scrollY * -.002
    sphere2.position.x = window.scrollY * -.002
    glow.position.x = window.scrollY * -.002
}

window.addEventListener('scroll', updateSphere)


const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere1.rotation.y = -.5 * elapsedTime

    // Render
    renderer1.render(scene1, camera1)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
};

tick();

// 
// SCENE 2
// 

// Canvas
const canvas2 = document.querySelector('canvas.canvas-2')

// Scene
const scene2 = new THREE.Scene()

// Objects
// const canvasTwoGeometry = new THREE.SphereBufferGeometry( 0.5, 64, 64 )
// const canvasTwoMaterial = new THREE.MeshStandardMaterial({
//     color: 0x999920
// })

// // Mesh
// const canvasTwoMesh = new THREE.Mesh(canvasTwoGeometry, canvasTwoMaterial)


// Lights
// const canvasTwoLight = new THREE.PointLight(0xffffff, 0.1)
const canvasTwoLight = new THREE.AmbientLight(0xffffff, 1)
canvasTwoLight.position.set(0, 0, 4)


/**
 * Sizes
 */
const sceneTwoSizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () =>
{
    // Update sizes
    // sceneTwoSizes.width = window.innerWidth
    // sceneTwoSizes.height = window.innerHeight

    // Update camera
    sceneTwoCamera.aspect = sizes.width / sizes.height
    sceneTwoCamera.updateProjectionMatrix()

    // Update renderer
    renderer2.setSize(sizes.width, sizes.height)
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

/**
 * Camera
 */
// Base camera
// const sceneTwoCamera = new THREE.PerspectiveCamera(75, sceneTwoSizes.width / sceneTwoSizes.height, 0.1, 100);
const sceneTwoCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

sceneTwoCamera.position.set(0, 0, 0);;

scene2.add(sceneTwoCamera, canvasTwoLight);
// scene2.add(sceneTwoCamera, canvasTwoLight, canvasTwoMesh);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// Renderer
const renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2,
    alpha: true,
})
renderer2.setSize(sizes.width, sizes.height)
renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function addAsteroid(){
    const asteroidGeometry = new THREE.SphereGeometry( 0.25, 24, 24 );
    const asteroidMaterial = new THREE.MeshStandardMaterial({color: 0xffffff})
    const asteroid = new THREE.Mesh( asteroidGeometry, asteroidMaterial );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

    asteroid.position.set(x, y, z);
    scene2.add(asteroid)
}
Array(200).fill().forEach(addAsteroid)

// Animation
const clock2 = new THREE.Clock()

const asteroidMove = (event) => {
    sceneTwoCamera.position.z = window.scrollY * -0.02
}
window.addEventListener('scroll', asteroidMove)

const tick2 = () =>
{
    const elapsedTime2 = clock2.getElapsedTime()

    // Update objects
    // canvasTwoMesh.rotation.y = .5 * elapsedTime2

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer2.render(scene2, sceneTwoCamera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick2)
}

tick2()
