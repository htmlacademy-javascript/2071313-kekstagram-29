import {getRandomElement, getRandomInteger} from './util.js';
import {PICTURE_URL_COUNT, AVATAR_COUNT, LIKE_MIN_COUNT, LIKE_MAX_COUNT, COMMENT_COUNT, COMMENTS, DESCRIPTIONS, NAMES} from './setup.js';

// Функция для получения массива обьектов с комментариями
const createCommentsArray = () => {
// Рандомное число - кол-во комментариев к фотографии
  const randomNumber = getRandomInteger(1, COMMENT_COUNT);
  // Пустой массив с будущими обьектами содержащими комментарии
  const commentsArray = [];
  // Цикл создает колличество обьектов с комментариями
  for (let i = 0; i < randomNumber; i++) {
    const avatar = `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`;
    const id = i + 1;
    const message = getRandomElement(COMMENTS);
    const name = getRandomElement(NAMES);
    // Обьект с комментариями, именами, айди и аватаркой
    const comment = {
      id,
      avatar,
      message,
      name,
    };
    // Добавляем элементы в массив
    commentsArray.push(comment);
  }

  return commentsArray;
};

const createPhotoArray = (count) => {
  const photoArray = [];

  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const url = `photos/${getRandomInteger(1, PICTURE_URL_COUNT)}.jpg`;
    const description = getRandomElement(DESCRIPTIONS);
    const comments = createCommentsArray();
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

export {createPhotoArray};


