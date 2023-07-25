import {getRandomElement, getRandomInteger} from './util.js';
import {PICTURE_URL_COUNT, AVATAR_COUNT, LIKE_MIN_COUNT, LIKE_MAX_COUNT, COMMENT_COUNT, COMMENTS, DESCRIPTIONS, NAMES} from './setup.js';

const createComments = () => { // Функция для получения массива обьектов с комментариями

  const randomNumber = getRandomInteger(1, COMMENT_COUNT); // Рандомное число - кол-во комментариев к фотографии
  const commentsArray = []; // Пустой массив с будущими обьектами содержащими комментарии

  for (let i = 0; i < randomNumber; i++) { // Цикл создает колличество обьектов с комментариями
    const avatar = `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`;
    const id = i + 1;
    const message = getRandomElement(COMMENTS);
    const name = getRandomElement(NAMES);

    const comment = { // Обьект с комментариями, именами, айди и аватаркой
      id,
      avatar,
      message,
      name,
    };

    commentsArray.push(comment); // Добавление элементов в массив
  }

  return commentsArray;
};

const createPhotos = (count) => {
  const photoArray = [];

  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const url = `photos/${getRandomInteger(1, PICTURE_URL_COUNT)}.jpg`;
    const description = getRandomElement(DESCRIPTIONS);
    const comments = createComments();
    const likes = getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT);

    const photo = {
      id,
      url,
      description,
      likes,
      comments,
    };

    photoArray.push(photo);
  }

  return photoArray;
};

export {createPhotos};


