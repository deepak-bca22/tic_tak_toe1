const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset-btn");
const newgame = document.querySelector("#new-btn");
const msgcontainer = document.querySelector(".massege-win");
const msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText === "") { // Prevent overwriting existing moves
            if (turnO) {
                box.innerText = "O";
            } else {
                box.innerText = "X";
            }
            turnO = !turnO; // Toggle turn
            box.classList.add("disabled"); // Mark box as used
            checkWinner();
        }
    });
});

const disableboxes = ()=>{
    for(box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! The winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
    reset.disabled=true;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const pos1 = boxes[pattern[0]].innerText;
        const pos2 = boxes[pattern[1]].innerText;
        const pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            boxes.forEach((box) => box.classList.add("disabled")); // Prevent further moves
            break;
        }
    }
};


const resetGame = ()=>{
    turnO = true;
    msgcontainer.classList.add("hide");
    enableboxes();
}

const enableboxes = ()=>{
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

reset.addEventListener('click',resetGame);
newgame.addEventListener('click',resetGame);
