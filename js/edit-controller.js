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

    gMeme.txts[0].line = txt;

    updateCanvas();
}

function drawText(text) {
    ctx.fillStyle = `${gMeme.txts[0].color}`;
    let text_title = text;

    ctx.font = `${gMeme.txts[0].size}px 'Montserrat'`;

    ctx.fillText(text_title, 50, 50);
}

function onChangeTxtSize(mode) {
    changeTxtSize(mode);
}

function changeTxtSize(mode) {
    gMeme.txts[0].size += mode;

    updateCanvas();
}

function onChangeTxtColor(selectedColor) {
    gMeme.txts[0].color = selectedColor;
    updateCanvas();
}


function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBgImg(img);
    drawText(gMeme.txts[0].line);
}