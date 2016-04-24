import shoebox from './shoebox';

window.resolves = [];
window.resolves.next = () => {
  return Object.keys(window.resolves)
    .filter(it => it !== 'next')
    .reduce((acc, next) => acc > next ? acc : next, 0);
}

export default {
  appendCallback(resolveId, fnName) {
    const script = document.head.appendChild(document.createElement('script'));
    script.innerHTML = `
      function ${fnName}(data) {
        if (data.ok) {
          window.resolves[${resolveId}](data);
        }
        else {
          throw data.error;
        }
      }
    `;

    return script;
  },

  appendApiScript(src) {
    const script = document.head.appendChild(document.createElement('script'));
    script.src = src;
    console.log(script.src)
    return script;
  },

  get(opts) {
    const url = new shoebox.Url(opts);
    url.query.callback = "getData";
    url.url += ".js";

    function cleanUp(callbackScript, apiScript, resolveId) {
      return () => {
        callbackScript.remove();
        apiScript.remove();
        window.resolves.splice(resolveId, 1);
      }
    }

    let cleanUpFn;

    return new Promise((resolve, reject) => {
      const resolveId = window.resolves.next();
      window.resolves[window.resolves.next()] = resolve;

      const callbackScript = this.appendCallback(resolveId, "getData");
      const apiScript = this.appendApiScript(url.toString());
      cleanUpFn = cleanUp(callbackScript, apiScript, resolveId);
    }).then((data) => {
      cleanUp();
      return data;
    }, (err) => {
      cleanUp();
      throw err;
    });
  }
};