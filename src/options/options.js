// ===== Inline data from formats.js =====
const DOWNLOAD_TYPES = [
  { id: "video", text: "Video" },
  { id: "audio", text: "Audio" },
  { id: "captions", text: "Captions" },
  { id: "thumbnail", text: "Thumbnail" },
];

const VIDEO_CODECS = [
  { id: "auto", text: "Auto" },
  { id: "h264", text: "H.264" },
  { id: "h265", text: "H.265 (HEVC)" },
  { id: "av1", text: "AV1" },
  { id: "vp9", text: "VP9" },
];

const VIDEO_FORMATS = [
  { id: "any", text: "Auto" },
  { id: "mp4", text: "MP4" },
  { id: "ios", text: "iOS Compatible" },
];

const VIDEO_QUALITIES = [
  { id: "best", text: "Best" },
  { id: "2160", text: "2160p" },
  { id: "1440", text: "1440p" },
  { id: "1080", text: "1080p" },
  { id: "720", text: "720p" },
  { id: "480", text: "480p" },
  { id: "360", text: "360p" },
  { id: "240", text: "240p" },
  { id: "worst", text: "Worst" },
];

const AUDIO_FORMATS = [
  {
    id: "m4a",
    text: "M4A",
    qualities: [
      { id: "best", text: "Best" },
      { id: "192", text: "192 kbps" },
      { id: "128", text: "128 kbps" },
    ],
  },
  {
    id: "mp3",
    text: "MP3",
    qualities: [
      { id: "best", text: "Best" },
      { id: "320", text: "320 kbps" },
      { id: "192", text: "192 kbps" },
      { id: "128", text: "128 kbps" },
    ],
  },
  { id: "opus", text: "OPUS", qualities: [{ id: "best", text: "Best" }] },
  { id: "wav", text: "WAV", qualities: [{ id: "best", text: "Best" }] },
  { id: "flac", text: "FLAC", qualities: [{ id: "best", text: "Best" }] },
];

const CAPTION_FORMATS = [
  { id: "srt", text: "SRT" },
  { id: "txt", text: "TXT (Text only)" },
  { id: "vtt", text: "VTT" },
  { id: "ttml", text: "TTML" },
];

const THUMBNAIL_FORMATS = [{ id: "jpg", text: "JPG" }];

const SUBTITLE_MODES = [
  { id: "prefer_manual", text: "Prefer manual" },
  { id: "manual_only", text: "Manual only" },
  { id: "auto_only", text: "Auto only" },
  { id: "prefer_auto", text: "Prefer auto" },
];

const SUBTITLE_LANGUAGES = [
  { id: "en", text: "English" },
  { id: "ar", text: "Arabic" },
  { id: "bn", text: "Bengali" },
  { id: "bg", text: "Bulgarian" },
  { id: "ca", text: "Catalan" },
  { id: "cs", text: "Czech" },
  { id: "da", text: "Danish" },
  { id: "nl", text: "Dutch" },
  { id: "et", text: "Estonian" },
  { id: "fi", text: "Finnish" },
  { id: "fr", text: "French" },
  { id: "de", text: "German" },
  { id: "el", text: "Greek" },
  { id: "he", text: "Hebrew" },
  { id: "hi", text: "Hindi" },
  { id: "hu", text: "Hungarian" },
  { id: "id", text: "Indonesian" },
  { id: "it", text: "Italian" },
  { id: "ja", text: "Japanese" },
  { id: "ko", text: "Korean" },
  { id: "lv", text: "Latvian" },
  { id: "lt", text: "Lithuanian" },
  { id: "ms", text: "Malay" },
  { id: "no", text: "Norwegian" },
  { id: "pl", text: "Polish" },
  { id: "pt", text: "Portuguese" },
  { id: "pt-BR", text: "Portuguese (Brazil)" },
  { id: "ro", text: "Romanian" },
  { id: "ru", text: "Russian" },
  { id: "sr", text: "Serbian" },
  { id: "sk", text: "Slovak" },
  { id: "sl", text: "Slovenian" },
  { id: "es", text: "Spanish" },
  { id: "sv", text: "Swedish" },
  { id: "ta", text: "Tamil" },
  { id: "te", text: "Telugu" },
  { id: "th", text: "Thai" },
  { id: "tr", text: "Turkish" },
  { id: "uk", text: "Ukrainian" },
  { id: "ur", text: "Urdu" },
  { id: "vi", text: "Vietnamese" },
  { id: "zh-Hans", text: "Chinese (Simplified)" },
  { id: "zh-Hant", text: "Chinese (Traditional)" },
];

