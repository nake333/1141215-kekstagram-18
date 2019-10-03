'use strict';

var COMMENTS_ARRAY = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENTS_NAMES = ['Кирилл', 'Виктория', 'Елизавета', 'Александр', 'Максим', 'Юлия', 'Ева'];
var DESCRIPTION = ['Тестим новую зеркалку!*)', 'Тестим новый телефон!^)', 'Тестим новый фотик!:)', 'Тестим новую камеру!-)'];
var MIN_LIKES = 15;
var MAX_LIKES = 250;
var PHOTO_COUNT = 25;
var AVATAR_COUNT = 6;
var AVATAR_SIZE = 35;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureElement = document.querySelector('.pictures');
var pictureBig = document.querySelector('.big-picture');
var photos = [];

var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var socialComment = document.querySelector('.social__comments');

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

var showElement = function (elem) {
  if (elem) {
    elem.classList.remove('hidden');
  }
};

var hideElement = function (elem) {
  if (elem) {
    elem.classList.add('visually-hidden');
  }
};

var getRandomComments = function () {
  var randomComments = getRandomNumber(1, 2);
  var randomElement = COMMENTS_ARRAY[getRandomNumber(0, COMMENTS_ARRAY.length)];
  return (randomComments === 1) ? randomElement : randomElement + ' ' + randomElement;
};

var getArrayComments = function () {
  var arr = [];
  var arrLength = getRandomNumber(1, 5);
  for (var i = 0; i < arrLength; i++) {
    arr[i] = {
      avatar: 'img/avatar-' + (i + 1) + '.svg',
      message: getRandomComments(),
      name: COMMENTS_NAMES[getRandomNumber(0, COMMENTS_NAMES.length)]
    };
  }
  return arr;
};

var getPhotoObjects = function () {
  var photoSetup = [];

  for (var i = 0; i < PHOTO_COUNT; i++) {
    var tempObject = {};
    tempObject.url = 'photos/' + (i + 1) + '.jpg';
    tempObject.likes = getRandomNumber(MIN_LIKES, MAX_LIKES);
    tempObject.comments = getArrayComments();
    tempObject.description = DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)];
    photoSetup.push(tempObject);
  }

  return photoSetup;
};

var getPhotoTemplate = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments;

  return photoElement;
};

var renderPhotos = function () {
  var fragment = document.createDocumentFragment();
  var object = getPhotoObjects(MIN_LIKES, MAX_LIKES, COMMENTS_ARRAY, PHOTO_COUNT);

  for (var i = 0; i < PHOTO_COUNT; i++) {
    var template = getPhotoTemplate(object[i]);
    fragment.appendChild(template);
  }

  pictureElement.appendChild(fragment);
};

var getCommentElement = function () {
  var containerElement = document.createElement('li');
  containerElement.classList.add('social__comment');

  var imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.alt = 'Аватар комментатора фотографии';
  imgElement.style.width = AVATAR_SIZE + 'px';
  imgElement.style.height = AVATAR_SIZE + 'px';

  var textElement = document.createElement('p');
  textElement.classList.add('social__text');

  containerElement.appendChild(imgElement);
  containerElement.appendChild(textElement);

  return containerElement;
};

var renderPictureBig = function (element, data) {
  element.querySelector('.big-picture__img img').src = data.url;
  element.querySelector('.likes-count').textContent = data.likes;
  element.querySelector('.comments-count').textContent = data.comments.length;
  element.querySelector('.social__caption').textContent = data.description;

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.comments.length; i++) {
    var commentElement = getCommentElement();
    commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, AVATAR_COUNT) + '.svg';
    commentElement.querySelector('.social__text').textContent = data.comments[i];
    fragment.appendChild(commentElement);
  }

  socialComment.textContent = '';
  socialComment.appendChild(fragment);
};

renderPhotos(PHOTO_COUNT);
// showElement(pictureBig);
// hideElement(socialCommentCount);
// hideElement(commentsLoader);
// renderPictureBig(pictureBig, photos[0], AVATAR_COUNT);

var HASHTAGS_MAX = 20;

var uploadFiles = document.querySelector('#upload-file');
var photoForm = document.querySelector('.img-upload__overlay');
var hashtags = document.querySelector('.text__hashtags');
var img = document.querySelector('.img-upload__preview img');
var effectsBar = document.querySelector('.img-upload__effect-level');
var effectsList = document.querySelector('.effects__list');

var removeEffects = function () {
  img.removeAttribute('class');
};

var renderEffects = function (evt) {
  if (!(evt.target.value === 'none')) {
    showElement(effectsBar);
  } else {
    hideElement(effectsBar);
  }
};

var hashtagsValidation = function () {
  var tempArray = hashtags.value.split(' ');

  for (var i = 0; i < tempArray.length; i++) {
    if (tempArray[i].length >= HASHTAGS_MAX) {
      hashtags.setCustomValidity('Ваш хеш-тег' + tempArray[i] + ' длинее 20 символов, требуется сокращение');
    } else {
      hashtags.setCustomValidity('');
    }
  }
};

effectsList.addEventListener('change', function (evt) {
  removeEffects();
  renderEffects(evt);
});

uploadFiles.addEventListener('change', function () {
  showElement(photoForm);
  hideElement(effectsBar);
});

hashtags.addEventListener('change', hashtagsValidation);
