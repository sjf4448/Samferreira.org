//WHY WONT YOU WORK!!!! import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//creates scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


//Creates renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//idk why but when I delete this everything breaks
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

camera.position.z = 5;

const space = new THREE.Group();

//Used to make the cubes that will be used for stars
function makeStar(posX, posY, posZ){

	var geometry = new THREE.SphereGeometry()
	var material = new THREE.MeshBasicMaterial(({ color: 0xffffff }));

	//for(var i = 0; i <= n; i++){
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = posX;
		mesh.position.y = posY;
		mesh.position.z = posZ;


		space.add(mesh);
	//}
}

function getRandomArbitrary(min, max) {
	var num = Math.random() * (max - min) + min
	if(num > 0 && num < 10){
		num += 50
	}
	else if(num < 0 && num > -10){
		num -= 50
	}
	return num;
  }

function buildSpace(n){
	for(var i = 0; i <= n; i++){
		makeStar(getRandomArbitrary(-1000, 1000), getRandomArbitrary(-1000, 1000), getRandomArbitrary(-1000, 10));
	}
}


//number of stars
const stars = 5000;

buildSpace(stars);
scene.add(space);

//creating my name
// const loader = new GLTFLoader();
//AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
// const loadedData = await loader.loadAsync('pumpkin.gltf');

const nameGeom = new THREE.BoxGeometry();
const nameMaterial = new THREE.MeshBasicMaterial(({ color: 0xffffff }))
const nameMesh = new THREE.Mesh(nameGeom, nameMaterial);
scene.add(nameMesh);

//switch to true for animation
var jump = false;

//Need to put my name somewhere
//Add a button to activate the effect
//Planets for portfolio pages?
//Goal: Star wars space jump effect

//infinte animation loop
const animate = function () {
	requestAnimationFrame( animate );

	if(jump == true){
		//animates every object in space
		for (var i = 0; i <= stars; i++){
			space.children[i].scale.z += 0.1;
			space.children[i].position.z += 0.1;
		}
	}

	nameMesh.rotation.x += 0.01;
	nameMesh.rotation.z += 0.01;
	
	//Makes the cube stretch on Z-Axis
	// if(group.scale.z <= 20){
	// 	group.scale.setZ(group.scale.z + 0.5);
	// }
	

	renderer.render( scene, camera );
};

animate();



//When window is resized stuff dont break
window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

};

//hides srollbar
document.body.style.overflow = 'hidden';