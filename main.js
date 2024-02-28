const btn = document.getElementsByClassName("StupidBtn")[0];
const btn2 = document.getElementsByClassName("StupidBtn2")[0];
const slider = document.getElementsByClassName("catCardCon")[0];


// get the width of the slider 
const sliderWidth = slider.offsetWidth;
let sliderPos = 0;

const sliderItems = document.getElementsByClassName("catCard");

const elements = sliderItems.length;
let current = 0
// make its state = active
// sliderItems[current].classList.add("catCardActive");

// on btn click slide the slider to the left 10% of its width 
btn.addEventListener("click", () => {
    sliderPos += 10;
    if (sliderPos > 80) {
        sliderPos = 80;
    }
    slider.style.transform = `translateX(-${sliderPos}%)`;
})
btn2.addEventListener("click", () => {
    sliderPos -= 10;
    if (sliderPos < 0) {
        sliderPos = 0;
    }
    slider.style.transform = `translateX(-${sliderPos}%)`;
})