const FIELD_VISIBILITY = {
  video:     { codec: true,  format: true,  quality: true,  subtitleLanguage: false, subtitleMode: false },
  audio:     { codec: false, format: true,  quality: true,  subtitleLanguage: false, subtitleMode: false },
  captions:  { codec: false, format: true,  quality: false, subtitleLanguage: true,  subtitleMode: true  },
  thumbnail: { codec: false, format: true,  quality: false, subtitleLanguage: false, subtitleMode: false },
};

function visibleFieldsForType(downloadType) {
  return FIELD_VISIBILITY[downloadType] ?? FIELD_VISIBILITY.video;
}

function populateSelect(selectEl, options, preferredValue) {
  if (!selectEl) return;
  const previous = preferredValue ?? selectEl.value;
  selectEl.innerHTML = "";
  for (const opt of options) {
    const optionEl = document.createElement("option");
    optionEl.value = opt.id;
    optionEl.textContent = opt.text;
    selectEl.appendChild(optionEl);
  }
  const hasPrevious = options.some((o) => o.id === previous);
  selectEl.value = hasPrevious ? previous : options[0].id;
}

function populateDatalist(datalistEl, options) {
  if (!datalistEl) return;
  datalistEl.innerHTML = "";
  for (const opt of options) {
    const optionEl = document.createElement("option");
    optionEl.value = opt.id;
    optionEl.textContent = opt.text;
    datalistEl.appendChild(optionEl);
  }
}

function formatsForType(downloadType) {
  switch (downloadType) {
    case "audio":
      return AUDIO_FORMATS.map(({ id, text }) => ({ id, text }));
    case "captions":
      return CAPTION_FORMATS;
    case "thumbnail":
      return THUMBNAIL_FORMATS;
    case "video":
    default:
      return VIDEO_FORMATS;
  }
}

function qualitiesForTypeAndFormat(downloadType, format) {
  if (downloadType === "audio") {
    const audioFormat = AUDIO_FORMATS.find((f) => f.id === format);
    return audioFormat ? audioFormat.qualities : [{ id: "best", text: "Best" }];
  }
  if (downloadType === "captions" || downloadType === "thumbnail") {
    return [{ id: "best", text: "Best" }];
  }
  return VIDEO_QUALITIES;
}

function setContainerVisibility(el, visible) {
  if (!el) return;
  const container = el.closest('[data-field-container]') ?? el;
  container.classList.toggle('hidden', !visible);
}

function hideEmptyOptionRows(rootEl = document) {
  rootEl.querySelectorAll('.options-row').forEach((row) => {
    const cols = row.querySelectorAll('[data-field-container]');
    if (cols.length === 0) return;
    const allHidden = [...cols].every((col) => col.classList.contains('hidden'));
    row.classList.toggle('hidden', allHidden);
  });
}

function rememberSelection(type, format, quality) {
  const downloadType = type.value;
  type.dataset[`fmt_${downloadType}`] = format.value;
  type.dataset[`qty_${downloadType}_${format.value}`] = quality.value;
}

function recallFormat(type, preferred) {
  return preferred ?? type.dataset[`fmt_${type.value}`];
}

function recallQuality(type, format, preferred) {
  return preferred ?? type.dataset[`qty_${type.value}_${format.value}`];
}

function refreshDependentSelects(selects, preferred = {}) {
  const { type, codec, format, quality, subtitleMode } = selects;
  const downloadType = type.value;
  const visibility = visibleFieldsForType(downloadType);

  populateSelect(format, formatsForType(downloadType), recallFormat(type, preferred.format));
  populateSelect(
    quality,
    qualitiesForTypeAndFormat(downloadType, format.value),
    recallQuality(type, format, preferred.quality)
  );
  if (subtitleMode) {
    populateSelect(subtitleMode, SUBTITLE_MODES, preferred.subtitleMode);
  }

  setContainerVisibility(codec, visibility.codec);
  setContainerVisibility(quality, visibility.quality);
  setContainerVisibility(selects.subtitleLanguage, visibility.subtitleLanguage);
  setContainerVisibility(subtitleMode, visibility.subtitleMode);

  format.disabled = downloadType === 'thumbnail';

  hideEmptyOptionRows();
  rememberSelection(type, format, quality);
}

