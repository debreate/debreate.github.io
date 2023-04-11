
/****************************************************
 * Copyright © 2023 - Jordan Irwin (AntumDeluge)    *
 ****************************************************
 * This software is licensed under the MIT license. *
 * See: LICENSE.txt for details.                    *
 ****************************************************/


window.addCallBack(function() {
  for (const el of document.getElementsByClassName("app-screen")) {
    if (!(el instanceof HTMLAnchorElement)) {
      continue;
    }
    const img = document.createElement("img");
    img.className = "app-screen";
    img.src = el.href
    el.appendChild(img)
  }
});
