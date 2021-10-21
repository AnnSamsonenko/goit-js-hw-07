import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");

const galleryCardsMarkup = createGalleryCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryCardsMarkup);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      loading="lazy" 
      class="gallery__image lazyload"
      data-src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

const settingsForModal = {
  onShow: () => {
    modal.element().querySelector("img").onclick = modal.close;
    window.addEventListener("keydown", onEscKeyPress, { once: true });
  },
  onClose: () => {
    window.removeEventListener("keydown", onEscKeyPress, { once: true });
  },
};

function onEscKeyPress(event) {
  if (event.code === "Escape") {
    modal.close();
  }
}

let modal = basicLightbox.create(
  `
     <div class="modal">
       <img
      class="gallery__image--large"
      src = ""
      alt = ""
    />
    </div>
`,
  settingsForModal
);

function onGalleryContainerClick(event) {
  event.preventDefault();

  const isGalleryCardEl = event.target.classList.contains("gallery__image");
  if (!isGalleryCardEl) {
    return;
  }

  const currentImageUrl = event.target.dataset.source;
  const currentImageAlt = event.target.alt;

  openModal(currentImageUrl, currentImageAlt);
}

function openModal(currentImageUrl, currentImageAlt) {
  modal.element().querySelector("img").src = currentImageUrl;
  modal.element().querySelector("img").alt = currentImageAlt;
  modal.show();
}

//LAZY LOADING CROSSBROWSER
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

//FUNCTION FOR HTML TEMPLATE
// function openModal(currentImageUrl, currentImageAlt) {
//   const instance = basicLightbox.create(document.querySelector("template"));
//   instance.show();
//   const largeImageRef = document.querySelector(".gallery__image--large");
//   largeImageRef.src = currentImageUrl;
//   largeImageRef.alt = currentImageAlt;
// }

//LAZY LOADING CHROME

// const lazyImages = document.querySelectorAll("img[loading='lazy']");
// console.log(lazyImages);

// lazyImages.forEach((image) =>
//   image.addEventListener("load", onImageLoaded, { once: true })
// );

// function onImageLoaded(event) {
//   event.target.classList.add("appear");
//   console.log("Загрузилось");
// }
