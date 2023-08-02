import { createGallery } from './gallery.js';
import { debounce, shuffle } from './util.js';
import { picturesData } from './main.js';

const galleryContainer = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters');
const filterButtons = filters.querySelectorAll('.img-filters__button');

const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const sortGallery = (array, sort) => {
  galleryContainer.innerHTML = '';
  let sorted = [];
  switch (sort) {
    case FILTERS.discussed:
      sorted = array.sort((a, b) => {
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
      sorted = shuffle(array);
      break;
    default:
      sorted = array;
      break;
  }

  return sorted;
};

const renderGallery = debounce((galery, id) => {
  const sortedGallery = sortGallery(galery, id);
  createGallery(sortedGallery);
});

const filtersHandleClick = (evt) => {
  renderGallery([...picturesData], evt.target.id);

  filterButtons.forEach((el) => {
    if (el.id === evt.target.id) {
      el.classList.add('img-filters__button--active');
    } else {
      el.classList.remove('img-filters__button--active');
    }
  });
};

const addFiltersListener = () => {
  filters.addEventListener('click', filtersHandleClick);
};

export { addFiltersListener, filtersHandleClick };
