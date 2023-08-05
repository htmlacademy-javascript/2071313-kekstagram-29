import { createGallery } from './gallery.js';
import { debounce, shuffle } from './util.js';
import { pictures } from './main.js';

const filters = document.querySelector('.img-filters');
const filterButtons = filters.querySelectorAll('.img-filters__button');

const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const sortGallery = (photos, sort) => {
  let sortings = [];
  switch (sort) {
    case FILTERS.discussed:
      sortings = photos.sort((a, b) => {
        if (a.comments.length > b.comments.length) {
          return -1;
        }

        if (a.comments.length < b.comments.length) {
          return 1;
        }

        return 0;
      });
      break;
    case FILTERS.random:
      sortings = shuffle(photos).slice(0, 10);
      break;
    default:
      sortings = photos;
      break;
  }

  return sortings;
};

const renderGallery = debounce((photos, id) => {
  const pictureElements = document.querySelectorAll('.picture');

  pictureElements.forEach((el) => {
    el.remove();
  });
  const sortedGallery = sortGallery(photos, id);

  createGallery(sortedGallery);
});

const onFilterClick = (evt) => {
  renderGallery([...pictures], evt.target.id);

  filterButtons.forEach((el) => {
    if (el.id === evt.target.id) {
      el.classList.add('img-filters__button--active');
    } else {
      el.classList.remove('img-filters__button--active');
    }
  });
};

const addFiltersListener = () => {
  filters.addEventListener('click', onFilterClick);
};

export { addFiltersListener, onFilterClick };
