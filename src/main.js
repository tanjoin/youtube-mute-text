let settings = {
  mute_list: []
};
const filterFunc = (e) => {
  if (settings.mute_list) {
    return settings.mute_list.some((k) => e.innerText.includes(k));
  }
  return false;
};
const observer = new MutationObserver((mutations) => {
  try {
    [...document.querySelectorAll('ytd-rich-item-renderer,ytd-video-renderer,ytd-channel-renderer')]
        .filter(filterFunc)
        .forEach((e) => e.style.display ="none");
  } catch (e) {
    console.error(e);
  }
});
const config = { attributes: false, childList: true, characterData: false, subtree: true };
observer.observe(document.body, config);

chrome.storage.sync.get({ mute_list: [] }, (data) => settings = Object.assign(settings, data));