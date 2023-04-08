
/****************************************************
 * Copyright © 2023 - Jordan Irwin (AntumDeluge)    *
 ****************************************************
 * This software is licensed under the MIT license. *
 * See: LICENSE.txt for details.                    *
 ****************************************************/


const main = {
  releases: {},

  fetchJSON: function(url, callback) {
    fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "default",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => res.json())
      .then((data) => callback(data));
  },

  onReleaseAvailable: function(data) {
    for (const idx in data) {
      const rel = data[idx];
      if (rel["draft"] || !rel["tag_name"].match(/^v[0-9]/)) {
        continue;
      }
      // TODO: don't show pre-release if lastest is not development version
      if (rel["prerelease"] && !this.releases.dev) {
        // grab first pre-release
        this.setLatestDev(rel["tag_name"], rel["assets"]);
      } else if (!rel["prerelease"] && !this.releases.stable) {
        // grab first stable release
        this.setLatestStable(rel["tag_name"], rel["assets"]);
      }
    }
    sessionStorage.setItem("assets", JSON.stringify(this.releases));
    this.initDownloads();
  },

  setLatestStable: function(name, assets) {
    const a_list = [];
    for (let idx = 0; idx < assets.length; idx++) {
      a_list.push([assets[idx]["name"], assets[idx]["browser_download_url"]]);
    }
    this.releases.stable = {name: name, assets: a_list};
  },

  setLatestDev: function(name, assets) {
    const a_list = [];
    for (let idx = 0; idx < assets.length; idx++) {
      a_list.push([assets[idx]["name"], assets[idx]["browser_download_url"]]);
    }
    this.releases.dev = {name: name, assets: a_list};
  },

  initDownloads: function() {
    // TODO: show PPA links in downloads section
    if (this.releases.stable) {
      const title = document.getElementById("title-stable");
      title.innerText = "Stable: " + this.releases.stable.name;
      const list = document.getElementById("assets-stable");
      for (const pair of this.releases.stable.assets) {
        const line = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.innerText = pair[0]
        anchor.href = pair[1]
        line.appendChild(anchor);
        list.appendChild(line);
      }
    }
    if (this.releases.dev) {
      const title = document.getElementById("title-dev");
      title.innerText = "Development: " + this.releases.dev.name;
      const list = document.getElementById("assets-dev");
      for (const pair of this.releases.dev.assets) {
        const line = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.innerText = pair[0]
        anchor.href = pair[1]
        line.appendChild(anchor);
        list.appendChild(line);
      }
    }
  }
};


window.onload = function() {
  const tmp = sessionStorage.getItem("assets");
  if (tmp) {
    main.releases = JSON.parse(tmp);
    main.initDownloads();
  } else {
    // get release information
    main.fetchJSON("https://api.github.com/repos/debreate/debreate/releases", (data) => {
      main.onReleaseAvailable(data);
    });
  }
}
