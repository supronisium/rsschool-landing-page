// ############## MENU ##############
document.querySelector('.burger__menu').addEventListener('click', function() {  
  this.classList.toggle('burger__menu_active');
  document.querySelector('.nav').classList.toggle('open');
  document.querySelector('.block__body').classList.toggle('collapsed');
});
// close if click
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelector('.burger__menu').classList.remove('burger__menu_active');
    document.querySelector('.nav').classList.remove('open');
    document.querySelector('.block__body').classList.remove('collapsed');
  });
});


// ############## DARK THEME ##############
const themeItems = document.querySelectorAll('.theme-selector__item');
function setTheme(theme) {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    themeItems.forEach(item => {
        item.classList.toggle(
            'theme-selector__item--active',
            item.dataset.theme === theme
        );
    });
    localStorage.setItem('theme', theme);
}
themeItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        setTheme(item.dataset.theme);
    });
});
// Restore theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);


// ############## SLIDER ##############

document.addEventListener("DOMContentLoaded", function () {
    const banners = document.querySelectorAll(".slider__banner");
    const prevBtn = document.querySelector(".slider__prev a");
    const nextBtn = document.querySelector(".slider__next a");
    const controls = document.querySelectorAll(".slider__bottom-control a");
    let currentIndex = 0;
    let autoSlideInterval;

    const sliderBanners = document.querySelector(".slider__banners");
    sliderBanners.style.position = "relative";

    banners.forEach((banner, i) => {
        banner.style.position = "absolute";
        banner.style.top = "0";
        banner.style.left = "0";
        banner.style.width = "100%";
        banner.style.height = "100%";
        banner.style.transition = "opacity 0.8s ease-in-out";
        banner.style.opacity = i === currentIndex ? "1" : "0";
        banner.style.pointerEvents = i === currentIndex ? "auto" : "none";
    });

    // current slide show
    function showSlide(index) {
        banners.forEach((banner, i) => {
            banner.style.opacity = i === index ? "1" : "0";
            banner.style.pointerEvents = i === index ? "auto" : "none";
        });

        // reload slide
        controls.forEach((control, i) => {
            if (i === index) {
                control.classList.add("active");
            } else {
                control.classList.remove("active");
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % banners.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + banners.length) % banners.length;
        showSlide(currentIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    nextBtn.addEventListener("click", function (e) {
        e.preventDefault();
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener("click", function (e) {
        e.preventDefault();
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // bottom SLIDER navigation
    controls.forEach((control, i) => {
        control.addEventListener("click", function (e) {
            e.preventDefault();
            stopAutoSlide();
            currentIndex = i;
            showSlide(currentIndex);
            startAutoSlide();
        });
    });

    showSlide(currentIndex); // inicialization
    startAutoSlide();
});