export default function(cb) {
  let doingCB;
  function done(it) {
    doingCB = false;
    return it;
  }
  window.addEventListener('scroll', (e) => {
    if (!doingCB && window.scrollY + window.innerHeight >= document.body.clientHeight - 100) {
      doingCB = true;
      new Promise((resolve, reject) => resolve(cb())).then(done).catch((err) => {
        done();
        throw(err);
      });
    }
  })
};