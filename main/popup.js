// Function to load the options
function loadOptions() {
  chrome.storage.local.get(['keyBinding', 'outlineStyle', 'elements'], function(result) {
    if (result.keyBinding) {
      $('#key-binding').val(result.keyBinding);
    }
    if (result.outlineStyle) {
      $('#outline-style').val(result.outlineStyle);
    }
    if (result.elements) {
      result.elements.forEach(function(element) {
        $('#' + element).prop('checked', true);
      });
    }
  });
}

// Call loadOptions when the popup is opened
$(document).ready(loadOptions);

// Get the input elements
var keyBindingInput = $('#key-binding');
var outlineStyleInput = $('#outline-style');
var checkboxInputs = $('input[type=checkbox]');

// Function to save the options
function saveOptions() {
  var keyBinding = keyBindingInput.val();
  var outlineStyle = outlineStyleInput.val();
  var elements = checkboxInputs.filter(':checked').map(function() { return this.id; }).get();

  // Save the options to local storage
  chrome.storage.local.set({
    keyBinding: keyBinding,
    outlineStyle: outlineStyle,
    elements: elements
  });
}

// Add event listeners to the input elements
keyBindingInput.on('change', saveOptions);
outlineStyleInput.on('change', saveOptions);
checkboxInputs.on('change', saveOptions);