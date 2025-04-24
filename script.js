// Adi Biton 209355064
// Tmira Ohana 206451585

const fromButtons = document.querySelectorAll('#FROM button');
const toButtons = document.querySelectorAll('#TO button');
const convertBtn = document.querySelector('#convers button');
const inputField = document.querySelector('#B');
const resultSection = document.querySelector('#result div');

let fromBase = null;
let toBase = null;

fromButtons.forEach(button => {
    button.addEventListener('click', () => {
        fromButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        fromBase = getBaseFromText(button.textContent);
    });
});

toButtons.forEach(button => {
    button.addEventListener('click', () => {
        toButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        toBase = getBaseFromText(button.textContent);
    });
});

function getBaseFromText(text) {
    if (text.includes('Binary')) return 2;
    if (text.includes('Octal')) return 8;
    if (text.includes('Decimal')) return 10;
    if (text.includes('Hexadecimal')) return 16;
    return null;
}

function isValidInput(input, base) {
    const patterns = {
        2: /^[01]+$/,
        8: /^[0-7]+$/,
        10: /^\d+$/,
        16: /^[0-9a-fA-F]+$/
    };
    return patterns[base].test(input);
}

function convertNumber(input, fromBase, toBase) {
    const decimalValue = parseInt(input, fromBase);
    return decimalValue.toString(toBase).toUpperCase();
}

convertBtn.addEventListener('click', () => {
    const input = inputField.value.trim();

    if (fromBase === null || toBase === null) {
        alert('Please select both FROM and TO bases.');
        return;
    }

    if (!isValidInput(input, fromBase)) {
        alert('Invalid input for the selected FROM base!');
        return;
    }

    const output = convertNumber(input, fromBase, toBase);
    resultSection.innerHTML = `<b>Result:</b> ${input} (base ${fromBase}) = ${output} (base ${toBase})`;
    inputField.value = ''; 
});
