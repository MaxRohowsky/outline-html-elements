// Default colors object
var defaultColors = {
  div: '#000000', // black
  p: '#000000', // black
  // Add more elements and their default colors here
};



// Function to load the options
function loadOptions() {
  chrome.storage.local.get(['keyBinding', 'outlineStyle', 'elements', 'elementColors'], function(result) {
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
    if (result.elementColors) { // Check if elementColors is available
      for (var element in result.elementColors) { // Loop through each element in elementColors
        var color = result.elementColors[element]; // Get the color for the element
        $('#' + element + 'Color').val(color); // Set the color picker value for the element
      }
    }
  });
}

// Call loadOptions when the popup is opened
$(document).ready(loadOptions);

// Get the input elements
var keyBindingInput = $('#key-binding');
var outlineStyleInput = $('#outline-style');
var checkboxInputs = $('input[type=checkbox]');
var colorInputs = $('input[type=color]');

// Function to save the options
function saveOptions() {
  var keyBinding = keyBindingInput.val();
  var outlineStyle = outlineStyleInput.val();
  var elements = checkboxInputs.filter(':checked').map(function() { return this.id; }).get();
  var elementColors = {}; // New object to store element colors

  // Loop through each checkbox and save its corresponding color
  checkboxInputs.each(function() {
    var element = this.id;
    var color = $('#' + element + 'Color').val();
    elementColors[element] = color;
  });

  console.log(checkboxInputs);

  // Save the options to local storage
  console.log('Saving element colors:', elementColors);
  chrome.storage.local.set({
    keyBinding: keyBinding,
    outlineStyle: outlineStyle,
    elements: elements,
    elementColors: elementColors // Save the element colors
  });
}

// Add event listeners to the input elements
keyBindingInput.on('change', saveOptions);
outlineStyleInput.on('change', saveOptions);
checkboxInputs.on('change', saveOptions);
colorInputs.on('change', saveOptions);