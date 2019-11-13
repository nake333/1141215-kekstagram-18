'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    /**
      * Функция генерации случайного числа в заданном интервале
      * @param {number} min - минимальное число
      * @param {number} max - максимальное число
      * @return {number} - значение случайного числа
    */
    generateRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + 1) + min;
    },

    ESC_KEYCODE: ESC_KEYCODE
  };
})();
