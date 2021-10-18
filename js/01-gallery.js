import { galleryItems } from "./gallery-items.js";
// Change code below this line
//ЗАДАНИЕ

// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// Реализация делегирования на div.gallery и получение url большого изображения.
// Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.

/* <div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</div>; */
const galleryContainer = document.querySelector(".gallery");
const galleryCardsMarkup = createGalleryCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryCardsMarkup);
galleryContainer.addEventListener("click", onGalleryContainerClick);

const settingsForModal = {
  onShow: (modal) => {
    modal.element().querySelector("img").onclick = modal.close;
    window.addEventListener("keydown", onEscKeyPress);
    function onEscKeyPress(event) {
      if (event.code === "Escape") {
        window.removeEventListener("keydown", onEscKeyPress);
        modal.close();
      }
    }
  },
};

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
  const modal = basicLightbox.create(
    `
     <div class="modal">
       <img
      class="gallery__image--large"
      src = "${currentImageUrl}"
      alt = "${currentImageAlt}"
    />
    </div>
`,
    settingsForModal
  );

  modal.show();
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

//LAZY LOADING CROSSBROWSER
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
