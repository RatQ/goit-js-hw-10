import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from '../img/error.svg';
import checkIcon from '../img/check.svg';

const form = document.querySelector('form');
const delayInput = document.querySelector('input[name="delay"]');
const stateInputs = document.querySelectorAll('input[name="state"]');

delayInput.step = 1000;
delayInput.min = 1000;
delayInput.value = 1000;

function showSuccess(delay) {
  iziToast.success({
    backgroundColor: 'green',
    iconUrl: checkIcon,
    title: 'OK',
    message: `Fulfilled promise in ${delay}ms`,
    theme: 'dark',
    position: 'topCenter',
  });
}

function showError(delay) {
  iziToast.error({
    backgroundColor: 'red',
    iconUrl: errorIcon,
    title: 'Error',
    message: `Rejected promise in ${delay}ms`,
    theme: 'dark',
    position: 'topCenter',
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const state = document.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(showSuccess)
    .catch(showError);
});