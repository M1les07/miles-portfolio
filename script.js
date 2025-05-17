// Get elements
const themeToggleBtn = document.getElementById("theme-toggle");
const userTheme = localStorage.getItem("theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Set the theme with animation
function setTheme(theme) {
  const oldIcon = themeToggleBtn.querySelector("i");

  if (oldIcon) {
    // Animate the current icon out
    oldIcon.classList.add("animate-out");

    // After animation ends, replace with new icon
    setTimeout(() => {
      themeToggleBtn.innerHTML =
        theme === "dark"
          ? '<i data-feather="sun" class="fade-in-icon"></i>'
          : '<i data-feather="moon" class="fade-in-icon"></i>';
      feather.replace();
    }, 300);
  } else {
    // First-time setup
    themeToggleBtn.innerHTML =
      theme === "dark"
        ? '<i data-feather="sun" class="fade-in-icon"></i>'
        : '<i data-feather="moon" class="fade-in-icon"></i>';
    feather.replace();
  }

  // Toggle body class and save to local storage
  document.body.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

// Init: Set user or system theme
setTheme(userTheme || (systemDark ? "dark" : "light"));

// Handle click on theme toggle button
themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});

const symbols = ['+', '×', '•'];
const dotContainer = document.getElementById('about-dotties');
dotContainer.innerHTML = ''; // Clear previous

for (let i = 0; i < 15; i++) {
  const dot = document.createElement('span');
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const top = `${Math.floor(Math.random() * 90)}%`;
  const left = `${Math.floor(Math.random() * 90)}%`;
  const delay = `${(Math.random() * 5).toFixed(2)}s`;
  const scale = (0.8 + Math.random() * 0.5).toFixed(2);

  dot.className = 'dot-symbol';
  dot.style.top = top;
  dot.style.left = left;
  dot.style.animationDelay = delay;
  dot.style.transform = `scale(${scale})`;
  dot.innerText = symbol;
  
  dotContainer.appendChild(dot);
}

// Optional: Periodically re-randomize positions
setInterval(() => {
  const dots = document.querySelectorAll('.dot-symbol');
  dots.forEach(dot => {
    dot.style.top = `${Math.floor(Math.random() * 90)}%`;
    dot.style.left = `${Math.floor(Math.random() * 90)}%`;
  });
}, 4000); // every 8 seconds

function updateDurations() {
  const now = new Date();
  document.querySelectorAll(".duration").forEach(el => {
    const startDate = new Date(el.dataset.start);
    const diff = new Date(now - startDate);
    const years = diff.getUTCFullYear() - 1970;
    const months = diff.getUTCMonth();
    const days = diff.getUTCDate() - 1;
    const hrs = diff.getUTCHours();
    const mins = diff.getUTCMinutes();
    const secs = diff.getUTCSeconds();
    el.textContent = `${years} year(s) ${months} month(s) ${days} day(s) ${hrs} hr ${mins} mins ${secs} secs`;
  });
}

setInterval(updateDurations, 1000);
updateDurations();
