var onScreen = 0;

/*Initial coordinates of the box target*/
var x = 0;
var y = 0;

/*Displacement factors*/
var dx;
var dy;

/*Interval*/
var in1;

/*Score*/
var score = 0;
var scoreArray = [];

var playButton = document.createElement("IMG");

playButton.src = "../boxtap/img/play.png";

var replayButton = document.createElement("IMG");

replayButton.src = "../boxtap/img/replay.png";

window.onload = splashScreen;

function splashScreen(){

    console.log("splashScreen");

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    /* Boxtap title */

    ctx.fillStyle = "#3399FF";
    ctx.font = "60px Roboto";

    ctx.fillText("Boxtap", 190,100);

    /* Loading */

    ctx.fillStyle = "#3399FF";
    ctx.font = "20px Roboto";

    ctx.fillText("Loading...", 250,300);

    $(document).ready(function(){
        ++onScreen;
        homeScreen();
    });
}

$(document).ready(function(){
    $("#myCanvas").click(function(event){
        if(onScreen == 1){
            checkPlay(event);
        }else if(onScreen == 2){
            console.log("Present on playScreen");
            checkTap(event);
        }else if(onScreen == 3){
            console.log("Present on scoreScreen");
            checkReplay(event);
        }
    });
});

function checkPlay(event){

    console.log("checkPlay");

    var xPos = event.clientX;
    var yPos = event.clientY;

    console.log("Clicked at: (" + xPos + "," + yPos + ")");

    if((xPos >= 265 && xPos <= 335) && (yPos >= 97 && yPos <= 167)){
        console.log("playButton clicked");
        onScreen = 2;
        playScreen(); // Goto the main playing screen
    }else{
        console.log("playButton not clicked");
    }
}

function homeScreen(){

    console.log("homeScreen");

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    /* Clear the canvas */

    ctx.clearRect(0,0,600,400);

    /* Draw the back for playButton */

    ctx.strokeStyle = "#3399FF";
    ctx.fillRect(265, 97, 70, 70);

    /* Draw the play button*/

    ctx.drawImage(playButton, 284, 116);

    /* Play text */

    ctx.font = "30px Roboto";
    ctx.fillText("Play", 270,220);
}

function playScreen(){

    console.log("playScreen");

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    /* Clear the canvas */

    ctx.clearRect(0,0,600,400);

    in1 = setInterval("calcPos();", 800);
}

function calcPos(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    /* Clear the canvas */

    ctx.clearRect(0,0,600,400);

    /* Calculate initial displacement factor */

    dx = Math.floor(Math.random() * 100 * 5.5);
    dy = Math.floor(Math.random() * 100 * 3.5);

    if(dx == 350)
        --dx;

    if(dy == 550)
        --dy;

    /* Draw the box initially */

    ctx.fillStyle = "#00CDE1";
    ctx.fillRect((x + dx), (y + dy), 50, 50);    
}

function checkTap(event){
    var xp = event.clientX;
    var yp = event.clientY;

    var xl = x+dx;
    var xu = xl+50;

    var yl = y+dy;
    var yu = yl+50;

    if((xp >= xl && xp <= xu) && (yp >= yl && yp <= yu)){
        ++score;
        console.log("Correct. Score: "+score);
    }
    else{
        console.log("WRONG!!!");
        scoreArray.push(score);

        console.log(scoreArray.length);

        clearInterval(in1);
        ++onScreen;
        scoreScreen();
    }
}

function scoreScreen(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    /* Calculate the highscore */

    var maxScore = scoreArray[0];

    for (var i = 0; i < scoreArray.length; i++) {
        if(maxScore < scoreArray[i]){
            maxScore = scoreArray[i];
        }
    };

    /* Clear the canvas */

    ctx.clearRect(0,0,600,400);

    ctx.fillStyle = "#3399FF";
    ctx.font = "30px Roboto";
    ctx.fillText("Score: "+score, 100,150);
    ctx.fillText("Highscore: "+maxScore, 100,200);

    /* Draw the back for replayButton */

    ctx.strokeStyle = "#3399FF";
    ctx.fillRect(265, 250, 70, 70);

    /* Draw the replay button*/

    ctx.drawImage(replayButton, 284, 270);

    /* replay text */

    ctx.font = "20px Roboto";
    ctx.fillText("Replay", 270,350);   
}

function checkReplay(event){

    console.log("checkReplay");

    var xPos = event.clientX;
    var yPos = event.clientY;

    console.log("Clicked at: (" + xPos + "," + yPos + ")");

    if((xPos >= 265 && xPos <= 335) && (yPos >= 250 && yPos <= 320)){
        console.log("replayButton clicked");
        score = 0;
        x = 0;
        y = 0;
        dx = 0;
        dy = 0;
        onScreen = 2;
        playScreen(); // Goto the main playing screen
    }else{
        console.log("replayButton not clicked");
    }   
}