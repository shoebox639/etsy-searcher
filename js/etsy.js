import shoebox from './shoebox';

const defaultOpts = {
  limit: 10,
  sort_on: 'score',
  api_key: 'zaoywe9blbarngoa2u07lg0j'
};

export default {
  findAllActiveListings(opts = {}) {
    return shoebox.jsonp.get({
      url: 'https://openapi.etsy.com/v2/listings/active',
      query: shoebox.extend(defaultOpts, opts)
    })
  }
};