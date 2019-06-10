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

    // set data for user from local storage
    document.querySelector('#memeText').value = gMeme.txts[gCurrentTxtIdx].line;
    document.querySelector('select').value = gMeme.txts[gCurrentTxtIdx].font;
}


function drawMeme() {
    let memeObj = getMemeImgById(gMeme.selectedImgId);
    let imgUrl = memeObj.url;
    gImg.src = imgUrl;


    // calculation of aspect ratio for image resizing
    let acpectRatio = gImg.width / gImg.height;

    if (window.innerWidth < 620) {
        gCanvas.width = window.innerWidth - 20;
        gImg.height = gCanvas.width / acpectRatio;
        gCanvas.height = gImg.height;
    } else {
        if (gImg.width > 600 || gImg.width < 400) {
            gImg.width = 600;
            gImg.height = gImg.width / acpectRatio;
            gCanvas.width = gImg.width;
            gCanvas.height = gImg.height;
        }
        gCanvas.width = gImg.width;
        gCanvas.height = gImg.height;
    }

    //set default align
    gMeme.txts.forEach(txt => {
        txt.align = 'center';
    })

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
        updateCanvas();
    };
}

function drawBgImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onTxtChanged() {
    let txt = document.getElementById('memeText').value;
    gMeme.txts[gCurrentTxtIdx].line = txt;

    updateCanvas();
}

function drawText() {
    gMeme.txts.forEach((txt, idx) => {
        if (txt.line !== '') {
            let font = txt.font.replace(/\"/g, '')
            gCtx.fillStyle = txt.color;
            console.log(gMeme);
            gCtx.font = `${txt.size}px ${font}`;
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

function onFontSizeChange(value) {
    if (!gMeme.txts[gCurrentTxtIdx].line) return;
    gMeme.txts[gCurrentTxtIdx].size = +value;
    // console.log(gMeme.txts[gCurrentTxtIdx]);
    updateCanvas();
}

function changeTxtSize(mode) {
    if (!gMeme.txts[gCurrentTxtIdx].line) return;
    gMeme.txts[gCurrentTxtIdx].size += mode;
    document.getElementById('fontSize').placeholder = gMeme.txts[gCurrentTxtIdx].size;
    updateCanvas();
}

function onChangeTxtColor(selectedColor) {
    if (!gMeme.txts[gCurrentTxtIdx].line) return;
    gMeme.txts[gCurrentTxtIdx].color = selectedColor;
    updateCanvas();
}

function onFontChanged(font) {
    if (!gMeme.txts[gCurrentTxtIdx].line) return;
    gMeme.txts[gCurrentTxtIdx].font = font;
    updateCanvas();
}

function onNextTxt() {
    if (gMeme.txts[gCurrentTxtIdx + 1]) gCurrentTxtIdx++;
    else gCurrentTxtIdx = 0;
    renderCtrlsVals();
    // console.log(gCurrentTxtIdx);

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

function updateCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawBgImg(gImg);
    drawText();
    saveToStorage(KEY, gMeme)
}

function downloadImg(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data
    elLink.download = 'my-meme.jpg';
    saveToStorage(KEY, '')
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

function onClearCanvas() {
    clearCanvas();
    updateCanvas();
    document.querySelector('#memeText').value = '';
    document.querySelector('select').value = 'Impact';
}