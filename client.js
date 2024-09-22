// Function to open form builder
function onCreateForm(t) {
  return t.popup({
    title: 'Create Custom Form',
    url: './form.html',  // Reuse form.html for form creation
    height: 500
  });
}

// Function to view and fill out the form
function onViewForm(t) {
  return t.get('card', 'shared', 'form').then((form) => {
    if (form) {
      return t.popup({
        title: 'View Form',
        url: './form.html',  // Reuse form.html to display the form
        height: 500
      });
    } else {
      return t.popup({
        title: 'No Form Available',
        url: './no-form.html',  // Optional: Handle cases where no form exists
        height: 200
      });
    }
  });
}

// Initialize the Trello Power-Up
TrelloPowerUp.initialize({
  'card-buttons': function(t) {
    return [
      {
        text: 'Create Form',
        callback: onCreateForm
      },
      {
        text: 'View Form',
        callback: onViewForm
      }
    ];
  }
});

// Detect if form exists, either build new or show existing
TrelloPowerUp.iframe().get('card', 'shared', 'form').then(function(form) {
  const formTitleElement = document.getElementById('form-title');
  const addQuestionButton = document.getElementById('add-question-btn');
  const saveFormButton = document.getElementById('save-form-btn');
  const submitFormButton = document.getElementById('submit-form-btn');

  if (form) {
    // Viewing existing form
    formTitleElement.textContent = form.title;
    submitFormButton.style.display = 'block';  // Show submit button for existing form
    renderQuestions(form.questions);  // Function to render existing form questions
  } else {
    // Building new form
    formTitleElement.textContent = 'Create a New Form';
    addQuestionButton.style.display = 'block';  // Show "Add Question" button
    saveFormButton.style.display = 'block';  // Show "Save Form" button
    addQuestionButton.addEventListener('click', addQuestion);  // Add question creation logic
    saveFormButton.addEventListener('click', saveForm);  // Add save form logic
  }
});

// Function to dynamically add new questions (for form creation)
function addQuestion() {
  const questionsContainer = document.getElementById('questions-container');
  const questionDiv = document.createElement('div');
  questionDiv.className = 'question-item';

  const labelInput = document.createElement('input');
  labelInput.type = 'text';
  labelInput.placeholder = 'Question Label';

  const typeSelect = document.createElement('select');
  typeSelect.innerHTML = `
    <option value="text">Text</option>
    <option value="number">Number</option>
    <option value="dropdown">Dropdown</option>
  `;

  const visibilitySelect = document.createElement('select');
  visibilitySelect.innerHTML = `
    <option value="always">Always Visible</option>
    <option value="optional">Optional (Manually Added)</option>
    <option value="list">Add when card is moved to a specific list</option>
  `;

  questionDiv.appendChild(labelInput);
  questionDiv.appendChild(typeSelect);
  questionDiv.appendChild(visibilitySelect);
  questionsContainer.appendChild(questionDiv);
}

// Function to save the new form with visibility rules
function saveForm() {
  const formTitle = document.getElementById('form-title').textContent;
  const questions = document.querySelectorAll('.question-item');
  const form = {
    title: formTitle,
    questions: []
  };

  questions.forEach((questionDiv) => {
    const label = questionDiv.querySelector('input').value;
    const type = questionDiv.querySelector('select').value;
    const visibility = questionDiv.querySelectorAll('select')[1].value;
    form.questions.push({ label, type, visibility });
  });

  TrelloPowerUp.iframe().set('card', 'shared', 'form', form).then(() => {
    TrelloPowerUp.iframe().closePopup();
  });
}

// Function to render existing form questions for viewing
function renderQuestions(questions) {
  const questionsContainer = document.getElementById('questions-container');
  questions.forEach((question) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';

    const label = document.createElement('label');
    label.textContent = question.label;

    let input;
    if (question.type === 'text' || question.type === 'number') {
      input = document.createElement('input');
      input.type = question.type;
    }

    questionDiv.appendChild(label);
    questionDiv.appendChild(input);
    questionsContainer.appendChild(questionDiv);
  });
}

// List-based visibility logic
TrelloPowerUp.iframe().get('card', 'shared', 'form').then(function(form) {
  t.get('card', 'shared', 'list').then(function(cardList) {
    form.questions.forEach(function(question) {
      if (question.visibility === 'list' && cardList.name === 'Specific List Name') {
        // Add question to the form if it should be triggered by list
        renderQuestions([question]);
      }
    });
  });
});
