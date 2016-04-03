var x_pos = 1;
var y_pos = 1;
var interval;

window.onload = init;

function init(){

    console.log("Initialized");

    drawBackground();
    drawPlayer(x_pos,y_pos);
};

$(document).ready(function(){
    $("#myCanvas").click(function(event){
        /*var x = event.x;
        var y = event.y;

        var canvas = document.getElementById("canvas");

        x = event.clientX;
        y = event.clientY;*/
    interval = setInterval(function(){resetCan();}, 600);
    });
});

$(document).ready(function(){
    $("#myCanvas").on("mouseover", function(event){
        var x = event.x;
        var y = event.y;

        x = event.clientX;
        y = event.clientY;

        console.log("x:" + x + " y:" + y);
    });
});

function drawBackground(){

    console.log("Background drawn");

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    ctx.fillStyle = "#b3d1ff";
    ctx.fillRect(0,0,600,400);    
}

function drawPlayer(xPos, yPos){

    console.log("Player drawn");

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    ctx.strokeStyle = "yellow";
    ctx.strokeRect(xPos,yPos,50,50);
}

function resetCan(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    ctx.clearRect(0,0,600,400);
    ctx.fillStyle = "#b3d1ff";
    ctx.fillRect(0,0,600,400);

    if(x_pos <= 548 && y_pos <= 348){
        x_pos+=50;
        y_pos+=50;

        drawPlayer(x_pos, y_pos);
    }
    else{
        clearInterval(interval);
        console.log("Clear Interval");
        x_pos = 1;
        y_pos = 1;
        drawPlayer(x_pos,y_pos);        
    }
}