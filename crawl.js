const {JSDOM} = require("jsdom");
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkTags = dom.window.document.querySelectorAll('a');
  
  for (const linkTag of linkTags) { 
    if (linkTag.href.slice(0, 1) == "/") {
      // relative
        try {
          const urlObj = new URL(`${baseURL}${linkTag.href}`);
          urls.push(urlObj.href)  
        } catch (err) {
          console.log(`Error with relative url accured by: ${err.message}`)
        }
      } else {
      // absolute
      try {
          const urlObj = new URL(linkTag.href);
          urls.push(urlObj.href)  
        } catch (err) {
          console.log(`Error with absolute url accured by: ${err.message}`)
        }
    }
  }

  return urls;
}

function normalizeURL(url) {
  const fullURL = new URL(url);
  const hostPath = `${fullURL.hostname}${fullURL.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) == "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {normalizeURL, getURLsFromHTML};
