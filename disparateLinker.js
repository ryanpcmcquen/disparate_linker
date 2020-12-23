/* global chrome */

(() => {
    const runMe = `
(() => {
    const disparateLinker = {
        config: {
            frontEndUrl: "",
            craftUrl: "",
        },
    };
    let fetchPath = window.location.pathname;
    if (fetchPath === "/") {
        fetchPath = "/homepage";
    }
    const result = fetch(
        disparateLinker.config.frontEndUrl + "/api/craft/pages" + fetchPath
    );
    result
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            const bladeSlugs = json.blades.reduce((newObj, blade) => {
                newObj[blade.slug] = blade.uid;
                return newObj;
            }, {});
            Object.keys(bladeSlugs).forEach((bladeSlug) => {
                const bladeSlugNode = document.querySelector("#" + bladeSlug);
                bladeSlugNode.innerHTML =
                    '<a style="text-align: center; width: 100vw; display: block; background-color: #E5422B; color: #FFFFFF;" target="craft_' +
                    Date.now() +
                    '" rel="noopener noreferrer nofollow" href="' +
                    disparateLinker.config.craftUrl +
                    "/admin/edit/" +
                    bladeSlugs[bladeSlug] +
                    '">↓ Edit in Craft ↓</a>' +
                    bladeSlugNode.innerHTML;
            });
        });
})();
    `;
    try {
        chrome.browserAction.onClicked.addListener(() => {
            chrome.tabs.executeScript({
                code: runMe,
            });
        });
    } catch (ignore) {}
})();
