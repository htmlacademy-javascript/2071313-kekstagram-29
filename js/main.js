// Кол-во сгенерированных объектов
const OBJECT_COUNT = 25;
// Диапазон чисел от 1 до 25 для адреса картинки
const PICTURE_URL_COUNT = 25;
// Диапазон чисел от 1 до 6 для адреса аватарки
const AVATAR_COUNT = 6;
// Число — количество лайков, поставленных фотографии. Минимально от 15, максимально до 200
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
// Количество комментариев к каждой фотографии — случайное число от 0 до 30
const COMMENT_COUNT = 30;
// Комментарии
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
// Описание фоторгафий
const DESCRIPTIONS = [
  'Санаторий у побережья моря',
  'Дорога на пляж',
  'Голубая лагуна',
  'Красотка',
  'Время перекусить',
  'Тачка мечты',
];
// Имена
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
];
// Функция для получения целого числа из переданного диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
// Функция для получения случайного элемента из массива имен, описаний и коментариев
const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
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
  const PhotoArray = [];

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

    PhotoArray.push(photo);
  }

  return PhotoArray;
};

createPhotoArray(OBJECT_COUNT);
