'use strict';
let canvas;
let ctx;
let img = new Image();

function onInitEditor() {
    gMeme = loadFromStorage('userMeme');
    canvas = document.getElementById('meme-area');
    ctx = canvas.getContext('2d');
    drawMeme();
}


function drawMeme() {
    let memeObj = getMemeImgById(gMeme.selectedImgId);
    let imgUrl = memeObj.url;
    img.src = imgUrl;
    canvas.width = img.width;
    canvas.height = img.height;

    img.onload = () => {
        drawBgImg(img);
        drawDinamicTxt(img);
        drawTextColor()
    };
}

function drawBgImg(img) {
    ctx.drawImage(img, 0, 0);
}

function drawDinamicTxt(img) {
    document.getElementById('memeText').addEventListener('keyup', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBgImg(img);
        drawText(this.value);
    });
}

function drawTextColor() {
    document.getElementById('memeTextColor').addEventListener('onchange', function () {
        console.log('ok');
    });
}

function drawText(text) {
    ctx.fillStyle = 'red';
    let text_title = text;
    ctx.font = "50px 'Montserrat'";
    ctx.fillText(text_title, 50, 50);
}