import { Notify } from 'notiflix/build/notiflix-notify-aio';

// посилання на форму
const formRef = document.querySelector('.form');

// Ф-ція створення проміса з 2ма параметрами: номер проміса (position) та затримка (delay)
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      }
      reject({ position, delay })
    }, delay);
  });
};
  
// Кол-бек ф-ція при натисканні на кнопку submit
function onSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const dataForm = new FormData(form);
  const finalData = {};
  for (const [key, value] of dataForm.entries()) {
    finalData[key] = Number(value);
  }
  // очищення форми
  form.reset();
  // в циклі for викликаємо й-цію для створення промісу
  for (let position = 1; position <= finalData.amount; position += 1){
    createPromise(position, finalData.delay).then(onSuccess).catch(onError);
    finalData.delay = finalData.delay + finalData.step;
  };
};

// Ф-ція що викликається методом catch, коли проміс повертає reject
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};

// Ф-ція що викликається методом then, коли проміс повертає resolve
function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

// Додаємо подію на кнопку submit
formRef.addEventListener('submit', onSubmit);