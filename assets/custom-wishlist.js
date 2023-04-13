function storage() {
  const KEY = "shopify-wishlist";

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
