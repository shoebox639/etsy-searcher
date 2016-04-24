export default {
  listing(listing) {
    const container = document.createElement('div');
    container.classList.add('col-md-3', 'col-sm-6')
    const elem = container.appendChild(document.createElement('div'));
    elem.classList.add('listing');
    elem.id = `listing-${listing.listing_id}`;

    const img = listing.Images[0];
    const imgAnchor = elem.appendChild(document.createElement('a'));
    imgAnchor.href = listing.url;

    const imgElem_sm = imgAnchor.appendChild(document.createElement('img'));
    imgElem_sm.classList.add('visible-md-block', 'visible-lg-block', 'visible-sm-block');
    imgElem_sm.src = img.url_170x135;
    imgElem_sm.style.width = '100%';
    imgElem_sm.title = listing.title;

    const imgElem_lg = imgAnchor.appendChild(document.createElement('img'));
    imgElem_lg.classList.add('visible-xs-block');
    imgElem_lg.src = img.url_570xN;
    imgElem_lg.style.width = '100%';
    imgElem_lg.title = listing.title;

    const title = elem.appendChild(document.createElement('h4'));
    title.innerHTML = `<a href="${listing.url}">${listing.title}</a>`;

    const price = elem.appendChild(document.createElement('p'));
    price.classList.add('clearfix');
    price.innerHTML = `
      <span class="pull-left">
        <a href="https://www.etsy.com/shop/${listing.User.login_name}">${listing.User.login_name}</a>
      </span>
      <strong class="pull-right">$${listing.price}</strong>
    `;

    const desc = elem.appendChild(document.createElement('p'));
    desc.classList.add('listing-desc')

    desc.innerHTML = listing.description.replace(/(\r\n|\n)/mg, '<br />'); // there are tons of new lines

    return container;
  },

  spinner() {
    const container = document.createElement('div');
    container.classList.add('text-center');
    const spinner = container.appendChild(document.createElement('i'))
    spinner.classList.add('glyphicon', 'glyphicon-refresh', 'spin');
    spinner.style['font-size'] = '30px'

    return container;
  }
}

