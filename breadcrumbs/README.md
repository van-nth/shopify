# Shopify Dawn Theme Extension - Breadcrumbs

![Breadcrumbs](./assets/breadcrumbs.png)

### Description:

    - A snippet which renders breadcrumbs

## Installation

Copy and paste [breadcrumbs.liquid](./snippets/breadcrumbs.liquid/) into `snippets` folder in your Theme

## Usage

1. Open `layout/theme.liquid`

2. Find this code below:

```liquid
<main
  id="MainContent"
  class="content-for-layout focus-none"
  role="main"
  tabindex="-1"
>
  {{ content_for_layout }}
</main>
```

3. Replace the code above by this:

```liquid
<main
  id="MainContent"
  class="content-for-layout focus-none"
  role="main"
  tabindex="-1"
>
  {% render 'custom-breadcrumbs' %}
  {{ content_for_layout }}
</main>
```
