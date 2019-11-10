'use strict';

(function () {
  var ScaleValue = {
    DEFAULT: 100,
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var imgPreviewSizeValueFieldset = document.querySelector('.img-upload__scale');
  var imgPreview = document.querySelector('.img-upload__preview img');
  var scaleValue = document.querySelector('.scale__control--value');

  /**
   * Функция изменяющаяя масштаб картинки
   * @param {number} sizeValue - параметр события
   */
  var zoomImg = function (sizeValue) {
    imgPreview.style.transform = 'scale(' + sizeValue / 100 + ')';
  };

  /**
   * Функция изменяющаяя значения масштаба картинки
   * @param {event} evt параметр событие
   */
  var onChangeSizeOfImgPreview = function (evt) {
    var imgPreviewSizeValue = parseInt(scaleValue.value, 10);
    if ((evt.target.classList.contains('scale__control--bigger') && imgPreviewSizeValue < ScaleValue.MAX)) {
      scaleValue.setAttribute('value', imgPreviewSizeValue + ScaleValue.STEP + '%');
      imgPreviewSizeValue += ScaleValue.STEP;
      zoomImg(imgPreviewSizeValue);
    } else if ((evt.target.classList.contains('scale__control--smaller') && imgPreviewSizeValue > ScaleValue.MIN)) {
      scaleValue.setAttribute('value', imgPreviewSizeValue - ScaleValue.STEP + '%');
      imgPreviewSizeValue -= ScaleValue.STEP;
      zoomImg(imgPreviewSizeValue);
    }
  };

  imgPreviewSizeValueFieldset.addEventListener('click', onChangeSizeOfImgPreview);

  window.scale = {
    value: scaleValue
  };
})();
