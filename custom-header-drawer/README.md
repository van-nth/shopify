# Shopify Dawn Theme Extension - Header Drawer

![Screen recording](./assets/custom-header-drawer.gif)

### Description:

    - Add 'dropdown' styled menu to mobile header drawer of Dawn theme
    - Users can select between 'Default' and 'Dropdown' to show either default Dawn's mobile header menu or custom dropdown one

## Installation

1. Open `sections/header.liquid`

- Add this object to the `settings` of section schema

```json
    {
      "type": "select",
      "id": "drawer_type",
      "options": [
        {
          "value": "drawer_dropdown",
          "label": "Dropdown"
        },
        {
          "value": "drawer_default",
          "label": "Default"
        },
      ],
      "default": "drawer_default",
      "label": "Drawer menu type",
    },

```

  
- Find this code (where the `snippets/header-drawer` is rendered):
```liquid
{%- liquid
    if section.settings.menu != blank 
        render 'header-drawer'
    endif

    if section.settings.logo_position == 'top-center' or section.settings.menu == blank
        render 'header-search', input_id: 'Search-In-Modal-1'
    endif
-%}
```

and replace by this:

```liquid
{%- liquid
    assign drawer_type = section.settings.drawer_type
    if section.settings.menu != blank 
        render 'header-drawer', drawer_type: drawer_type
    endif

    if section.settings.logo_position == 'top-center' or section.settings.menu == blank
        render 'header-search', input_id: 'Search-In-Modal-1'
    endif
-%}
```


2. Open `snippets/header-drawer.liquid` > Delete all the code and replace by the code in [header-drawer.liquid](./snippets/header-drawer.liquid/)


## Usage 
```liquid
{% render 'header-drawer', drawer_type: drawer_type %}
```
