import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryCardsMarkup = createGalleryCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryCardsMarkup);
galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
  <img class="gallery__image lazyload" loading="lazy" data-src="${preview}" alt="${description}"/></a>`;
    })
    .join("");
}

function onGalleryContainerClick(event) {
  event.preventDefault();
  const isGalleryCardEl = event.target.classList.contains("gallery__image");
  if (!isGalleryCardEl) {
    return;
  }

  openModal();
}

const settingsForModal = {
  captionsData: "alt",
  captionDelay: 250,
};

function openModal() {
  const modal = new SimpleLightbox(".gallery__item", settingsForModal);
  modal.on("closed.simplelightbox", () => {
    modal.refresh();
  });
}

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ("loading" in HTMLImageElement.prototype) {
  console.log("поддерживает");

  lazyImages.forEach((image) => (image.src = image.dataset.src));
  addEventListenerToLazyImages();
} else {
  console.log("не поддерживает");

  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.js";
  script.integrity = "sha256-nMn34BfOxpKD0GwV5nZMwdS4e8SI8Ekz+G7dLeGE4XY=";
  script.crossOrigin = "anonymous";

  document.body.appendChild(script);
  addEventListenerToLazyImages();
}

function addEventListenerToLazyImages() {
  lazyImages.forEach((image) =>
    image.addEventListener("load", onImageLoaded, { once: true })
  );
}

function onImageLoaded(event) {
  event.target.classList.add("appear");
  console.log("Загрузилось");
}
