const COMMENTS_PER_PORTION = 5; // Кол-во комментариев показываемых за раз
const bodyElement = document.querySelector('body') ; // Находим все необходимые элементы в разметке
const bigPicture = document.querySelector('.big-picture');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const cancelButtonElement = bigPicture.querySelector('.big-picture__cancel');
const commentElement = bigPictureComments.querySelector('.social__comment');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentCount = bigPicture.querySelector('.social__comment-count');

let commentsShown = 0; // Кол-во комментариев уже показанных. По умолчанию 0
let сomments = []; // Массив комментариев

// Функция по отрисовки комментариев
const createComment = ({ avatar, name, message }) => { // Деструктуризация параметров функции
  const commentCopy = commentElement.cloneNode(true); // Записываем соответсвующие значения в свойства элементов
  commentCopy.querySelector('.social__picture').src = avatar;
  commentCopy.querySelector('.social__picture').alt = name;
  commentCopy.querySelector('.social__text').textContent = message;

  return commentCopy;
};
// Функция для показа порции комментариев
const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION; // Увеличиваем 5

  if (commentsShown >= сomments.length) { // Проверяем если кол-во отображаемых комментариев равно длинны массива с комментами то кнопка скрывается
    commentsLoader.classList.add('hidden'); // Убираем кнопку загрузить ещё
    commentsShown = сomments.length; // Задаем значение равное (не большее) длинны массива комментариев
  } else {
    commentsLoader.classList.remove('hidden'); // Отображаем кнопку добавления комментариев если есть не отображенные комментарии
  }

  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const сomment = createComment(сomments[i]); // Создаем DOM элемент с комментарием
    commentsFragment.append(сomment); // Кладем один DOM элемент в фрагмент
  }

  bigPictureComments.innerHTML = ''; // Стираем все предыдущие комментарии
  bigPictureComments.append(commentsFragment); // Кладем в контейнер комментариев список комментариев
  commentCount.textContent = `${commentsShown} из ${сomments.length} комментариев`; // Отображаем кол-во комментариев с помощью интерполяции
};

const hideBigPicture = () => { // Функция для скрытия модального окна
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown); // Снятие рбработчика
  commentsLoader.removeEventListener('click', renderComments); // Отписываемся от события клика по кнопке загрузить еще
  commentsShown = 0; // Обнуляем счетчик показанных комментариев
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
  сomments = data.comments;

  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', renderComments); // Добавляем обработчик события клика по кнопке загрузить ещё

  renderPictureDetails(data); // Вызов функции по отрисовки фотографии
  renderComments(); // Вызов функции по отрисовке комментариев
};

cancelButtonElement.addEventListener('click', onCancelButtonClick); // Закрытие модалки по нажатию на кнопку закрытия

bigPicture.addEventListener('click', (evt) => { // Закрытие модального окна по оверлэю
  if (evt.target === bigPicture) {
    hideBigPicture();
  }
});

export { showBigPicture };

