'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var picture = document.querySelector('#picture').content.querySelector('.picture');
  var blockFilter = document.querySelector('.img-filters');

  /**
    * Функция генерации фото
    * @param {array} photo - массив объектов фотографий пользователей
    * @param {number} index - массив объектов фотографий пользователей
    * @return {object} - объект фото пользователя с кол-ом комеентариев и лайков
  */
  var renderPhoto = function (photo) {
    var photoElement = picture.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__img').dataset.id = (photo.url.length === 7 ? photo.url[7] : photo.url.slice(7, 9)) - 1;

    return photoElement;
  };

  /**
    * Функция добавления фотографий на страницу
    * @param {array} photoUser - массив фотографий пользователей
  */
  window.addPicture = function (photoUser) {
    var fragment = document.createDocumentFragment();
    photoUser.forEach(function (photos) {
      fragment.appendChild(renderPhoto(photos));
    });
    pictures.appendChild(fragment);
  };

  /**
    * Функция обработки успешного получения данных с сервера
    * @param {array} photoUsers - массив фотографий пользователей
  */
  var onSuccess = function (photoUsers) {
    window.pictureUsers = [];
    window.pictureUsers = photoUsers;
    blockFilter.classList.remove('img-filters--inactive');
    window.addPicture(photoUsers);
  };

  window.load.dataFromServer(onSuccess);
})();
