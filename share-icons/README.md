# Shopify Dawn Theme Extension - Share icons

![Share Icons](./assets/share-icons.png)

### Description:

    - A snippet which renders multiple icons to share the link/images on social media platforms.
    - Use in `main-product.liquid`, `featured-product.liquid`, `main-article.liquid`

## Installation

Copy and paste [share-icons.liquid](./snippets/share-icons.liquid/) and [custom-social-icons.liquid](./snippets/custom-social-icons.liquid/) into `snippets` folder in your Theme

## Usage

1. `main-product.liquid`

- Open `sections/main-product.liquid`
- Find `{%- when 'share' -%}`
- Replace the current snippet by this code:

```liquid
{% liquid
  assign share_link = product.selected_variant.url | default: product.url | prepend: request.origin
  assign share_title = product.selected_or_first_available_variant.title | default: product.title
  assign share_image = product.selected_or_first_available_variant.featured_image | default: product.featured_image | image_url: width: 600
  render 'share-icons', block: block, share_link: share_link, share_image: share_image, share_title: share_title
%}
```

2. `main-article.liquid`

- Open `sections/main-article.liquid`
- Find `{%- when 'share' -%}`
- Replace the current snippet by this code:

```liquid
<div
  class="article-template__social-sharing page-width page-width--narrow{% if settings.animations_reveal_on_scroll %} scroll-trigger animate--slide-in{% endif %}"
  {{ block.shopify_attributes }}
>
  {% liquid
    assign share_link = request.origin | append: article.url
    assign share_title = article.title
    assign share_image = article.image | image_url: width: 600
    render 'share-icons', block: block, share_link: share_link, share_image: share_image, share_title: share_title
  %}
</div>
```

3. `featured-product.liquid`

- Open `sections/featured-product.liquid`
- Find `{%- when 'share' -%}`
- Replace the current snippet by this code:

```liquid
{% liquid
  assign share_link = product.selected_variant.url | default: product.url | prepend: request.origin
  assign share_title = product.selected_or_first_available_variant.title | default: product.title
  assign share_image = product.selected_or_first_available_variant.featured_image | default: product.featured_image | image_url: width: 600
  render 'share-icons', block: block, share_link: share_link, share_image: share_image, share_title: share_title
%}
```
