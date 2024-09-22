// Function to open the popup for adding a question
function onCreateQuestion(t) {
  return t.popup({
    title: 'Add Custom Question',
    url: './add-question-popup', // We can render a popup without a separate HTML file
    height: 250
  });
}

// Popup content for adding a new question, defined inline
function addQuestionPopup(t) {
  return t.popup({
    title: 'Add Custom Question',
    items: function (t, options) {
      return [
        {
          text: 'Question Label:',
          callback: function (t) {
            return t.text({
              defaultValue: '',
              title: 'Enter Question Label',
              hint: 'e.g., What is your name?'
            }).then((label) => {
              return t.set('card', 'shared', 'questionLabel', label).then(() => t.closePopup());
            });
          }
        },
        {
          text: 'Question Type:',
          callback: function (t) {
            return t.popup({
              items: function () {
                return [
                  { text: 'Text', callback: () => t.set('card', 'shared', 'questionType', 'text') },
                  { text: 'Number', callback: () => t.set('card', 'shared', 'questionType', 'number') },
                  { text: 'Dropdown', callback: () => t.set('card', 'shared', 'questionType', 'dropdown') }
                ];
              }
            });
          }
        }
      ];
    }
  });
}

// Initialize Trello Power-Up
TrelloPowerUp.initialize({
  'card-buttons': function (t) {
    return [
      {
        text: 'Add Question',
        callback: onCreateQuestion
      }
    ];
  },
  'card-back-section': function (t) {
    return onShowQuestionsOnCard(t);
  }
});

// Show questions on the card back section
function onShowQuestionsOnCard(t) {
  return t.get('card', 'shared', 'questions').then(function (questions) {
    if (questions && questions.length > 0) {
      const questionHtml = questions.map((q) => {
        return `<div class="question-item">
                  <label>${q.label}</label>
                  <input type="${q.type}" />
                </div>`;
      }).join('');
      return {
        title: 'Custom Questions',
        content: {
          type: 'iframe',
          url: 'data:text/html,' + encodeURIComponent(`
            <html>
              <body>${questionHtml}</body>
            </html>
          `),
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
}

// Save new question to the card
function saveQuestion(t, question) {
  return t.get('card', 'shared', 'questions').then((questions) => {
    questions = questions || [];
    questions.push(question);
    return t.set('card', 'shared', 'questions', questions).then(() => t.closePopup());
  });
}
