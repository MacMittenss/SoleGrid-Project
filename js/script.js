// === Navigation Shadow ===
function go() {
  const header = document.querySelector(".main-nav");
  window.addEventListener("scroll", () => {
    header.classList.toggle("nav-shadow", window.scrollY > 1);
  });
}

// === Fade-In Hero Section ===
function fadeInHero() {
  const element = document.getElementById("showcase");
  if (!element) return;
  let opacity = 0;
  const fadeIn = setInterval(() => {
    if (opacity >= 1) return clearInterval(fadeIn);
    element.style.opacity = opacity;
    opacity += 0.01;
  }, 5);
}

// === Scroll Animation for Articles ===
function applyScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// === Lazy Load Images ===
function setupLazyLoading() {
  const lazyImages = document.querySelectorAll(".lazy-load");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy-load");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));
}

// === Fetch and Display Articles from JSON ===
async function fetchArticles() {
  try {
    const response = await fetch("articles.json");
    const articles = await response.json();
    displayArticles(articles);
  } catch (error) {
    console.error("Error loading articles:", error);
  }
}

function displayArticles(articles) {
  const container = document.getElementById("articles-container");
  if (!container) return;

  const today = new Date();

  articles
    .filter(article => {
      if (!article.publish_date) return true; // allow older ones without a publish_date
      const releaseDate = new Date(article.publish_date);
      return releaseDate <= today;
    })
    .forEach(article => {
      const card = document.createElement("article");
      card.classList.add("card", "fade-in");
      card.innerHTML = `
        <img src="${article.image}" data-src="${article.image}" alt="${article.title}" class="lazy-load">
        <div class="category category-${article.category.toLowerCase()}">${article.category}</div>
        <h3><a href="${article.link}">${article.title}</a></h3>
        <p>${article.description}</p>
      `;
      container.appendChild(card);
    });

  setupLazyLoading();
  applyScrollAnimations();
}

// === Smooth Scrolling for Internal Links ===
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 50,
          behavior: "smooth"
        });
      }
    });
  });
}

// === Combined Initialization ===
document.addEventListener("DOMContentLoaded", () => {
  go();
  fadeInHero();
  fetchArticles();
  setupSmoothScrolling();
});

