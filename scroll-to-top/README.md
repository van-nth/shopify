# Shopify Dawn Theme Extension - Scroll to top button

![Screen recording](./assets/scroll-to-top.gif)

### Description:

    - A snippet which adds a Scroll-to-top button to the theme

## Installation

Copy and paste [scroll-to-top.liquid](./snippets/scroll-to-top.liquid/) into `snippets` folder in your Theme

## Usage

1. Open `layout/theme.liquid`

2. Find this code below:

```liquid
{% sections 'footer-group' %}
```

3. Place this code below it:

```liquid
{% render 'scroll-to-top' %}
```
