import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let addClass

window.addEventListener("load", () => {
    setTimeout(() => {
        const navElements = document.getElementsByClassName("navLink")
        addClass = (number) => {
            for (let i = 0; i < navElements.length; i++) {
                if (navElements[i].classList.contains("activeNavCom")) {
                    navElements[i].classList.remove("activeNavCom");
                }
            }
            navElements[number].classList.add("activeNavCom");
        }
        const removeClass = (number) => {
            navElements[number].classList.remove("activeNavCom");
        }

        const Observer1 = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    addClass(2)
                } else {
                    removeClass(2)
                }
            });
        });
        const curosol = document.querySelectorAll(".curosolTitle");
        curosol.forEach((el) => Observer1.observe(el));

        const Observer2 = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    addClass(3)
                } else {
                    removeClass(3)
                }
            });
        });
        const curoso2 = document.querySelectorAll("#LORE");
        curoso2.forEach((el) => Observer2.observe(el));


        const Observer3 = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    addClass(4)
                } else {
                    removeClass(4)
                }
            });
        });
        const curoso3 = document.querySelectorAll("#NFT");
        curoso3.forEach((el) => Observer3.observe(el));

        const Observer4 = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    addClass(5)
                } else {
                    removeClass(5)
                }
            });
        });
        const curoso4 = document.querySelectorAll("#socials");
        curoso4.forEach((el) => Observer4.observe(el));

    }, 1000)
})

let winCount = 12;
let isMob = false;
// detect if the user is on mobile
if (window.innerWidth < 768) {
    winCount = 27;
    isMob = true;
}
if (!isMob) {
    const lenis = new Lenis({
        duration: 0.2,
    });
    lenis.on("scroll", (e) => {
        // console.log(e.actualScroll);
        // console.log(e);
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 100);
    });

    gsap.ticker.lagSmoothing(0);
}

const slidetimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: `+=${window.innerHeight * winCount}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        // markers: true
    },
});

if (!isMob) {
    slidetimeline
        .to("#slide1", {
            maskPosition: "0% -4.5vh",
            // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 2,
        })
        .to(".contextText1", {
            opacity: 1,
            duration: 1,
        }, "-=1.5")
        .to("#slide2", {
            maskPosition: "0% -4.5vh",
            // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 2,
        }, "+=1")
        .to(".contextText2", {
            opacity: 1,
            duration: 1,
        }, "-=1.5")
        .to("#slide3", {
            maskPosition: "0% -4.5vh",
            // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 2,
        }, "+=0")
        .to(".contextText3", {
            opacity: 1,
            duration: 1,
        }, "-=1.5")
        .to("#slide4", {
            maskPosition: "0% -4.5vh",
            // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 2,
        }, "+=0")
        .to(".contextText4", {
            opacity: 1,
            duration: 1,
        }, "-=1.5")
        .to("#slide5", {
            maskPosition: "0% -4.5vh",
            // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 3,
            onComplete: () => {
                addClass(1)
            }
        }, "+=0");
}

const index = 10000;
const frameCount = 240;
const currentFrame = (index) => (
    `/Aquatica/Renders${isMob ? "Mob" : ""}/Char_Turn_Around${(10000 + index).toString()
    }.webp`
    // `/Aquatica/Renders/Char_Turn_Around${(10000 + index).toString()}.webp`
);

// Example usage:
const images = [];

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

Promise.all(images.map((img) => {
    return new Promise((resolve) => {
        img.onload = resolve;
    });
})).then(() => {
    // Initialize scroll animations here
    ScrollTrigger.refresh();
});

// Canvas setup
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 1158;
canvas.height = 770;

// Airpods animation setup
const airpods = {
    frame: 0,
};

// Extend the duration to add time for fade-in and fade-out
const totalAnimationDuration = 7;
let frameTransitionDuration = totalAnimationDuration / frameCount;

let count = 0;
const modelTextList = document.getElementsByClassName("modelText");
// Step 1: Add the debounce function
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(context, args);
        }, wait);
    };
}

const debouncedRender = debounce(render, 0);

if (!isMob) {
    for (let i = 0; i < frameCount - 1; i++) {
        slidetimeline.to({}, {
            duration: frameTransitionDuration,
            onUpdate: function () {
                // console.log("Frame Count:", i);
                debouncedRender(); // Use the debounced render function
            },
        }, `+=${frameTransitionDuration}`)
            .to(airpods, {
                frame: i + 1,
                snap: "frame",
                duration: frameTransitionDuration,
                onUpdate: function () {
                    console.log("Frame Count:", i);
                    debouncedRender(); // Use the debounced render function
                },
            });

        if (
            i === 0 || i === 25 || i === 61 || i === 93 || i === 116 || i === 151 || i === 176 ||
            i === 215
        ) {
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

}
images[0].onload = render;

if (isMob) {
    frameTransitionDuration *= 0.5;
    const mobTimeline = gsap.timeline({
        paused: true,
    });

    for (let i = 0; i < frameCount - 1; i++) {
        mobTimeline.to({}, {
            duration: frameTransitionDuration,
            onUpdate: function () {
                // console.log("Frame Count:", i);
                debouncedRender(); // Use the debounced render function
            },
        }, `+=${frameTransitionDuration}`)
            .to(airpods, {
                frame: i + 1,
                snap: "frame",
                duration: frameTransitionDuration,
                onUpdate: function () {
                    // console.log("Frame Count:", i);
                    debouncedRender(); // Use the debounced render function
                },
            });

        if (i === 0) {
            mobTimeline
                .to(modelTextList[count], {
                    opacity: 1,
                    duration: 2,
                }, "-=1")
                .to(modelTextList[count], {
                    opacity: 0,
                    duration: 1,
                }, "+=0.5");
            count++;
        }

        if (
            i === 25 || i === 61 || i === 93 || i === 116 || i === 151 || i === 176 ||
            i === 215
        ) {
            mobTimeline
                .to(modelTextList[count], {
                    opacity: 1,
                    duration: 2,
                }, "-=1")
                .to(modelTextList[count], {
                    opacity: 0,
                    duration: 1,
                }, "+=0.5");
            count++;
        }
    }
    mobTimeline.then(() => {
        setTimeout(() => {
            mobTimeline.restart()
        }, 1000);
    })


    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // setTimeout(() => {
                mobTimeline.play();
                // }, 500);
                // entry.target.classList.add("show");
            } else {
                mobTimeline.pause();
                // entry.target.classList.remove("show");
            }
        });
    });
    const hiddenElements2 = document.querySelectorAll("#canvas");
    hiddenElements2.forEach((el) => observer2.observe(el));
}

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
    if (isMob) {
        // context.drawImage(img, offX, offY, img.width, img.height);
        context.drawImage(img, offX, offY, img.width, img.height);
    } else {
        context.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
    }
}
