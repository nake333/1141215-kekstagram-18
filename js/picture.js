'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var bodyPage = document.querySelector('body');
  var pictureBlock = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var pictureClose = document.querySelector('.big-picture__cancel');
  var pictureCommentsCount = document.querySelector('.social__comment-count');
  var pictureCommentsLoader = document.querySelector('.social__comments-loader');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var bigPictureLikes = document.querySelector('.likes-count');
  var bigPictureSocial = document.querySelector('.comments-count');
  var bigPictureCaption = document.querySelector('.social__caption');
  var bigPictureComments = document.querySelector('.social__comments');
  var bigPictureComment = document.querySelector('.social__comment');

  /**
    * Функция подгружающая данные для большого изображения кликнутой фотографии
    * @param {Event} evt - параметр события
    */
  var onClickPicture = function (evt) {
    if (evt.target.className === 'picture__img') {
      var i = Number(evt.target.dataset.id);
      bodyPage.classList.add('modal-open');
      bigPicture.classList.remove('hidden');
      bigPictureImg.src = window.pictureUsers[i].url;
      bigPictureLikes.textContent = window.pictureUsers[i].likes;
      bigPictureSocial.textContent = window.pictureUsers[i].comments.length;
      bigPictureCaption.textContent = window.pictureUsers[i].description;

      /**
        * Функция подгружающая данные для большого изображения кликнутой фотографии
        * @param {Array} comments - комментарии пользователей
        * @return {Event} комментарий пльзователя
        */
      var renderComments = function (comments) {
        while (bigPictureComments.firstChild) {
          bigPictureComments.removeChild(bigPictureComments.firstChild);
        }
        var commentElement = bigPictureComment.cloneNode(true);

        commentElement.querySelector('.social__picture').src = comments.avatar;
        commentElement.querySelector('.social__picture').alt = comments.name;
        commentElement.querySelector('.social__text').textContent = comments.message;

        return commentElement;
      };

      var fragmentComments = document.createDocumentFragment();
      window.pictureUsers[i].comments.forEach(function (comment) {
        fragmentComments.appendChild(renderComments(comment));
      });
      bigPictureComments.appendChild(fragmentComments);

      var COMMENT_AMMOUNT = 0;
      var COMMENT = 5;
      var loadComments = null;
      var commentsCollection = Array.from(document.querySelectorAll('.social__comment'));

      var onCommentsLoaderClick = function () {
        COMMENT_AMMOUNT = COMMENT_AMMOUNT + COMMENT;
        loadComments = commentsCollection.length - COMMENT_AMMOUNT;


        if (loadComments > 0) {
          pictureCommentsLoader.classList.remove('hidden');
          pictureCommentsCount.textContent = COMMENT_AMMOUNT + ' из ' + commentsCollection.length + ' комментариев';
        } else if (loadComments <= 0) {
          pictureCommentsLoader.classList.add('hidden');
          pictureCommentsCount.textContent = commentsCollection.length + ' из ' + commentsCollection.length + ' комментариев';
        }

        commentsCollection.forEach(function (it, index) {
          if (index >= COMMENT_AMMOUNT) {
            it.style.display = 'none';
          } else if (index < COMMENT_AMMOUNT) {
            it.style.display = 'flex';
          }
        });
      };

      onCommentsLoaderClick();

      pictureCommentsLoader.addEventListener('click', onCommentsLoaderClick);
      document.addEventListener('keydown', onPopupEscPress);
    }
  };

  /**
    * Функция реализующая мехнизм закрытия popup по нажатию ESC
    * @param {Event} evt - параметр события
    */
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onClickClose();
    }
  };

  var onClickClose = function () {
    bigPicture.classList.add('hidden');
    bodyPage.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
  };
  pictureBlock.addEventListener('click', onClickPicture);
  pictureClose.addEventListener('click', onClickClose);
})();
