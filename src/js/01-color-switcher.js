// Посилання на кнопки
// const btnStartRef = document.querySelector('[data-start]');
// const btnStopRef = document.querySelector('[data-stop]');
const refs = {
  btnStartRef: document.querySelector('[data-start]'),
  btnStopRef: document.querySelector('[data-stop]'),
}

// змінна для id свореного таймером
let idInterval = null;

// Ф-ція для обробки кнопки Start
const onChangeColor = (event) => {
    onBtnDisabled ()
    idInterval = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor =`${color}`;
    }, 1000)
}

// Ф-ція для обробки кнопки Stop
const onStopChangeColor = (event) => {
    clearInterval(idInterval);
    onBtnDisabled ()
}
// Ф-ція генерації кольору 
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Ф-ція зміни статусу кнопки (disabled) с true на false
function onBtnDisabled () {
  if (!refs.btnStartRef.disabled) {
    refs.btnStartRef.disabled = true;
    refs.btnStopRef.disabled = false
  } else {
    refs.btnStartRef.disabled = false;
    refs.btnStopRef.disabled = true
  }
}

// Додаємо події на кнопки
refs.btnStartRef.addEventListener("click", onChangeColor);
refs.btnStopRef.addEventListener("click", onStopChangeColor);
