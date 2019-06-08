'use strict';
let gCanvas;
let gCtx;
let gImg = new Image();
let gCurrentTxtIdx = 0;

function onInitEditor() {
    gMeme = loadFromStorage(KEY);
    if (!gMeme) {
        setRdnMeme();
        gMeme = loadFromStorage(KEY);
    }
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

    let starterYPos = 50;
    let starterXPos = gCanvas.width / 2

    gMeme.txts[0].xPos = starterXPos;
    gMeme.txts[0].yPos = starterYPos;
    gMeme.txts[1].xPos = starterXPos;
    gMeme.txts[1].yPos = gCanvas.height - 20;
    gMeme.txts[2].xPos = starterXPos;
    gMeme.txts[2].yPos = (gCanvas.height / 2) + 15;

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
            gCtx.textAlign = txt.align;
            gCtx.fillText(txt.line, txt.xPos, txt.yPos);

            if (txt.font === 'Impact') {
                gCtx.strokeStyle = 'black';
                gCtx.lineWidth = 3;
                gCtx.strokeText(txt.line, txt.xPos, txt.yPos);
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
    renderCtrlsVals();
    console.log(gCurrentTxtIdx);

}

function renderCtrlsVals() {
    document.querySelector('#memeText').value = gMeme.txts[gCurrentTxtIdx].line;
    document.querySelector('#memeTextColor').value = gMeme.txts[gCurrentTxtIdx].color;
    document.querySelector('select').value = gMeme.txts[gCurrentTxtIdx].font;
}

function onTxtToggleUpDown(mode) {
    gMeme.txts[gCurrentTxtIdx].yPos += mode;

    updateCanvas();
}

function onTxtToggleLeftRight(mode) {
    gMeme.txts[gCurrentTxtIdx].xPos += mode;

    updateCanvas();
}

function updateCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawBgImg(gImg);
    drawText();
}

function downloadImg(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data
    elLink.download = 'my-meme.jpg';
}

function onAlignTxt(mode) {

    if (mode === 'left') {
        gMeme.txts[gCurrentTxtIdx].align = 'left'
        gMeme.txts[gCurrentTxtIdx].xPos = 10;
    } else if (mode === 'right') {
        gMeme.txts[gCurrentTxtIdx].align = 'right'
        gMeme.txts[gCurrentTxtIdx].xPos = gCanvas.width - 10;
    } else if (mode === 'center') {
        gMeme.txts[gCurrentTxtIdx].align = 'center'
        gMeme.txts[gCurrentTxtIdx].xPos = gCanvas.width / 2;
    }
    updateCanvas();
}