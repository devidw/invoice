import lang from '../languages/lang_en.js';
// import lang from '../languages/lang_de.js';
import prefill from '../languages/prefill.js';

let textPlaceholderAttributes = {
  'meta': 'content',
  'h1': 'textContent',
  'th': 'textContent',
  'label': 'textContent',
  'input': 'placeholder',
  'textarea': 'placeholder',
};

let textValueAttributes = {
  'input': 'value',
  'textarea': 'innerHTML',
};

/**
 * set language translations
 * @param texts {object}
 * @param attributes {object}
 */
function setAndFillTexts(texts, attributes) {
  for (let name in texts) {
    // console.log(name, texts[name]);
    let text, elements, textAttr;
    text = texts[name];
    elements = document.querySelectorAll(`[data-lang='${name}']`);

    elements.forEach((el) => {
      // console.log(name, text, element);
      textAttr = attributes[el.tagName.toLowerCase()];
      // console.log(object.attribute, object.translation);
      el[textAttr] = text;
    });
  }
}

setAndFillTexts(lang, textPlaceholderAttributes);
setAndFillTexts(prefill, textValueAttributes);
