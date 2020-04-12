const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const word = ['application', 'programming', 'node', 'python', 'greatest'];
let selectedWord = word[Math.floor(Math.random() * word.length)];

const correctLetters = [];
const wrongLetters = [];

// show the 
function displayWord() {
    wordElement.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
        <span class = "letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `).join('')
    }
    `;

    const innerWord = wordElement.innerText.replace(/\n/g, '');
    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations You Won!';
        popup.style.display = 'flex';
    }
}

// update wrong letters function
function updateWrongLetterElement() {
    // display wrong letter
    wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Incorrect:</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // display figure parts 
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if the game is lost 
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'You have lost!';
        popup.style.display = 'flex';
    }
}

// show notification function
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// keydown letter press 
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
                else {
                    showNotification();
                }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetterElement();
            } else {
                showNotification();
            }
        }
    }
});

// Restart Game & Play again
playAgainButton.addEventListener('click', () => {
    // Empty the arrays 
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = word[Math.floor(Math.random() * word.length)];

    displayWord();

    updateWrongLetterElement();
    popup.style.display = 'none';
})

displayWord();