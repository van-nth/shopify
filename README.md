# Shopify

> Shopify scripts, blocks, snippets

## Assets

### Announcement bar

#### Installation

1. Copy and paste 2 files `custom-announcement-bar.js` and `custom-announcement-bar.css` in this repo to `assets` folder in your Theme

2. Place the script in `layout/theme.liquid` before the closing `<head>` tag

```html
<script
  src="{{ 'custom-announcement-bar.js' | asset_url }}"
  defer="defer"
></script>
```

3. Place these style in `layout/theme.liquid` before the closing `</body>` tag

```liquid
{{ 'custom-announcement-bar.css' | asset_url | stylesheet_tag }}
```

#### Usage

1. The script automatically injects "X" (close) button into the Announcement Bar section

### Wishlist

#### Installation

1. Copy and paste 2 files `shopify-wishlist.js` and `shopify-wishlist.css` in this repo to `assets` folder in your Theme

2. Place the script in `layout/theme.liquid` before the closing `<head>` tag

```html
<script
  id="wishlist"
  data-currency="{{ cart.currency.iso_code }}"
  data-handle="{{ product.handle }}"
  src="{{ 'shopify-wishlist.js' | asset_url }}"
  defer="defer"
></script>
```

3. Place these style in `layout/theme.liquid` before the closing `</body>` tag

```liquid
{{ 'shopify-wishlist.css' | asset_url | stylesheet_tag }}
```

4. Go to store Admin Dashboard > Pages > Add page with:

Title = Wishlist  
Content = `<div id="page-wishlist"></div>` (Click the `<>` show HTML button to paste the string as code)  
Visibility = Visible

and save the page.

#### Usage

1. Go to any product
2. Toggle the 'Add to wishlist' button below the 'Buy it now' to add/remove the item from wishlist
3. Click the wishlist icon on the header before the Cart icon to view the wishlist