function bindDependentSelects(selects) {
  const { type, format, quality } = selects;
  type.addEventListener("change", () => refreshDependentSelects(selects));
  format.addEventListener("change", () => {
    populateSelect(
      quality,
      qualitiesForTypeAndFormat(type.value, format.value),
      type.dataset[`qty_${type.value}_${format.value}`]
    );
    rememberSelection(type, format, quality);
  });
  quality.addEventListener("change", () => {
    rememberSelection(type, format, quality);
  });
}

// ===== Inline requestPermissionsForUrl from utils.js =====
async function requestPermissionsForUrl(url, useCookieAuth) {
  try {
    const permissionRequest = {};

    if (useCookieAuth) {
      permissionRequest.origins = ["<all_urls>"];
      permissionRequest.permissions = ["cookies"];
    } else {
      const urlObj = new URL(url);
      const origin = `${urlObj.protocol}//${urlObj.host}/*`;
      permissionRequest.origins = [origin];
    }

    return await chrome.permissions.request(permissionRequest);
  } catch (error) {
    console.error("Error requesting permission:", error);
    return false;
  }
}

// ===== Original options.js code =====
let connectionTested = false;

async function saveOptions(e) {
  e.preventDefault();

  let showContextMenu = document.querySelector("#showContextMenu").checked;
  let showPageContextMenu = document.querySelector("#showPageContextMenu").checked;
  let url = document.querySelector("#url").value.trim();
  let urlValidationMessageEl = document.getElementById("urlValidationMessage");

  if (!url) {
    urlValidationMessageEl.innerText = 'MeTube URL is required';
    return;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    urlValidationMessageEl.innerText = 'URL must start with http:// or https://';
    return;
  }

  try {
    new URL(url);
  } catch (error) {
    urlValidationMessageEl.innerText = 'Invalid URL format';
    return;
  }
  urlValidationMessageEl.innerText = '';

  let useCookieAuth = document.querySelector("#useCookieAuth").checked;

  const granted = await requestPermissionsForUrl(url, useCookieAuth);
  if (!granted) {
    urlValidationMessageEl.innerText = useCookieAuth
      ? 'Permission denied. Cannot enable SSO without permissions.'
      : 'Permission denied. The extension needs access to your MeTube instance to send requests.';
    return;
  }

  chrome.storage.sync.set({
    url: url,
    defaultDownloadType: document.querySelector("#defaultDownloadType").value,
    defaultCodec: document.querySelector("#defaultCodec").value,
    defaultFormat: document.querySelector("#defaultFormat").value,
    defaultQuality: document.querySelector("#defaultQuality").value,
    defaultSubtitleLanguage: document.querySelector("#defaultSubtitleLanguage").value.trim() || 'en',
    defaultSubtitleMode: document.querySelector("#defaultSubtitleMode").value,
    openInNewTab: document.querySelector("#openInNewTab").checked,
    quietSend: document.querySelector("#quietSend").checked,
    showContextMenu,
    showPageContextMenu,
    useCookieAuth: document.querySelector("#useCookieAuth").checked,
    sendCustomHeaders: document.querySelector("#sendCustomHeaders").checked,
    customHeaders: Array.from(document.querySelectorAll('.header-pair')).map(el => ({ name: el.dataset.name, value: el.dataset.value })),
    defaultFolder: document.querySelector("#defaultFolder").value,
    defaultCustomNamePrefix: document.querySelector("#defaultCustomNamePrefix").value,
    defaultAutoStart: document.querySelector("#defaultAutoStart").checked,
    oneClickMode: document.querySelector("#oneClickMode").checked,
    strictPlaylistMode: document.querySelector("#strictPlaylistMode").checked,
  });

  chrome.contextMenus.update("send-to-metube", {
    visible: showContextMenu,
  });

  chrome.contextMenus.update("send-to-metube-page", {
    visible: showPageContextMenu,
  });

  chrome.runtime.sendMessage({ command: 'settingsUpdated' });

  const saveSuccessMessageEl = document.getElementById("saveSuccessMessage");
  saveSuccessMessageEl.innerText = '✓ Settings saved!';
  saveSuccessMessageEl.className = 'text-success';
  saveSuccessMessageEl.classList.remove("hidden");

  setTimeout(() => {
    saveSuccessMessageEl.classList.add("hidden");
  }, 3000);
}

