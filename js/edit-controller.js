'use strict';
let gCanvas;
let gCtx;
let gImg = new Image();
let gCurrentTxtIdx = 0;

function onInitEditor() {
    gMeme = loadFromStorage('userMeme');
    gCanvas = document.getElementById('meme-area');
    gCtx = gCanvas.getContext('2d');
    drawMeme();
}


function drawMeme() {
    let memeObj = getMemeImgById(gMeme.selectedImgId);
    let imgUrl = memeObj.url;
    gImg.src = imgUrl;
    gCanvas.width = gImg.width;
    gCanvas.height = gImg.height;

    gImg.onload = () => {
        drawBgImg(gImg);
    };
}

function drawBgImg(img) {
    gCtx.drawImage(img, 0, 0);
}

function onTxtChanged() {
    let txt = document.getElementById('memeText').value;

    gMeme.txts[gCurrentTxtIdx].line = txt;

    updateCanvas();
}

function drawText() {

    gMeme.txts.forEach((txt, idx) => {
        if (txt.line !== '') {
            gCtx.fillStyle = txt.color;
            gCtx.font = `${txt.size}px '${txt.font}'`;

            let canvasX = 50;
            let canvasY = idx === 0 ? canvasX : idx === 1 ? gCanvas.height - 20 : (gCanvas.height / 2) + 15;
            gCtx.fillText(txt.line, canvasX, canvasY);

            if (txt.font === 'Impact') {
                gCtx.strokeStyle = 'black';
                gCtx.lineWidth = 3;
                gCtx.strokeText(txt.line, canvasX, canvasY);
            }
        }
    });
}

function onChangeTxtSize(mode) {
    changeTxtSize(mode);
}

function changeTxtSize(mode) {
    gMeme.txts[gCurrentTxtIdx].size += mode;

    updateCanvas();
}

function onChangeTxtColor(selectedColor) {
    gMeme.txts[gCurrentTxtIdx].color = selectedColor;
    updateCanvas();
}

function onFontChanged(font) {
    gMeme.txts[gCurrentTxtIdx].font = font;

    updateCanvas();
}

function onNextTxt() {
    if (gMeme.txts[gCurrentTxtIdx + 1]) gCurrentTxtIdx++;
    else gCurrentTxtIdx = 0;
    console.log(gCurrentTxtIdx);

}

function updateCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawBgImg(gImg);
    // drawText(gMeme.txts[gCurrentTxtIdx].line);
    drawText();
}

function downloadImg(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data
    elLink.download = 'my-meme.jpg';
}