'use strict';

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
            <input type="file" id="meme-upload" name="image" onchange="onFileInputChange(event)" />
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

function onFileInputChange(event) {
    let reader = new FileReader();
    console.log(reader);

    debugger;
    reader.onload = function (event) {
        let img = new Image();
        console.log(img);
        img.src = event.target.result;
    }

}