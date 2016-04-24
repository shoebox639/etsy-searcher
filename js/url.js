class Url {
  constructor(opts) {
    if (typeof opts === 'string') {
      const urlParts = decodeURI(opts).split('?');

      this.url = urlParts[0];
      this.query = urlParts[1].replace(/^\?/, '').split('&')
        .reduce((acc, query) => {
          const parts = query.split('=');
          acc[parts[0]] = parts[1];
          return acc;
        }, {});
    }
    else {
      this.url = opts.url;
      this.query = opts.query || {};
    }
  }

  toString() {
    return `${this.url}${this.queryString()}`;
  }

  queryString() {
    const result = Object.keys(this.query).map(k => `${k}=${this.query[k]}`);
    return `?${result.join('&')}`;
  }
}

export default Url;