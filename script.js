// Define the URL for the dictionary API
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Get references to HTML elements using their IDs
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

// Add a click event listener to the button with the ID 'search-btn'
btn.addEventListener("click", () => {
    // Get the input word from the input field with the ID 'inp-word'
    let inpWord = document.getElementById("inp-word").value;

    // Make a fetch request to the dictionary API using the input word
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            // Log the API response data to the console
            console.log(data);

            // Update the HTML content with information from the API response
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;

            // Set the audio source for pronunciation
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            // Handle errors by displaying an error message in the HTML
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

// Function to play the pronunciation sound
function playSound() {
    sound.play();
}
