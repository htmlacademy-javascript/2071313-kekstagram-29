import { imagePreview } from './scale.js';

const sliderEffectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = sliderContainer.querySelector('.effect-level__value');
const effectLevelSlider = sliderContainer.querySelector('.effect-level__slider');

const sliderEffects = {
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
  }
};


// Функция изменения фильтров слайдера
const changeFilters = (effect, value, unit = '') => {
  effectLevelValue.value = value;
  imagePreview.style.filter = `${effect}(${value}${unit})`;
};

// Функция отображения слайдера
const showSlider = (effects) => {
  sliderContainer.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    start: effects.max,
    step: effects.step,
    connect: 'lower',
    range: {
      min: effects.min,
      max: effects.max
    },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    const sliderValue = effectLevelSlider.noUiSlider.get();
    changeFilters(effects.name, sliderValue, effects.unit);
  });
};

// Функция сброса эффектов фильтра
const resetEffects = () => {
  sliderContainer.classList.add('hidden');
  imagePreview.style.filter = '';
  effectLevelValue.value = '';
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }
};

// Функция изменения эффектов
const onChangeEffect = (evt) => {
  resetEffects();
  const effects = sliderEffects[evt.target.value];
  if (effects) {
    showSlider(effects);
  }
};

//Функция обработчик события слайдера
const initSliderAndScale = () => {
  sliderEffectsList.addEventListener('change', onChangeEffect);
};

// Функция возврата значения фильтра по умолчанию
const resetUserPhotoEffects = () => {
  resetEffects();
  sliderEffectsList.removeEventListener('change', onChangeEffect);
};

export {initSliderAndScale, resetUserPhotoEffects};
