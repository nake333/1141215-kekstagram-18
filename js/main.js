'use strict';

var COMMENTS_ARRAY = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENTS_NAMES = ['Кирилл', 'Виктория', 'Елизавета', 'Александр', 'Максим', 'Юлия', 'Ева'];
var DESCRIPTION = ['Тестим новую зеркалку!*)', 'Тестим новый телефон!^)', 'Тестим новый фотик!:)', 'Тестим новую камеру!-)'];
var MIN_LIKES = 15;
var MAX_LIKES = 250;
var PHOTO_COUNT = 25;
// var AVATAR_COUNT = 6;
// var AVATAR_SIZE = 35;
var ESC_KEYCODE = 27;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureElement = document.querySelector('.pictures');
// var pictureBig = document.querySelector('.big-picture');
// var photos = [];

// var socialCommentCount = document.querySelector('.social__comment-count');
// var commentsLoader = document.querySelector('.comments-loader');
// var socialComment = document.querySelector('.social__comments');

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

// var showElement = function (elem) {
//   if (elem) {
//     elem.classList.remove('hidden');
//   }
// };

// var hideElement = function (elem) {
//   if (elem) {
//     elem.classList.add('visually-hidden');
//   }
// };

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

// var getCommentElement = function () {
//   var containerElement = document.createElement('li');
//   containerElement.classList.add('social__comment');

//   var imgElement = document.createElement('img');
//   imgElement.classList.add('social__picture');
//   imgElement.alt = 'Аватар комментатора фотографии';
//   imgElement.style.width = AVATAR_SIZE + 'px';
//   imgElement.style.height = AVATAR_SIZE + 'px';

//   var textElement = document.createElement('p');
//   textElement.classList.add('social__text');

//   containerElement.appendChild(imgElement);
//   containerElement.appendChild(textElement);

//   return containerElement;
// };

// var renderPictureBig = function (element, data) {
//   element.querySelector('.big-picture__img img').src = data.url;
//   element.querySelector('.likes-count').textContent = data.likes;
//   element.querySelector('.comments-count').textContent = data.comments.length;
//   element.querySelector('.social__caption').textContent = data.description;

//   var fragment = document.createDocumentFragment();

//   for (var i = 0; i < data.comments.length; i++) {
//     var commentElement = getCommentElement();
//     commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, AVATAR_COUNT) + '.svg';
//     commentElement.querySelector('.social__text').textContent = data.comments[i];
//     fragment.appendChild(commentElement);
//   }

//   socialComment.textContent = '';
//   socialComment.appendChild(fragment);
// };

renderPhotos(PHOTO_COUNT);
// showElement(pictureBig);
// hideElement(socialCommentCount);
// hideElement(commentsLoader);
// renderPictureBig(pictureBig, photos[0], AVATAR_COUNT);

var EFFECTS = {
  'chrome': 'effects__preview--chrome',
  'sepia': 'effects__preview--sepia',
  'marvin': 'effects__preview--marvin',
  'phobos': 'effects__preview--phobos',
  'heat': 'effects__preview--heat',
};

var uploadFile = document.querySelector('#upload-file');
var uploadImgEditForm = document.querySelector('.img-upload__overlay');
var uploadCancelButton = document.querySelector('#upload-cancel');
var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
var effectNone = document.querySelector('#effect-none');
var effectChrome = document.querySelector('#effect-chrome');
var effectSepia = document.querySelector('#effect-sepia');
var effectMarvin = document.querySelector('#effect-marvin');
var effectPhobos = document.querySelector('#effect-phobos');
var effectHeat = document.querySelector('#effect-heat');
var effectLevel = document.querySelector('.effect-level');

function changeEffect(evt) {
  var currentEffect = imgPreview.classList;
  var newEffect;
  if (evt.target.value === currentEffect) {
    return;
  }

  newEffect = EFFECTS[evt.target.value];
  imgPreview.classList = '';
  imgPreview.classList.add(newEffect);
}

function resetEffect() {
  imgPreview.classList = '';
}

function openEditForm() {
  uploadImgEditForm.classList.remove('hidden');
  document.addEventListener('keydown', formEscPressHandler);
}

function closeEditForm() {
  uploadImgEditForm.classList.add('hidden');
  document.removeEventListener('keydown', formEscPressHandler);
  uploadFile.value = '';
}

