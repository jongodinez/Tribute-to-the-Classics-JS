const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

//Create the paddles
const user = {
    x : 0
    y : cvs.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "white",
    score : 0

};

const com = {
    x : cvs.width - 10,
    y : cvs.height/2 - 100/2,
    width : 10,
    height: 100,
    color: "white",
    score : 0
};

//Drawing the ball
const ball = {
    x : cvs.width/2.
    y : cvs.height/2,
    radius : 10,
    speed : 5,
    velocityX : 5,
    velocityY : 5, 
    color: "white"
};

//Drawing the rectangle

drawRect = (x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};

//Drawing the net
const net = {
    x : cvs.width - 1,
    y : 0, 
    width : 2,
    height : 10,
    color : "white"
}

drawNet =() => {
    for(let i = 0; i <= cvs.height; i+=15){
        drawRect(net.x, net.y, net.width, net.height, net.color)
    }
}

//Draw the circle

drawCircle = (x, y, r, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
};
drawCircle(100, 100, 50, "white");

//Draw the text

drawText = (text, x, y, color) => {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text, x, y);
};
drawText("something", 300, 200, "white");

//Render pong.js
renderPong = () => {
    //Clears the canvas
    drawRect(0, 0, cvs.width, cvs.clientHeight, "black");
    //Draw the net in between player windows
    drawNet();
    //Draw score
    drawText(user.score,cvs.width/4, cvs.height/5,"white");
    drawText(com.score,3*cvs.width/4, cvs.height/5,"white");
    //Draw the paddles
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(com.x,com.y,com.width,com.height,com.color);
    //Draw the ball
    drawCircle(ball.x, ball.y, ball.r, ball.color);
}   

game = () => { renderPong };

//Loop
const framePerSecond = 50;
setInterval(game, 1000/framePerSecond); //call game(); 50 times every 1 sec


