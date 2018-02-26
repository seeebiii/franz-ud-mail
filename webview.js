const path = require('path');

module.exports = (Franz) => {

  // not used at the moment, because the badge does only updates after a page reload if you mark a mail as 'unread'
  const getMessageCountFromBadge = function() {
    let notificationBadge = document.querySelector('#io-ox-notifications-icon span.number');
    if (notificationBadge && notificationBadge.innerText) {
      return parseInt(notificationBadge.innerText);
    }
    throw new Error('Can not get number of unread messages from notification badge.');
  };

  const getMessageCountFromList = function() {
    let unreadElements = document.querySelectorAll('ul.list-view li.unread');
    if (unreadElements) {
      return unreadElements.length;
    } else {
      return 0;
    }
  };

  const getMessages = function getMessages() {
    Franz.setBadge(getMessageCountFromList());
  };

  // inject franz.css stylesheet
  Franz.injectCSS(path.join(__dirname, 'service.css'));

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
