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

// Dynamic Article Loading //
document.addEventListener("DOMContentLoaded", () => {
  const articlesContainer = document.querySelector(".articles-container");
  const loadMoreBtn = document.getElementById("load-more-btn");

  if (!articlesContainer || !loadMoreBtn) {
    console.error("Missing .articles-container or #load-more-btn");
    return;
  }

  let articles = [];
  let articlesLoaded = 0;
  const articlesPerClick = 3; // Load 3 articles at a time

  // Fetch articles from JSON
  fetch("articles.json")
    .then(response => response.json())
    .then(data => {
      articles = data;
      loadMoreBtn.style.display = "block"; // Show button once data loads
    })
    .catch(error => console.error("Error loading articles:", error));

    function loadMoreArticles() {
      if (articlesLoaded >= articles.length) {
        loadMoreBtn.style.display = "none";
        return;
      }
    
      const nextArticles = articles.slice(articlesLoaded, articlesLoaded + articlesPerClick);
      nextArticles.forEach(article => {
        const newArticle = document.createElement("article");
        newArticle.classList.add("card");
    
        newArticle.innerHTML = `
          <a href="${article.link}">
            <img src="${article.image}" alt="${article.title}">
          </a>
          <div class="category category-ent">${article.category}</div>
          <h3><a href="${article.link}">${article.title}</a></h3>
          <p>${article.description}</p>
        `;
    
        // Ensure articles are visible
        newArticle.style.visibility = "visible";
        newArticle.style.opacity = "1";
    
        articlesContainer.appendChild(newArticle);
      });
    
      articlesLoaded += articlesPerClick;
    
      if (articlesLoaded >= articles.length) {
        loadMoreBtn.style.display = "none";
      }
    }

  loadMoreBtn.addEventListener("click", loadMoreArticles);
});

// Scroll Animations //
document.addEventListener("DOMContentLoaded", () => {
  const fadeInElements = document.querySelectorAll(".fade-in");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2, // Trigger when 20% of the element is visible
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  fadeInElements.forEach(element => fadeInObserver.observe(element));
});