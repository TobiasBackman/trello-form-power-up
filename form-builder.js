// Initialize empty form structure
let form = {
  title: '',
  questions: []
};

document.getElementById('add-question-btn').addEventListener('click', function() {
  addQuestion();
});

document.getElementById('save-form-btn').addEventListener('click', function() {
  saveForm();
});

// Function to add a new question to the form
function addQuestion() {
  const questionsContainer = document.getElementById('questions-container');

  const questionDiv = document.createElement('div');
  questionDiv.className = 'question-item';

  // Create question type dropdown
  const questionTypeSelect = document.createElement('select');
  questionTypeSelect.innerHTML = `
    <option value="text">Text</option>
    <option value="number">Number</option>
    <option value="dropdown">Dropdown</option>
    <option value="checkbox">Checkbox</option>
    <option value="date">Date</option>
  `;

  // Add label input
  const labelInput = document.createElement('input');
  labelInput.type = 'text';
  labelInput.placeholder = 'Question Label';

  questionDiv.appendChild(questionTypeSelect);
  questionDiv.appendChild(labelInput);

  questionsContainer.appendChild(questionDiv);

  // Push the new question structure to the form object
  form.questions.push({
    type: questionTypeSelect.value,
    label: labelInput.value
  });
}

// Save the form and store it in the Trello card
function saveForm() {
  const formTitle = document.getElementById('form-title').value;

  form.title = formTitle;

  TrelloPowerUp.iframe().set('card', 'shared', 'form', form)
    .then(() => {
      TrelloPowerUp.iframe().closePopup();
    });
}
