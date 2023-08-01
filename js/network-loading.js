export const fetchGallery = (onSuccess = () => {}, onError = () => {}) =>
  fetch('https://29.javascript.pages.academy/kekstagram/data').then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        onSuccess(data);
      });
    } else {
      onError(response.statusText);
    }
  }).catch(onError); // Функция которая подтягивает галлерею

export const uploadPhoto = (data, onSuccess, onError) => fetch('https://29.javascript.pages.academy/kekstagram', { // Функция отправки фотографий
  method: 'POST',
  body: data,
})
  .then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        onSuccess(json);
      });
    } else {
      onError(response.statusText);
    }
  }).catch(onError);


