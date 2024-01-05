const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "./assets/shadow_dog.png";
let playerState = "idle";
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
let maxFrame = 6; // All the frames in a sprite animation (on a single row. Some animation may have more or less)
let gameFrame = 0;
const staggerFrame = 5; // it will slow down animation by the amount of the variable
const spriteAnimations = [];
const animationStates = [
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
    {
        name: "fall",
        frames: 7,
    },
    {
        name: "run",
        frames: 9,
    },
    {
        name: "dizzy",
        frames: 11,
    },
    {
        name: "sit",
        frames: 5,
    },
    {
        name: "roll",
        frames: 7,
    },
    {
        name: "bite",
        frames: 7,
    },
    {
        name: "ko",
        frames: 12,
    },
    {
        name: "getHit",
        frames: 4,
    }
]

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }

    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let position = Math.floor(gameFrame/staggerFrame) % spriteAnimations[playerState].loc.length;
    let frameX = position * spriteWidth;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(
        playerImage,// source of the image (the sprite sheet)
        frameX, // area from the srpite sheet to be cut out on the x axis
        frameY, // area from the srpite sheet to be cut out on the y axis
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
