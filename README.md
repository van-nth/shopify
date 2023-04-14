# Shopify

> Shopify scripts, blocks, snippets
> (\* _Note: work on Dawn Theme version 9.0.0_ \*)

## Announcement bar

### Description:

    - Append a x button to the announcement bar
    - addEventListener.click to button to hide bar by adding a class & adding a value to localStorage.setItem(isAnnouncementHiddenKey, true)
    - if localStorage value set, trigger a click to hide the bar on load

### Installation

1. Copy and paste 2 files `assets/custom-announcement-bar.js` and `assets/custom-announcement-bar.css` in this repo to `assets` folder in your Theme

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

### Usage

1. The script automatically injects "X" (close) button into the Announcement Bar section

## Wishlist

### Description:

    - Create a simple **Add to Wishlist** function to product page
    - Wishlist Page: remove item, add item to cart
    - Update cart icon and wishlist icon

### Installation

1. Copy and paste 2 files `assets/custom-wishlist.js` and `assets/custom-wishlist.css` in this repo to `assets` folder in your Theme

2. Place the script in `layout/theme.liquid` before the closing `<head>` tag

```html
<script
  id="script-custom-wishlist"
  data-currency="{{ cart.currency.iso_code }}"
  data-handle="{{ product.handle }}"
  src="{{ 'custom-wishlist.js' | asset_url }}"
  defer="defer"
></script>
```

3. Place these style in `layout/theme.liquid` before the closing `</body>` tag

```liquid
{{ 'custom-wishlist.css' | asset_url | stylesheet_tag }}
```

4. Go to store Admin Dashboard > Pages > Add page with:

Title = Wishlist  
Content = `<div id="page-custom-wishlist"></div>` (Click the `<>` show HTML button to paste the string as code)  
and save the page.

### Usage

1. Go to any product
2. Toggle the 'Add to wishlist' button below the 'Buy it now' to add/remove the item from wishlist
3. Click the wishlist icon on the header before the Cart icon to view the wishlist

## Product color and pattern swatch

### Description:

    - Add Color Swatches and pattern swatches for product variants

### Installation

1. From Shopify Admin > Settings > Custom data > Metafields or simply type Metafields on Search bar on the top of Admin Dashboard

2. On Metafields > Click Variants

3. Create 2 metafields for Variants

   - 1st metafield: **Name**: "color swatch"; **Namespace and key**: "custom.color_swatch"; Select **Type** as **Color**
   - 2nd metafield: **Name**: "pattern swatch"; **Namespace and key**: "custom.pattern_swatch"; Select **Type** as **URL**

4. Go to any product you want to add color/pattern swatch > Variants > Select Color > Add color list you want and matching images

5. On each Color Variant > click Edit > Metafields > Select either color swatch or pattern swatch > Add color code for color swatch or URL for pattern swatch

6. Copy and paste `snippets/custom-product-color-swatch.liquid` in this repo to `snippets` folder in your Theme

7. Go to online store > Edit code

8. Open Snippets/product-variant-picker.liquid then find the code below:

```
  {% render 'product-variant-options', product: product, option: option, block: block %}
```

replaced with the code below:

```
  {% render 'custom-product-color-swatch', product: product, option: option, block: block %}
```

9. Copy and paste `assets/custom-product-color-swatch.css` in this repo to `assets` folder in your Theme

10. Place these style in `layout/theme.liquid` before the closing `</body>` tag

```liquid
{{ 'custom-product-color-swatch.css' | asset_url | stylesheet_tag }}
```

### Usage

Go to the product with color/pattern swatch > the default text label now replaced by color or pattern swatch.
