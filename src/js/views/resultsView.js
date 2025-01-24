import View from './view.js';
import PreviewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'We could not find any recipes. Please try again.';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(PreviewView._generateMarkupPreview).join('');
  }
}

export default new ResultsView();
