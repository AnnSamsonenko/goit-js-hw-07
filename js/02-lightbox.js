import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryCardsMarkup = createGalleryCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryCardsMarkup);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li><a class="gallery__link" href="${original}">
  <img class="gallery__image lazyload" loading="lazy" data-src="${preview}" alt="${description}"/></a></li>`;
    })
    .join("");
}

const settingsForModal = {
  captionsData: "alt",
  captionDelay: 250,
};

const modal = new SimpleLightbox(".gallery__link", settingsForModal);

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ("loading" in HTMLImageElement.prototype) {
  console.log("поддерживает");

  lazyImages.forEach((image) => (image.src = image.dataset.src));
  addEventListenerToLazyImages();
} else {
  console.log("не поддерживает");

  generateScript();
  addEventListenerToLazyImages();
}

function generateScript() {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossOrigin = "anonymous";

  document.body.appendChild(script);
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
