let LScrPos = window.scrollY;
let titleSec = document.querySelector(".title-section");
let titleSecBot = titleSec.scrollHeight;
let articleSec = document.querySelector(".article-section");
let articleSecTop = articleSec.getBoundingClientRect().top;

let scale = 1;
let x = -1;

document.addEventListener("scroll", function(e) {
  let CScrPos = window.scrollY;
  if (
    CScrPos > titleSecBot &&
    CScrPos < articleSecTop - titleSecBot
  ) {
    let text = document.querySelector(".hero-section svg text");
    if (CScrPos > LScrPos) {
      if (scale <= 64) {
        scale = scale * 2;
      }
    } else {
      if (scale >= 2) {
        scale = scale / 2;
      }
    }

  }
  if (
    CScrPos > titleSecBot * 1.6 &&
    CScrPos < articleSecTop
  ) {
    let title = document.querySelector(".hero-section .hero-title");
    if (CScrPos > LScrPos) {
      if (x >= -150) {
        x = x / 1.5;
      }
    } else {
      if (x <= -1.5) {
        x = x * 1.5;
      }
    }

    title.style.transform = `translateX(${x}%)`;
  } else {
    let title = document.querySelector(".hero-section .hero-title");
  }
  LScrPos = CScrPos;
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("mouseover", () => {
    anime({
      targets: link,
      keyframes: [
        { translateY: "-2px" },
        { translateY: "4px" },
        { translateY: "0px" },
        { translateY: "2px" },
        { translateY: "-4px" },
        { translateY: "0px" }
      ],
      duration: 400,
      easing: "easeInOutExpo"
    });
  });
});

document.querySelectorAll(".article-body").forEach(link => {
  link.addEventListener("mouseover", () => {
    anime({
      targets: link,
      keyframes: [
        { translateX: "-4px" },
        { translateX: "0px" },
        { translateX: "4px" },
        { translateX: "0px" }
      ],
      duration: 400,
      easing: "easeInOutExpo"
    });
  });
});

anime
  .timeline()
  .add({
    targets: ".main-header",
    opacity: [0, 1],
    translateY: ["-5rem", 0],
    easing: "spring(1, 80, 10, 0)",
    duration: 300
  })
  .add(
    {
      targets: [".nav-link", ".brand"],
      opacity: [0, 1],
      translateY: ["-2rem", 0],
      easing: "spring(1, 80, 10, 0)",
      duration: 500
    },
    "-=800"
  )
  .add(
    {
      targets: ".title-header .line",
      opacity: [0.5, 1],
      scaleX: [0, 1],
      easing: "easeInOutExpo",
      duration: 700
    },
    "-=1400"
  )
  .add(
    {
      targets: ".title-header .line",
      duration: 600,
      easing: "easeOutExpo",
      translateY: (el, i) => -0.625 + 0.625 * 2 * i + "em"
    },
    "-=700"
  )
  .add(
    {
      targets: ".title-header .letters-left",
      opacity: [0, 1],
      translateX: ["0.65em", "0.15em"],
      easing: "easeOutExpo",
      duration: 600
    },
    "-=300"
  )
  .add(
    {
      targets: ".title-header .letters-right",
      opacity: [0, 1],
      translateX: ["-0.65em", "-0.15em"],
      easing: "easeOutExpo",
      duration: 600
    },
    "-=600"
  );

  let obs;
  const art= Array.from(document.querySelectorAll(".article"));
  let options = {
    threshold: 0.5
  };
  let curr = -1;
  
  obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.5) {
        const newcurr = art.indexOf(entry.target);
        if (newcurr > curr) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: ["20rem", 0],
            easing: "spring(1, 80, 10, 0)",
            duration: 800
          });
        }
        curr = newcurr;
        obs.unobserve(entry.target);
      }
    });
  }, options);
  
  // start observing
  document.querySelectorAll(".article").forEach(article => {
    obs.observe(article);
  });

