
const getCountValue = () => {
    let count = 0;
    const duration = 5000;
    const step = 100 / (duration / 100);
    const interval = setInterval(() => {
        count += step;
        if (count >= 100) {
            clearInterval(interval);
            count = 100;
        }
        document.querySelector("label").innerHTML = Math.floor(count) + "%";
    }, 100);
}

const createProgressBar = () => {
    const root = document.getElementById("root");
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    const label = document.createElement("label");
    label.classList.add("label");
    const progress = document.createElement("div");
    progress.classList.add("progress");
    progressBar.appendChild(progress);
    root.appendChild(label);
    root.appendChild(progressBar);
    getCountValue();
}


createProgressBar();






