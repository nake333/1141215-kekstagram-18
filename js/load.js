'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;

  /**
   * Функция получения информации с сервера
   *
   * @param {Object} onSuccess - параметр успешного выполнения запроса
   * @param {Object} onError - параметр неуспешного выполнения запроса
   */
  var dataFromServer = function (onSuccess, onError) {
    var URL = GET_URL;
    createRequest('GET', URL, onSuccess, onError);
  };

  /**
   * Функция отправки данных на сервер
   *
   * @param {Object} data - объект, который содержит данные формы, которые будут отправлены на сервер
   * @param {Object} onSuccess - параметр успешного выполнения запроса
   * @param {Object} onError -  параметр неуспешного выполнения запроса
   */
  var dataSaveToServer = function (data, onSuccess, onError) {
    var URL = POST_URL;
    createRequest('POST', URL, onSuccess, onError, data);
  };

  /**
   * @param {String} method - название метода.
   * @param {String} url - адрес обращения к серверу.
   * @param {Object} onSuccess - функция обратного вызова, которая срабатывает при успешном выполнении запроса
   * @param {Object} onError - функция обратного вызова, которая срабатывает при неуспешном выполнении запроса
   * @param {Object} data - объект, который содержит данные формы, которые будут отправлены на сервер
  */
  var createRequest = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.load = {
    dataFromServer: dataFromServer,
    dataSaveToServer: dataSaveToServer
  };
})();
