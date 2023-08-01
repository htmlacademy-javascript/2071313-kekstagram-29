import { createGallery, showFetchGalleryError } from './gallery.js';
import { addUploadImageHandler } from './upload-image.js';
import { fetchGallery } from './network-loading.js';
import { addScaleHandlers } from './scale.js';

fetchGallery(createGallery, showFetchGalleryError);
addScaleHandlers();
addUploadImageHandler();
