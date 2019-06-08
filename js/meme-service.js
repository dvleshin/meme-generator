'use strict';
const KEY = 'userMeme'
let gKeywords;
let gMeme;

let gImgs = [{
        id: 1,
        url: 'img/1.jpg',
        keywords: ['woman', 'happy', 'nature'],
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['child', 'cunning'],
    }, {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['man', 'smart'],
    }, {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['man', 'funny'],
    }, {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['obama', 'man', 'laughs'],
    }, {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['men', 'kiss', 'funny'],
    }, {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['children', 'dance', 'fun'],
    }, {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['tramp', 'man', 'angry'],
    }, {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['child', 'black', 'surprised'],
    }, {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['dog', 'stretching', 'fun'],
    }, {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['man', 'cheers', 'dicaprio'],
    }
];

function getImgs() {
    return gImgs;
}

function setMeme(id) {
    gMeme = {
        selectedImgId: id,
        txts: [{
                line: '',
                size: 50,
                align: 'center',
                color: '#ffffff',
                font: 'Impact',
                xPos: 0,
                yPos: 0
            },
            {
                line: '',
                size: 50,
                align: 'center',
                color: '#ffffff',
                font: 'Impact',
                xPos: 0,
                yPos: 0
            },
            {
                line: '',
                size: 50,
                align: 'center',
                color: '#ffffff',
                font: 'Impact',
                xPos: 0,
                yPos: 0
            }
        ]
    }
    saveToStorage(KEY, gMeme);
}


function getMemeImgById(id) {
    let meme = gImgs.find(meme => {
        return id === meme.id
    })
    return meme;
}

function getMemesFiltered(value) {
    if (!value) return gImgs;

    var regex = new RegExp(` ${value}`, 'i');
    var filteredImgs = gImgs.filter(img => {
        let keywordsStr = ' ' + img.keywords.join(' ') // space for serching every keyword (You can use any char by changing regex)
        return regex.exec(keywordsStr);
    })
    return filteredImgs;
}

function setRdnMeme() {
    let rndNumId = getRandomInt(1, gImgs.length);
    setMeme(rndNumId);
}