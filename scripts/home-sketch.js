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

const contentSpecs = {
  textWidth: 536,
  spaceBetweenChapters: 600,
  imageXPosition: 0,
  textXPosition: 700,
  timelineXPosition: 600,
  canvasHeight: 7500,
};

const colors = {
  ivory: '#edebd7',
  lightBlue: '#46b1c9'
};

let storyContent = [
  {
    topMediaUrl: 'https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/FergusonMap.png?v=1667507219659',
    bottomMediaUrl: null,
    topMedia: null,
    topMediaYEnd: null,
    bottomMedia: null,
    bottomMediaYEnd: null,
    description: 'The town of Ferguson was named in honor of B. F. Ferguson, company president of and one of two Chicago lumbermen who founded the Santee River Cypress Lumber Company (SRCLC). The 15,138 acres of land owned by the company, deemed the Beidler Tract, were named after the second man, SRCLC vice president and treasurer Francis Beidler. The two out-of-towners were attracted to the land for its abundance of old-growth virgin bald cypress (Taxodium distichum), which the company harvested by the thousands between 1899 and 1914.',
  },
  {
    topMediaUrl: 'https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/fergusonmill.png?v=1666989115203',
    bottomMediaUrl: 'https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/decayingkiln.jpeg?v=1666989566934',
    topMedia: null,
    topMediaYEnd: null,
    bottomMedia: null,
    bottomMediaYEnd: null,
    description: 'Though most of the timbering was performed in the thousands of acres outside of Ferguson, nearly all cut logs were rafted down the Santee River to Ferguson for processing. A ‘monster mill’ was built on 132 acres near Pond Bluff, named after the large natural pond that rested within a mile of the river which was used to store felled logs.',
  },
  {
    topMediaUrl: 'https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/fergusonpostcard.png?v=1666989116216',
    bottomMediaUrl: 'https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/submergedisland.jpeg?v=1666989542697',
    topMedia: null,
    topMediaYEnd: null,
    bottomMedia: null,
    bottomMediaYEnd: null,
    description: 'The geographic orientation of the town provided economic advantages for the growing SRCLC. The town was situated on the banks of the Santee River, approximately halfway between the state capital in Columbia and the major port city of Charleston. Within the nearly 15,000 acres of land owned by the SRCLC by 1910, the land contained tens of millions of trees, most of which were old-growth cypress whose ring counts indicated they were between 500 and 700 years old. According to the superintendent of the logging department of the SRCLC in 1903, the company felled ‘15,000,000 feet of cypress, 4,000,000 feet of pine, 1,000,000 feet of ash, 1,000 feet of cottonwood and a lot of oak, gum, and sycamore,’ all of which was stored at the mill prior to distribution.',
  },
  {
    topMediaUrl: 'https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/fergusonlumber.webp?v=1666989113972',
    bottomMediaUrl: 'https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/kilninterior.jpeg?v=1666989723950',
    topMedia: null,
    topMediaYEnd: null,
    bottomMedia: null,
    bottomMediaYEnd: null,
    description: 'As the SRCLC and its profits grew, so too did Ferguson. According to historian Mark Kinzer, the mill possessed a double-band sawmill, planing and lath mills, moldings and fine house finishing machinery, a ten-block shingle mill, a box factory, and storage areas for cut boards. At its peak, the town employed approximately one thousand workers, built fifty-three cottages with indoor plumbing for “the better class of employees,” and constructed ninety-seven houses for “good [common] labor.” The town had its own water supply system, electric lights, and even a hospital. On average, the company had approximately 200 to 250 Black laborers, who mostly performed the logging activities in the swamplands, and approximately 100 to 150 white laborers, who were given better and safer jobs in the mills on higher, dryer ground.',
  },
  {
    topMediaUrl: 'https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/santeestateparkmodel.jpeg?v=1667508052865',
    bottomMediaUrl: null,
    topMedia: null,
    topMediaYEnd: null,
    bottomMedia: null,
    bottomMediaYEnd: null,
    description: 'Navigation routes converged at Ferguson. In 1793, the state of South Carolina commissioned the construction of a canal to connect the Santee and Cooper rivers to make the state navigable from Columbia, along the Santee River, to Charleston via the Cooper River. Finished and opened in 1800, the $650,667 canal was 22 miles long, 30 feet wide, and 5-and-a-half feet deep. The canal successfully operated for 16 years, but droughts between 1817 and 1819 dried up the canal, halting traffic for nearly two years. A slowdown of canal traffic over the next three decades, coupled with the increase of railways across the state, led to the General Assembly’s revocation of the canal’s charter in 1850.',
  },
  {
    topMediaUrl: 'https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/repurposedcanal.jpeg?v=1667508062255',
    bottomMediaUrl: null,
    topMedia: null,
    topMediaYEnd: null,
    bottomMedia: null,
    bottomMediaYEnd: null,
    description: 'In 1890, the Charleston, Sumter, and Northern Railroad built a line, called the Pond Bluff Branch, directly to the mill of Ferguson, ending at the edge of the Santee River. In 1908, the SRCLC applied to the state’s general assembly for permission to build a bridge across the Santee River at Ferguson and expand its lumber road through the timberlands across both sides of the river. In 1921, the state of South Carolina proposed a second Santee Canal. The ten-foot-deep, 200-foot-wide, 20-mile-long canal would have run from the Santee River at Ferguson to the Cooper River at Monck’s Corner. In 1926, the canal organizers even received a fifty-year license for the project from the Federal Power Commission. But the canal never came to fruition. In the 1920s and 1930s, the economy of South Carolina buckled under the pressure of rice industry competition with Texas and Louisiana, boll weevil devastation to the cotton industry after World War I, and the stock market crash of 1929.',
  },
  {
    topMediaUrl: 'https://cdn.glitch.global/205f4e7b-b3da-4f71-9b78-d2de539b3547/lakeview.jpeg?v=1666989731033',
    bottomMediaUrl: null,
    topMedia: null,
    topMediaYEnd: null,
    bottomMedia: null,
    bottomMediaYEnd: null,
    description: 'The mill shut down on several occasions under the SRCLC’s ownership, largely due to a lack of funds, routine repairs, and workers striking over unsafe railroad conditions. In 1912, the planing mill and box factory at Ferguson caught on fire, creating an estimated $50,000 worth of damage. While the sawmill, kiln, and lumber yards were saved from the fire, the company lost money over the next two decades, and fell into crisis after the 1924 death of Francis Beidler. In 1934, the shareholders of the SRCLC voted to liquidate and dissolve the company. After the company officially went under, so too did the mill — literally. The mill and its adjoining town was officially submerged in 1942, with the completion of the Santee Cooper Hydroelectric Project.',
  },
];

