const scene = document.getElementById("scene");

// Positioning variables
let scale = 1;
let originX = 0;
let originY = 0;
let isDragging = false;
let startX, startY;

function generatePositions(elements, clusterSize, padding = 80) {
  const positions = [];

  elements.forEach(el => {
    let x, y, valid;
    let attempts = 0;

    // Temporarily add to DOM to measure size
    el.style.position = "absolute";
    el.style.left = "-1000px"; 
    el.style.top = "-1000px"; 
    scene.appendChild(el);
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    do {
      x = Math.random() * clusterSize;
      y = Math.random() * clusterSize;

      const box = { left: x, top: y, right: x + width, bottom: y + height };

      valid = positions.every(pos => {
        return (
          box.right + padding < pos.left ||
          box.left - padding > pos.right ||
          box.bottom + padding < pos.top ||
          box.top - padding > pos.bottom
        );
      });

      attempts++;
      if (attempts > 5000) { // safety net if cluster is too crowded
        console.warn("Could not place element without overlap:", el.textContent);
        break;
      }
    } while (!valid);

    el.style.left = x + "px";
    el.style.top = y + "px";

    positions.push({ left: x, top: y, right: x + width, bottom: y + height });
  });

  return positions;
}
// Render songs using new generatePositions
function renderSongs(songs) {
  const elements = songs.map(s => {
    const el = document.createElement("div");
    el.className = "song";

    const text = document.createElement("span");
    text.textContent = `${s.title} — ${s.artist}`;
    el.appendChild(text);

    const btn = document.createElement("a");
    btn.href = s.url;
    btn.target = "_blank";
    btn.className = "spotify-btn";
    btn.innerHTML = "▶";
    el.appendChild(btn);

    scene.appendChild(el);
    return el;
  });

  const clusterSize = getClusterSize(songs.length);

  generatePositions(elements, clusterSize); // pass clusterSize
}


function getClusterSize(songCount) {
  const baseClusterSize = 2500;
  const scale = Math.sqrt(songCount / 50);
  return Math.round(baseClusterSize * scale);
}


// Fetch playlist.json and render
fetch("playlist.json")
  .then(response => response.json())
  .then(data => {
    renderSongs(data.songs);
  })
  .catch(err => console.error("Error loading playlist:", err));


// Zoom with scroll
document.addEventListener("wheel", (e) => {
  e.preventDefault();
  const zoomSpeed = 0.1;
  if (e.deltaY < 0) {
    scale += zoomSpeed;
  } else {
    scale = Math.max(0.3, scale - zoomSpeed);
  }
  updateTransform();
}, { passive: false });

// Drag with left mouse button
document.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    isDragging = true;
    startX = e.clientX - originX;
    startY = e.clientY - originY;
    document.body.style.cursor = "grabbing";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    originX = e.clientX - startX;
    originY = e.clientY - startY;
    updateTransform();
  }
});

function updateTransform() {
  scene.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
}

// Initial transform
updateTransform();


const cosmic = document.getElementById("cosmic-background");

function createBurst() {
  const burst = document.createElement("div");
  burst.className = "burst";

  const size = Math.random() * 150 + 120; // 120–270px
  burst.style.width = size + "px";
  burst.style.height = size + "px";

  burst.style.left = Math.random() * 100 + "vw";
  burst.style.top = Math.random() * 100 + "vh";

  // Pick a glow color
  const colors = [
    "rgba(255,255,255,0.8)",
    "rgba(173,216,230,0.8)",  // light blue
    "rgba(255,182,193,0.8)",  // pink
    "rgba(200,200,255,0.8)"   // violet
  ];
  burst.style.setProperty("--glow-color", colors[Math.floor(Math.random() * colors.length)]);

  // Add logo
  const logo = document.createElement("img");
  logo.className = "burst-logo";
  logo.src = "../images/KC_logo.png"; 
  if (Math.random() < 0.05) { // 5% chance
    burst.appendChild(logo);
  }

  cosmic.appendChild(burst);

  setTimeout(() => burst.remove(), 8000);
}

setInterval(createBurst, 1000); // one burst every 1s

