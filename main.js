import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh } from './addMeshes'
import { addLight } from './addLights'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Model from './Model'
import Type from './Type'
import typefaceData from '@compai/font-courgette/data/typefaces/normal-400.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'
import { WheelAdaptor } from 'three-story-controls'

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.01,
	1000
)
const loader = new THREE.TextureLoader();
loader.load('ImmersiveWebSky.jpg', function (texture) {
	scene.background = texture;
});
const controls = new OrbitControls(camera, renderer.domElement)
const scene = new THREE.Scene()
const meshes = {}
const lights = {}

//audio content
const container = document.querySelector('.container')
let scrollY = 0
let currentSection = 0
const objectDistance = 12
const sectionMeshes = []

const listener = new THREE.AudioListener()
camera.add(listener)
const sound1 = new THREE.PositionalAudio(listener)
const audioLoader = new THREE.AudioLoader()

let counter = 0

init()
function init() {
	//set up our renderer default settings, add scene/canvas to webpage
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	//meshes.default = addBoilerPlateMeshes()
	meshes.standard = addStandardMesh()
	lights.default = addLight()
	meshes.standard.position.y = objectDistance * 1
	meshes.standard.add(sound1)
	sectionMeshes.push(meshes.standard)

	scene.add(lights.default)
	//scene.add(meshes.standard)
	//scene.add(meshes.default)

	const wheeladaptor = new WheelAdaptor({
		type: 'discrete'
	})

	wheeladaptor.connect()
	wheeladaptor.addEventListener('trigger', () => {
		console.log('hello')
		if (counter == 0) {
			gsap.to(
				meshes.mid.position, {
				x: 1,
				y: -8,
				duration: 2
			}
			)
			gsap.to(
				meshes.mid.scale, {
				x: 0,
				y: 0,
				z: 0,
				duration: 2
			}
			)
		}
		counter++
	})

	camera.position.set(0, 0, 25)
	typography()
	instances()
	resize()
	animate()
	initAudio()
	initScrolling()

}

function initAudio() {
	audioLoader.load('/IWIILOY.mp3', function (buffer) {
		sound1.setBuffer(buffer)
		sound1.setRefDistance(18)
		sound1.setRolloffFactor(5)
		sound1.setMaxDistance(200)
		sound1.setDistanceModel('exponential')
		window.addEventListener('click', () => {
			sound1.play()
		})
	})
}

function initScrolling() {
	container.addEventListener('scroll', () => {
		scrollY = container.scrollTop
		const section = Math.round(scrollY / window.innerHeight)

		if (section != currentSection) {
			currentSection = section
			// gsap.to(sectionMeshes[section].rotation, {
			// 	duration: 1.5,
			// 	ease: 'power3.inOut',
			// 	x: '+=6',
			// 	y: '+=3',
			// })
		}
	})
}

function typography() {
	const tLoader = new THREE.TextureLoader()
	const font = new FontLoader().parse(typefaceData)

	//Is it
	const IsIt = new TextGeometry('Is it', {
		font: font,
		size: 20,
		height: 0.2,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 2,
		bevelSize: 0.03,
		bevelOffset: 0,
		bevelSegments: 5
	});
	//const material = new THREE.MeshBasicMaterial({ color: 'red' })
	const material = new THREE.MeshMatcapMaterial({
		matcap: tLoader.load('/matcap2.jpg')
	})
	const mesh1 = new THREE.Mesh(IsIt, material)
	mesh1.position.set(-16, 5, 0)
	mesh1.scale.set(0.2, 0.2, 0.2)
	meshes.intro = mesh1
	scene.add(mesh1)

	//lost
	const lost = new TextGeometry('lost', {
		font: font,
		size: 20,
		height: 0.2,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 2,
		bevelSize: 0.03,
		bevelOffset: 0,
		bevelSegments: 5
	});
	const mesh2 = new THREE.Mesh(lost, material)
	mesh2.position.set(-4, 5, 0)
	mesh2.scale.set(0.2, 0.2, 0.2)
	meshes.mid = mesh2
	scene.add(mesh2)

	//on you
	const OnYou = new TextGeometry('on you?', {
		font: font,
		size: 20,
		height: 0.2,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 2,
		bevelSize: 0.03,
		bevelOffset: 0,
		bevelSegments: 5
	});
	const mesh3 = new THREE.Mesh(OnYou, material)
	mesh3.position.set(6.5, 5, 0)
	mesh3.scale.set(0.2, 0.2, 0.2)
	meshes.end = mesh3
	scene.add(mesh3)
	// 	Const mesh1 = new THREE.Mesh(geometry1, material)
	// Const mesh2 = new THREE.Mesh(geometry2, material)
	// Const mesh3 = new THREE.Mesh(geometry3, material)
	// Meshes.firstWord = mesh1
	// Meshes.secondWord = mesh2
	// Scene.add(meshes.firstWord)

	// const word1 = new Type({
	// 	fontFile: font,
	// 	material: new THREE.MeshMatcapMaterial({
	// 		matcap: tLoader.load('/matcap2.jpg'),
	// 	}),
	// 	position: new THREE.Vector3(-5, 0, 0),
	// 	meshes: meshes,
	// 	scene: scene,
	// 	text: 'Hello',
	// 	name: 'word001',
	// })
	// word1.init()

	//console.log(font)
}

function instances() {
	const chocolate_berry_cake = new Model({
		//mixers: mixers,
		url: '/chocolate_berry_cake.glb',
		//animationState: true,
		scene: scene,
		meshes: meshes,
		//replace: true,
		name: 'you',
		position: new THREE.Vector3(0, -7, 0),
	})
	chocolate_berry_cake.init()
}

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

function animate() {
	//camera.position.y = (-scrollY / window.innerHeight) * objectDistance
	requestAnimationFrame(animate)
	//meshes.mid.position.y -= 0.01
	renderer.render(scene, camera)
}