/* -----------------------------------------------------------------------------
 * preload() runs once at the very beginning of the sketch.
 * All image loading should happen in preload() to ensure that
 * the image data is loaded before setup() or draw() try to access
 * the data.
 * See: https://p5js.org/reference/#/p5/preload
 */
function preload() {
  storyContent.forEach(chapter => {
    if (chapter.topMediaUrl) chapter.topMedia = loadImage(chapter.topMediaUrl);
    if (chapter.bottomMediaUrl) chapter.bottomMedia = loadImage(chapter.bottomMediaUrl);
  });
}

/* -----------------------------------------------------------------------------
 * setup() runs once after preload(). It handles basic "setup" functionality
 * that only needs to run once - e.g. creating a canvas or resizing all
 * images.
 * See: https://p5js.org/reference/#/p5/setup
 */

function setup() {
  // Create a canvas
  // The canvas is x pixels wide and 2400 pixels tall
  const canvas = createCanvas(
    windowWidth,
    contentSpecs.canvasHeight
  );

  // Add the canvas to a specific DOM element in index.html
  // See doc: https://p5js.org/reference/#/p5.Element/parent
  canvas.parent('sketch');

  // Maybe have images be 700 wide on 1300+
  // and then scale down depending on window width
  const new_width = 500;

  storyContent.forEach(chapter => {
    if (chapter.topMedia) {
      chapter.topMedia.resize(
        new_width,
        chapter.topMedia.height * new_width / chapter.topMedia.width
      );
    }
    if (chapter.bottomMedia) {
      chapter.bottomMedia.resize(
        new_width,
        chapter.bottomMedia.height * new_width / chapter.bottomMedia.width
      );
    }
  });

  textFont('Nanum Myeongjo');
  textStyle(BOLD);
  textLeading(40);
  textSize(21);
  textWrap(WORD);
}

