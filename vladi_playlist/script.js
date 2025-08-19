const scene = document.getElementById("scene");

// Positioning variables
let scale = 1;
let originX = 0;
let originY = 0;
let isDragging = false;
let startX, startY;

function generatePositions(elements, clusterSize = 2000, padding = 80) {
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

  generatePositions(elements); // positions elements without overlap
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
