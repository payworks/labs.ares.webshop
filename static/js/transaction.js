$(document).ready(function() {
  var progressBar = $('#transaction-progress-bar')
  var startLink = $('#transaction-start-link')

  var identifier = $('#transaction-identifier')
  var amount = $('#transaction-amount')
  var type = $('#transaction-type')
  var status = $('#transaction-status')

  updateProgressBarAndStartLink(status.text(), false);

  startLink.click(function() {
    updateProgressBarAndStartLink(status.text(), true);
  });

  if (identifier.length > 0) {
    setUpSocket();
  }

  function setUpSocket() {
    var socket = io();
    socket.emit('listen', identifier.text());

    socket.on('transaction.update', function(data) {
      console.log('got a tx update: ' + data)
      if (!!data.transaction.status) {
        identifier.text(data.transaction.identifier)
        amount.text(data.transaction.amount)
        type.text(data.transaction.type)

        status.text(data.transaction.status)
        status.removeClass()
        status.addClass(data.transaction.status)

        updateProgressBarAndStartLink(data.transaction.status, false);

        if (data.transaction.status == 'APPROVED' || data.transaction.status == 'DECLINED' || data.transaction.status == 'ABORTED' || data.transaction.status == 'ERROR') {
          new Client.LocalStorage().setLastTransactionIdentifier(data.transaction.identifier)
        }
      }
    });
  }

  function updateProgressBarAndStartLink(status, justStarted) {
    if (justStarted) {
      progressBar.show();
      startLink.hide();
    } else {
      switch (status) {
        case 'INITIALIZED':
          progressBar.hide();
          startLink.show();
          break;
        case 'PENDING':
          progressBar.show();
          startLink.hide();
          break;
        case 'APPROVED':
        case 'DECLINED':
        case 'ABORTED':
        case 'ERROR':
          progressBar.hide();
          startLink.hide();
          break;
      }
    }
  }
});
