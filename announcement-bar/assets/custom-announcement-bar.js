window.addEventListener("DOMContentLoaded", function () {
  addCloseButton();
});

/**
 * Append a x button to the announcement bar
 * addEventListener.click to button to hide bar by adding a class & adding a value to localStorage.setItem(isAnnouncementHiddenKey, true)
 * if localStorage value set, trigger a click to hide the bar on load
 */

function addCloseButton() {
  const announcementBar = document.getElementById("custom-announcement-bar");

  const closeButton = document.createElement("button");
  closeButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  `;
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
