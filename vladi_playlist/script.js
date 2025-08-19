const scene = document.getElementById("scene");
const svg = document.getElementById("connections");

let scale = 1;
let originX = 200;
let originY = 200;
let isDragging = false;
let startX, startY;

// generate non-overlapping positions
function generatePositions(songs, clusterSize = 1200, minDistance = 250) {
  const positions = [];
  songs.forEach(() => {
    let x, y, valid, attempts = 0;
    do {
      x = Math.random() * clusterSize;
      y = Math.random() * clusterSize;
      valid = positions.every(pos => Math.hypot(pos.x - x, pos.y - y) >= minDistance);
      attempts++;
      if (attempts > 1000) break;
    } while (!valid);
    positions.push({ x, y });
  });
  return positions;
}

// animate a polyline between two points
function animateLine(x1, y1, x2, y2) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  line.setAttribute("points", `${x1},${y1} ${x2},${y1} ${x2},${y2}`);
  line.setAttribute("stroke", "white");
  line.setAttribute("stroke-width", "2");
  line.setAttribute("fill", "none");
  svg.appendChild(line);

  const length = line.getTotalLength();
  line.setAttribute("stroke-dasharray", length);
  line.setAttribute("stroke-dashoffset", length);

  // animate with JS (avoids CSS timing issues)
  let start = null;
  function draw(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / 500, 1); // 0.5s draw
    line.setAttribute("stroke-dashoffset", length * (1 - progress));
    if (progress < 1) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

function renderSongs(songs) {
  const positions = generatePositions(songs);
  let last = null;

  songs.forEach((s, i) => {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "song";
      el.style.left = positions[i].x + "px";
      el.style.top = positions[i].y + "px";

      const text = document.createElement("span");
      text.textContent = `${s.title} — ${s.artist}`;
      const btn = document.createElement("a");
      btn.href = s.url;
      btn.target = "_blank";
      btn.className = "spotify-btn";
      btn.innerHTML = "▶";

      el.appendChild(text);
      el.appendChild(btn);
      scene.appendChild(el);

      // fade-in song
      requestAnimationFrame(() => el.classList.add("visible"));

      // connect to last
      if (last) {
        const prevCenter = {
          x: last.x + last.el.offsetWidth / 2,
          y: last.y + last.el.offsetHeight / 2
        };
        const currCenter = {
          x: positions[i].x + el.offsetWidth / 2,
          y: positions[i].y + el.offsetHeight / 2
        };
        animateLine(prevCenter.x, prevCenter.y, currCenter.x, currCenter.y);
      }

      last = { x: positions[i].x, y: positions[i].y, el };
    }, i * 400); // faster sequential
  });
}

// load playlist
fetch("playlist.json")
  .then(res => res.json())
  .then(data => renderSongs(data.songs))
  .catch(console.error);

// Zoom & pan
document.addEventListener("wheel", e => {
  e.preventDefault();
  scale += e.deltaY < 0 ? 0.1 : -0.1;
  scale = Math.max(0.3, scale);
  updateTransform();
}, { passive: false });

document.addEventListener("mousedown", e => {
  if (e.button !== 0) return;
  isDragging = true;
  startX = e.clientX - originX;
  startY = e.clientY - originY;
  document.body.style.cursor = "grabbing";
});
document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "grab";
});
document.addEventListener("mousemove", e => {
  if (!isDragging) return;
  originX = e.clientX - startX;
  originY = e.clientY - startY;
  updateTransform();
});

function updateTransform() {
  scene.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
}
updateTransform();
