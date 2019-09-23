'use strict';

var COMMENTS_ARRAY = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENTS_NAMES = ['Кирилл', 'Виктория', 'Елизавета', 'Александр', 'Максим', 'Юлия', 'Ева'];
var MIN_LIKES = 15;
var MAX_LIKES = 250;
var PHOTO_COUNT = 25;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureElement = document.querySelector('.pictures');

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor((Math.random() * (max - min + 1)) + min);
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

  for (var i = 0; i < photoCount; i++) {
    var tempObject = {};
    tempObject.url = 'photos/' + (i + 1) + '.jpg';
    tempObject.likes = getRandomNumber(minLikes, maxLikes);
    tempObject.comments = getRandomComments();
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
  var object = getPhotoObjects(minLikes, maxLikes, commentsArray, photoCount);

  for (var i = 0; i < photoCount; i++) {
    var template = getPhotoTemplate(object[i]);
    fragment.appendChild(template);
  }

  pictureElement.appendChild(fragment);
};

renderPhotos(MIN_LIKES, MAX_LIKES, COMMENTS_ARRAY, PHOTO_COUNT);
