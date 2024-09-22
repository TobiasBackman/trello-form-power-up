// client.js

// Load Trello's Power-Up framework
var t = window.TrelloPowerUp.iframe();

// Trello Power-Up Initialization
window.TrelloPowerUp.initialize({
  // Define the card button capability
  'card-buttons': function (t, opts) {
    return [{
      // Button text displayed on the card
      text: 'Open Form',

      // Function to handle the button click
      callback: function (t) {
        // Open a popup to display a form or message
        return t.popup({
          title: 'Fill the form',
          url: './form.html',  // Reference to your form HTML file
          height: 250  // Define the height of the popup
        });
      }
    }];
  },

  // You can add more capabilities here, such as board buttons, card badges, etc.
});
