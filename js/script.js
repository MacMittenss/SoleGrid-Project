// For Nav Shadow
let go = () => {

    let headerShadow = document.getElementsByClassName("main-nav")[0];

    let shadow = () => {
        let yAxis = window.scrollY;

        if (yAxis >= 1) {
            headerShadow.classList.add("nav-shadow");
        } else {
            headerShadow.classList.remove("nav-shadow");
        }
    }

    window.addEventListener("scroll", shadow);
}

// Fade-In logo before main page

// For Fade-in
let element = document.getElementById("showcase");
let opacity = 0;
let fadeIn = setInterval(() => {
    if (opacity >= 1) {
        clearInterval(fadeIn);
     }
     element.style.opacity = opacity;
     opacity += 0.01;
  }, 5); 

// For Scroll Animation  
const items = document.querySelectorAll('article, aside');

const isInViewport = el => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= 
      (window.innerHeight / 5 * 3 || document.documentElement.clientHeight) &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
};

  const run = () =>
  items.forEach(item => {
    if (isInViewport(item)) {
      item.classList.add('show');
    }
  });

// Events
window.addEventListener('load', run);
window.addEventListener('resize', run);
window.addEventListener('scroll', run);

run, go();

// fade in page
