'use strict';
let canvas;
let ctx;
let img = new Image();
let currentTxtIdx = 0;

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

    gMeme.txts[currentTxtIdx].line = txt;

    updateCanvas();
}

function drawText(text) {
    ctx.fillStyle = `${gMeme.txts[currentTxtIdx].color}`;
    let text_title = text;

    ctx.font = `${gMeme.txts[currentTxtIdx].size}px '${gMeme.txts[currentTxtIdx].font}'`;
    if (gMeme.txts[currentTxtIdx].font === 'Impact') {
        ctx.strokeText(text, 50, 50);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
    }

    ctx.fillText(text_title, 50, 50);
}

function onChangeTxtSize(mode) {
    changeTxtSize(mode);
}

function changeTxtSize(mode) {
    gMeme.txts[currentTxtIdx].size += mode;

    updateCanvas();
}

function onChangeTxtColor(selectedColor) {
    gMeme.txts[currentTxtIdx].color = selectedColor;
    updateCanvas();
}

function onFontChanged(font) {
    gMeme.txts[currentTxtIdx].font = font;

    updateCanvas();
}

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBgImg(img);
    drawText(gMeme.txts[currentTxtIdx].line);
}