import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let winCount = 30;
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
        maskPosition: "0% -4.5vh",
        // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
    })
    .to(".contextText1", {
        opacity: 1,
        duration: 2,
    }, "-=1.5")
    .to("#slide2", {
        maskPosition: "0% -4.5vh",
        // clipPath: "polyg5on(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
    }, "+=1")
    .to(".contextText2", {
        opacity: 1,
        duration: 2,
    }, "-=1.5")
    .to("#slide3", {
        maskPosition: "0% -4.5vh",
        // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
    }, "+=1")
    .to(".contextText3", {
        opacity: 1,
        duration: 2,
    }, "-=1.5")
    .to("#slide4", {
        maskPosition: "0% -4.5vh",
        // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
    }, "+=1")
    .to(".contextText4", {
        opacity: 1,
        duration: 2,
    }, "-=1.5")
    .to("#slide5", {
        maskPosition: "0% -4.5vh",
        // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
    }, "+=1");

const index = 10000;
const frameCount = 240;
const currentFrame = (index) => (
    `/Aquatica/Renders/Char_Turn_Around${(10000 + index).toString()}.webp`
);

// Example usage:
const images = [];

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Canvas setup
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 1158;
canvas.height = 770;

// Airpods animation setup
const airpods = {
    frame: 0,
};
slidetimeline.to(airpods, {
    frame: frameCount - 1,
    snap: "frame",
    duration: 20,
    ease: "power2.out",
    onUpdate: render,
});

images[0].onload = render;

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const img = images[airpods.frame];

    // Calculate the scaling factors to fit the image within the canvas
    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.min(scaleX, scaleY);

    // Calculate the dimensions after scaling
    const scaledWidth = img.width * scaleX;
    const scaledHeight = img.height * scaleY;

    // Calculate the position to center the scaled image on the canvas
    const offsetX = (canvas.width - scaledWidth) / 2;
    const offsetY = (canvas.height - scaledHeight) / 2;

    // center the image
    const offX = (canvas.width - img.width) / 2;
    const offY = (canvas.height - img.height) / 2;
    // Draw the scaled and centered image
    context.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
    // context.drawImage(img, offX, offY, img.width, img.height);
}