function restoreOptions() {
  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getUrl = chrome.storage.sync.get("url");
  getUrl.then(function(result) {
    document.querySelector("#url").value = result.url || "";
  }, onError);

  restoreDownloadOptions().catch(onError);

  let getOpenInNewTab = chrome.storage.sync.get("openInNewTab");
  getOpenInNewTab.then(function(result) {
    document.querySelector("#openInNewTab").checked = result.openInNewTab || false;
  }, onError);

  let getQuietSend = chrome.storage.sync.get("quietSend");
  getQuietSend.then(function(result) {
    document.querySelector("#quietSend").checked = result.quietSend || false;
  }, onError);

  let showContextMenu = chrome.storage.sync.get("showContextMenu");
  showContextMenu.then(function(result) {
    document.querySelector("#showContextMenu").checked = result.showContextMenu ?? true;
  }, onError);

  let showPageContextMenu = chrome.storage.sync.get("showPageContextMenu");
  showPageContextMenu.then(function(result) {
    document.querySelector("#showPageContextMenu").checked = result.showPageContextMenu ?? true;
  }, onError);

  let sendCustomHeaders = chrome.storage.sync.get("sendCustomHeaders");
  sendCustomHeaders.then(function(result) {
    document.querySelector("#sendCustomHeaders").checked = result.sendCustomHeaders;
    result.sendCustomHeaders ? showCustomHeadersSection() : hideCustomHeadersSection();
  });

  let customHeaders = chrome.storage.sync.get("customHeaders");
  customHeaders.then(function(result) {
    result.customHeaders?.forEach(header => addCustomHeader(header));
  }, onError);

  let getDefaultFolder = chrome.storage.sync.get("defaultFolder");
  getDefaultFolder.then(function(result) {
    document.querySelector("#defaultFolder").value = result.defaultFolder || "";
  }, onError);

  let getDefaultCustomNamePrefix = chrome.storage.sync.get("defaultCustomNamePrefix");
  getDefaultCustomNamePrefix.then(function(result) {
    document.querySelector("#defaultCustomNamePrefix").value = result.defaultCustomNamePrefix || "";
  }, onError);

  let getDefaultAutoStart = chrome.storage.sync.get("defaultAutoStart");
  getDefaultAutoStart.then(function(result) {
    document.querySelector("#defaultAutoStart").checked = result.defaultAutoStart ?? true;
  }, onError);

  let getOneClickMode = chrome.storage.sync.get("oneClickMode");
  getOneClickMode.then(function(result) {
    document.querySelector("#oneClickMode").checked = result.oneClickMode || false;
  }, onError);

  let getStrictPlaylistMode = chrome.storage.sync.get("strictPlaylistMode");
  getStrictPlaylistMode.then(function(result) {
    document.querySelector("#strictPlaylistMode").checked = result.strictPlaylistMode || false;
  }, onError);

  let getUseCookieAuth = chrome.storage.sync.get("useCookieAuth");
  getUseCookieAuth.then(function(result) {
    const useCookieAuth = result.useCookieAuth || false;
    document.querySelector("#useCookieAuth").checked = useCookieAuth;
    if (useCookieAuth) {
      document.getElementById("ssoWarning").classList.remove("hidden");
    }
  }, onError);
}

function getDownloadOptionSelects() {
  return {
    type: document.querySelector("#defaultDownloadType"),
    codec: document.querySelector("#defaultCodec"),
    format: document.querySelector("#defaultFormat"),
    quality: document.querySelector("#defaultQuality"),
    subtitleLanguage: document.querySelector("#defaultSubtitleLanguage"),
    subtitleMode: document.querySelector("#defaultSubtitleMode"),
  };
}

function setupDownloadOptionSelects() {
  const selects = getDownloadOptionSelects();
  populateSelect(selects.type, DOWNLOAD_TYPES);
  populateSelect(selects.codec, VIDEO_CODECS);
  populateSelect(selects.subtitleMode, SUBTITLE_MODES);
  populateDatalist(document.getElementById('subtitleLanguageOptions'), SUBTITLE_LANGUAGES);
  refreshDependentSelects(selects);
  bindDependentSelects(selects);
}

