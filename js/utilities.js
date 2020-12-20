/**
 * https://stackoverflow.com/a/2919363/13765033
 * @param str {str}
 * @param is_xhtml {bool}
 */
function nl2br(str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

/**
 * https://stackoverflow.com/a/563442/13765033
 */
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * https://stackoverflow.com/a/63809848/13765033
 */
jQuery.fn.swap = function(newIndex) {
  if (!Number.isInteger(newIndex) && !['up', 'down'].includes(newIndex)) {
    throw new Error('Incorrect index format! Allowed formats are: "up", "down" or an index of the sibling to swap with');
  }
  if (Number.isInteger(newIndex)) {
    this.insertBefore(this.siblings()[newIndex]);
  } else {
    if (newIndex === 'up') {
      this.insertBefore($(this.siblings()[this.index() - 1]));
    } else {
      this.insertAfter($(this.siblings()[this.index()]));
    }
  }
}
