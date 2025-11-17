import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from '../error.svg';

let userSelectedDate;
const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker')
const span = document.querySelectorAll('.value');
startBtn.setAttribute('disabled', '');   

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      const presentTime = Date.now();
        const selectedTime = selectedDates[0].getTime();
    
        if (selectedTime <= presentTime) {
          iziToast.error({
             backgroundColor: 'red',
            iconUrl: errorIcon,
            theme: 'dark',
            overlay: true,
            position: 'topCenter',
            title: 'Error',
            titleColor: 'white',
            message: "Please choose a date in the future",
            messageColor: 'white',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
            });
            startBtn.setAttribute('disabled', '');
            return;
        } 

         startBtn.removeAttribute('disabled');
        userSelectedDate = selectedTime;
        console.log(selectedDates[0]);
    }, 
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

let intervalId;

function startTimer() {
const timer = userSelectedDate - Date.now();
  [...span].map((item, index) => item.textContent = addLeadingZero(Object.values(convertMs(timer))[index]));  
  if (timer <= 1000) {
    clearInterval(intervalId);
  input.removeAttribute('disabled', '');
  }
}
startBtn.addEventListener('click', () => {
    intervalId = setInterval(startTimer, 1000);
  startBtn.setAttribute('disabled', '');
    input.setAttribute('disabled', '');
});


flatpickr('input[type="text"]', options)


