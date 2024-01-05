const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "./assets/shadow_dog.png";
/**
 * Sprite sheet width 6876px it has 12 columns of sprites
 * 6876 / 12 = 573
 * This is why the magic number 575 appears as spriteWidth + 2 offset because of some 1 sprite being different size
 * spriteWidth = 575
 *
 * Sprite sheet height is 5230px and it has 10 rows
 * 5230 / 10 = 523
 * priteHeight = 523
 */
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0;
let frameY = 0;
let maxFrame = 6; // All the frames in a sprite animation (on a single row. Some animation may have more or less)
let idleAnimationFrames = 6; // 6 here is because the idle animation has 6 frames
let gameFrame = 0;
const staggerFrame = 5; // it will slow down animation by the amount of the variable

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let position = Math.floor(gameFrame/staggerFrame) % idleAnimationFrames;
    frameX = position * spriteWidth;
    ctx.drawImage(
        playerImage,// source of the image (the sprite sheet)
        frameX, // area from the srpite sheet to be cut out on the x axis(width of the sprite) times the frame number on the x  [0 - 11] (12) different frames
        frameY * spriteHeight, // area from the srpite sheet to be cut out on the y axis(height of the sprite) times the frame number on the y [0 - 9] (10) different frames
        spriteWidth, // 1 srpite width
        spriteHeight, // 1 srpite heigth
        0,// x position on the canvas to be drawnd
        80,// y position on the canvas to be drawnd
        spriteWidth, // ??? I believe its a scale(stretch) of the drawnd image (width)
        spriteHeight // ??? I believe its a scale(stretch) of the drawnd image (height)
    );

    gameFrame++;

    requestAnimationFrame(animate);
}

animate();
