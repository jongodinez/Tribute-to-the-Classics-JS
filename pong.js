const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

//Create the paddles



//Drawing the rectangle

drawRect = (x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};
drawRect(0, 0, cvs.width, cvs.clientHeight, "black");

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



