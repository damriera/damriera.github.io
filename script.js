const scene = document.getElementById("scene");
let scale = 1;
let originX = 0;
let originY = 0;
let isDragging = false;
let startX, startY;

// Zoom with scroll
document.addEventListener("wheel", (e) => {
  e.preventDefault();
  const zoomSpeed = 0.1;
  if (e.deltaY < 0) {
    scale += zoomSpeed;
  } else {
    scale = Math.max(0.2, scale - zoomSpeed);
  }
  updateTransform();
}, { passive: false });

// Drag with left mouse button
document.addEventListener("mousedown", (e) => {
  if (e.button === 0) { // left click
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

// Initial render
updateTransform();
