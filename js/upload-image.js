const imageInput = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview').querySelector('img');
const imageOverlay = document.querySelector('.img-upload__overlay');
const cancelUploadButton = document.querySelector('.img-upload__cancel');
const hashtagField = imageOverlay.querySelector('.text__hashtags');
const commentField = imageOverlay.querySelector('.text__description');
const imageUploadForm = document.querySelector('.img-upload__form');
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
  imageOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  imageUploadForm.reset();
  pristine.reset();
};
// Функция показа модалки
const showModal = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  imageOverlay.classList.remove('hidden');
  imageOverlay.addEventListener('click', (evt) => {
    if (evt.target === imageOverlay) {
      hideModal();
    }
  });
};

function onDocumentKeydown(evt) { // Функция для проверки является ли нажатая клавиша esc
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

// Функция по загрузки файла с устройства
const uploadImage = (evt) => {
  const files = evt.target.files; // Массив файлов которые выбрал пользователь

  if (files.length) { // Проверка на то что массив с файлами не пустой
    const fileReader = new FileReader(); // Создаем экземпляр класса (набор методов, позволяющих взаимодействовать с файлами)
    const file = files[0]; // Первый элемент массива с файлами

    fileReader.addEventListener('load', (event) => { // Навешиваем событие load на загрузку файла
      preview.src = event.target.result; // Заменяем путь к файлу

      showModal();
    });

    fileReader.readAsDataURL(file); // Метод позволяющий прочитать файл как url
  }

};

imageInput.addEventListener('change', uploadImage); // Добавляем событие загрузки файла

cancelUploadButton.addEventListener('click', hideModal); // Закрытие модалки по нажатию на кнопку закрытия

imageUploadForm.addEventListener('submit', (evt) => { // Отправка формы
  evt.preventDefault();
});

