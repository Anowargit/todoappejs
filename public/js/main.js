document.addEventListener('DOMContentLoaded', function () {
  const addForm = document.getElementById('addForm');
  if (addForm) {
    addForm.addEventListener('submit', function (e) {
      const textInput = document.getElementById('text');
      if (!textInput || !textInput.value.trim()) {
        e.preventDefault();
        alert('Please enter a todo');
        if (textInput) textInput.focus();
      }
    });
  }
});