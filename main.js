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

// inject a random tip into the gameTips 
gameTips.innerHTML = gameTipsList[Math.floor(Math.random() * gameTipsList.length)];
