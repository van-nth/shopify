const KEY = "custom-wishlist";

function storage() {
  /*
  [
    {
      handle: "",
      variant_id: ""
    } [**]
  ]
  */

  function add(data) {
    if (!validate(data)) {
      throw new Error("bad data");
    }

    const wishlistData = get();
    const exists = wishlistData.find((item) => item.handle === data.handle);
    if (exists) {
      return;
    }
    wishlistData.push(data);
    return set(wishlistData);
  }

  function get() {
    let data;
    try {
      data = JSON.parse(localStorage.getItem(KEY));
      if (!data) {
        throw new Error();
      }
    } catch (e) {
      data = [];
    }
    return data;
  }

  function set(data) {
    return localStorage.setItem(KEY, JSON.stringify(data));
  }

  function remove(handle) {
    const wishlist = get().filter((item) => item.handle !== handle);
    set(wishlist);
  }

  function validate(data) {
    if (!data?.handle) {
      return false;
    }
    return true;
  }

  return {
    add,
    get,
    set,
    remove,
    validate,
  };
}

function cart() {
  function add(variant_id) {
    const url = window.Shopify.routes.root + "cart/add.js";
    fetch(url, {
      body: JSON.stringify({
        items: [
          {
            id: Number(variant_id),
            quantity: 1,
          },
        ],
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        throw new Error(err.message);
      });
  }

  return { add };
}

function wishlist() {
  const wishlistIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 icon icon-wishlist">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  `;

  function add(data) {
    storage().add(data);
  }

  function addButton() {
    const button = document.createElement("button");
    button.classList.add(KEY);
    button.innerHTML = `
      ${wishlistIcon}
      Add to Wishlist
    `;
    button.setAttribute("aria-label", "Add to wishlist");
    button.setAttribute("type", "button");

    const handle = document
      .getElementById(`script-${KEY}`)
      .getAttribute("data-handle");

    const variant_data = JSON.parse(
      document.querySelector(
        'script[type="application/json"]:not(#shopify-features)'
      )?.innerText ?? "[]"
    );
    const variant_value = document.querySelector(
      "variant-radios input:checked"
    )?.value;
    const variant_id = variant_data.find(
      (variant) => variant.option1 === variant_value
    )?.id;

    const data = {
      handle,
      variant_id,
    };

    button.addEventListener("click", () => {
      if (item(data)) {
        remove(data.handle);
        button.classList.remove("active");
        button.innerHTML = `
          ${wishlistIcon}
          Add to Wishlist
        `;
      } else {
        add(data);
        button.classList.add("active");
        button.innerHTML = `
          ${wishlistIcon}
          In Wishlist
        `;
      }
      updateCount();
    });

    // NOTE: for page load
    if (item(data)) {
      button.classList.add("active");
      button.innerHTML = `
        ${wishlistIcon}
        In Wishlist
      `;
    } else {
      button.classList.remove("active");
      button.innerHTML = `
        ${wishlistIcon}
        Add to Wishlist
      `;
    }

    const cartButtons = document.querySelector(".product-form__buttons");
    if (cartButtons) {
      cartButtons.appendChild(button);
    }
  }

  function addNavLink() {
    const wishlistButton = `
      <a href="/pages/wishlist" class="header__icon header__icon--wishlist link focus-inset" id="wishlist-icon-bubble">
        <button id="${KEY}" type="button" class="wishlist-header-icon">
          ${wishlistIcon}
        </button>
        <div class="${KEY}-count-bubble"></div>
      </a>
    `;
    const span = document.createElement("span");
    span.innerHTML = wishlistButton;

    const cartButton = document.getElementById("cart-icon-bubble");
    if (cartButton) {
      const parentDiv = cartButton.parentNode;
      parentDiv.insertBefore(span, cartButton);
    }
  }

  async function build() {
    const wishlistData = storage().get();
    const wishlistPage = document.getElementById(`page-${KEY}`);

    //if wishlist is empty
    if (wishlistData.length === 0) {
      const pageTitle = document.querySelector(".page-title");
      pageTitle.style.display = "none";
      const div = document.createElement("div");
      div.classList.add("empty-wishlist");
      div.innerHTML = `
        <h1 class="empty-wishlist__message">Your wishlist is empty</h1>
      `;
      wishlistPage.appendChild(div);
    }

    //not empty
    return Promise.all(wishlistData.map((item) => product(item.handle))).then(
      (res) => {
        const table = document.createElement("table");
        table.classList.add("table-wishlist");
        table.innerHTML = `
          <thead class="caption-with-letter-spacing">
            <tr>
              <th>${wishlistData.length === 0 ? "" : "Product"}</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody class="table-wishlist-body">
          </tbody>
        `;

        const tableBody = table.querySelector(".table-wishlist-body");

        res.map((data, index) => {
          const tr = document.createElement("tr");
          tr.classList.add("wishlist-item");
          tr.id = data.product.handle;

          const currency = document
            .getElementById(`script-${KEY}`)
            .getAttribute("data-currency");

          const variant_id = wishlistData[index].variant_id;

          let variantPrice = data.product.variants[0].price;
          if (variant_id) {
            variantPrice = data.product.variants.find(
              (variant) => variant.id == variant_id
            ).price;
          }
          variantPrice = new Intl.NumberFormat("en-US", {
            currency,
            currencyDisplay: "narrowSymbol",
            style: "currency",
          }).format(variantPrice);

          tr.innerHTML = `
            <td class="wishlist-item__media">
              <a 
                href="/products/${data.product.handle}" 
                class="wishlist-item__link" 
                aria-hidden="true"
                tabindex="-1"
              >
              </a>
              <a href="/products/${data.product.handle}">
                <div class="wishlist-item__image-container gradient global-media-settings">
                  <img 
                    src=${data.product.image ? data.product.image.src : null}
                    alt=${data.product.title} 
                    loading="lazy" 
                    width="150" 
                    height="85"
                  >
                </div>
              </a>
            </td>
            <td class="wishlist-item__details">
              <a href="/products/${
                data.product.handle
              }" class="wishlist-item__name h4 break">
                ${data.product.title}
              </a>
              <div class="product-option">${variantPrice}</div>
              <dl>
                <div class="product-option">
                  ${
                    variant_id
                      ? '<span class="in-stock-box">In Stock</span>'
                      : '<span class="out-of-stock-box">Out of Stock</span>'
                  }
                </div>
              </dl>
            </td>
            <td class="wishlist-item__buttons">
              <button 
                ${!variant_id ? "disabled" : ""}
                class="button button--primary ${KEY}-add-to-cart" 
                data-variant-id=${variant_id}
              >
              Add to Cart
              </button>
              <button class="remove-button ${KEY}-remove" data-handle=${
            data.product.handle
          }>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false" role="presentation" class="icon icon-remove">
                  <path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor"/>
                  <path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor"/>
                </svg>
              </button>
            </td>
          `;

          const addToCartButton = tr.querySelector(`button.${KEY}-add-to-cart`);
          addToCartButton.addEventListener("click", () => {
            const variant_id = addToCartButton.getAttribute("data-variant-id");
            cart().add(variant_id);

            const cartCount = document.querySelector(
              ".cart-count-bubble > span:not(.visually-hidden)"
            );
            if (cartCount) {
              const count = Number(cartCount.innerText ?? 0);
              cartCount.innerText = count + 1;
            } else {
              const cart = document.getElementById("cart-icon-bubble");
              cart.innerHTML = `
                <svg class="icon icon-cart" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
                  <path fill="currentColor" fill-rule="evenodd" d="M20.5 6.5a4.75 4.75 0 00-4.75 4.75v.56h-3.16l-.77 11.6a5 5 0 004.99 5.34h7.38a5 5 0 004.99-5.33l-.77-11.6h-3.16v-.57A4.75 4.75 0 0020.5 6.5zm3.75 5.31v-.56a3.75 3.75 0 10-7.5 0v.56h7.5zm-7.5 1h7.5v.56a3.75 3.75 0 11-7.5 0v-.56zm-1 0v.56a4.75 4.75 0 109.5 0v-.56h2.22l.71 10.67a4 4 0 01-3.99 4.27h-7.38a4 4 0 01-4-4.27l.72-10.67h2.22z"></path>
                </svg>
                <span class="visually-hidden">Cart</span>
                <div class="cart-count-bubble">
                  <span aria-hidden="true">1</span>
                  <span class="visually-hidden">1 items</span>
                </div>
              `;
            }
          });

          const removeButton = tr.querySelector(`button.${KEY}-remove`);
          removeButton.addEventListener("click", () => {
            const handle = removeButton.getAttribute("data-handle");
            wishlist().remove(handle);
            wishlist().updateCount();
          });

          tableBody.appendChild(tr);
        });

        wishlistPage.appendChild(table);
      }
    );
  }

  function updateCount() {
    const wishlistBubble = document.querySelector(`.${KEY}-count-bubble`);
    const count = storage().get().length;
    if (count > 0) {
      wishlistBubble.style.opacity = "1";
      wishlistBubble.innerText = count;
    } else {
      wishlistBubble.style.opacity = "0";
    }
  }

  function item(data) {
    if (!data) {
      return false;
    }

    return storage()
      .get()
      .find(
        (item) =>
          item.handle === data.handle && item.variant_id === data.variant_id
      );
  }

  function remove(handle) {
    storage().remove(handle);

    const count = storage().get().length;
    if (count === 0) {
      const wishlistTable = document.querySelector(".table-wishlist");
      if (wishlistTable) {
        wishlistTable.remove();
        updateCount();
        build();
      }
    }
  }

  return {
    add,
    addButton,
    addNavLink,
    build,
    item,
    remove,
    updateCount,
  };
}

async function product(handle) {
  return fetch(`/products/${handle}.json`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      throw new Error(err.message);
    });
}

async function onDOMContentLoaded() {
  wishlist().addNavLink();

  const isWishlistPage = document.getElementById(`page-${KEY}`);
  if (isWishlistPage) {
    await wishlist().build();
  }

  const isProductPage = document.getElementsByTagName("product-info");
  if (isProductPage) {
    wishlist().addButton();
  }

  wishlist().updateCount();
}

window.addEventListener("DOMContentLoaded", onDOMContentLoaded);
