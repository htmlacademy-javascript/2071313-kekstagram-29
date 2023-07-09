import { OBJECT_COUNT } from './setup.js';
import { createGallery } from './gallery.js';
import { createPhotoArray } from './data.js';

const picture = createPhotoArray(OBJECT_COUNT);

createGallery(picture);
