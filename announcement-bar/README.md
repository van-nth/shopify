# Shopify Custom Announcement Bar Theme Extension

![Screen recording](/assets/custom-announcement-bar.gif)

### Description:

    - A custom announcement bar section
    - Append a button to close the announcement bar
    - addEventListener.click to button to hide bar by adding a class & adding a value to localStorage.setItem(isAnnouncementHiddenKey, true)
    - if localStorage value set, trigger a click to hide the bar on load

## Installation

1. Copy and paste [custom-custom-announcement-bar.liquid](./sections/custom-announcement-bar.liquid/) into `sections` folder in your Theme

2. Copy and paste 2 files [custom-custom-announcement-bar.js](.announcement-bar/assets/custom-announcement-bar.js/) and [custom-custom-announcement-bar.css](.announcement-bar/assets/custom-announcement-bar.css/) into `assets` folder in your Theme

3. Place the script in `layout/theme.liquid` before the closing `<head>` tag

```html
<script src="{{ 'custom-announcement-bar.js' | asset_url }}" defer></script>
```

## Usage

1. Go to Theme editor > Add `Custom announcement bar` section to the Header
2. Hit 'Save'
3. Change the text, background color, text color as expected
