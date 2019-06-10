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

    if (gMeme.selectedImgId === 0) {
        console.log('user mode');
        document.getElementById('upload-img').style.display = '';
    }

    gCanvas = document.getElementById('meme-area');
    gCtx = gCanvas.getContext('2d');
    drawMeme();

    // set data for user from local storage
    document.querySelector('#memeText').value = gMeme.txts[gCurrentTxtIdx].line;
    document.querySelector('select').value = gMeme.txts[gCurrentTxtIdx].font;
}

function renderResCanvas() {
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
}


function drawMeme() {

    let memeObj = getMemeImgById(gMeme.selectedImgId);
    let imgUrl = memeObj.url;
    gImg.src = imgUrl;
    // calculation of aspect ratio for image resizing

    renderResCanvas()

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

function onChangeTxtSize(elBtn, mode) {
    changeTxtSize(elBtn, mode);
}

function onFontSizeChange(value) {
    if (!gMeme.txts[gCurrentTxtIdx].line) return;
    gMeme.txts[gCurrentTxtIdx].size = +value;
    // console.log(gMeme.txts[gCurrentTxtIdx]);
    updateCanvas();
}

function changeTxtSize(elBtn, mode) {
    if (!gMeme.txts[gCurrentTxtIdx].line) return;
    gMeme.txts[gCurrentTxtIdx].size += mode;
    document.getElementById('fontSize').placeholder = gMeme.txts[gCurrentTxtIdx].size;
    updateCanvas();

    animate(elBtn, 'pulse');
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

function onNextTxt(elBtn) {
    if (gMeme.txts[gCurrentTxtIdx + 1]) gCurrentTxtIdx++;
    else gCurrentTxtIdx = 0;
    renderCtrlsVals();

    animate(elBtn, 'flash');
}

function renderCtrlsVals() {
    document.querySelector('#memeText').value = gMeme.txts[gCurrentTxtIdx].line;
    document.querySelector('#memeTextColor').value = gMeme.txts[gCurrentTxtIdx].color;
    document.querySelector('select').value = gMeme.txts[gCurrentTxtIdx].font;
}

function onTxtToggleUpDown(elBtn, mode) {
    gMeme.txts[gCurrentTxtIdx].yPos += mode;

    updateCanvas();

    animate(elBtn, 'pulse');
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

function onAlignTxt(elSpan, mode) {

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

    animate(elSpan, 'pulse');
}

function onClearCanvas(elBtn) {
    clearCanvas();
    gCurrentTxtIdx = 0;
    drawMeme();
    updateCanvas();
    document.querySelector('#memeText').value = '';
    document.querySelector('select').value = 'Impact';

    animate(elBtn, 'flip');
}

function onFileInputChange(event) {
    let reader = new FileReader();

    reader.onload = function (event) {
        gImg.src = event.target.result;
        renderResCanvas()
        // drawBgImg(userImg)
        // img.onload = drawBgImg.bind(null, img)
        // console.log(userImg.src);

    }
    reader.readAsDataURL(event.target.files[0]);
}