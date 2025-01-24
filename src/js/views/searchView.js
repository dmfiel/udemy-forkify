import icons from 'url:../../img/icons.svg';

class SearchView {
  _parentElement = document.querySelector('.search');
  _data;
  _errorMessage = 'We could not find that recipe. Please try again.';
  _message = '';

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
