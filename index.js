document.getElementsByTagName('input')[0].focus(); // autofocus for input


function addedNewTranslit() {
    let input = document.getElementsByTagName('input')[0];

    // if input has full emply space or extra spaces

    let str = '';
    for (let i = 0; i < input.value.length; i++) {
        if (input.value[i] === ' ') {
            str += ''
        } else {
            str += input.value[i];
        }
    } input.value = str;

    // if input is emply, don't add translit!

    if (input.value === "") return;

    // if value long

    flag = false;
    let longInput;
    let shortInput = input.value;
    if (shortInput.length > 7) {
        longInput = input.value;
        shortInput = input.value.slice(0, 7);
        shortInput += '…';
        flag = true;
    };

    // let's add translit in first column dictonary

    let ulColumn1 = document.getElementsByTagName('ul')[0];
    let newLiColumn1 = document.createElement('li');
    let newPColumn1 = document.createElement('p');
    newLiColumn1.appendChild(newPColumn1);
    ulColumn1.appendChild(newLiColumn1);
    newPColumn1.innerText = shortInput;
    newLiColumn1.className = 'new';
    if (flag === true) {
        newPColumn1.className = 'hover';
        let long1Translit = document.createElement('p');
        newLiColumn1.appendChild(long1Translit);
        long1Translit.className = 'long1';
        long1Translit.innerText = longInput;
        flag = false;

        newPColumn1.onmouseover = () => {
            long1Translit.style.display = 'unset';
        };
        newPColumn1.onmouseout = () => {
            long1Translit.style.display = 'none'
        };;
    };
    
    // let's add translit in second column dictonary

    shortInput = translit(input.value);
    if (shortInput.length > 7) {
        longInput = translit(input.value);
        shortInput = shortInput.slice(0, 7);
        shortInput += '…';
        flag = true;
    };

    let ulColumn2 = document.getElementsByTagName('ul')[1];
    let newLiColumn2 = document.createElement('li');
    let newPColumn2 = document.createElement('p');
    let ButtonColumn2 = document.createElement('button');
    ButtonColumn2.className = 'del';
    let imgButtonColumn2 = document.createElement('img');
    imgButtonColumn2.setAttribute('src', './icons/delete.svg');
    imgButtonColumn2.setAttribute('alt', 'del');
    newLiColumn2.appendChild(newPColumn2);
    ButtonColumn2.appendChild(imgButtonColumn2);
    newLiColumn2.className = 'new';
    ulColumn2.appendChild(newLiColumn2);
    newPColumn2.innerText = shortInput;
    if (flag === true) {
        newPColumn2.className = 'hover';
        let long2Translit = document.createElement('p');
        newLiColumn2.appendChild(long2Translit);
        newLiColumn2.appendChild(ButtonColumn2);
        long2Translit.className = 'long2';
        long2Translit.innerText = longInput;
        flag = false;
        
        newPColumn2.onmouseover = () => {
            long2Translit.style.display = 'unset';
        };
        newPColumn2.onmouseout = () => {
            long2Translit.style.display = 'none';
        };

    } else {
        newLiColumn2.appendChild(ButtonColumn2);
    };

    input.value = ''; // return input value in start

    // remove current translit

    ButtonColumn2.addEventListener('click', () => {
        newLiColumn1.remove();
        newLiColumn2.remove();
    });
};

document.getElementsByTagName('button')[0].addEventListener('click', (addedNewTranslit));


// let's add the translation when pressing enter

let inputForEnter = document.getElementsByTagName('input')[0];
inputForEnter.addEventListener('keyup', event => {
    if (event.code === 'Enter') addedNewTranslit();
});

// clearing all dictinary

function deleteAllTranslit () {
    const liColumn1 = document.querySelector('.column1').querySelectorAll('li');
    const liColumn2 = document.querySelector('.column2').querySelectorAll('li');
    for (let i = 1; i < liColumn1.length; i++) liColumn1[i].remove();
    for (let i = 1; i < liColumn2.length; i++) liColumn2[i].remove();
};

document.querySelector('.button-delete').addEventListener('click', (deleteAllTranslit));



function translit(str) {
    const symbol = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "yo",
      ж: "zh",
      з: "z",
      и: "i",
      й: "j",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "h",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ъ: '"',
      ы: "y",
      ь: "'",
      э: "e",
      ю: "yu",
      я: "ya",
      "-": "-",
      " ": " ",
      "?": "?",
      "!": "!",
      ".": ".",
      "/": "/",
      "(": "(",
      ")": ")",
      "()": "()",
      А: "A",
      Б: "B",
      В: "V",
      Г: "G",
      Д: "D",
      Е: "E",
      Ё: "Yo",
      Ж: "Zh",
      З: "Z",
      И: "I",
      Й: "J",
      К: "K",
      Л: "L",
      М: "M",
      Н: "N",
      О: "O",
      П: "P",
      Р: "R",
      С: "S",
      Т: "T",
      У: "U",
      Ф: "F",
      Х: "H",
      Ц: "Ts",
      Ч: "Ch",
      Ш: "Sh",
      Щ: "Shch",
      Ъ: '"',
      Ы: "Y",
      Ь: "'",
      Э: "E",
      Ю: "Yu",
      Я: "Ya",
    };
    let result = '';
    let lastResult = '';
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < Object.keys(symbol).length; j++) {
            if (str[i] == Object.keys(symbol)[j]) result += Object.values(symbol)[j]; // if symb input == 'rus'
        }
        if (result === lastResult) { // if symb input == 'en'
            result += str[i] ;
            lastResult = result;
        } else {
            lastResult = result;
        }
    }
    return result;
};