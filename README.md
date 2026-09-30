# MeTube Downloader — Chrome Extension
Browser extension for queueing videos to your [MeTube](https://github.com/alexta69/metube) instance. Manifest V3 — works in Chrome, Edge, and other Chromium-based browsers.

### Context Menu Integration
![Context menu on video links](https://github.com/yanoky1/metube-chrome-addon/blob/master/assets/scr_context_menu.png?raw=true)

### Popup Interface
![Extension popup with options](https://github.com/yanoky1/metube-chrome-addon/blob/master/assets/scr_button.png?raw=true)

## Features

- **One-Click Sending** — Send current page to MeTube with a single click or keyboard shortcut
- **Context Menu Integration** — Right-click on links or the page itself to send to MeTube
- **Keyboard Shortcuts** — Customizable keyboard shortcut (default: `Ctrl+Shift+M`)
- **SSO / Cookie Authentication** — Works with SSO systems like Authentik, Authelia, and Keycloak
- **Custom Headers** — Add custom HTTP headers for authentication or other purposes
- **Playlist Control** — Strict Playlist Mode prevents unwanted full playlist downloads
- **Folder Variables** — Categorize downloads automatically with `%DOMAIN%`, `%DATE%` and more
- **Flexible Configuration** — Control quality, format, folder, auto-start, codec, and more

## Installation

### Manual Install (Developer Mode)

1. Download or clone this repository
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer mode** (top-right toggle)
4. Click **"Load unpacked"** and select the `src/` directory from this project
5. The extension icon appears in your toolbar

See the [CHANGELOG](CHANGELOG.md) for version history and release notes.

## Usage

> **Note**: This extension requires a running [MeTube](https://github.com/alexta69/metube) instance. MeTube is a self-hosted YouTube downloader with a web interface. If you don't have MeTube set up yet, visit the [MeTube project](https://github.com/alexta69/metube) for installation instructions.

### Basic Usage

1. Configure your MeTube instance URL in extension options (click the puzzle piece icon → MeTube Downloader → Options)
2. Navigate to any video page (YouTube, Vimeo, etc.)
3. Send to MeTube using one of these methods:
   - Click the extension icon in the toolbar
   - Use the keyboard shortcut `Ctrl+Shift+M` (`Cmd+Shift+M` on Mac)
   - Right-click on a video link and select **"Send to MeTube"**
   - Right-click on the page itself and select **"Send page to MeTube"**

All four methods behave the same way, controlled by **One-Click Mode**. When it is disabled (the default), the popup opens pre-filled with the target URL so you can adjust quality, folder or any other option before sending. When it is enabled, the download is queued immediately without opening the popup.

### Keyboard Shortcuts

The extension supports the following keyboard shortcut:

- **Ctrl+Shift+M** (Windows/Linux) or **Cmd+Shift+M** (Mac) — Send current page to MeTube

You can customize this shortcut in Chrome:
1. Navigate to `chrome://extensions/shortcuts/`
2. Find **"MeTube Downloader"**
3. Click the pencil icon and set your preferred shortcut

### Enabling SSO / Cookie Authentication

If your MeTube instance is behind SSO authentication (e.g., Authentik, Authelia, Keycloak):

1. Open extension options (click the puzzle piece icon → MeTube Downloader → Options)
2. Enter your MeTube instance URL
3. Check the **"Send cookies for authentication (SSO)"** checkbox
4. Read the privacy notice that appears explaining why broad permissions are needed
5. Click **"Save Settings"** — Chrome will prompt you to allow access to all websites
6. Open your MeTube instance in a browser tab and log in through your SSO provider
7. The extension will now use your existing session cookies to authenticate requests

### Folder and Filename Variables

The **Default Folder** and **Custom Name Prefix** settings accept variables that are replaced when the download is queued. This lets you sort downloads automatically instead of typing a folder every time.

| Variable | Replaced with | Example |
|----------|---------------|---------|
| `%HOSTNAME%` | Full hostname of the URL | `www.youtube.com` |
| `%DOMAIN%` | Hostname without a leading `www.` | `youtube.com` |
| `%DATE%` | Current date, `YYYY-MM-DD` | `2026-08-12` |
| `%YEAR%` | Current year | `2026` |
| `%MONTH%` | Current month, zero-padded | `08` |
| `%DAY%` | Current day, zero-padded | `12` |

**Examples**

| Setting value | Result for a `https://www.youtube.com/watch?v=...` link |
|---------------|--------------------------------------------------------|
| `%DOMAIN%` | `youtube.com` |
| `videos/%DOMAIN%` | `videos/youtube.com` |
| `%DOMAIN%/%YEAR%/%MONTH%` | `youtube.com/2026/08` |
| `%DATE% - ` (as name prefix) | `2026-08-12 - ` |

**Notes**

- Variables are resolved against the URL being sent. Right-clicking a link uses that link's hostname, not the hostname of the page you are viewing.
- Variable names are case-sensitive and must be wrapped in `%`.
- Unknown variables such as `%FOO%` are left untouched, so existing settings that contain a `%` keep working.
- Characters that are illegal in file names are replaced with `-`, and a variable that resolves to nothing (for example on `about:` pages) leaves no empty folder behind.
- Using a folder requires `CUSTOM_DIRS` to be enabled on your MeTube instance.

## Options

| Option | Description | Default |
|--------|-------------|---------|
| **MeTube Instance URL** | URL of your MeTube instance (e.g., `https://metube.example.com`) | `""` (empty) |
| **Default Type** | What to download: Video, Audio, Captions, or Thumbnail | `video` |
| **Default Codec** | Preferred video codec (Auto / H.264 / H.265 / AV1 / VP9) — only shown for Video type | `auto` |
| **Default Format** | Container/format for downloads. Options depend on Type (e.g., MP4/iOS for video, MP3/M4A/OPUS/WAV/FLAC for audio, SRT/VTT/... for captions) | `any` |
| **Default Quality** | Quality setting. For Video: best/2160p/...; for Audio: bitrate (depends on format). Hidden for Captions/Thumbnail | `best` |
| **Default Subtitle Language** | Subtitle language code (e.g., `en`, `es`, `zh-Hans`) — only used for Captions type | `en` |
| **Default Subtitle Source** | Subtitle source preference (prefer manual / manual only / auto only / prefer auto) — only used for Captions type | `prefer_manual` |
| **Default Folder** | Folder where downloaded files will be saved. Supports [variables](#folder-and-filename-variables) | `""` (empty) |
| **Custom Name Prefix** | Prefix added to downloaded file names. Supports [variables](#folder-and-filename-variables) | `""` (empty) |
| **Open in New Tab** | Open MeTube instance in new tab after adding to queue | `false` |
| **Show Context Menu on Links** | Show "Send to MeTube" when right-clicking links | `true` |
| **Show Context Menu on Page** | Show "Send page to MeTube" when right-clicking the page | `true` |
| **Auto Start** | Automatically start downloads when ready | `true` |
| **One-Click Mode** | Queue downloads immediately instead of opening the popup. Applies to the toolbar icon, the keyboard shortcut and both context menu entries | `false` |
| **Strict Playlist Mode** | Only download playlists when URL explicitly points to one (prevents downloading YouTube Mixes when you only want the current video) | `false` |
| **Send Custom Headers** | Enable inclusion of custom headers when queueing | `false` |
| **Custom Headers** | Specify custom header names and values for authentication or other purposes | `[]` (empty) |

## Permissions

This extension requires the following permissions:

- **Access your tabs** (`tabs`) — To get the current tab's URL when you want to send it to MeTube.
- **Display context menu** (`contextMenus`) — To show the right-click context menu option.
- **Store data** (`storage`) — To save your MeTube instance URL and preferences.
- **Show notifications** (`notifications`) — To display error/success notifications when the popup is closed.

**Runtime permissions (requested when saving settings):**
- **Access your MeTube instance** — When you save settings, Chrome requests permission to access your MeTube URL origin. This allows the extension to send API calls directly to your MeTube instance.
- **Access all websites** (`<all_urls>`) + **Cookies** — Only requested if you enable "Send cookies for authentication (SSO)". SSO providers redirect to different domains during login, so broad host permissions are needed.

## Troubleshooting

### Connection Issues

**Error: "MeTube instance url not configured"**
- Open extension options and enter your MeTube URL

**Error: "Connection failed" with HTTP URLs (e.g., `http://192.168.1.100:5510`)**
- Chrome does not have Firefox's HTTPS-Only Mode, but some enterprise policies or security extensions may block mixed-content requests from extensions
- **Use direct IP address** instead of hostname (e.g., `http://192.168.1.100:5510` instead of `http://server.local:5510`)
- **Solution**: Use HTTPS with a reverse proxy for best compatibility

**Error: "Connection failed" or CORS errors with HTTPS URLs**
- **Missing host permission**: Re-save your settings in extension options and accept the permission prompt when Chrome asks. This is the most common fix.
- **Self-signed certificate**: Visit your MeTube URL in a browser tab first and accept the security warning/certificate
- **CORS not configured**: If re-saving settings doesn't help, set `CORS_ALLOWED_ORIGINS=*` on your MeTube instance — see [CORS Configuration](#cors-configuration) below.
- **SSO/Authentication**: Enable "Send cookies for authentication (SSO)" in extension settings (see [Enabling SSO / Cookie Authentication](#enabling-sso--cookie-authentication))

**Error: "Authentication failed. Your MeTube instance is redirecting to authentication"**
- You need to log in to your MeTube instance first
- Open your MeTube URL in a regular browser tab and log in through your SSO provider
- Then try using the extension again from that same tab

### CORS Configuration

In most cases, re-saving your extension settings and accepting the permission prompt is enough — Chrome grants the extension direct access to your MeTube instance, bypassing CORS entirely.

If you still get CORS errors after that, you can configure MeTube itself to allow cross-origin requests. Since [MeTube v2025.4.9](https://github.com/alexta69/metube/commit/0072d34), cross-origin requests are denied by default. Set `CORS_ALLOWED_ORIGINS=*` on your MeTube instance (browser extensions use unpredictable `chrome-extension://` origins, so `*` is the only viable value).

**Docker Compose:**
```yaml
services:
  metube:
    image: ghcr.io/alexta69/metube
    environment:
      - CORS_ALLOWED_ORIGINS=*
```

**Docker CLI:**
```bash
docker run -e CORS_ALLOWED_ORIGINS=* ghcr.io/alexta69/metube
```

### Debugging and Viewing Logs

To view detailed error messages and logs:
1. Navigate to `chrome://extensions/`
2. Find **"MeTube Downloader"** and click **"Service worker"** → **"Inspected"** link
3. DevTools opens with the Console tab
4. Try sending a video to MeTube and check the console for error details

### Other Issues

**Context menu not appearing**
- Open extension options and enable "Show Context Menu on Links" / "Show Context Menu on Page"

**One-click mode not working**
- Verify "One-Click Mode" is enabled in settings
- The extension popup will be disabled when one-click mode is active

For other issues, please [create an issue on GitHub](https://github.com/nanocortex/metube-chrome-addon/issues).

## Roadmap

- [x] keyboard shortcuts
- [ ] new tab in popup with download history
- [ ] option to customize the list of sites where the context menu will appear
- [ ] enhance the user interface for settings (maybe in separate tab)
- [ ] dark/light mode theme support for popup and options pages
- [x] Chrome/Edge browser port (cross-browser compatibility via MV3)
- [ ] mobile Chromium support
- [x] Manifest V3 migration
- [ ] Publish to Chrome Web Store

## Development

### Loading for Development (Developer Mode)

1. Open `chrome://extensions/` in Chrome
2. Enable **Developer mode** (top-right toggle)
3. Click **"Load unpacked"** and select the `src/` directory from this repository
4. The extension appears in your toolbar immediately

Changes to source files require reloading: click the reload icon on the extension card in `chrome://extensions/`.

### Building

```powershell
.\build.ps1
```

Output: `builds\metube_v{version}_chrome\` — unpacked folder ready for `chrome://extensions/` Developer mode.

## Support

Having issues? Check the [Troubleshooting](#troubleshooting) section above or [create an issue on GitHub](https://github.com/nanocortex/metube-chrome-addon/issues).

## Contributing

If you would like to contribute, please [create an issue](https://github.com/nanocortex/metube-chrome-addon/issues) or make a pull request.

Thanks to the following contributors for their work on this project:

-  [Whale Mo](https://github.com/ncwhale)
-  [Elwyn](https://github.com/elwynelwyn)
-  [Ayush Chaurasia](https://github.com/ayushc137)
-  [gmpbigsun](https://github.com/gmpbigsun)

## License

This project is licensed under the [Mozilla Public License Version 2.0](LICENSE).