function migrateLegacyDefaults(stored) {
  const type = stored.defaultDownloadType;
  let format = stored.defaultFormat;
  let quality = stored.defaultQuality;

  if (type) {
    return { type, codec: stored.defaultCodec ?? 'auto', format: format ?? 'any', quality: quality ?? 'best' };
  }

  const AUDIO_FORMAT_IDS = AUDIO_FORMATS.map((f) => f.id);
  let migratedType = 'video';

  if (quality === 'audio' || AUDIO_FORMAT_IDS.includes(format)) {
    migratedType = 'audio';
    if (quality === 'audio') quality = 'best';
    if (!AUDIO_FORMAT_IDS.includes(format)) format = 'm4a';
  } else if (format === 'thumbnail') {
    migratedType = 'thumbnail';
    format = 'jpg';
    quality = 'best';
  }

  return {
    type: migratedType,
    codec: 'auto',
    format: format ?? (migratedType === 'video' ? 'any' : undefined),
    quality: quality ?? 'best',
  };
}

async function restoreDownloadOptions() {
  const stored = await chrome.storage.sync.get([
    "defaultDownloadType",
    "defaultCodec",
    "defaultFormat",
    "defaultQuality",
    "defaultSubtitleLanguage",
    "defaultSubtitleMode",
  ]);

  const resolved = migrateLegacyDefaults(stored);
  const selects = getDownloadOptionSelects();

  populateSelect(selects.type, DOWNLOAD_TYPES, resolved.type);
  populateSelect(selects.codec, VIDEO_CODECS, resolved.codec);
  selects.subtitleLanguage.value = stored.defaultSubtitleLanguage ?? 'en';
  refreshDependentSelects(selects, {
    format: resolved.format,
    quality: resolved.quality,
    subtitleMode: stored.defaultSubtitleMode ?? 'prefer_manual',
  });
}

function showCustomHeadersSection() {
  document.getElementById("customHeadersSection")?.classList.remove("hidden");
}

function hideCustomHeadersSection() {
  document.getElementById("customHeadersSection")?.classList.add("hidden");
}

function setupCustomHeadersSection() {
  const headerNameInput = document.getElementById("headerNameInput");
  const headerValueInput = document.getElementById("headerValueInput");
  const addHeaderButton = document.getElementById("addHeaderButton");
  const headerValidationMessageEl = document.getElementById("headerValidationMessage");

  document.getElementById("sendCustomHeaders").addEventListener("change", (event) => {
    event.target.checked ? showCustomHeadersSection() : hideCustomHeadersSection();
  });

  addHeaderButton.addEventListener("click", () => {
    const name = headerNameInput.value;
    const value = headerValueInput.value;

    let validationError = '';
    if (!name || !value) {
      validationError = 'Enter a header name and value';
    }

    headerValidationMessageEl.innerText = validationError;
    if (validationError) {
      return;
    }

    addCustomHeader({ name, value });

    headerNameInput.value = '';
    headerValueInput.value = '';
  });
}

function removeCustomHeader(header) {
  const headersList = document.getElementById('headersList');
  headersList.querySelector(`[data-name="${header.name}"]`)?.remove();
}

function addCustomHeader(header) {
  const headersList = document.getElementById('headersList');

  const listItem = document.createElement('li');
  listItem.classList.add('header-pair');
  listItem.dataset.name = header.name;
  listItem.dataset.value = header.value;

  const codeName = document.createElement('code');
  const codeValue = document.createElement('code');
  codeName.textContent = header.name;
  codeValue.textContent = header.value;

  listItem.append(codeName, codeValue);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.setAttribute('aria-label', 'Remove custom header');
  removeBtn.innerText = '➖';
  removeBtn.addEventListener('click', () => removeCustomHeader(header));
  listItem.appendChild(removeBtn);

  headersList.appendChild(listItem);
}

