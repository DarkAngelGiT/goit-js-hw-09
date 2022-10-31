import throttle from 'lodash.throttle';

// отримуємо посилання на елементи форми 
const formRef = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state'; // ключ для сховища
const formData = {} // пустий об"єкт куди будемо зберігати значення полів

// додаємо подію
formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormData, 500))

// ф-ція викликається при завантаженні/оновленні сторінки перевіряє чи не пусті поля
SaveData();

// ф-ція при натисканні кнопки на відправку
function onFormSubmit(event) {
  event.preventDefault(); //заборона оновлювати сторінку
  
  formData.email = formRef.elements.email.value; // записуємо в об"єкт властивість і її значення
  formData.message = formRef.elements.message.value; //
  console.log(formData); // консолимо записані з полів дані

  formRef.reset(); // очищуємо форму після натискання кнопки

  localStorage.removeItem(STORAGE_KEY); // видаляємо ключ з локального сховища
}

// функція отримання значень з полів форми і запис їх в локальне сховище
function onFormData(event) {  
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));// перетворюємо об"єкт в валідний рядок JSON для запису

  // console.log(formData);
}

// ф-ція викликається при завантаженні/оновленні сторінки перевіряє чи не пусті поля якщо ні то записує значення у відповідні поля форми
function SaveData() {
  let savedData = localStorage.getItem(STORAGE_KEY); // беремо дані з ключа
  if (savedData) { // якщо дані є, перетворюємо валідний рядок JSON в об"єкт для маніпуляцій даними
    const parceSaveData = JSON.parse(savedData);
    // console.log(parceSaveData);

    for (const prop in parceSaveData) {
      if (parceSaveData.hasOwnProperty(prop)) {
        // console.log(parceSaveData[prop]);
        formRef.elements[prop].value = parceSaveData[prop];
        formData[prop] = parceSaveData[prop];
      }
    }
  }
}
