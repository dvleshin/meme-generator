'use strict';
let gUserImg;

function onInitMain() {
    let imgs = getImgs();
    renderGallery(imgs)
    createKeywordToCntMap();
    renderKeywordsValues();
}


function renderGallery(imgs) {

    var strHtmls = imgs.map(img => {
        return `
            <meme>
            <a href="editor.html" onclick="imgPicked(${img.id})"><img src="${img.url}" onmouseover="onImgHovered(this)" class="meme-img"></a>
            </meme>
            `
    })
    document.querySelector('.memes-imgs').innerHTML = `
        <meme class="upload-img flex">
            <label for="meme-upload">
            <img src="../img/upload.png">
            </label>
            <input type="file" id="meme-upload" name="image" onchange="onFileInputChange(this, event)" />
            <div> 
            <form action="" method="POST" enctype="multipart/form-data" onsubmit="onUploadUsrImg(this, event)">
                <input name="img" id="imgData" type="hidden"/>
                <button>edit</button>
            </form>
            </div>
        </meme>
    ${strHtmls.join('')}
    `
}

function imgPicked(id) {
    // console.log('img picked:', id);
    setMeme(id);
}

function onImgHovered(elImg) {
    elImg.classList.add('animated', 'pulse');
    setTimeout(() => elImg.classList.remove('animated', 'pulse'), 1000);
}

function onMemesFilter(value) {
    let imgs = getMemesFiltered(value);
    renderGallery(imgs)
    renderKeywordsValues();
}

function renderKeywordsValues() {
    const mostSearchedKeywords = getMostSearchedKeywords(5);

    let elKeywords = document.querySelectorAll('.keywords-container span');

    elKeywords.forEach(function (el, idx) {
        el.innerText = mostSearchedKeywords[idx];
    });
}

function onFileInputChange(elForm, event) {
    let reader = new FileReader();

    reader.onload = function (event) {
        gUserImg = new Image();
        gUserImg.src = event.target.result;
        console.log(gUserImg.src);
    }
    reader.readAsDataURL(event.target.files[0]);
    document.querySelector('.upload-img label').style.display = 'none';
}

function onUploadUsrImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gUserImg.src;
    uploadUsrImg(elForm, onSuccess);
}