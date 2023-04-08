
/****************************************************
 * Copyright © 2023 - Jordan Irwin (AntumDeluge)    *
 ****************************************************
 * This software is licensed under the MIT license. *
 * See: LICENSE.txt for details.                    *
 ****************************************************/


window.onload = function() {
  const data = [
    [
      "background image by ",
      {href: "https://opengameart.org/node/24035", text: "Crystal Hammer"},
      " licensed under ",
      {href: "https://creativecommons.org/publicdomain/zero/1.0/", text: "Creative Commons Zero"}
    ],
    [
      "Amaranth fonts by ",
      {href: "https://www.gesine-todt.de/", text: "Gesine Todt"},
      " licensed under ",
      {href: "/res/font/OFL.txt", text: "SIL Open Font License"}
    ]
  ];

  //~ for (const footer of document.getElementsByClassName("footer")) {
  //~ }

  const footer = document.createElement("div");
  footer.classList.add("footer");

  for (const line of data) {
    const d = document.createElement("div");
    for (const elem of line) {
      if (typeof(elem) === "string") {
        d.innerHTML += elem;
      } else {
        d.innerHTML += "<a href=\"" + elem.href + "\">" + elem.text + "</a>";
      }
    }
    footer.appendChild(d);
  }

  document.body.appendChild(footer);
}
