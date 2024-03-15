const cardList = document.getElementsByClassName("catCard");
const scrollCon = document.getElementById("catCardCon");
import gsap from "gsap";
// add inactiveCard to the whole list
for (let i = 0; i < cardList.length; i++) {
    cardList[i].classList.add("inactiveCard");
}

let i = 0;
// there are 11 cards in the list after 2 sec remove the prev one and then jump to the next one
setInterval(() => {
    cardList[i].classList.remove("activeCard");
    cardList[i].classList.add("inactiveCard");
    i = (i + 1) % cardList.length;

    if (window.innerWidth < 900) {
        gsap.to(scrollCon, {
            x: `-${i * 5}rem`,
            duration: 1,
            ease: "power2.inOut",
        })
    }
    cardList[i].classList.remove("inactiveCard");
    cardList[i].classList.add("activeCard");

    // transfrom the scrollCon to the next card
    // scrollCon.style.transform = `translateX(-${5 * 16}px)`;
}, 4000);

// if window size exceed teh 900px then remove the transform
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
    "You can use the arrow keys to move the character",
    "You can use the space key to jump",
    "You can use the shift key to sprint",
    "You can use the control key to crouch",
    "You can use the left mouse button to attack",
    "You can use the right mouse button to block",
    "You can use the middle mouse button to use the special ability",
    "You can use the E key to interact with the environment",
    "You can use the Q key to use the special ability",
    "You can use the R key to reload",
    "You can use the F key to use the flashlight",
    "You can use the G key to use the"
]

const gameTips = document.getElementById("loaderTip");
//
// // inject a random tip into the gameTips 
gameTips.innerHTML = gameTipsList[Math.floor(Math.random() * gameTipsList.length)];

// check if all the assets are loaded 
window.addEventListener("load", () => {
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
            <h1 class="navTitle">TOP</h1>
            <div title="Top" class="navLink" id="topScroll"></div>
        </div>
        <div>
            <h1 class="navTitle">Astro Kid</h1>
            <div title="Astro Kid" class="navLink" id="charScroll"></div>
        </div>
        <div>
            <h1 class="navTitle">Path's</h1>
            <div title="Path" class="navLink" id="pathScroll"></div>
        </div>
        <div>
            <h1 class="navTitle">Comic Section</h1>
            <div title="Lore" class="navLink" id="comicScroll"></div>
        </div>
        <div>
            <h1 class="navTitle">NFT's</h1>
            <div title="NFT's" class="navLink" id="nftScroll"></div>
        </div>
        <div>
            <h1 class="navTitle">Contact Us</h1>
            <div title="Know Us" class="navLink" id="bottomScroll"></div>
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

        // when the link is hovered then the opacity of nav link =1 
        for (let i = 0; i < navLinkArr.length; i++) {
            navLinkArr[i].addEventListener("mouseover", () => {
                gsap.to(navTittleArr[i], {
                    opacity: 1,
                    duration: 0.5
                })
                // navTittleArr[i].style.opacity = 1;
            });
            navLinkArr[i].addEventListener("mouseout", () => {
                // navTittleArr[i].style.opacity = 0;
                gsap.to(navTittleArr[i], {
                    opacity: 0,
                    duration: 0.5
                })
            });
        }

    }, 1000);


}



