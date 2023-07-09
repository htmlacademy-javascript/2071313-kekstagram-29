import {showBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures'); // Поиск контейнера с классом в разметке
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // Поиск шаблона и его содержимого

// Функция по созданию одной фото миниатюры
const createPicture = ({ comments, description, likes, url, id }) => { // Деструктуризация параметров функции
  const picture = pictureTemplate.cloneNode(true); // Клонируем шаблон
  const image = picture.querySelector('.picture__img'); // Заводим переменную для повторяющегося элемента для url и description

  image.src = url; // Находим элемент и заполняем его через точку записывая свойство атрибута
  image.alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length; // Кол-во элементов массива комментариев
  picture.querySelector('.picture__likes').textContent = likes;
  picture.dataset.pictureId = id; // Создаем дата атрибут и добавляем в него идентификатор

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

  container.addEventListener('click', (evt) => { // Подписываемся на событие клик для любого из дочерних элементов контейнера
    const foundElement = evt.target.closest('[data-picture-id]'); // Находим по атрибуту ближайшего родителя для элементов по которым происходит клик
    if (!foundElement) { // Если элемент не найден событие не происходит
      return;
    }

    evt.preventDefault(); // Отмена действия по умолчанию
    const picture = picturesData.find(
      (item) => item.id === Number(foundElement.dataset.pictureId) // Извлекаем идентификатор записанный в дата трибуте и приводим его к числу
    );
    showBigPicture(picture);
  });
};

export {createGallery};
