//Task 1
let parametrs = {
    width: undefined,
    height: undefined,
}

function calcPer() {
    return validate() || 2 * parametrs.height + 2 * parametrs.width;
}

function calcSquare() {
    return validate() || parametrs.height * parametrs.width
}

function calcDiagonal() {
    return validate() ||
        Math.sqrt(Math.pow(parametrs.height, 2) + Math.pow(parametrs.width, 2))
            .toFixed(3);
}

function validate() {
    if (parametrs.height<=0 || parametrs.width <= 0) {
        return "null";
    }
}

function setParams() {
    const results = document.getElementsByClassName("task1__result");
    results[0].innerHTML = calcSquare();
    results[1].innerHTML = calcPer();
    results[2].innerHTML = calcDiagonal();

}

function getInputByID(id) {
    return document.getElementById(id);
}

let width = getInputByID("width");
let height = getInputByID("height");

let inputListener = (site) => {
    let inputValue = getInputByID(site).value;
    parametrs[site] = inputValue;
    console.log(`Parameter ${site}: ${inputValue} is added`);
    setParams();
}

width.addEventListener("input", event => inputListener("width"))

height.addEventListener("input", event => inputListener("height"));


//Task3
let charsMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', "ґ": "g", 'д': 'd',
    'е': 'e', 'є': 'ie', 'ж': 'zh', 'з': 'z', 'и': 'i/i', 'і': 'i',
    'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
    'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': '4',
    'ш': 'w', 'щ': 'sch', 'ь': '', 'ї': 'yi', 'ю': 'yu', 'я': '9i',

    'A': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', "Ґ": "G", 'Д': 'D',
    'Е': 'E', 'Є': 'IE', 'Ж': 'ZH', 'З': 'Z', 'И': '|/|', 'І': 'i',
    'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
    'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
    'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': '4',
    'Ш': 'W', 'Щ': 'SCH', 'Ь': '', 'Ї': 'yi', 'Ю': 'yu', 'Я': '9I',
}
let uaInput = getInputByID("uaText")
let euInput = getInputByID("euText")

uaInput.addEventListener("input", function (event) {
    translitFromTo("uaText", "euText")
})
euInput.addEventListener("input", function (event) {
    translitFromTo("euText", "uaText")
})

function translitFromTo(fTextName, sTextName) {
    let from = getInputByID(fTextName);
    let to = getInputByID(sTextName);
    let toText = "";
    for (let char of from.value) {
        if (charsMap[char]) {
            toText += charsMap[char];
            continue
        }
        toText += char;
    }
    console.log("Text for translition: " + toText)
    to.value = toText;
}


//Task 2
const jsonText = '["file1.png", "file2.png", "file3.png"]';
let images = JSON.parse(jsonText);

const fotos = document.querySelectorAll(".task2__item");
for (let i = 0; i < fotos.length; i++) {
    let currFoto = fotos[i];
    currFoto.addEventListener("click", event => {
        addDownScaleFoto(i, currFoto)
    })
}

function addDownScaleFoto(i, currFoto) {
    let imgSrc = `img/${images[i]}`
    let scaleImg = document.querySelector(".task2__scale");
    if (scaleImg) {
        scaleImg.remove();
    }
    currFoto.parentElement.insertAdjacentHTML("afterend",
        `<div class='task2__scale'><img src=${imgSrc} alt='scale'></div>`);
}

//Task4

const weekDays = {
    "1": "Понеділок",
    "2": "Вівторок",
    "3": "Середа",
    "4": "Четвер",
    "5": "П'ятниця",
    "6": "Субота",
    "0": "Неділя",
}

const daysForm = document.forms["daysForm"];
const daysInputs = daysForm.elements;
const daysButton = daysForm.nextElementSibling;
daysButton.addEventListener("click", handleWeekDay)

function handleWeekDay(event) {
    let resultDiv = document.querySelector(".task4__result");
    let day = daysInputs.day.value;
    let month = daysInputs.month.value;
    let year = daysInputs.year.value;
    if (weekExceptionHandler(+day, +month, +year)) {
        resultDiv.innerHTML = "impossible to calculate";
        return
    }
    let a = Math.floor((14 - month) / 12);
    let y = Math.floor(+year - a);
    let m = Math.floor(+month + 12 * a - 2);
    let result = (+day + y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + Math.floor((31 * m) / 12)) % 7;
    resultDiv.innerHTML = weekDays[result];
}

function weekExceptionHandler(day, month, year) {
    if (!(0 < day < 32)) {
        return true;
    }
    if (!(0 < month < 13)) {
        return true;
    }
    if (!(1581 < year)) {
        return true;
    }
    return (year === 1582) && (month <= 10) && (day < 15);
}




