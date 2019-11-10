'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var form = document.querySelector('.img-upload__form');
  var successTemplate = document.querySelector('#success');
  var imgPreview = document.querySelector('.img-upload__preview img');
  var errorTemplate = document.querySelector('#error');
  var messageTemplate = document.querySelector('#messages');
  var main = document.querySelector('main');
  var imgEditForm = document.querySelector('.img-upload__overlay');
  var uploadFile = document.querySelector('#upload-file');
  var commentsArea = document.querySelector('.text__description');
  var hashtagsArea = document.querySelector('.text__hashtags');

  var onCloseUploadFile = function () {
    uploadFile.value = '';
    imgPreview.style.filter = '';
  };

  var clearForm = function () {
    uploadFile.value = '';
    hashtagsArea.value = '';
    commentsArea.value = '';
    imgPreview.style.transform = '';
    window.scale.value.setAttribute('value', 100 + '%');
  };

  var createUploadMessage = function () {
    var message = messageTemplate.content.cloneNode(true);
    return message;
  };

  var showUploadMessage = function () {
    var uploadMessage = createUploadMessage();
    main.appendChild(uploadMessage);
  };

  var hideUploadMessage = function () {
    var currentMessage = main.querySelector('.img-upload__message--loading');
    main.removeChild(currentMessage);
  };

  var createMessage = function (template) {
    var message = template.content.cloneNode(true);
    main.appendChild(message);
    var currentBlock = '';
    var innerBlock = '';

    if (template === successTemplate) {
      currentBlock = main.querySelector('.success');
      innerBlock = main.querySelector('.success__inner');
      var successButton = currentBlock.querySelector('.success__button');

      var onSuccessButtonClick = function () {
        main.removeChild(currentBlock);
        successButton.removeEventListener('click', onSuccessButtonClick);
        document.removeEventListener('keydown', onEscPress);
        document.removeEventListener('click', onOutsideAreaClick);
      };
      successButton.addEventListener('click', onSuccessButtonClick);

    } else if (template === errorTemplate) {
      currentBlock = main.querySelector('.error');
      innerBlock = main.querySelector('.error__inner');
      var errorButtons = currentBlock.querySelectorAll('.error__button');
      errorButtons.forEach(function (errorButton) {

        var onErrorButtonClick = function () {
          main.removeChild(currentBlock);
          errorButton.removeEventListener('click', onErrorButtonClick);
          document.removeEventListener('keydown', onEscPress);
          document.removeEventListener('click', onOutsideAreaClick);
        };
        errorButton.addEventListener('click', onErrorButtonClick);
      });
    }

    var onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        onCloseUploadFile();
        main.removeChild(currentBlock);
      }
    };

    var onOutsideAreaClick = function (evt) {
      if (evt.target !== innerBlock && evt.target === currentBlock) {
        onCloseUploadFile();
        main.removeChild(currentBlock);
      }
    };

    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onOutsideAreaClick);
  };

  /**
   * Функция показывающая успешную отправку формы
   */
  var onLoadSuccess = function () {
    createMessage(successTemplate);
    imgEditForm.classList.add('hidden');
    clearForm();
    hideUploadMessage();
  };

  /**
   * Функция показывающая не успешную отправку формы
   * @param {Object} errorMessage
   */
  var onLoadError = function (errorMessage) {
    if (errorMessage) {
      createMessage(errorTemplate);
      imgEditForm.classList.add('hidden');
      clearForm();
      hideUploadMessage();
    }
  };

  /**
   * Функция отправки данных на сервер
   * @param {Object} evt
   */
  var onFormSubmissionSend = function (evt) {
    evt.preventDefault();
    showUploadMessage();
    window.load.dataSaveToServer(new FormData(form), onLoadSuccess, onLoadError);
  };

  form.addEventListener('submit', onFormSubmissionSend);
})();
