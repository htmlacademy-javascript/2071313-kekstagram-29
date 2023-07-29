const MAX_SCALE = 2;
const MIN_SCALE = 0.25;
const STEP = 0.25;
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
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

scaleBiggerButton.addEventListener('click', scaleBigger); // Обработчик по клику на копку больше

scaleSmallerButton.addEventListener('click', scaleSmaller); // Обработчик по клику на копку меньше

export { imagePreview, scaleControlValue };
