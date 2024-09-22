// Function to open a popup for adding a custom question
function onCreateQuestion(t) {
  return t.prompt('Enter Question Label', 'e.g., What is your favorite color?')
    .then(function(label) {
      // Store the label and then ask for the type
      return t.set('card', 'shared', 'questionLabel', label).then(function() {
        return onChooseQuestionType(t);
      });
    });
}

// Function to choose the question type (Text, Number, etc.)
function onChooseQuestionType(t) {
  return t.popup({
    title: 'Choose Question Type',
    items: [
      {
        text: 'Text',
        callback: function(t) {
          return t.set('card', 'shared', 'questionType', 'text').then(() => t.closePopup());
        }
      },
      {
        text: 'Number',
        callback: function(t) {
          return t.set('card', 'shared', 'questionType', 'number').then(() => t.closePopup());
        }
      }
    ]
  });
}

// Initialize Trello Power-Up
TrelloPowerUp.initialize({
  'card-buttons': function(t) {
    return [
      {
        text: 'Add Question',
        callback: onCreateQuestion
      }
    ];
  },
  'card-back-section': function(t) {
    return onShowQuestionsOnCard(t);
  }
});

// Function to show questions on the card back section
function onShowQuestionsOnCard(t) {
  return t.get('card', 'shared', 'questionLabel').then(function(label) {
    return t.get('card', 'shared', 'questionType').then(function(type) {
      if (label && type) {
        const questionHtml = `<div class="question-item">
                                <label>${label}</label>
                                <input type="${type}" />
                              </div>`;
        return {
          title: 'Custom Questions',
          content: {
            type: 'iframe',
            url: 'data:text/html,' + encodeURIComponent(`
              <html>
              <body>
                ${questionHtml}
              </body>
              </html>`),
            height: 300
          }
        };
      } else {
        return {
          title: 'Custom Questions',
          content: 'No questions added yet.'
        };
      }
    });
  });
}
