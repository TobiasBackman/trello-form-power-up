window.TrelloPowerUp.initialize({
  'card-buttons': function (t, opts) {
    return [{
      text: 'Submit Form', // Your button text
      callback: function (t) {
        return t.popup({
          title: 'Custom Form',
          url: 'https://tobiasbackman.github.io/trello-form-power-up/form.html', // Use your hosted URL
          height: 250
        });
      }
    }];
  }
});
