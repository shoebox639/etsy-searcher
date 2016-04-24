import shoebox from './shoebox';

// set input to query value and do search on document ready
document.addEventListener("DOMContentLoaded", function(event) { 
  const url = new shoebox.Url(window.location.href);
  
  const initQuery = url.query.q;
  if (initQuery) {
    searchInput().value = initQuery;
    searchEtsy(initQuery);
  }

  searchInput().focus();
});

shoebox.routing.onRouteChange(function(state) {
  searchInput().value = state.q;
  searchEtsy(state.q);
});

function searchResult() {
  return document.querySelector('#search-results');
}

let currentSearchId = 'search-input';
function searchInput() {
  return document.querySelector(`#${currentSearchId}`);
}

const defaultOpts = {
  page: 1,
  append: false
}


let nextPage = 1;
// search etsy and display results
function searchEtsy(q, opts = {}) {
  const options = shoebox.extend(defaultOpts, opts);
  const spinner = shoebox.components.spinner();

  if (!options.append) {
    searchResult().innerHTML = '';
    searchResult().classList.add('searching');
    nextPage = 1;
  }

  searchResult().appendChild(spinner);

  function cleanup() {
    searchResult().classList.remove('searching');
    spinner.remove();
  }

  return shoebox.etsy.findAllActiveListings({
    keywords: q,
    includes: ['Images', 'User'],
    limit: 24,
    page: options.page
  }).then((data) => {
    nextPage = data.pagination.next_page;
    data.results.forEach((listing) => {
      searchResult().appendChild(shoebox.components.listing(listing));
    });
    return data;
  }).then(cleanup, (err) => {
    cleanup()
    throw err;
  });
}

window.submitSearch = function() {
  const q = searchInput().value;
  shoebox.routing.go('/', { q });
  searchEtsy(q);

  return false
};

window.addEventListener('scroll', function(e) {
  const form = document.querySelector('#search-form');
  if (window.scrollY >= 69 ) {
    form.classList.add('fixed-top');
    form.classList.remove('row');
  }
  else {
    form.classList.remove('fixed-top');
    form.classList.add('row');
  }
});

shoebox.infiniteScroll(function() {
  if (nextPage) {
    const q = searchInput().value;
    const opts = { page: nextPage, append: true };

    return searchEtsy(q, opts);
  }
});
