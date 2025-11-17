import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from '../error.svg';
import checkIcon from '../check.svg';

const delayInput = document.querySelector('input[name="delay"]');
const form = document.querySelector('form');
delayInput.step = 1000;
delayInput.spellcheck = false;
delayInput.min = 1000;
delayInput.defaultValue = 1000;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.querySelector('input[name="state"]:checked');
    const makePromise = ({ value, delay }) => {
    
  return new Promise((resolve, reject) => {
	   setTimeout(() => {
				if(input.value === "fulfilled") {
                    resolve(value);
				} else {
                    reject(value);
				}
			}, delay);
  });
    };
    
    const obj = {
        value: input.value, 
        delay: +delayInput.value,
    }

    makePromise(obj)
        .then(value => 
            iziToast.success({
            backgroundColor: 'green',
            iconUrl: checkIcon,
            theme: 'dark',
            overlay: false,
            position: 'topCenter',
            title: 'OK',
            titleColor: 'white',
            message: `Fulfilled promise in ${obj.delay}ms`,
            messageColor: 'white',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
            })
        )
        .catch(error =>
            iziToast.error({
            backgroundColor: 'red',
            iconUrl: errorIcon,
            theme: 'dark',
            overlay: false,
            position: 'topCenter',
            title: 'Error',
            titleColor: 'white',
            message: `Rejected promise in ${obj.delay}ms`,
            messageColor: 'white',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
            })
        );
}
)
