'use strict';

(function () {
  var HashtagMax = {
    AMOUNT: 5,
    LENGTH: 20,
  };

  var hashtagsArea = document.querySelector('.text__hashtags');

  /**
    * Функция проверяющая начало хештега с символа решётки `#`
    * @param {Object} tags - проверяеммый массив
    * @return {Object} - проверенный объект
    */
  var isNotStartWithHash = function (tags) {
    return tags.some(function (tag) {
      return tag[0] !== '#';
    });
  };

  /**
    * Функция проверяющая состоит ли хештег только из одной решётки `#`
    * @param {Object} tags - проверяеммый массив
    * @return {Object} - проверенный объект
    */
  var isOnlyHash = function (tags) {
    return tags.some(function (tag) {
      return tag[0] === '#' && tag.length === 1;
    });
  };

  /**
    * Функция проверяет разделяются ли хештеги пробелами
    * @param {Object} tags - проверяеммый массив
    * @return {Object} - проверенный объект
    */
  var isNoSpaceBetween = function (tags) {
    return tags.some(function (tag) {
      return tag.indexOf('#', 1) > 0;
    });
  };

  /**
    * Функция проверяет превышает ли длина одного хэштега 20 символов, включая решётку
    * @param {Object} tags - проверяеммый массив
    * @return {Object} - проверенный объект
    */
  var isMoreThanMaxLength = function (tags) {
    return tags.some(function (tag) {
      return tag.length > HashtagMax.LENGTH;
    });
  };

  /**
  * Функция проверяет использование одного и тот же хэштег использован дважды
  * @param {Object} tags - проверяеммый массив
  * @return {Boolean} - проверенный объект
  */
  var isSameHash = function (tags) {
    for (var i = tags.length - 1; i > 0; i--) {
      var lastElement = tags[i];
      if (tags.indexOf(lastElement) !== i) {
        return true;
      }
    }
    return false;
  };

  /**
  * Функция добавляющая обводку поля ввода хештега при ошибке
  */
  var drawOutline = function () {
    hashtagsArea.style = 'outline: 2px solid #D30000';
  };

  /**
    * Функция вывода сообщения об ошибке в зависимости от ошибки пользователя
    */
  var checkHashtagsValidity = function () {
    var tagsArray = hashtagsArea.value.toLowerCase().split(' ');
    hashtagsArea.setCustomValidity('');
    hashtagsArea.style = '';

    switch (true) {
      case hashtagsArea.value.trim() === '':
        hashtagsArea.setCustomValidity('');
        hashtagsArea.style = '';
        break;
      case tagsArray.length > HashtagMax.AMOUNT:
        hashtagsArea.setCustomValidity('Количество хэштегов не должно быть больше ' + HashtagMax.AMOUNT);
        drawOutline();
        break;
      case isNotStartWithHash(tagsArray):
        hashtagsArea.setCustomValidity('Каждый хэштег должен начинаться с решётки');
        drawOutline();
        break;
      case isOnlyHash(tagsArray):
        hashtagsArea.setCustomValidity('Хэштег не может состоять только из одной решетки');
        drawOutline();
        break;
      case isNoSpaceBetween(tagsArray):
        hashtagsArea.setCustomValidity('Каждый хэштег должен разделяться пробелом');
        drawOutline();
        break;
      case isMoreThanMaxLength(tagsArray, HashtagMax.LENGTH):
        hashtagsArea.setCustomValidity('Длина тега не может быть больше ' + HashtagMax.LENGTH + ' символов, включая решётку');
        drawOutline();
        break;
      case isSameHash(tagsArray):
        hashtagsArea.setCustomValidity('Нельзя использовать несколько одинаковых хэштегов');
        drawOutline();
        break;
    }
  };

  hashtagsArea.addEventListener('change', checkHashtagsValidity);

})();
