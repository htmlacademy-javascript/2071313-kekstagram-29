const bodyElement = document. querySelector ('body') ; // Находим все необходимые элементы в разметке
const bigPicture = document.querySelector('.big-picture');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const cancelButtonElement = bigPicture. querySelector('.big-picture__cancel');
const commentElement = bigPictureComments.querySelector('.social__comment');
// Функция по отрисовки комментариев
const createComment = ({ avatar, name, message }) => { // Деструктуризация параметров функции
  const comment = commentElement.cloneNode(true); // Записываем соответсвующие значения в свойства элементов
  comment.querySelector ('.social__picture').src = avatar;
  comment.querySelector ('.social__picture').alt = name;
  comment.querySelector ('.social__text').textContent = message;

  return comment;
};
// Функция по отрисовке комментариев
const renderComments = (comments) => { // В качестве параметра массив комментариев
  bigPictureComments.innerHTML = ''; // Очищаем список комментариев, присваивая элементу-контейнеру с комментариями пустую строку

  const fragment = document.createDocumentFragment(); // Создаем временное хранилище для элементов
  comments.forEach((item) => { // Перебор элементов массива с последующим созданием отдельных DOM-элементов
    const comment = createComment(item); // Отдельный DOM-элемент - комментарий
    fragment.append(comment); // Кладем отдельный DOM-элемент в контейнер - временное хранилище для элементов
  });

  bigPictureComments.append (fragment); // Добавляем содержимое хранилища в DOM-дерево
};

const hideBigPicture = () => { // Функция для скрытия модального окна
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener ('keydown', onDocumentKeydown); // Снятие рбработчика
};

function onDocumentKeydown(evt) { // Функция для проверки является ли нажатая клавиша esc
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => { // Функция по закрытию модалки
  hideBigPicture();
};
// Функция по отрисовки фотографии
const renderPictureDetails = ({ url, likes, description }) => { // Деструктуризация параметров функции
  bigPicture.querySelector('.big-picture__img img').src = url; // Записываем соответсвующие значения в свойства элементов
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => { // Функция для показа модального окна
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document. addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data); // Вызов функции по отрисовки фотографии
  renderComments(data.comments); // Вызов функции по отрисовке комментариев
};

cancelButtonElement.addEventListener('click', onCancelButtonClick); // Закрытие модалки по нажатию на кнопку закрытия

export { showBigPicture };

