const menuIcon = document.querySelector('.icon_burger_wrapper')
const menu = document.querySelector('.nav_header_mobile')
const closeIcon = document.querySelector('header .icon_cross_wrapper')
const carouselSlider = document.querySelector('.carousel')
const slider = document.querySelector('.slider')

menuIcon.onclick = () => {
    menu.style.transform = 'translateY(0)'
    menu.style.transition = 'transform 1s'
}

closeIcon.onclick = () => {
    menu.style.transform = 'translateY(-490px)'
    menu.style.transition = 'transform 1s'
}

// Slider with fade effect slide show

if(carouselSlider) {
    let currentSlideIndex = 0
    let lastSlideIndex = slider.children.length - 1
    let intervalID = 0

    function resetSlides() {
        for(let i = 0; i < slider.children.length; i++) {
            slider.children[i].style.opacity = 0
            slider.children[i].style.zIndex = 0
        }
    }

    function startShow() {
        intervalID = setInterval(() => {
            resetSlides()
            currentSlideIndex = currentSlideIndex < lastSlideIndex ? ++currentSlideIndex : 0
            slider.children[currentSlideIndex].style.opacity = 1
            slider.children[currentSlideIndex].style.zIndex = 1   
        }, 6000)
    }

    startShow()

    carouselSlider.onmouseover = () => {
        clearInterval(intervalID)
    }

    carouselSlider.onmouseout = () => {
        startShow()
    }
}