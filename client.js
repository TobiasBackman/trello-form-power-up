// Function to open the popup for adding a question
function onCreateQuestion(t) {
  return t.popup({
    title: 'Add Custom Question',
    items: [
      {
        text: 'Enter Question Label',
        callback: function(t) {
          return t.popup({
            title: 'Enter Question Label',
            url: 'data:text/html,' + encodeURIComponent(`
              <html>
                <body>
                  <input type="text" id="questionLabel" placeholder="Enter your question label">
                  <button id="submitLabel">Submit</button>
                  <script>
                    document.getElementById('submitLabel').addEventListener('click', function() {
                      var label = document.getElementById('questionLabel').value;
                      window.TrelloPowerUp.iframe().set('card', 'shared', 'questionLabel', label).then(function() {
                        window.TrelloPowerUp.iframe().closePopup();
                      });
                    });
                  </script>
                </body>
              </html>`),
            height: 150
          });
        }
      },
      {
        text: 'Choose Question Type',
        callback: function(t) {
          return t.popup({
            title: 'Choose Question Type',
            items: [
              {
                text: 'Text',
                callback: function() {
                  return t.set('card', 'shared', 'questionType', 'text').then(() => t.closePopup());
                }
              },
              {
                text: 'Number',
                callback: function() {
                  return t.set('card', 'shared', 'questionType', 'number').then(() => t.closePopup());
                }
              }
            ]
          });
        }
      }
    ]
  });
}

// Initialize the Trello Power-Up
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

// Render questions on the card back section
function onShowQuestionsOnCard(t) {
  return t.get('card', 'shared', 'questions').then(function(questions) {
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

// Save a new question to the card
function saveQuestion(t, question) {
  return t.get('card', 'shared', 'questions').then((questions) => {
    questions = questions || [];
    questions.push(question);
    return t.set('card', 'shared', 'questions', questions).then(() => t.closePopup());
  });
}
