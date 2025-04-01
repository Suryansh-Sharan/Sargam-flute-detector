const URL = "https://teachablemachine.withgoogle.com/models/l7ZfPCPgC/";

let recognizer;

// Load the audio model and start listening
async function init() {
    try {
        const checkpointURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // Create sound classifier
        recognizer = speechCommands.create(
            "BROWSER_FFT", // fourier transform type
            undefined, // speech commands vocabulary feature
            checkpointURL,
            metadataURL
        );

        await recognizer.ensureModelLoaded();

        // Ask for microphone permission and start listening
        recognizer.listen(result => {
            displayPrediction(result);
        }, {
            overlapFactor: 0.5, // Recommended value
            probabilityThreshold: 0.6 // Adjust if needed
        });

        document.getElementById("start-button").style.display = "none";
    } catch (error) {
        console.error("Error in audio recognition setup:", error);
        alert("Could not start audio recognition. " + error.message);
    }
}

// Display predictions in label container
function displayPrediction(result) {
    const labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = "";  // Clear old predictions

    result.scores.forEach((probability, index) => {
        const label = document.createElement("div");
        label.innerText = `${recognizer.wordLabels()[index]}: ${(probability * 100).toFixed(2)}%`;
        labelContainer.appendChild(label);
    });
}

// Start button event
document.getElementById("start-button").addEventListener("click", init);
