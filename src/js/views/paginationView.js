import icons from '../../img/icons.svg';
import View from './view.js';
import { RESULT_PAGE_SIZE } from '../config.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / RESULT_PAGE_SIZE);
    //console.log(`numPages: ${numPages} page: ${this._data.page}`);

    let html = '';
    if (this._data.page > 1) {
      html += this._buttonPagePrev();
    }
    if (this._data.page < numPages) {
      html += this._buttonPageNext();
    }
    return html;
  }

  _buttonPagePrev() {
    return `
          <button class="btn--inline pagination__btn--prev" data-goto="${
            this._data.page - 1
          }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
          `;
  }

  _buttonPageNext() {
    return `
          <button class="btn--inline pagination__btn--next" data-goto="${
            this._data.page + 1
          }">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      //console.log(btn);

      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }
}

export default new PaginationView();
