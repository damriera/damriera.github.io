const scene = document.getElementById("scene");

// Positioning variables
let scale = 1;
let originX = 200;
let originY = 200;
let isDragging = false;
let startX, startY;

// Generate non-overlapping random positions
function generatePositions(songs, clusterSize = 800, minDistance = 200) {
  const positions = [];
  songs.forEach(() => {
    let x, y, valid;
    let attempts = 0;
    do {
      x = Math.random() * clusterSize;
      y = Math.random() * clusterSize;
      valid = true;
      for (let pos of positions) {
        const dx = pos.x - x;
        const dy = pos.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
          valid = false;
          break;
        }
      }
      attempts++;
      if (attempts > 1000) { // safety net in case it's too crowded
        break;
      }
    } while (!valid);
    positions.push({ x, y });
  });
  return positions;
}

// Render songs
function renderSongs(songs) {
  const positions = generatePositions(songs);
  songs.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = "song";
    el.style.left = positions[i].x + "px";
    el.style.top = positions[i].y + "px";
    el.textContent = `${s.song} — ${s.artist}`;
    scene.appendChild(el);
  });
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
