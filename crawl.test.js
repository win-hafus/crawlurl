const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require('@jest/globals');

test('normalizeURL by a host', () => {
  const input = 'https://google.com/';
  const actual = normalizeURL(input);
  const expected = 'google.com';
  expect(actual).toEqual(expected);
});

test('normalizeURL by a path symbol', () => {
  const input = 'https://google.com';
  const actual = normalizeURL(input);
  const expected = 'google.com';
  expect(actual).toEqual(expected);
});

test('normalizeURL by a capitals', () => {
  const input = 'https://GOOGLE.com';
  const actual = normalizeURL(input);
  const expected = 'google.com';
  expect(actual).toEqual(expected);
});

test('normalizeURL by a http', () => {
  const input = 'http://google.com';
  const actual = normalizeURL(input);
  const expected = 'google.com';
  expect(actual).toEqual(expected);
});
test('getURLsFromHTML absolute', () => {
  const inputHTMLBody = `
  <hmtl>
    <body>
      <a href="https://google.com/">
        Google
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://google.com/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://google.com/"];
  expect(actual).toEqual(expected);
});
test('getURLsFromHTML relative', () => {
  const inputHTMLBody = `
  <hmtl>
    <body>
      <a href="/path/">
        Google
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://google.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://google.com/path/"];
  expect(actual).toEqual(expected);
});
test('getURLsFromHTML multiple', () => {
  const inputHTMLBody = `
  <hmtl>
    <body>
      <a href="https://google.com/root/">
        Google
      </a>
      <a href="https://google.com/path/">
        Yandex
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://google.com/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://google.com/root/", "https://google.com/path/"];
  expect(actual).toEqual(expected);
});
test('getURLsFromHTML invalid', () => {
  const inputHTMLBody = `
  <hmtl>
    <body>
      <a href="invalid">
        Invalid URL
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://google.com/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
