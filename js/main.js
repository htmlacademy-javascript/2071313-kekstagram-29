import { createGallery, showFetchGalleryError } from './gallery.js';
import { addUploadImageHandler } from './upload-image.js';
import { fetchGallery } from './network-loading.js';
import { addScaleHandlers } from './scale.js';
import { addFiltersListener } from './gallery-filters.js';

export let picturesData = [];

const filters = document.querySelector('.img-filters');

const onGallaryLoadSuccess = (gallery) => {
  picturesData = gallery;
  addFiltersListener();
  createGallery(gallery);
  filters.classList.remove('img-filters--inactive');
};

export const loadGallery = () => {
  fetchGallery(onGallaryLoadSuccess, showFetchGalleryError);
};

loadGallery();
addScaleHandlers();
addUploadImageHandler();

