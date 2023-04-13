document.addEventListener("load", function() {
  addCloseButton();
});

/**
 * Append a x button to the announcement bar
 * addEventListener.click to button to hide bar by adding a class & adding a value to localStorage.setItem(isAnnouncementHiddenKey, true)
 * if localStorage value set, trigger a click to hide the bar on load
 */

function addCloseButton() {
  const announcementBar = document.querySelector(
    ".announcement-bar"
  );

  const closeButton = document.createElement("button");
  closeButton.setAttribute("type", "button");
  closeButton.setAttribute("aria-label", "close-button");
  closeButton.classList.add("close");

  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    announcementBar.classList.add("hidden");
    window.localStorage.setItem("is-announcement-bar-hidden", true);
  });

  announcementBar.appendChild(closeButton);

  if (window.localStorage.getItem("is-announcement-bar-hidden")) {
    closeButton.click();
  }
}