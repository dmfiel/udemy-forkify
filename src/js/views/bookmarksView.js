import PreviewView from './previewView.js';
import View from './view.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it.';
  _message = '';

  _generateMarkup(bookmarks) {
    // console.log(bookmarks);
    return this._data.map(PreviewView._generateMarkupPreview).join('');
  }
}

export default new BookmarksView();
