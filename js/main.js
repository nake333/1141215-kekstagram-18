'use strict';

var COMMENTS_ARRAY = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
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

var getPhotoObjects = function (minLikes, maxLikes, commentsArray, photoCount) {
  var photoSetup = [];

  for (var i = 0; i < photoCount; i++) {
    var tempObject = {};
    tempObject.url = 'photos/' + (i + 1) + '.jpg';
    tempObject.likes = getRandomNumber(minLikes, maxLikes);
    tempObject.comments = getRandomNumber(1, commentsArray.length);
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

var renderPhotos = function (minLikes, maxLikes, commentsArray, photoCount) {
  var fragment = document.createDocumentFragment();
  var object = getPhotoObjects(minLikes, maxLikes, commentsArray, photoCount);

  for (var i = 0; i < photoCount; i++) {
    var template = getPhotoTemplate(object[i]);
    fragment.appendChild(template);
  }

  pictureElement.appendChild(fragment);
};

renderPhotos(MIN_LIKES, MAX_LIKES, COMMENTS_ARRAY, PHOTO_COUNT);
