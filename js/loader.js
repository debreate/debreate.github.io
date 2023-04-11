
/****************************************************
 * Copyright © 2023 - Jordan Irwin (AntumDeluge)    *
 ****************************************************
 * This software is licensed under the MIT license. *
 * See: LICENSE.txt for details.                    *
 ****************************************************/


const callbacks = []

window.addCallBack = function(callback) {
  callbacks.push(callback);
}

window.onload = function() {
  for (callback of callbacks) {
    callback();
  }
}
