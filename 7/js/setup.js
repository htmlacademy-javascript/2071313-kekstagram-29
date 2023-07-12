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

export {OBJECT_COUNT, PICTURE_URL_COUNT, AVATAR_COUNT, LIKE_MIN_COUNT, LIKE_MAX_COUNT, COMMENT_COUNT, COMMENTS, DESCRIPTIONS, NAMES};
