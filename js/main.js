import { createGallery, showFetchGalleryError } from './gallery.js';
import { addUploadImageHandler } from './upload-image.js';
import { fetchGallery } from './network-loading.js';
import { addScaleHandlers } from './scale.js';
import { addFiltersListener } from './gallery-filters.js';
import { showBigPicture } from './big-picture.js';
const container = document.querySelector('.pictures'); // Поиск контейнера с классом в разметке

export const pictures = [];

const filters = document.querySelector('.img-filters');

const onGallaryLoadSuccess = (photos) => {
  pictures.push(...photos);
  addFiltersListener();
  createGallery(photos);
  filters.classList.remove('img-filters--inactive');

  container.addEventListener('click', (evt) => { // Подписываемся на событие клик для любого из дочерних элементов контейнера
    const foundElement = evt.target.closest('[data-picture-id]'); // Находим по атрибуту ближайшего родителя для элементов по которым происходит клик
    if (!foundElement) { // Если элемент не найден событие не происходит
      return;
    }

    evt.preventDefault(); // Отмена действия по умолчанию
    const picture = pictures.find(
      (item) => item.id === Number(foundElement.dataset.pictureId) // Извлекаем идентификатор записанный в дата трибуте и приводим его к числу
    );
    showBigPicture(picture);
  });
};

export const loadGallery = () => {
  fetchGallery(onGallaryLoadSuccess, showFetchGalleryError);
};

loadGallery();
addScaleHandlers();
addUploadImageHandler();

