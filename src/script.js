import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { DepthPackingStrategies, MeshStandardMaterial, SpotLightHelper } from "three";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
gui.hide()
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
// const scene = new THREE.Scene()
const scene = new THREE.Scene();

//FOG

const fog = new THREE.Fog("#262837", 1, 30);
scene.fog = fog;
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");


const bricksColorTexture=textureLoader.load('textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture=textureLoader.load('textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture=textureLoader.load('textures/bricks/normal.jpg')
const bricksRoughnessTexture=textureLoader.load('textures/bricks/roughness.jpg')



const grassColorTexture=textureLoader.load('textures/grass/color.jpg')
const grassAmbientOcclusionTexture=textureLoader.load('textures/grass/ambientOcclusion.jpg')
const grassNormalTexture=textureLoader.load('textures/grass/normal.jpg')
const grassRoughnessTexture=textureLoader.load('textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8,8)
grassAmbientOcclusionTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassColorTexture.wrapS=THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS=THREE.RepeatWrapping
grassNormalTexture.wrapS=THREE.RepeatWrapping
grassRoughnessTexture.wrapS=THREE.RepeatWrapping

grassColorTexture.wrapT=THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT=THREE.RepeatWrapping
grassNormalTexture.wrapT=THREE.RepeatWrapping
grassRoughnessTexture.wrapT=THREE.RepeatWrapping



/**
* Light House
 */
// const lightHouse=new THREE.Group()
const lightHouse=new THREE.Group()

scene.add(lightHouse)
const LightHouseBaseGeometry = new THREE.CylinderGeometry( 1, 2, 6, 32 );
const LightHouseBaseMaterial = new THREE.MeshBasicMaterial( {color: "#aaa"} );
const LightHouseBase = new THREE.Mesh( LightHouseBaseGeometry, LightHouseBaseMaterial );
lightHouse.position.y=3.01
lightHouse.position.x=6.01
lightHouse.position.z=-7.01
lightHouse.add(LightHouseBase)


//circular disk
const LightHouseCircleGeometry = new THREE.ConeGeometry( 1.6, 0, 20 );
const LightHouseCircleMaterial = new THREE.MeshBasicMaterial( {color: "#bbb"} );
const Circle = new THREE.Mesh( LightHouseCircleGeometry, LightHouseCircleMaterial );
Circle.position.y=3.01
Circle.rotation.z=Math.PI
// Circle.position.x=6.01
// circle.position.z=-7.01
lightHouse.add(Circle)


//above circularDisk
for(let i=0;i<2;i++){

  const LightHouseTopGeometry = new THREE.CylinderGeometry( .8/(i+1), .8/(i+1), 1.3, 32 );
  const LightHouseTopMaterial = i===0?new THREE.MeshBasicMaterial( {color: "#aaa"} ):new THREE.MeshStandardMaterial( {emissive: "#eee"} );

  const LightHouseTop = new THREE.Mesh( LightHouseTopGeometry, LightHouseTopMaterial );
  LightHouseTop.position.y=3.01+(i)
  LightHouseTop.castShadow=i===0?true:false
  lightHouse.add(LightHouseTop)
}
const LightHouseConeGeometry = new THREE.ConeGeometry( .5, .2, 20 );
const LightHouseConeMaterial = new THREE.MeshBasicMaterial( {color: "#bbb"} );
const Cone = new THREE.Mesh( LightHouseConeGeometry, LightHouseConeMaterial );
Cone.position.y=4.75
// Cone.position.x=6.01
// Cone.position.z=-7.01
lightHouse.add(Cone)

//spotLight For TOp lighthouse

// const sl=new THREE.SpotLight("#fff",1,-1,.5,1,1.2)
// const sl=new THREE.SpotLight("#fff",5,10,new THREE.MathUtils.degToRad(10),0,1.2)
const sl=new THREE.SpotLight("#fff",5,10,-1,0)



sl.shadow.mapSize.width=1024
sl.shadow.mapSize.height=1024


// sl.position.set(5.5,7.5,-7)
sl.position.set(5,7.5,-6)
sl.target.position.x=0
// sl.shadowMapVisible = true;

scene.add(sl.target)

sl.lookAt(new THREE.Vector3())
gui.add(sl, "intensity").min(0).max(1).step(0.01).name("sl intensity");
gui.add(sl, "angle").min(-200).max(200).step(0.5).name("sl angle");
gui.add(sl, "distance").min(-1000).max(500).step(.5).name("sl distance");
gui.add(sl, "penumbra").min(0).max(1).step(.05).name("sl penumbra");
gui.add(sl, "decay").min(-10).max(50).step(.5).name("sl decay");
gui.add(sl.position, "x").min(-10).max(50).step(.5).name("sl pos x");
gui.add(sl.position, "y").min(-10).max(50).step(.5).name("sl pos y");
gui.add(sl.position, "z").min(-10).max(50).step(.5).name("sl pos z");

gui.add(sl.target.position, "x").min(-10).max(50).step(.5).name("sl tar pos x");
gui.add(sl.rotation, "z").min(-10).max(50).step(.5).name("sl pos z");


// const slHelper=new THREE.SpotLightHelper(sl,2)
scene.add(sl)
// scene.add(slHelper)
// window.requestAnimationFrame(()=>{
//   slHelper.update()
// })
// gui.add(lightHouseBase, "radiusTop").min(0).max(1).step(0.001);

//pointLight on top of LH
const pl = new THREE.PointLight("#e9a000", 1, 7);

// const plHelper=new THREE.PointLightHelper(pl,1)
// gui.add(pl.position,'x').min(-20).max(100).step(0.5).name("pl pos x")
// gui.add(pl.position,'y').min(-20).max(100).step(0.5).name("pl pos y")
// gui.add(pl.position,'z').min(-30).max(100).step(0.5).name("pl pos z")

pl.position.x=-0.5;
pl.position.y=4.5;
pl.position.z=.5;

// scene.add(plHelper)
lightHouse.add(pl);



/**
 * House
 */
//Group
const house = new THREE.Group();
scene.add(house);
//Walls
const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 3, 4),
  new THREE.MeshStandardMaterial({

    map:bricksColorTexture,
    aoMap:bricksAmbientOcclusionTexture,
    normalMap:bricksNormalTexture,
    roughnessMap:bricksRoughnessTexture,
   })
);
walls.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2))

