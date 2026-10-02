// Typing effect
const text = "BCA Student | UI/UX Designer | Web Developer";
const typingEl = document.getElementById("typing");
let i = 0;

function typing() {
    if (i < text.length) {
        typingEl.textContent += text.charAt(i);
        i++;
        setTimeout(typing, 50);
    }
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typingEl.textContent = text;
} else {
    typing();
}

// Scroll animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

// Project card: tap or press Enter/Space to flip (works on touch screens)
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            card.classList.toggle("flipped");
        }
    });
});

// Progress bar, back-to-top, active nav link
const bar = document.getElementById("progress"), topBtn = document.getElementById("top");
const links = [...document.querySelectorAll(".nav a")];
const secs = links.map(a => document.querySelector(a.getAttribute("href")));
addEventListener("scroll", () => {
    const max = document.body.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? scrollY / max * 100 : 0) + "%";
    topBtn.classList.toggle("on", scrollY > 500);
    let cur = -1;
    secs.forEach((s, k) => { if (s && s.getBoundingClientRect().top < 120) cur = k; });
    links.forEach((a, k) => a.classList.toggle("active", k === cur));
}, { passive: true });
topBtn.addEventListener("click", () => scrollTo({ top: 0 }));

// Copy email and mailto form
document.getElementById("send").addEventListener("click", () => {
    const n = document.getElementById("fn").value.trim(), m = document.getElementById("fm").value.trim();
    location.href = "mailto:ashwathsj72@gmail.com?subject=" + encodeURIComponent("Portfolio enquiry from " + (n || "a visitor")) + "&body=" + encodeURIComponent(m);
});
