const MAX_SCALE = 2;
const MIN_SCALE = 0.25;
const STEP = 0.25;
const scaleSmallerHandler = document.querySelector('.scale__control--smaller');
const scaleBiggerHandler = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
// Функция уменьшения масштаба изображения
const scaleBigger = () => {
  const currentScale = parseFloat(scaleControlValue.value) / 100; // Текущий масштаб, делим на 100 для получения десятичного числа
  const newScale = currentScale + STEP;
  if (newScale <= MAX_SCALE) { // Выполняем проверку, если масштаб не больше или равен максимальному значению
    scaleControlValue.value = `${newScale * 100 }%`; // Устанавливаем новое значение в поле
    imagePreview.style.transform = `scale(${ newScale })`; // Применяем масштаб с помощью CSS
  }
};
// Функция увеличение масштаба изображения
const scaleSmaller = () => {
  const currentSmallerScale = parseFloat(scaleControlValue.value) / 100;
  const newSmallerScale = currentSmallerScale - STEP;
  if (newSmallerScale >= MIN_SCALE) {
    scaleControlValue.value = `${newSmallerScale * 100 }%`;
    imagePreview.style.transform = `scale(${ newSmallerScale })`;
  }
};

const addHandlersToScale = (evt) => {
  if (evt.target === scaleSmallerHandler) {
    scaleSmaller();
  } else if (evt.target === scaleBiggerHandler) {
    scaleBigger();
  }
};

const addScaleHandlers = () => {
  scaleSmallerHandler.addEventListener('click', addHandlersToScale);
  scaleBiggerHandler.addEventListener('click', addHandlersToScale);
};

export { imagePreview, scaleControlValue, scaleSmallerHandler, scaleBiggerHandler, addScaleHandlers };
