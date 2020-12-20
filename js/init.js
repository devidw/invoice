import * as lang from './lang.js';
import InvoiceGenerator from './InvoiceGenerator.class.js';

$(function() {
  /**
   * set date inputs to today
   * slice ISO date string to YYYY-mm-dd
   */
  $('input[type="date"]').each(function() {
    $(this).val(new Date().toISOString().slice(0, 10));
  });
  $('#dueDate').val(new Date().addDays(30).toISOString().slice(0, 10));
  $('#invoiceNumber').val(Date.now());

  let generator = new InvoiceGenerator();
  // console.log(generator);
});
