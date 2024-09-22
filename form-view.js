// Fetch the form data from Trello card
TrelloPowerUp.iframe().get('card', 'shared', 'form')
  .then((form) => {
    document.getElementById('form-title').innerText = form.title;

    const questionsContainer = document.getElementById('form-questions');

    form.questions.forEach((question, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question-item';

      const label = document.createElement('label');
      label.innerText = question.label;

      let input;
      if (question.type === 'text' || question.type === 'number') {
        input = document.createElement('input');
        input.type = question.type;
      }

      questionDiv.appendChild(label);
      questionDiv.appendChild(input);
      questionsContainer.appendChild(questionDiv);
    });
  });

document.getElementById('submit-form-btn').addEventListener('click', function() {
  // Collect form responses
  const responses = {};
  const inputs = document.querySelectorAll('#form-questions input');

  inputs.forEach((input, index) => {
    responses[`q${index + 1}`] = input.value;
  });

  // Save the responses to the Trello card
  TrelloPowerUp.iframe().set('card', 'shared', 'formResponses', responses)
    .then(() => {
      TrelloPowerUp.iframe().closePopup();
    });
});
