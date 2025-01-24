import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PreviewView extends View {
  _generateMarkupPreview(bookmark) {
    const id = window.location.hash.slice(1);
    return `
          <li class="preview">
            <a class="preview__link ${
              id === bookmark.id ? 'preview__link--active' : ''
            }" href="#${bookmark.id}">
              <figure class="preview__fig">
                <img src="${bookmark.image}" alt="${bookmark.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${bookmark.title}</h4>
                <p class="preview__publisher">${bookmark.publisher}</p>
                <div class="preview__user-generated ${
                  bookmark.key ? '' : 'hidden'
                }">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
  }
}

export default new PreviewView();
