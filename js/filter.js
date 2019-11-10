'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var filtersForm = document.querySelector('.img-filters__form');
  var filtersbuttonAll = Array.from(document.querySelectorAll('.img-filters__button'));

  /**
    * Функция удаления загруженных картинок
    */
  var clearImg = function () {
    var picturesCollection = pictures.querySelectorAll('.picture');
    var picturesArray = Array.from(picturesCollection);
    picturesArray.forEach(function (it) {
      pictures.removeChild(it);
    });
  };

  /**
    * Функция получения информации с сервера
    * @param {Event} evtChange - параметр события
    */
  var upDateFilter = function (evtChange) {
    switch (true) {
      case (evtChange.target.id === 'filter-popular'):
        clearImg();
        var popularPhotos = window.pictureUsers;
        window.addPicture(popularPhotos);
        break;
      case (evtChange.target.id === 'filter-new'):
        clearImg();
        var newPhotos = window.pictureUsers.slice().sort(function () {
          return 0.5 - Math.random();
        }).slice(0, 10);
        window.addPicture(newPhotos);
        break;
      case (evtChange.target.id === 'filter-discussed'):
        clearImg();
        var discussedPhotos = window.pictureUsers.slice().sort(function (a, b) {
          return a.comments.length - b.comments.length;
        }).reverse();
        window.addPicture(discussedPhotos);
        break;
    }
  };

  var lastTimeout = null;
  /**
    * Функция получения информации с сервера
    * @param {Event} evt - параметр события
    */
  var onClickFilter = function (evt) {
    filtersbuttonAll.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      upDateFilter(evt);
    }, 500);
  };

  filtersForm.addEventListener('click', onClickFilter);
})();
