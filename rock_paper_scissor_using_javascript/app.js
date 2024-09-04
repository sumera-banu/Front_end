let userscore=0;
let compscore=0;

const choices = document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
const userscorepara=document.querySelector("#user-score");
const copmcorepara=document.querySelector("#comp-score");
const computerchoice =() => {
    const options=["rock","paper","scissors"];
     const randindx=Math.floor(Math.random()*3);
     return options[randindx];
}

const drawgame =() => {
    
    msg.innerText="game was draw, play again";

}

const showwinner=(userwin,userchoice,compchoice) => {
    if(userwin){
        userscore++;
        userscorepara.innerText=userscore;
        msg.innerText=`you win! your ${userchoice} beats ${compchoice}`;
        msg.style.backgroundColor="green";
    }else{
       compscore++;
       copmcorepara.innerText=compscore;
        console.log("you lose");
        msg.innerText=`you lose ${compchoice} beats your ${userchoice}`;
        msg.style.backgroundColor="red";
    }
}

const playgame = (userchoice) => {
    console.log("userchoice =",userchoice);
     const compchoice=computerchoice();
     console.log("comp choice =",compchoice);

     if(userchoice===compchoice){
        drawgame();
     }else{
        let userwin=true;
        if(userchoice==="rock"){
            userwin=compchoice==="paper" ? false:true;
        }else if(userchoice==="paper"){
            userwin= compchoice==="scissors"?false:true;
        }else{
            userwin=compchoice==="rock"? false:true;
        }
        showwinner(userwin,userchoice,compchoice);
     }



};

choices.forEach((choice) => {
    choice.addEventListener("click",() =>{
        const userchoice = choice.getAttribute("id");
        console.log("choice was clicked",userchoice);
        playgame(userchoice);
    })
})

