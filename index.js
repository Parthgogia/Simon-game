let gamePattern = [];
let userPattern=[];
let go = 1;
const colors= ["#green", "#red", "#yellow", "#blue"];

function generateRandomColor(arr){
    let randomColor= colors[(Math.floor(Math.random() * colors.length))];
    arr.push(randomColor.slice(1));
    $(randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor.slice(1));
    go=1;
    userPattern.length=0;
}

function playSound(name){
    var sound= new Audio("./sounds/"+name +".mp3");
    sound.play();
}

function waitforme(ms) {
    return new Promise(resolve => {
       setTimeout(() => { resolve('') }, ms);
    })
 }

function onButtonCLick(evt){
    //$(".btn").on("click",function(evt){
        var divClicked= evt.target.getAttribute("id");
        playSound(divClicked);
        $("#"+divClicked).addClass("pressed");
        userPattern.push(divClicked);
        setTimeout(()=>$("#"+divClicked).removeClass("pressed"),100);
//})
}

function gameOver(){
    $("body").addClass("game-over");
    setTimeout(()=>$("body").removeClass("game-over"),500);
    var wrongSound= new Audio("./sounds/wrong.mp3");
    wrongSound.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $(".btn").off("click");
    $(document).on("keypress", startgame );
}

function waitForUser() {
    return new Promise((resolve, reject) => {
        $(".btn").on("click", function() {
                for (var i = 0; i < userPattern.length; i++) {
                    if (userPattern[i] !== gamePattern[i]) {
                        reject("rejected");
                        break;
                    } else{continue};
                }
                if (userPattern.length === gamePattern.length) {
                    $(".btn").off("click");
                    go = 0;
                    resolve("resolved");
            }
        });
    });
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

async function startgame(){
    $(document).off("keypress");
    let level =1;
    gamePattern.length=0;
    while(true){
        $("h1").text("Level "+level);
        generateRandomColor(gamePattern);
        $(".btn").on("click",onButtonCLick);
        if (go==1){ 
            try{
                await waitForUser();
            }catch(error){
                gameOver();
                return;
            }}
        console.log(gamePattern);
        console.log(userPattern);
        if (arraysEqual(gamePattern, userPattern)){
            level++;
            await waitforme(1000);        
        }else{
            gameOver();
            break;
    };
};
}

$(document).on("keypress", startgame );




