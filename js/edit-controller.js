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
    };
}

function drawBgImg(img) {
    ctx.drawImage(img, 0, 0);
}

function onTxtChanged() {
    let txt = document.getElementById('memeText').value;
    console.log(txt);
    gMeme.txts[0].line = txt;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBgImg(img);
    drawText(txt);

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

function onChangeTxtSize(mode) {
    drawMeme();
}