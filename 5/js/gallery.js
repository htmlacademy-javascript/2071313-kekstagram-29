const container = document.querySelector('.pictures'); // Поиск контейнера с классом в разметке
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // Поиск шаблона и его содержимого

// Функция по созданию одной фото миниатюры
const createPicture = ({ comments, description, likes, url }) => { // Деструктуризация параметров функции
  const picture = pictureTemplate.cloneNode(true); // Клонируем шаблон

  picture.querySelector('.picture__img').src = url; // Находим элемент и заполняем его через точку записывая свойство атрибута
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length; // Кол-во элементов массива комментариев
  picture.querySelector('.picture__likes').textContent = likes;

  return picture;
};

// Функция для отрисовки множества фотографий
const createGallery = (picturesData) => { // Параметр функции это массив с объектами, содержащими инф-цию об отдельной фотографии
  const fragment = document.createDocumentFragment(); // Создаем временное хранилище для элементов

  picturesData.forEach((pictureData) => { // Перебор элементов массива с последующим созданием отдельных DOM-элементов
    const pictureElement = createPicture(pictureData); // Отдельный DOM-элемент
    fragment.append(pictureElement); // Кладем отдельный DOM-элемент в контейнер - временное хранилище для элементов
  });

  container.append(fragment); // Добавляем содержимое хранилища в DOM-дерево
};

export {createGallery};
