$(document).ready(function() {
  var lastTransaction = $('#last-transaction');

  if (new Client.LocalStorage().isAvailable()) {
    var lastIdentifier = new Client.LocalStorage().getLastTransactionIdentifier();
    if (!lastIdentifier) {
      lastTransaction.hide();
    } else {
      lastTransaction.prop('href', '/transactions/'+lastIdentifier);
    }
  } else {
    lastTransaction.hide();
  }
});