walls.position.y = 1.5;
house.add(walls);

//Roof

const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: 0xb35f45 })
);
roof.position.y = 3.5;
roof.rotation.y = Math.PI / 4;
house.add(roof);

//DOOR
const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2.2, 2.2,100,100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap:doorAmbientOcclusionTexture,
    displacementMap:doorHeightTexture,
    displacementScale:0.1,
    normalMap:doorNormalTexture,
    metalnessMap:doorMetalnessTexture,
    roughnessMap:doorRoughnessTexture
  })
);
door.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2))
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

//BUSHES
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x89c854 });
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);

bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);

bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);

bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);

bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

//Graves
const graves = new THREE.Group();
scene.add(graves);
const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: 0xb2b6b1 });
for (let i = 0; i < 70; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.castShadow=true
  grave.position.set(x, 0.3, z);
  grave.rotation.y = (Math.random() - 0.5)*.3;
  grave.rotation.z = (Math.random() - 0.5)*.3;
  graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({

    map:grassColorTexture,
    aoMap:grassAmbientOcclusionTexture,
    normalMap:grassNormalTexture,
    roughnessMap:grassRoughnessTexture
   })
);
floor.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array,2))

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
// const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
// const moonLight = new THREE.DirectionalLight("#fff", 0.12);
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

//DOOR LIGHT
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);



//GHOST

const ghost1=new THREE.PointLight("#ff00ff",2,3)
const ghost2=new THREE.PointLight("#00ffff",2,3)
const ghost3=new THREE.PointLight("#ffff00",2,3)
scene.add(ghost1,ghost2,ghost3)
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor("#262837");
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");


//shadows
renderer.shadowMap.enabled=true
renderer.shadowMap.type=THREE.PCFSoftShadowMap


sl.castShadow=true
moonLight.castShadow=true
doorLight.castShadow=true
ghost1.castShadow=true
ghost2.castShadow=true

walls.castShadow=true
bush1.castShadow=true
bush2.castShadow=true
bush3.castShadow=true
bush4.castShadow=true
floor.receiveShadow=true

doorLight.shadow.mapSize.width=256
doorLight.shadow.mapSize.height=256
doorLight.shadow.camera.far=7

ghost1.shadow.mapSize.width=256
ghost1.shadow.mapSize.height=256
ghost1.shadow.camera.far=7

ghost2.shadow.mapSize.width=256
ghost2.shadow.mapSize.height=256
ghost2.shadow.camera.far=7

ghost3.shadow.mapSize.width=256
ghost3.shadow.mapSize.height=256
ghost3.shadow.camera.far=7


/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {



  const elapsedTime = clock.getElapsedTime();



  //update lighthpuse light
  sl.target.position.x=Math.sin(elapsedTime)*15

  //UPDAte ghost

  const ghost1Angle=elapsedTime +.5
  ghost1.position.x=Math.cos(ghost1Angle) *4
  ghost1.position.z=Math.sin(ghost1Angle) *4
  ghost1.position.y=Math.sin(ghost1Angle) *3


  const ghost2Angle=-elapsedTime +.32
  ghost2.position.x=Math.cos(ghost2Angle) *5
  ghost2.position.z=Math.sin(ghost2Angle) *5
  ghost2.position.y=Math.sin(ghost2Angle) *4+Math.sin(ghost2Angle) *2.5



  const ghost3Angle=-elapsedTime +.18


  ghost3.position.x=Math.cos(ghost3Angle) *(7+Math.sin(elapsedTime*.32))
  ghost3.position.z=Math.sin(ghost3Angle) *(7+Math.sin(elapsedTime*.5))
  ghost3.position.y=Math.sin(ghost3Angle*5) +(Math.sin(elapsedTime*2))

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
