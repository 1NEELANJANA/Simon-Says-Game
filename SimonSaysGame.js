
let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let isPlaying = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keydown", function () {
    if (started == false) {
        started = true;
        levelUp();
    }
});

// Computer flash
function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// User flash
function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Delay function
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Play complete sequence
async function playSequence() {
    isPlaying = true;

    for (let color of gameSeq) {
        let randbtn = document.querySelector(`.${color}`);

        gameFlash(randbtn);

        await wait(500);
    }

    isPlaying = false;
}

// Level up
function levelUp() {
    userSeq = [];

    level++;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);

    let randColor = btns[randIdx];

    gameSeq.push(randColor);

    console.log(gameSeq);

    playSequence();
}

// Check answer
function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length == gameSeq.length) {

            isPlaying = true;

            setTimeout(levelUp, 1000);
        }

    } else {

        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b>.<br>Press any key to start.`;

        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// Button click
function btnPress() {

    if (!started || isPlaying) {
        return;
    }

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Add event listeners
let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset game
function reset() {

    started = false;

    isPlaying = false;

    gameSeq = [];

    userSeq = [];

    level = 0;
}
