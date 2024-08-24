exports.handler = async (event) => {
    const lettersNumber = [];

    const queryParam = parseInt(event.queryStringParameters.len);
    const { cap, low, num, sym } = event.queryStringParameters;
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const lowerCaseAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const upperCaseAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "}", "[", "]", "|", ":", ";", "'", "<", ">", ",", ".", "?", "/", "~",];

    if (cap === undefined &&
        low === undefined &&
        num === undefined &&
        sym === undefined) {
        cap = true;
        low = true;
        num = true;
        sym = true;
    }

    if (num === 'true') { lettersNumber.push(...numbers); }
    if (sym === 'true') { lettersNumber.push(...symbolsArray); }
    if (cap === 'true') { lettersNumber.push(...upperCaseAlphabet); }
    if (low === 'true') { lettersNumber.push(...lowerCaseAlphabet); }

    let response = {};
    let genPassword = '';

    if (queryParam < 8) { genPassword = 'You need at least 8 character'; }
    else if (queryParam > 30) { genPassword = 'Your password cannot be longer then 30 character'; }
    else if (lettersNumber.length === 0) { genPassword = 'You need at least one query to be true' }
    else {
        if (num === 'true') genPassword += numbers[Math.floor(Math.random() * numbers.length)];
        if (sym === 'true') genPassword += symbolsArray[Math.floor(Math.random() * symbolsArray.length)];
        if (cap === 'true') genPassword += upperCaseAlphabet[Math.floor(Math.random() * upperCaseAlphabet.length)];
        if (low === 'true') genPassword += lowerCaseAlphabet[Math.floor(Math.random() * lowerCaseAlphabet.length)];
        
        for (let i = genPassword.length; i < queryParam; i++) {
            genPassword += lettersNumber[Math.floor(Math.random() * lettersNumber.length)];
        }
         // Blanda om lösenordet med Fisher-Yates algoritmen
         genPassword = shuffleFisherYates(genPassword.split('')).join('');
    }

    response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genPassword),
    };
    return response;
};

// Fisher-Yates shuffle implementation
function shuffleFisherYates(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}