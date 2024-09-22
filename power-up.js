// This function will handle opening the form builder
function onCreateForm(t) {
  return t.popup({
    title: "Create Custom Form",
    url: './form-builder.html',  // This file contains the UI for form creation
    height: 500
  });
}

// This function will handle viewing and filling out the form
function onViewForm(t) {
  return t.get('card', 'shared', 'form')
    .then((form) => {
      if (form) {
        return t.popup({
          title: "View Form",
          url: './form-view.html',  // This file contains the UI for viewing/filling forms
          height: 500
        });
      } else {
        return t.popup({
          title: "No Form Available",
          url: './no-form.html',  // Optional: A file to show when no form is available
          height: 200
        });
      }
    });
}

// Handle card-back section display
function onShowCardBack(t) {
  return t.get('card', 'shared', 'form')
    .then((form) => {
      if (form) {
        return {
          title: "Custom Form",
          content: "Form: " + form.title,  // Show form title or other metadata
          icon: './icon.ico'
        };
      } else {
        return {
          title: "No Form",
          content: "No form attached to this card.",
          icon: './icon.ico'
        };
      }
    });
}

// Trello Power-Up initialization
TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
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
  },
  'card-back-section': function(t, options) {
    return onShowCardBack(t);
  }
});
