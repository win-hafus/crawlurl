const {JSDOM} = require("jsdom");

async function crawlPage(currentURL) {
  console.log(`actively crawling ${currentURL}`);
  try {
    const resp = await fetch(currentURL);

    if(resp.status > 399){
      console.log(`Error in fetch with status code: ${resp.status} on page: ${currentURL}`);
      return
    }

    const contentType = resp.headers.get("content-type");
    if(!contentType.includes("text/html")) {
      console.log(`Error in HTML response, content type: ${contentType} on page: ${currentURL}`);
      return
    }
    
    console.log(await resp.text())
  } catch (err) {
    console.error(`Error in fetch: ${err.message}, on page ${currentURL}`)
  }
}

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

module.exports = {normalizeURL, getURLsFromHTML, crawlPage};
