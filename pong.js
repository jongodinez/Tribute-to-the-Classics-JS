const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

//Create the paddles
const user = {
    x : 0,
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
    x : cvs.width/2,
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
    x : cvs.width/2 - 1,
    y : 0, 
    width : 2,
    height : 10,
    color : "white"
}

drawNet =() => {
    for(let i = 0; i <= cvs.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color)
    }
}

//Draw the circle

drawCircle = (x, y, r, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
};

//Draw the text

drawText = (text, x, y, color) => {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text, x, y);
};

/////////////////////////////////////

//Detect ball collission
collision =(b, p) => {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top;

}
//update controls position, movement and score
update =() => {
    ball.x += ball.velocityX,
    ball.y += ball.velocityY

    if (ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }

    //when the paddle hits the ball
    let player = (ball.x < cvs.width/2) ? user : com;
    if(collision(ball, player)){
        let collidePoint = (ball.y - (player.y+player.height/2));
        collidePoint = collidePoint/(player.height/2);
        let angleRad = (Math.PI/4)*collidePoint;
        let direction = (ball.x < cvs.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.1;
    }

    //Controlling the paddles
    //user controls
    movePaddle = (evt) => {
        let rect = cvs.getBoundingClientRect();
        user.y = evt.clientY - rect.top - user.height/2;
    }
    cvs.addEventListener("mousemove", movePaddle);


    //computer AI to control paddles
    let computerLevel = 0.01;
    com.y += (ball.y - (com.y + com.height/2)) * computerLevel;

    resetBall = () => {
        ball.x = cvs.height/2;
        ball.y = cvs.width/2;
        ball.speed = 5;
        ball.velocityX = -ball.velocityX;
    }

    //updating the score
    if (ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
    }else if(ball.x + ball.radius > cvs.width){
        user.score++;
        resetBall();
    }
}


//Render pong.js
renderPong = () => {
    //Clears the canvas
    drawRect(0, 0, cvs.width, cvs.clientHeight, "navy");

    //Draw the net in between player windows
    drawNet();

    //Draw score
    drawText(user.score,cvs.width/4, cvs.height/5,"white");
    drawText(com.score,3*cvs.width/4, cvs.height/5,"white");

    //Draw the paddles
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(com.x,com.y,com.width,com.height,com.color);
    
    //Draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}   

//Initialize game()
game = () => { renderPong(), update() };

//Loop
const framePerSecond = 50;
setInterval(game, 1000/framePerSecond); //call game(); 50 times every 1 sec


