import "./styles.css";

const progressBarInput = document.querySelector(".progress-bar-input");
progressBarInput.addEventListener("input", function () {
    const progressBar = document.querySelector(".progress-bar");
    if (this.value && this.value >= 0 && this.value <= 100) {
        progressBar.style.width = `${this.value}%`;
    } else {
        progressBar.style.width = `0%`;
    }
});
