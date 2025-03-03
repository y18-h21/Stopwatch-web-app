// Elements
const startStopButton = document.getElementById('startStopButton');
const lapButton = document.getElementById('lapButton');
const resetButton = document.getElementById('resetButton');
const stopwatchDisplay = document.getElementById('stopwatch-display');
const lapList = document.getElementById('lapList');

let isRunning = false;
let time = 0; // Time in seconds
let interval;
let lapCount = 1;

// Start/Stop the stopwatch
startStopButton.addEventListener('click', () => {
    if (isRunning) {
        // Pause the stopwatch
        clearInterval(interval);
        startStopButton.textContent = 'Start';
    } else {
        // Start the stopwatch
        interval = setInterval(updateTime, 1000);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

// Lap button functionality
lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(time);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
        lapCount++;
    }
});

// Reset button functionality
resetButton.addEventListener('click', () => {
    clearInterval(interval);
    time = 0;
    lapCount = 1;
    stopwatchDisplay.textContent = '00:00:00';
    lapList.innerHTML = '';
    startStopButton.textContent = 'Start';
    isRunning = false;
});

// Update the time on the stopwatch
function updateTime() {
    time++;
    stopwatchDisplay.textContent = formatTime(time);
}

// Format time as MM:SS or HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(secs)}`;
}

// Pad numbers with leading zeros (e.g., 01, 09)
function padZero(num) {
    return num < 10 ? `0${num}` : num;
}
