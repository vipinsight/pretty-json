import { errorPage, jsonToHTML } from './jsonformatter';
import { safeStringEncodeNums } from './safe-encode-numbers';
import { installCollapseEventListeners } from './collapse';
import { isJSONContentType } from './content-type';

/**
 * This script runs on every page. If the browser rendered the document as raw
 * JSON (a lone <pre> tag), it replaces the page with the formatted viewer.
 */

function isJSONPage(): boolean {
  return isJSONContentType(document.contentType) || location.pathname.endsWith('.json');
}

function formatPage() {
  const pre = document.getElementsByTagName('pre')[0];
  if (!pre) {
    return;
  }

  const content = pre.innerText;
  let outputDoc = '';

  try {
    const jsonObj = JSON.parse(safeStringEncodeNums(content));
    outputDoc = jsonToHTML(jsonObj, document.URL);
  } catch (e) {
    outputDoc = errorPage(e, content, document.URL);
  }

  document.documentElement.innerHTML = outputDoc;
  installCollapseEventListeners();
}

if (isJSONPage()) {
  formatPage();
}