function formEscPressHandler(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeEditForm();
  }
}

uploadFile.addEventListener('change', function () {
  openEditForm();
});

uploadCancelButton.addEventListener('click', function () {
  closeEditForm();
});

effectNone.addEventListener('click', function () {
  resetEffect();
  effectLevel.classList.add('hidden');
});

effectChrome.addEventListener('click', function (evt) {
  changeEffect(evt);
  effectLevel.classList.remove('hidden');
});

effectSepia.addEventListener('click', function (evt) {
  changeEffect(evt);
  effectLevel.classList.remove('hidden');
});

effectMarvin.addEventListener('click', function (evt) {
  changeEffect(evt);
  effectLevel.classList.remove('hidden');
});

effectPhobos.addEventListener('click', function (evt) {
  changeEffect(evt);
  effectLevel.classList.remove('hidden');
});

effectHeat.addEventListener('click', function (evt) {
  changeEffect(evt);
  effectLevel.classList.remove('hidden');
});

var SCALE_OPTIONS = {
  MIN_SCALE: 25,
  MAX_SCALE: 100,
  SCALE_STEP: 25,
};

var scaleConrol = document.querySelectorAll('.scale__control');
var smaller = scaleConrol[0];
var scaleValue = scaleConrol[1];
var bigger = scaleConrol[2];

bigger.addEventListener('click', biggerScale);

smaller.addEventListener('click', smallerScale);

function biggerScale() {
  var currentScale = Number(scaleValue.value.slice(0, -1));
  var step = SCALE_OPTIONS.SCALE_STEP;
  currentScale = currentScale + step;
  if (currentScale <= SCALE_OPTIONS.MAX_SCALE) {
    scaleValue.value = currentScale + '%';
    imgPreview.style = 'transform: scale' + '(' + currentScale / 100 + ')';
  }
}

function smallerScale() {
  var currentScale = Number(scaleValue.value.slice(0, -1));
  var step = SCALE_OPTIONS.SCALE_STEP;
  currentScale = currentScale - step;
  if (currentScale >= SCALE_OPTIONS.MIN_SCALE) {
    scaleValue.value = currentScale + '%';
    imgPreview.style = 'transform: scale' + '(' + currentScale / 100 + ')';
  }
}

var HASHTAGS_OPTIONS = {
  MAX_QAUNTITY: 5,
  MAX_LENGTH: 20,
};

var hashtagsInput = document.querySelector('.text__hashtags');
hashtagsInput.addEventListener('change', validationHashtags);
hashtagsInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', formEscPressHandler);
});
hashtagsInput.addEventListener('blur', function () {
  document.addEventListener('keydown', formEscPressHandler);
});

function validationHashtags() {
  var hashtags = hashtagsInput.value.split(' ').map(function (elem) {
    return elem.toLowerCase();
  }).filter(function (elem) {
    return elem !== '';
  });
  hashtagsInput.value = hashtags.join(' ');

  for (var i = 0; i < hashtags.length; i++) {
    var firstToken = hashtags[i][0];
    var inkr = i + 1;
    if (firstToken !== '#') {
      hashtagsInput.setCustomValidity('Хэштег должен начинаться с #');
    } else if (firstToken === '#' && hashtags[i].length === 1) {
      hashtagsInput.setCustomValidity('Хэштег не может состоять из одной решетки');
    } else if (hashtags[i].length > HASHTAGS_OPTIONS.MAX_LENGTH) {
      hashtagsInput.setCustomValidity('Хэштег не иожет быть длиннее 20 символов, включая решетку');
    } else if (hashtags.length > HASHTAGS_OPTIONS.MAX_QAUNTITY) {
      hashtagsInput.setCustomValidity('не более 5 хэштегов');
    } else if (hashtags.indexOf(hashtags[i], inkr) !== -1) {
      hashtagsInput.setCustomValidity('Хэштеги не могут повторяться');
      break;
    } else if (hashtags[i].indexOf('#', 1) !== -1) {
      hashtagsInput.setCustomValidity('Хэштеги должны разделяться пробелом');
      break;
    } else {
      hashtagsInput.setCustomValidity('');
    }
  }
}

var commentsInput = document.querySelector('.text__description');
commentsInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', formEscPressHandler);
});
commentsInput.addEventListener('blur', function () {
  document.addEventListener('keydown', formEscPressHandler);
});