document.addEventListener("DOMContentLoaded", setupDownloadOptionSelects);
document.addEventListener("DOMContentLoaded", setupCustomHeadersSection);
document.addEventListener("DOMContentLoaded", restoreOptions);
document.addEventListener("DOMContentLoaded", setupYtdlOptionsSection);
document.addEventListener("DOMContentLoaded", restoreYtdlOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

document.getElementById("url").addEventListener("input", () => {
  connectionTested = false;
  document.getElementById("testConnectionMessage").innerText = '';
});

// Show/hide SSO warning
document.getElementById("useCookieAuth").addEventListener("change", (event) => {
  const ssoWarning = document.getElementById("ssoWarning");
  if (event.target.checked) {
    ssoWarning.classList.remove("hidden");
  } else {
    ssoWarning.classList.add("hidden");
  }
});


function addYtdlOptionsRule(rule) {
  const list = document.getElementById("ytdlOptionsList");

  const item = document.createElement("li");
  item.classList.add("ytdl-options-rule");

  // Header
  const header = document.createElement("div");
  header.classList.add("ytdl-options-rule-header");

  const domain = document.createElement("code");
  domain.classList.add("ytdl-options-domain");
  domain.textContent = rule.domain;

  const folder = document.createElement("span");
  folder.classList.add("ytdl-options-folder");
  folder.textContent = rule.folder || "default folder";

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.classList.add("ytdl-options-remove");
  removeButton.textContent = "➖";
  removeButton.setAttribute(
    "aria-label",
    "Remove yt-dlp options rule"
  );

  header.append(domain, folder, removeButton);

  // Options
  const optionsWrapper = document.createElement("div");
  optionsWrapper.classList.add("ytdl-options-json");

  const options = document.createElement("pre");
  options.textContent = JSON.stringify(rule.options || {}, null, 2);

  optionsWrapper.appendChild(options);

  removeButton.addEventListener("click", async () => {
    const stored = await chrome.storage.sync.get(
      "domainYtdlOptions"
    );

    const rules = stored.domainYtdlOptions || [];

    const updated = rules.filter(
      existing => existing.domain !== rule.domain
    );

    await chrome.storage.sync.set({
      domainYtdlOptions: updated
    });

    item.remove();
  });

  item.append(header, optionsWrapper);
  list.appendChild(item);
}

async function restoreYtdlOptions() {
    const result = await chrome.storage.sync.get(
        "domainYtdlOptions"
    );

    const rules = result.domainYtdlOptions || [];

    rules.forEach(rule => {
        addYtdlOptionsRule(rule);
    });
}


function setupYtdlOptionsSection() {
    const domainInput =
        document.getElementById("ytdlDomainInput");

    const folderInput =
        document.getElementById("ytdlFolderInput");

    const optionsInput =
        document.getElementById("ytdlOptionsInput");

    const addButton =
        document.getElementById("addYtdlOptionsButton");

    const validation =
        document.getElementById(
            "ytdlOptionsValidationMessage"
        );

    addButton.addEventListener("click", async () => {
        validation.textContent = "";

        const domain =
            domainInput.value.trim().toLowerCase();

        const folder =
            folderInput.value.trim();

        const rawOptions =
            optionsInput.value.trim();

        if (!domain) {
            validation.textContent = "Укажите домен.";
            return;
        }

        let options = {};

        // Пустые Options разрешаем
        if (rawOptions) {
            try {
                options = JSON.parse(rawOptions);
            } catch (error) {
                validation.textContent =
                    "Custom yt-dlp Options содержит некорректный JSON.";
                return;
            }

            if (
                !options ||
                typeof options !== "object" ||
                Array.isArray(options)
            ) {
                validation.textContent =
                    "Options должен быть JSON-объектом.";
                return;
            }
        }

        const result =
            await chrome.storage.sync.get(
                "domainYtdlOptions"
            );

        const rules =
            result.domainYtdlOptions || [];

        const existingIndex =
            rules.findIndex(
                rule => rule.domain === domain
            );

        const newRule = {
            domain,
            folder,
            options
        };

        if (existingIndex >= 0) {
            rules[existingIndex] = newRule;
        } else {
            rules.push(newRule);
        }

        await chrome.storage.sync.set({
            domainYtdlOptions: rules
        });

        document.getElementById(
            "ytdlOptionsList"
        ).innerHTML = "";

        await restoreYtdlOptions();

        domainInput.value = "";
        folderInput.value = "";
        optionsInput.value = "";
    });
}