function drawTimeline() {
  stroke(colors.ivory);
  strokeWeight(4);
  line(
    contentSpecs.timelineXPosition - 64,
    128,
    contentSpecs.timelineXPosition + 64,
    128
  );
  strokeWeight(8);
  line(
    contentSpecs.timelineXPosition,
    132,
    contentSpecs.timelineXPosition,
    contentSpecs.canvasHeight - 112,
  );
  strokeWeight(4);
  line(
    contentSpecs.timelineXPosition - 64,
    contentSpecs.canvasHeight - 108,
    contentSpecs.timelineXPosition + 64,
    contentSpecs.canvasHeight - 108
  );
}

function drawTimelineTick(yPosition) {
  stroke(colors.ivory);
  strokeWeight(4);
  line(
    contentSpecs.timelineXPosition - 32,
    yPosition,
    contentSpecs.timelineXPosition + 32,
    yPosition,
  );
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
  drawTimeline();

  // Get the current scroll position and store it in the variable called 'pos'
  const pos = document.documentElement.scrollTop || document.body.scrollTop;

  storyContent.forEach((chapter, index) => {
    const { topMedia, bottomMedia, description } = chapter;
    let topMediaYPosition = 256;
    let opacityMap = null;

    if (index !== 0) {
      const previousBottomMediaYEnd = storyContent[index - 1].bottomMediaYEnd;
      const previousTopMediaYEnd = storyContent[index - 1].topMediaYEnd;
      topMediaYPosition = previousBottomMediaYEnd
        ? previousBottomMediaYEnd + 304 : previousTopMediaYEnd + 304;

      contentRevealPoint = storyContent[index-1].bottomMediaYEnd 
        ? storyContent[index-1].bottomMediaYEnd - 320 : storyContent[index-1].topMediaYEnd - 320,
      
      opacityMap = map(
        pos,
        contentRevealPoint,
        topMediaYPosition,
        0,
        255
      );
    }

    let tickYPosition = (topMedia.height / 2) + topMediaYPosition; 

    if (topMedia) {
      if (index === 0) tint(255, 255);
      if (index !== 0) tint(255, opacityMap); // hidden
      image(
        topMedia,
        contentSpecs.imageXPosition,
        topMediaYPosition,
      );
      storyContent[index].topMediaYEnd = topMediaYPosition + topMedia.height;
    }

    if (bottomMedia) {
      const bottomMediaYPosition = topMediaYPosition + topMedia.height + 32;
      tickYPosition = bottomMediaYPosition - ((bottomMediaYPosition - storyContent[index].topMediaYEnd) / 2);
      image(
        bottomMedia,
        contentSpecs.imageXPosition,
        bottomMediaYPosition
      );
      storyContent[index].bottomMediaYEnd = bottomMediaYPosition + bottomMedia.height;
    }

    if (description) {
      strokeWeight(0);
      if (index === 0) fill(255);
      if (index !== 0) fill(255, 255, 255, opacityMap);
      let textOffset = 256;
      
      if (index === 0) textOffset = 200;
      if (index === 1) textOffset = 128;
      if (index === 5) textOffset = 304;
      
      text(
        description,
        contentSpecs.textXPosition,
        tickYPosition - textOffset,
        contentSpecs.textWidth,
      );
    }

    drawTimelineTick(tickYPosition);
  });
}
