/*
 * JavaScript MD5 Demo JS
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global md5 */

;(function () {
  'use strict'
  console.log('ready');
  var input = document.getElementById('input')
  input.value = 'hey'
  document.getElementById('calculate').addEventListener(
    'click',
    function (event) {
      event.preventDefault()
      document.getElementById('output').value = md5(input.value)
    }
  )
  
}())
