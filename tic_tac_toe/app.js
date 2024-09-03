let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newgamevtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0=true;

const winpatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        
        if(turn0) {
            box.innerText = "0";
            turn0=false;
        }else{
            box.innerText = "X";
            turn0=true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disablebox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enaablebox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";

    }
}

const showwinner = (winner) => {
    msg.innerText =`Congrotulations, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disablebox();
}

const checkWinner =() => {
    for(let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val !="" && pos3val!=""){
            if(pos1val===pos2val && pos2val === pos3val){
                
                showwinner(pos1val);
            }
        }
    }
};

const resetgame =() => {
    turn0=true;
    enaablebox();
    msgcontainer.classList.add("hide");

}

newgamevtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);