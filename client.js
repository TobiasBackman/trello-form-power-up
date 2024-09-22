// Function to open a popup for adding a custom question
function onCreateQuestion(t) {
  return t.popup({
    title: 'Enter Questionings Label',
    url: './question-label.html',
    height: 150
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
    return {
      title: 'Custom Questions',
      content: {
        type: 'iframe',
        url: './card-back-section.html',
        height: 300
      }
    };
  }
});
