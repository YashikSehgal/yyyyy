// Global variable to track the highest z-index
let highestZIndex = 1;

// Initialize paper element with event listeners
function initPaper(paper) {
  let isDragging = false;       // Whether the paper is currently being dragged
  let startX = 0;               // Initial X-coordinate of the mouse/touch
  let startY = 0;               // Initial Y-coordinate of the mouse/touch
  let currentX = 0;             // Current X-coordinate of the paper
  let currentY = 0;             // Current Y-coordinate of the paper
  let previousX = 0;            // Previous X-coordinate of the mouse/touch
  let previousY = 0;            // Previous Y-coordinate of the mouse/touch
  let newPositionX = 0;         // Change in X position
  let newPositionY = 0;         // Change in Y position
  let rotationAngle = Math.random() * 60 - 45;        // Rotation angle of the paper

  // Bring paper to front by increasing z-index
  function bringToFront() {
    paper.style.zIndex = highestZIndex++;
  }



  paper.addEventListener('mousedown', handleStart);

  // Handle mouse/touch start
  function handleStart(e) {
    if (e.button === 0) { // Left mouse button
      startX = e.clientX;
      startY = e.clientY;
      previousX = startX;
      previousY = startY;
      isDragging = true;
      bringToFront();
      rotationAngle = (Math.random()*30 - 15); 
      paper.style.transform = `translate(${currentX}px, ${currentY}px) rotateZ(${rotationAngle}deg)`;
    } 
  }



  document.addEventListener('mousemove', handleMove);


  // Handle mouse/touch movement
  function handleMove(e) {
    if (isDragging === true) {
      newPositionX = e.clientX - previousX;
    newPositionY = e.clientY - previousY;

    // Update paper position
    currentX += newPositionX;
    currentY += newPositionY;

    // Apply the updated position to the paper's style
    paper.style.transform = `translate(${currentX}px, ${currentY}px) rotateZ(${rotationAngle}deg)`;

    // Update previous coordinates
    previousX = e.clientX;
    previousY = e.clientY;
    }
  }

  
  document.addEventListener('mouseup', handleEnd);

  // Handle mouse/touch end
  function handleEnd() {
    isDragging = false;
    isRotating = false;
  }


}

// Initialize all paper elements
const papers = document.querySelectorAll('.paper');
papers.forEach(initPaper);
