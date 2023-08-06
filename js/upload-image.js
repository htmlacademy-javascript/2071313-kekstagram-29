import { initSliderAndScale, resetUserPhotoEffects } from './edit.js';
import { uploadPhoto } from './network-loading.js';
import { scaleControlValue } from './scale.js';

const body = document.querySelector('body');
const imageInput = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview').querySelector('img');
const imageOverlay = document.querySelector('.img-upload__overlay');
const cancelUploadButton = document.querySelector('.img-upload__cancel');
const hashtagField = imageOverlay.querySelector('.text__hashtags');
const commentField = imageOverlay.querySelector('.text__description');
const submitButton = imageOverlay.querySelector('.img-upload__submit');
const imageUploadForm = document.querySelector('.img-upload__form');
const effectPreviews = imageOverlay.querySelectorAll('.effects__preview');
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

// Проверка на дублирование хештегов
const checkDuplicateHashtags = (hashTags) => {
  const uniqueHashtags = new Set(hashTags);
  return uniqueHashtags.size === hashTags.length;
};

// Функция которая разделяет строку по пробелу на массив
const normalizeTags = (tagString) => tagString
  .trim() // обрезает пробелы в начале и в конце строки
  .toLowerCase()
  .split(' ')
  .filter((tag) => Boolean(tag.length)); // метод фильтрует массив и удаляет все пробелы

const pristine = new Pristine(imageUploadForm, { // Создаем экземпляр класс Pristine принимающий в себя форму и настройки
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  erorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashtagField, (value) => { // Обработка кастомных ошибок на превышение кол-ва хэштегов
  const hashTags = normalizeTags(value);

  if (hashTags.length > 5) {
    return false;
  }

  return true;
}, 'превышено количество хэш-тегов', false);

pristine.addValidator(hashtagField, (value) => { // Обработка кастомных ошибок на невалидный хэштег
  const hashTags = normalizeTags(value);

  for (const hashTag of hashTags) {
    if (!HASHTAG_PATTERN.test(hashTag)) {
      return false;
    }
  }

  return true;
}, 'введён невалидный хэш-тег', false);

pristine.addValidator(hashtagField, (value) => { // Обработка кастомных ошибок на дублировани хэштега
  const hashTags = normalizeTags(value);

  return checkDuplicateHashtags(hashTags);
}, 'хэш-теги повторяются', false);
// Обработка кастомных ошибок для комментариев
pristine.addValidator(commentField, (value) => value.length <= 140, 'Длина комментария не может составлять больше 140 символов', false);
// Функция проверяющаая поля ввода хэштегов и комментариев в фокусе
const isTextFieldFocused = () => (
  document.activeElement === hashtagField ||
  document.activeElement === commentField
);
// Функция скрытия модалки
const hideModal = () => {
  resetUserPhotoEffects();
  scaleControlValue.value = '100%';
  preview.style.transform = 'none';
  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelUploadButton.removeEventListener('click', onCancelButtonClick);
  imageOverlay.removeEventListener('click', onOverlayClick);
  imageUploadForm.reset();
  pristine.reset();
};

// Функция показа модалки
const showModal = () => {
  initSliderAndScale();
  body.classList.add('modal-open');
  cancelUploadButton.addEventListener('click', onCancelButtonClick); // Закрытие модалки по нажатию на кнопку закрытия
  document.addEventListener('keydown', onDocumentKeydown);
  imageOverlay.classList.remove('hidden');
  imageOverlay.addEventListener('click', onOverlayClick);
};

function onOverlayClick(evt) {
  if (evt.target === imageOverlay) {
    hideModal();
  }
}

function onDocumentKeydown(evt) { // Функция для проверки является ли нажатая клавиша esc
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

// Функция по загрузки файла с устройства
const onImageInputChange = (evt) => {
  const files = evt.target.files; // Массив файлов которые выбрал пользователь

  if (files.length) { // Проверка на то что массив с файлами не пустой
    const fileReader = new FileReader(); // Создаем экземпляр класса (набор методов, позволяющих взаимодействовать с файлами)
    const file = files[0]; // Первый элемент массива с файлами

    fileReader.addEventListener('load', (event) => { // Навешиваем событие load на загрузку файла
      preview.src = event.target.result; // Заменяем путь к файлу
      effectPreviews.forEach((el) => {
        el.style.backgroundImage = `url(${event.target.result})`;
      });
      showModal();
    });

    fileReader.readAsDataURL(file); // Метод позволяющий прочитать файл как url
  }
};

function onCancelButtonClick() {
  hideModal();
}

imageInput.addEventListener('change', onImageInputChange); // Добавляем событие загрузки файла


const onErrorEscapePress = (event) => {
  if (event.key === 'Escape') {
    hideError();
  }
};

const onCloseErrorClick = (event) => {
  if (
    event.target.classList.contains('error') ||
    event.target.classList.contains('error__button')
  ) {
    hideError();
  }
};

function hideError() {
  const child = document.querySelector('.error');
  document.body.removeChild(child);
  document.addEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('keydown', onErrorEscapePress);
  document.removeEventListener('click', onCloseErrorClick);
}

const showError = () => {
  const errorTemplate = document.getElementById('error');
  const errorClone = errorTemplate.content.cloneNode(true);

  document.body.appendChild(errorClone);
  document.removeEventListener('keydown', onDocumentKeydown);


  document.addEventListener('keydown', onErrorEscapePress);
  document.addEventListener('click', onCloseErrorClick);
  submitButton.removeAttribute('disabled');
};

const onSuccessEscapePress = (event) => {
  if (event.key === 'Escape') {
    hideSuccess();
  }
};

const onSuccessButtonClick = (event) => {
  if (
    event.target.classList.contains('success') ||
    event.target.classList.contains('success__button')
  ) {
    hideSuccess();
  }
};

function hideSuccess() {
  const child = document.querySelector('.success');
  document.body.removeChild(child);
  document.removeEventListener('keydown', onSuccessEscapePress);
  document.removeEventListener('click', onSuccessButtonClick);
}

const showSuccess = () => {
  const succsessTemplate = document.getElementById('success');
  const succsessClone = succsessTemplate.content.cloneNode(true);

  document.body.appendChild(succsessClone);
  hideModal();

  document.addEventListener('keydown', onSuccessEscapePress);
  document.addEventListener('click', onSuccessButtonClick);
  submitButton.removeAttribute('disabled');
};

const addUploadImageHandler = () => {
  imageUploadForm.addEventListener('submit', (evt) => { // Отправка формы
    evt.preventDefault();
    submitButton.setAttribute('disabled', true);
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      uploadPhoto(formData, showSuccess, showError);
    }
  });
};

export { addUploadImageHandler };
