const DEFAULT_VALUE = { freeword: [] }

function flexibleTextarea() {
  [...document.querySelectorAll('.flexible')].forEach((textarea) => {
    textarea.setAttribute('default_height', textarea.clientHeight);
    textarea.addEventListener('input', () => {
      textarea.style.height = textarea.getAttribute('default_height') + 'px';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  });
}

function restoreOptions() {
  chrome.storage.sync.get({ freeword: [] }, (data) => {
    let freeword = document.getElementById('freeword_area');
    if (freeword) {
      freeword.value = data.freeword.join('\n');
    }
    [...document.querySelectorAll('.flexible')].forEach((textarea) => {
      textarea.style.height = textarea.getAttribute('default_height') + 'px';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  });
}

function saveOptions() {
  const syncData = {
    mute_list: []
  };
  let freewords = document.getElementById('freeword_area').value;
  if (freewords && freewords.length > 0) {
    syncData.freeword = freewords.split('\n');
    syncData.mute_list = syncData.mute_list.concat(syncData.freeword);
  } else {
    syncData.freeword = [];
  }
  chrome.storage.sync.set(syncData, () => {
    const status = document.getElementById('status');
    status.textContent = '保存しました！';
    setTimeout(() => {
      status.textContent = '';
    }, 1750);
  });
}

window.addEventListener('load', flexibleTextarea);
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
