export {
  InvoiceGenerator as
  default
};

/**
 * @class Invoice Generator
 */
class InvoiceGenerator {

  /**
   * constructor methode
   */
  constructor() {
    this.currency = $('meta[data-lang="currency-sign"]').attr('content');
    this.events();
  }

  /**
   * set event handlers
   * pass >>this<< as data param to be able to reference class properties instead of event element
   */
  events() {
    let properties = {
      properties: this
    };
    $('#print').click(properties, this.print);
    $('#calc').click(properties, this.calcAndSet);
    $('#copyPos').click(properties, this.copyPos);
    $('#deletePos').click(properties, this.deletePos);
    $('#movePosUp').click(properties, this.movePosUp);
    $('#movePosDown').click(properties, this.movePosDown);
  }

  /**
   * get selected position
   * @return {integer}
   */
  getSelectedPosIndex() {
    return $('#selectPos').val() - 1;
  }

  /**
   * get selected position
   * @return {object}
   */
  getSelectedPos() {
    return $('tbody').children().eq(
      this.getSelectedPosIndex()
    );
  }

  /**
   * move selected position up
   * @param event {object}
   */
  movePosUp(event) {
    let thisProps, el, newPos;
    thisProps = event.data.properties;
    el = thisProps.getSelectedPos();
    el.swap('up');
    // NOTE: also change selected position value to new position
    newPos = Number($('#selectPos').val()) - 1;
    if (newPos >= 1 && newPos <= $('tbody').children().length) {
      $('#selectPos').val(newPos);
    }
    thisProps.calcAndSet(event);
  }

  /**
   * move selected position down
   * @param event {object}
   */
  movePosDown(event) {
    let thisProps, el, newPos;
    thisProps = event.data.properties;
    el = thisProps.getSelectedPos();
    el.swap('down');
    newPos = Number($('#selectPos').val()) + 1;
    if (newPos >= 1 && newPos <= $('tbody').children().length) {
      $('#selectPos').val(newPos);
    }
    thisProps.calcAndSet(event);
  }

  /**
   * remove selected invoice position
   * @param event {object}
   */
  copyPos(event) {
    let thisProps, el;
    thisProps = event.data.properties;
    el = thisProps.getSelectedPos();
    el.clone().appendTo('tbody');
    thisProps.calcAndSet(event);
  }

  /**
   * remove selected invoice position
   * @param event {object}
   */
  deletePos(event) {
    let thisProps, el;
    thisProps = event.data.properties;
    el = thisProps.getSelectedPos();
    // console.log(el);
    // console.log($('tbody').children().length);
    if ($('tbody').children().length > 1) {
      el.remove();
      thisProps.calcAndSet(event);
    }
  }

  /**
   * set calculated numbers
   * @param event {object}
   */
  calcAndSet(event) {
    let thisProps, total;
    thisProps = event.data.properties;
    total = 0;
    // set positions
    $('.item-position').each(function(index) {
      index++;
      $(this).val(index);
    });
    // calculate
    $('tbody tr').each(function() {
      let amount = Number($(this).find('.item-amount').val());
      let price = Number($(this).find('.item-price').val());
      let result = amount * price;
      // console.log(result);
      $(this).find('.item-price-sum').val(`${result} ${thisProps.currency}`);
      // increent total by result
      total = total + result;
    });
    $('#itemsTotalPrice').val(`${total} ${thisProps.currency}`);
  }

  /**
   * generate PDF
   * append paragraphs with textarea values to:
   * => display complete text
   * => hide textarea resize handler
   *
   * @param event {object}
   */
  print(event) {
    event.data.properties.calcAndSet(event);
    // go
    $('textarea').each(function() {
      let name, html, p;
      name = $(this).attr('data-lang');
      html = nl2br($(this).val());
      p = $(`[data-print-p='${name}']`);
      // console.log(p);
      // only create & append if doen't exist already
      if (!p.length) {
        p = $('<p></p>').attr({
          'data-print-p': name,
          'data-print': 'true',
        });
        $(this).after(p);
      }
      p.html(html); // insert/update p text
    });
    window.print();
  };

}
