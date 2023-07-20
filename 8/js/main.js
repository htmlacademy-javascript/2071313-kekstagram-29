import { OBJECT_COUNT } from './setup.js';
import { createPhotos } from './data.js';
import { createGallery } from './gallery.js';
import './upload-image.js';

const pictures = createPhotos(OBJECT_COUNT);

createGallery(pictures);
