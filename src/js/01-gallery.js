
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line
const galleryRef = document.querySelector('.gallery');

function makeGalleryImgMarkup({ preview, original, description }) {
	return `
  <a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>`;
}

function makeGalleryMarkup(items) {
	return items.map(makeGalleryImgMarkup).join('');
}
function renderMarkup(markup) {
	galleryRef.insertAdjacentHTML('beforeend', markup);
}
const galleryMarkup = makeGalleryMarkup(galleryItems);
renderMarkup(galleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionPosition: "bottom",
  captionsData: "alt",
    captionDelay: 250,
  
});
