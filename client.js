// client.js
window.TrelloPowerUp.initialize({
  'card-buttons': function (t, opts) {
    return [{
      text: 'Submit Form', // Your button text
      callback: function (t) {
        return t.popup({
          title: 'Custom Form',
          url: 'https://tobiasbackman.github.io/trello-form-power-up/form.html', // Your hosted URL
          height: 250
        });
      }
    }];
  },

  // Add card detail badges to display questions and answers
  'card-detail-badges': function (t, opts) {
    return t.get('card', 'shared', 'questions_answers')
      .then(function(data) {
        if (data && data.questions && data.answers) {
          // If questions and answers are set, display them
          return [{
            title: 'Q&A', // Section title
            text: `Q: ${data.questions} - A: ${data.answers}`, // Display Q&A
            color: 'blue'
          }];
        } else {
          // No data available
          return [{
            title: 'Q&A',
            text: 'No questions and answers available yet.',
            color: 'red'
          }];
        }
      });
  },

  // Add card back section to allow modifying questions and answers
  'card-back-section': function (t, opts) {
    return [{
      title: 'Custom Questions',
      icon: "https://raw.githubusercontent.com/TobiasBackman/trello-form-power-up/refs/heads/master/icon.ico",
      content: {
        type: 'iframe',
        url: t.signUrl('https://tobiasbackman.github.io/trello-form-power-up/form.html'),
        height: 230
      }
    }];
  }
});
