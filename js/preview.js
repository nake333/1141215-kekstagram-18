'use strict';

(function () {
  var imgEditingForm = document.querySelector('.img-upload__overlay');
  var buttunCloseForm = document.querySelector('#upload-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var imgPreview = document.querySelector('.img-upload__preview img');
  var effectsLevel = document.querySelector('.img-upload__effect-level');
  var textDescription = document.querySelector('.text__description');
  var textHashtags = document.querySelector('.text__hashtags');
  var effectNone = document.querySelector('.effects__preview--none');
  var pin = document.querySelector('.effect-level__pin');
  var effectDepth = document.querySelector('.effect-level__depth');
  var effectLine = document.querySelector('.effect-level__line');
  var effectValue = document.querySelector('.effect-level__value');
  var activeElem = null;

  /**
    * Функция реализующая мехнизм закрытия popup по нажатию ESC
    * @param {Event} evt - параметр события
    */
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  /**
    * Функция реализующая мехнизм закрытия popup
    */
  var closePopup = function () {
    imgEditingForm.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    imgPreview.style.transform = '';
    window.scale.value.setAttribute('value', 100 + '%');
  };

  uploadFile.addEventListener('change', function () {
    imgEditingForm.classList.remove('hidden');
    effectsLevel.classList.add('hidden');
    effectNone.click();
    document.addEventListener('keydown', onPopupEscPress);
  });

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  textHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  buttunCloseForm.addEventListener('click', function () {
    closePopup();
  });

  /**
    * Функция добавления эффекта на картинку
    * @param {string} classBlock - добавляемый класс
  */
  var addEffect = function (classBlock) {
    effectsLevel.classList.remove('hidden');
    imgPreview.removeAttribute('class');
    imgPreview.style.removeProperty('filter');
    pin.style.left = '100%';
    effectDepth.style.width = '100%';
    imgPreview.classList.add(classBlock);
    activeElem = classBlock;
  };

  /**
    * Функция определяет на каком фильтре произошел клик
    * @param {Event} evt - параметр события
    */
  var onClickEffect = function (evt) {
    switch (true) {
      case evt.target.classList.contains('effects__preview--none'):
        addEffect('effects__preview--none');
        effectsLevel.classList.add('hidden');
        break;
      case evt.target.classList.contains('effects__preview--chrome'):
        addEffect('effects__preview--chrome');
        break;
      case evt.target.classList.contains('effects__preview--sepia'):
        addEffect('effects__preview--sepia');
        break;
      case evt.target.classList.contains('effects__preview--marvin'):
        addEffect('effects__preview--marvin');
        break;
      case evt.target.classList.contains('effects__preview--phobos'):
        addEffect('effects__preview--phobos');
        break;
      case evt.target.classList.contains('effects__preview--heat'):
        addEffect('effects__preview--heat');
        break;
    }
  };

  imgEditingForm.addEventListener('click', onClickEffect);

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    /**
      * Функция получения информации о движении курсора
      * @param {Event} moveEvt - параметр события
      */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      /**
        * Функиция определения координат линии глубины эффекта
        */
      var limits = effectLine.getBoundingClientRect();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      if (startCoords.x < limits.left) {
        pin.style.left = limits.left - limits.left;
        effectDepth.style.width = limits.left - limits.left;
      } else if (startCoords.x > limits.left && startCoords.x < limits.right) {
        pin.style.left = (pin.offsetLeft - shift.x) + 'px';
        effectDepth.style.width = (effectDepth.offsetWidth - shift.x) + 'px';

        switch (true) {
          case activeElem === 'effects__preview--chrome':
            effectValue.setAttribute('value', (pin.offsetLeft - shift.x) / (limits.right - limits.left));
            imgPreview.style.filter = 'grayscale(' + effectValue.value + ')';
            break;
          case activeElem === 'effects__preview--sepia':
            effectValue.setAttribute('value', (pin.offsetLeft - shift.x) / (limits.right - limits.left));
            imgPreview.style.filter = 'sepia(' + effectValue.value + ')';
            break;
          case activeElem === 'effects__preview--marvin':
            effectValue.setAttribute('value', (((pin.offsetLeft - shift.x) / (limits.right - limits.left)) * 100));
            imgPreview.style.filter = 'invert(' + effectValue.value + '%' + ')';
            break;
          case activeElem === 'effects__preview--phobos':
            effectValue.setAttribute('value', (3 * (pin.offsetLeft - shift.x) / (limits.right - limits.left)));
            imgPreview.style.filter = 'blur(' + effectValue.value + 'px' + ')';
            break;
          case activeElem === 'effects__preview--heat':
            effectValue.setAttribute('value', ((2 * (pin.offsetLeft - shift.x) + (limits.right - limits.left)) / (limits.right - limits.left)));
            imgPreview.style.filter = 'brightness(' + effectValue.value + ')';
            break;
        }

      } else if (startCoords.x > limits.right) {
        pin.style.left = limits.right - limits.left + 'px';
        effectDepth.style.width = limits.right - limits.left + 'px';
      }
    };

    /**
      * Функция получения информации об отпускании мыши и удалении обработчиков событий
      * @param {Event} upEvt - параметр события
      */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
