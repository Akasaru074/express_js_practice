const countElem = document.getElementById("count");
const btnElem = document.getElementById("inc");
let count = 0;

function incrementCount() {
    countElem.innerText = ++count;
}

btnElem.addEventListener('click', incrementCount);