import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from "../img/error.svg";

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

let userDate = null;
let timerId = null;

startBtn.disabled = true;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const now = Date.now();
    const chosenTime = selectedDates[0].getTime();

    if (chosenTime <= now) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        iconUrl: errorIcon,
        backgroundColor: "red",
        theme: "dark",
        position: "topCenter"
      });

      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userDate = chosenTime;
    }
  }
});

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  input.disabled = true;

  timerId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userDate - currentTime;

    if (diff <= 0) {
      clearInterval(timerId);
      input.disabled = false;
      return;
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(diff / day);
    const hours = Math.floor((diff % day) / hour);
    const minutes = Math.floor((diff % hour) / minute);
    const seconds = Math.floor((diff % minute) / second);

    daysField.textContent = String(days).padStart(2, "0");
    hoursField.textContent = String(hours).padStart(2, "0");
    minutesField.textContent = String(minutes).padStart(2, "0");
    secondsField.textContent = String(seconds).padStart(2, "0");
  }, 1000);
});