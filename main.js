const cardList = document.getElementsByClassName("catCard");
const scrollCon = document.getElementById("catCardCon");
import gsap from "gsap";


for (let i = 0; i < cardList.length; i++) {
    cardList[i].classList.add("inactiveCard");
}
cardList[0].classList.remove("inactiveCard");
cardList[0].classList.add("activeCard");
let i = 0;
window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        gsap.to(scrollCon, {
            x: 0,
            duration: 1,
            ease: "power2.inOut",
        })
    }
});


const gameTipsList = [
    "Constellation ships sail through the cosmic theater.",
    "Astrokidz bound by mystery and shared journey.",
    "Holographic skies echo tales of cosmic wonders.",
    "Legends speak of 'Aquatica'—a shimmering sanctuary.",
    "Worlds untouched, every grain holds purpose.",
    "Adventure whispers in distant sapphire glow.",
    "Crafted shores of the unknown call out.",
    "Astrokidz dream of staking their claim.",
    "Journey aims for 'Aquatica's' untouched worlds.",
    "Cosmic odyssey unfolds in the endless expanse.",
    "In the cosmic theater, a constellation of ships sets sail, bearing the emblem of a radiant star and a child.",
    "Bound by a shared journey, the Astrokidz weave tales of mysteries half-told and memories not fully formed.",
    "Amidst holographic skies and whispered secrets, the Astrokidz find solace in tales of cosmic wonders.",
    "In the vastness of space, a shimmering cluster beckons—the legendary sanctuary known as 'Aquatica.'",
    "Legends speak of worlds untouched, where every grain of sand holds a purpose, in the distant glow of 'Aquatica.'",
    "With every whisper of adventure, the Astrokidz dream of staking their claim on the crafted shores of the unknown."
]

const gameTips = document.getElementById("loaderTip");
let isLoaded = false
gameTips.innerHTML = gameTipsList[Math.floor(Math.random() * gameTipsList.length)];

function logEveryThreeSeconds() {
    gameTips.innerHTML = gameTipsList[Math.floor(Math.random() * gameTipsList.length)];
    if (!isLoaded) {
        setTimeout(logEveryThreeSeconds, 3000);
    }
}

setTimeout(logEveryThreeSeconds, 3000);


window.addEventListener("load", () => {
    isLoaded = true
    const loader = document.getElementById("loader");

    window.scrollTo(0, 0);

    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        onStart: () => {
            addNav()
        },
        onComplete: () => {

            loader.style.display = "none";
        }
    })
})


const handleSubmit = (event) => {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    })
        .then(() => alert("Thank you We will get back to you soon.!"))
        .catch((error) => alert(error));
};

document
    .querySelector("form")
    .addEventListener("submit", handleSubmit);



const addNav = () => {
    const nav = document.createElement("nav");

    nav.innerHTML = `
        <div class="navCon">
            <div>
                <h1 class="navTitle">Welcome</h1>
                <div class="navLink" id="topScroll"><h1>as</h1></div>
            </div>
            <div>
                <h1 class="navTitle">AstroKid</h1>
                <div class="navLink" id="charScroll"><h1>as</h1></div>
            </div>
            <div>
                <h1 class="navTitle">Persona</h1>
                <div class="navLink" id="pathScroll"><h1>as</h1></div>
            </div>
            <div>
                <h1 class="navTitle">Comics</h1>
                <div class="navLink" id="comicScroll"><h1>as</h1></div>
            </div>
            <div>
                <h1 class="navTitle">Astrokidz collection</h1>
                <div class="navLink" id="nftScroll"><h1>as</h1></div>
            </div>
            <div>
                <h1 class="navTitle">Newsletter</h1>
                <div class="navLink" id="bottomScroll"><h1>as</h1></div>
            </div>
        </div>
    `;

    document.getElementsByClassName("pin-spacer")[0].appendChild(nav)
    document.getElementById("topScroll").addEventListener("click", (e) => {
        e.preventDefault()
        console.log("click")
        window.scrollTo({
            top: window.innerHeight * 0,
            behavior: "smooth"
        })
    })
    document.getElementById("nftScroll").addEventListener("click", (e) => {
        e.preventDefault()
        console.log("click")
        window.scrollTo({
            top: window.innerHeight * 15,
            behavior: "smooth"
        })
    })
    document.getElementById("comicScroll").addEventListener("click", (e) => {
        e.preventDefault()
        console.log("click")
        window.scrollTo({
            top: window.innerHeight * 14,
            behavior: "smooth"
        })
    })
    document.getElementById("pathScroll").addEventListener("click", (e) => {
        e.preventDefault()
        console.log("click")
        window.scrollTo({
            top: window.innerHeight * 13,
            behavior: "smooth"
        })
    })
    document.getElementById("charScroll").addEventListener("click", (e) => {
        e.preventDefault()
        console.log("click")
        window.scrollTo({
            top: window.innerHeight * 2.5,
            behavior: "smooth"
        })
    })
    document.getElementById("bottomScroll").addEventListener("click", (e) => {
        e.preventDefault()
        console.log("click")
        window.scrollTo({
            top: window.innerHeight * 16,
            behavior: "smooth"
        })
    })


    setTimeout(() => {

        const navTittleArr = document.getElementsByClassName("navTitle");
        const navLinkArr = document.getElementsByClassName("navLink");

        for (let i = 0; i < navLinkArr.length; i++) {
            navLinkArr[i].addEventListener("mouseover", () => {
                gsap.to(navTittleArr[i], {
                    opacity: 1,
                    duration: 0.5
                })
            });
            navLinkArr[i].addEventListener("mouseout", () => {
                gsap.to(navTittleArr[i], {
                    opacity: 0,
                    duration: 0.5
                })
            });
        }

    }, 1000);
}
