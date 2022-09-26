// CROSS-FADE two images at a certain scroll position

// Some notes
// If the concept of setup() and draw() are unfamiliar, check out
// - https://p5js.org/get-started/ 

// If gettings the code into a web browser gives any trouble, check out
// - https://www.youtube.com/watch?v=HZ4D3wDRaec


/* -----------------------------------------------------------------------------
 * Global variables
 * Extract some variables into this configuration object called "chapter_1".
 * Not entirely necessary now, but will make managing variables easier
 * if you add more chapters (ie more images with corresponding text).
 */

// Chapter 1 variables
let chapter_1 = {
  img_1: null,
  img_1_position: [0, 400],
  img_2: null,
  img_2_position: [0, 400],
  img_2_opacity: 0,
  text: "This is a crossfade between two pictures.",
  text_position: [520, 400],
  text_width: 200,
  start_reveal_at: 100,
  end_reveal_at: 200,
  img_3: null,
  img_3_position: [0, 500],
  img_4: null,
  img_4_position: [0, 500],
  img_4_opacity: 0,
}


/* -----------------------------------------------------------------------------
 * preload() runs once at the very beginning of the sketch.
 * All image loading should happen in preload() to ensure that
 * the image data is loaded before setup() or draw() try to access
 * the data.
 * See: https://p5js.org/reference/#/p5/preload
 */

function preload() {
  // Chapter 1 images
  chapter_1.img_1 = loadImage('https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/original_render.jpeg?v=1663355914624');
  chapter_1.img_2 = loadImage('https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/street_view.png?v=1663355913122');
  chapter_1.img_3 = loadImage('https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/original_render.jpeg?v=1663355914624');
  chapter_1.img_4 = loadImage('https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/street_view.png?v=1663355913122');
}


/* -----------------------------------------------------------------------------
 * setup() runs once after preload(). It handles basic "setup" functionality
 * that only needs to run once - e.g. creating a canvas or resizing all
 * images.
 * See: https://p5js.org/reference/#/p5/setup
 */

function setup() {
  // Create a canvas
  const canvas_width = 800;
  const canvas_height = 2400;
  // The canvas is 800 pixels wide and 2400 pixels tall
  const canvas = createCanvas(canvas_width, canvas_height);

  // Add the canvas to a specific DOM element in index.html
  // See doc: https://p5js.org/reference/#/p5.Element/parent
  canvas.parent('sketch');

  // Resize all images to be a specific width . Alternatively, this can
  // be done outside of the code as you prepare images.
  const new_width = 500;

  // Make images 500 pixels wide, keeping their orinal aspect ratio
  chapter_1.img_1.resize(
    new_width, // new width
    chapter_1.img_1.height * new_width / chapter_1.img_1.width); // new height

  chapter_1.img_2.resize(
    new_width, // new width
    chapter_1.img_2.height * new_width / chapter_1.img_2.width); // new height

  // Set the text size to 16px
  textSize(16);
  // Wrap the text.
  textWrap(WORD);
}


/* -----------------------------------------------------------------------------
 * The draw() function is the magic sauce in p5. After preload and setup, it is
 * called repeatedly, many times per second. This is where all of our
 * animation logic goes.
 * See: https://p5js.org/reference/#/p5/draw
 */
function draw() {
  // Clear the canvas every frame
  clear();

  // Get the current scroll position and store it in the variable called 'pos'
  const pos = document.documentElement.scrollTop || document.body.scrollTop;
  // Log the position to the console

  // Add the text.
  text(
    chapter_1.text, // the text content
    chapter_1.text_position[0], // the 'x' position of the text
    chapter_1.text_position[1], // the 'y' position of the text
    chapter_1.text_width); // the width of the text container

  // Display the "before" image
  tint(255, 255); // full opacity
  image(
    chapter_1.img_1, // the image loaded in the preload fxn
    chapter_1.img_1_position[0], // the image's 'x' position
    chapter_1.img_1_position[1]); // the image's 'y' position
  
  // Display the "after" image on top of the "before" image
  tint(255, chapter_1.img_2_opacity); // changing opacity
  image(
    chapter_1.img_2, // the image loaded in the preload fxn
    chapter_1.img_2_position[0],  // the image's 'x' position
    chapter_1.img_2_position[1]); // the image's 'y' position

  // Every frame, update the "after" image's opacity based on the scroll
  // position.
  // See: https://p5js.org/reference/#/p5/map
  chapter_1.img_2_opacity = map(
    pos,
    chapter_1.start_reveal_at, chapter_1.end_reveal_at,
    0, 255);
}