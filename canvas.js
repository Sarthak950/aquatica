import * as THREE from "three";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let canSkip = false;

let winCount = 60;
// detect if the user is on mobile
if (window.innerWidth < 768) {
    winCount = 30;
}

const slidetimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: `+=${window.innerHeight * winCount}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
    },
});
slidetimeline
    .to("#slide1", {
        maskPosition: "0% -5vh",
        // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
    })
    .to(".contextText1", {
        opacity: 1,
        duration: 2,
    }, "-=1.5")
    .to("#slide2", {
        maskPosition: "0% -5vh",
        // clipPath: "polyg5on(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
    }, "+=1")
    .to(".contextText2", {
        opacity: 1,
        duration: 2,
    }, "-=1.5")
    .to("#slide3", {
        maskPosition: "0% -5vh",
        // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
    }, "+=1")
    .to(".contextText3", {
        opacity: 1,
        duration: 2,
    }, "-=1.5")
    .to("#slide4", {
        maskPosition: "0% -5vh",
        // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
    }, "+=1")
    .to(".contextText4", {
        opacity: 1,
        duration: 2,
        onComplete: () => {
            canSkip = true;
        },
    }, "-=1.5")
    .to("#slide5", {
        maskPosition: "0% -5vh",
        // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
    }, "+=1");

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);
scene.add(camera);
camera.position.x = 26;
camera.lookAt(0, 0, 0);

// add some ambient light to the scene
// const directionalLight = new THREE.DirectionalLight(0xF6F193, 0.7);
// directionalLight.position.set(1, 1, 1).normalize();
// directionalLight.castShadow = true;
// scene.add(directionalLight);
//
// const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
// directionalLight2.position.set(1, 70, 1).normalize();
// directionalLight2.castShadow = true;
// scene.add(directionalLight2);
//
// const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.6);
// hemisphereLight.position.set(0, 25, 18);
// scene.add(hemisphereLight);
//
// const hemisphereLight2 = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
// hemisphereLight2.position.set(0, 5, -10);
// scene.add(hemisphereLight2);
// const axesHelper = new THREE.AxesHelper(25);
// scene.add(axesHelper);

// Create renderer
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.LinearFilter;
renderer.toneMappingExposure = .8;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

// Load GLTF model
const loader = new GLTFLoader();

let mixer;
let Astronot;
let loaded = false;
const modelScale = 34;


const texture = "Aquatica/castle.hdr";
const RgbeLoader = new RGBELoader();
RgbeLoader.load(texture, function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    // scene.background = texture
    // texture.dispose();
});

loader.load(
    "finalModel/model.glb",
    function (gltf) {
        scene.add(gltf.scene);
        Astronot = gltf.scene.children[0];
        loaded = true;
        // gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.scale.set(modelScale, modelScale, modelScale);

        mixer = new THREE.AnimationMixer(gltf.scene);

        const animation = gltf.animations[0]; // Assuming there's only one animation
        const action = mixer.clipAction(animation);
        action.play();
        action.setLoop(THREE.LoopRepeat, Infinity); // Set the loop to repeat infinitely
    },
    function (xhr) {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
        console.log("An error happened");
        console.log(error);
    },
);
camera.position.x = 0;
camera.position.y = 70;
camera.position.z = 70;
let rotation = { x: 0, y: 0, z: 0 };

// const camera_position_array = [
//     { x: 0, y: 45, z: 10 }, // to make it up
//     { x: 0, y: 48, z: 20 }, // to make it face the model
//     { x: 20, y: 50, z: 15 }, // to the earing position
//     { x: 6, y: 38, z: 17 }, // to the chest
//     { x: -12, y: 35, z: 17 }, // to the left wrist
//     { x: -23, y: 30, z: -10 }, // to the left wrist
//     { x: 15, y: 40, z: -20 }, // to the bag
//     { x: 20, y: 32, z: 1 }, // to the right wrist
//     { x: 11, y: 32, z: 22 }, // to the waist
//     { x: -20, y: 25, z: 25 }, // to the waist
//     { x: -20, y: 17, z: 3 }, // to the waist
//     { x: -5, y: 12, z: -15 }, // to the knee
//     { x: 20, y: 8, z: -3 }, // to the right boots
//     { x: 10, y: 4, z: 10 }, // to the left boots
//     { x: 0, y: 48, z: 20 }, // to make it face the model
// ];
//
// const camera_lookat_array = [
//     { x: -5, y: 40, z: 3 }, // look away from the model
//     { x: 0, y: 46, z: 7 }, // on to the face
//     { x: 4, y: 48, z: 1.5 }, // to the ear
//     { x: 3, y: 38, z: 5 }, // to the chest
//     { x: -10, y: 30, z: 3.5 }, // to the left wrist
//     { x: -6, y: 30, z: 0 }, // to the left wrist
//     { x: 0, y: 38, z: -7 }, // to the bag
//     { x: 10, y: 30, z: 3.5 }, // to the right wrist
//     { x: -2, y: 30, z: 5 }, // to the waist
//     { x: 2, y: 27, z: 5 }, // to the waist
//     { x: 0, y: 18, z: 0 }, // to the midleg
//     { x: -5, y: 5, z: 0 }, // to the  knee
//     { x: 5, y: 3.5, z: 3 }, // to the right boots
//     { x: -1, y: 1.5, z: 1 }, // to the left boots
//     { x: 0, y: 46, z: 7 }, // on to the face
// ];
const camera_position_array = [
    { x: -1, y: 48, z: 20 }, // to make it up
    { x: 0, y: 48, z: 20 }, // to make it face the model
    { x: -20, y: 50, z: 15 }, // to the earing position
    { x: 2, y: 38, z: 17 }, // to the chest
    { x: -12, y: 35, z: 17 }, // to the left wrist
    { x: -23, y: 30, z: -10 }, // to the left wrist
    { x: 15, y: 40, z: -20 }, // to the bag
    { x: 20, y: 32, z: 1 }, // to the right wrist
    { x: 11, y: 32, z: 22 }, // to the waist
    { x: -20, y: 25, z: 25 }, // to the waist
    { x: -20, y: 17, z: 3 }, // to the waist
    { x: -5, y: 12, z: -15 }, // to the knee
    { x: 20, y: 8, z: -3 }, // to the right boots
    { x: 10, y: 6, z: 15 }, //15o the left boots
    { x: 0, y: 35, z: 30 }, // to make it face the model
];

const camera_lookat_array = [
    { x: 8.5, y: 47, z: 12 }, // look away from the model
    { x: 0, y: 46, z: 7 }, // on to the face
    { x: -3, y: 48, z: 4 }, // to the ear
    { x: 3, y: 38, z: 5 }, // to the chest
    { x: -10, y: 30, z: 3.5 }, // to the left wrist
    { x: -6, y: 30, z: 0 }, // to the left wrist
    { x: 0, y: 38, z: -7 }, // to the bag
    { x: 10, y: 30, z: 3.5 }, // to the right wrist
    { x: -2, y: 30, z: 5 }, // to the waist
    { x: 2, y: 27, z: 5 }, // to the waist
    { x: 0, y: 18, z: 0 }, // to the midleg
    { x: -5, y: 5, z: 0 }, // to the  knee
    { x: 5, y: 3.5, z: 3 }, // to the right boots
    { x: -1, y: 1.5, z: 1 }, // to the left boots
    { x: 0, y: 36, z: 7 }, // on to the face
];
const timeArray = [
    { duration_1: 5, duration_2: 5, gap: 15 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
    { duration_1: 5, duration_2: 5, gap: 5 },
];
const easeArray = [
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
    { ease: "power3", stage: "inout" },
];

const point = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x00ffff }),
);
point.position.set(0, 0, 0);
// scene.add(point);
// for (let i = 0; i < camera_position_array.length; i++) {
//     let color = 0xff0000;
//     // change the last one to pink
//     if (i === camera_position_array.length - 1) {
//         color = 0xff00ff;
//     }
//
//     let point = new THREE.Mesh(
//         new THREE.SphereGeometry(0.2, 32, 32),
//         new THREE.MeshBasicMaterial({ color: color }),
//     );
//     point.position.set(
//         camera_position_array[i].x,
//         camera_position_array[i].y,
//         camera_position_array[i].z,
//     );
//     scene.add(point);
//
//     color = 0x00ff00;
//     // change the last one to pink
//     if (i === camera_position_array.length - 1) {
//         color = 0xffffff;
//     }
//     point = new THREE.Mesh(
//         new THREE.SphereGeometry(0.2, 32, 32),
//         new THREE.MeshBasicMaterial({ color: color }),
//     );
//     point.position.set(
//         camera_lookat_array[i].x,
//         camera_lookat_array[i].y,
//         camera_lookat_array[i].z,
//     );
//     scene.add(point);
// }

const numPositions = camera_position_array.length;
let count = 0;
const modelTextList = document.getElementsByClassName("modelText");
for (let i = 0 + 1; i < numPositions; i++) {
    slidetimeline.to(camera.position, {
        duration: timeArray[i].duration_1,
        x: camera_position_array[i].x,
        y: camera_position_array[i].y,
        z: camera_position_array[i].z,
        ease: `${easeArray[i].ease}.${easeArray[i].stage}`,
    });

    slidetimeline.to(point.position, {
        duration: timeArray[i].duration_2,
        x: camera_lookat_array[i].x,
        y: camera_lookat_array[i].y,
        z: camera_lookat_array[i].z,
        ease: `${easeArray[i].ease}.${easeArray[i].stage}`,
    }, `-=${timeArray[i].gap}`);

    if (i === 1 || i === 2 || i === 3 || i === 6 || i === 8 || i === 13) {
        slidetimeline.to(modelTextList[count], {
            opacity: 1,
            duration: 2,
        }, "-=1")
            .to(modelTextList[count], {
                opacity: 0,
                duration: 2,
            }, "+=0.5");
        count++;
    }
}

point.position.set(
    camera_lookat_array[0].x,
    camera_lookat_array[0].y,
    camera_lookat_array[0].z,
);
camera.position.set(
    camera_position_array[0].x,
    camera_position_array[0].y,
    camera_position_array[0].z,
);

// camera_timeline.then(() => {
//     setTimeout(() => {
//         controls.enabled = true;
//     }, 3000);
// });
//
// // listen to the space bar and play the Animation
// document.addEventListener("keyup", function (e) {
//     // set the initial camera position and the lookat position
//     camera.position.set(
//         camera_position_array[0].x,
//         camera_position_array[0].y,
//         camera_position_array[0].z,
//     );
//     point.position.set(
//         camera_lookat_array[0].x,
//         camera_lookat_array[0].y,
//         camera_lookat_array[0].z,
//     );
//     if (e.code === "Space") {
//         camera_timeline.restart();
//
//         controls.enabled = false;
//     }
// });

// Event listener for window resize
function handleResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
}

window.addEventListener("resize", handleResize);
handleResize();
//
// // controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
//
// Create clock
const clock = new THREE.Clock();
// Animation function
function animate() {
    camera.lookAt(point.position);

    requestAnimationFrame(animate);

    if (loaded) {
        mixer.update(clock.getDelta());
    }

    const elapsedTime = clock.getElapsedTime();
    // Update controls
    // if (controls.enabled) {
    //     controls.update();
    // }
    //
    renderer.render(scene, camera);
}

// Start animation
animate();
