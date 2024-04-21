$(document).ready(function () {
  
  const container = $('#elementsContainer');
  const elements = [
    { id: 'div', color: '#FF6633' },
    { id: 'p', color: '#FFB399' },
    { id: 'span', color: '#FF33FF' },
    { id: 'a', color: '#FFFF99' },
    { id: 'img', color: '#00B3E6' },
    { id: 'button', color: '#E6B333' },
    { id: 'h1', color: '#3366E6' },
    { id: 'h2', color: '#999966' },
    { id: 'h3', color: '#99FF99' },
    { id: 'h4', color: '#B34D4D' },
    { id: 'h5', color: '#80B300' },
    { id: 'h6', color: '#809900' },
    { id: 'form', color: '#E6B3B3' },
    { id: 'ul', color: '#6680B3' },
    { id: 'ol', color: '#66991A' },
    { id: 'li', color: '#FF99E6' },
    { id: 'table', color: '#CCFF1A' },
    { id: 'tr', color: '#FF1A66' },
    { id: 'th', color: '#E6331A' },
    { id: 'td', color: '#33FFCC' },
    { id: 'input', color: '#66994D' },
    { id: 'iframe', color: '#B366CC' },
    { id: 'label', color: '#4D8000' },
    { id: 'b', color: '#B33300' },
    { id: 'i', color: '#CC80CC' },
    { id: 'u', color: '#66664D' },
    { id: 'nav', color: '#991AFF' },
    { id: 'section', color: '#E666FF' },
    { id: 'article', color: '#4DB3FF' },
    { id: 'header', color: '#1AB399' },
    { id: 'footer', color: '#E666B3' },
    { id: 's', color: '#33991A' },
    { id: 'sup', color: '#CC9999' },
    { id: 'sub', color: '#66E64D' },
    { id: 'strong', color: '#4D80CC' },
    { id: 'em', color: '#9900B3' },
    { id: 'q', color: '#E64D66' },
    { id: 'blockquote', color: '#4DB380' },
    { id: 'select', color: '#FF4D4D' },
    { id: 'link', color: '#99E6E6' },
  ];




  elements.forEach(element => {

    container.append(`
    <div class="webframe-element-container">
    <input type="checkbox" id="${element.id}" class="webframe-element-container-checkbox" name="${element.id}" ${element.checked ? 'checked' : ''}>
    <label for="${element.id}">${element.id.toUpperCase()} </label>
    <input type="color" id="${element.id}Color" class="webframe-element-container-color" value="${element.color}">
  </div>
    `);
  });




  // Function to load the options
  function loadOptions() {
    chrome.storage.local.get(['keyBinding', 'outlineStyle', 'outlineModeSelect', 'elements', 'elementColors', 'outlineWidth'], function (result) {
      if (result.keyBinding) {
        $('#webframe-options-keybind-keys-input').val(result.keyBinding);
      }
      if (result.outlineStyle) {
        $('#webframe-outline-style-select').val(result.outlineStyle);
      }
      if (result.outlineModeSelect) {
        $('#webframe-outline-mode-select').val(result.outlineModeSelect);
      }
      if (result.elements) {
        result.elements.forEach(function (element) {
          $('#' + element).prop('checked', true);
        });
      }
      if (result.elementColors) { // Check if elementColors is available
        for (var element in result.elementColors) { // Loop through each element in elementColors
          var color = result.elementColors[element]; // Get the color for the element
          $('#' + element + 'Color').val(color); // Set the color picker value for the element
        }
      }
      if (result.outlineWidth) {
        $('#webframe-outline-width-field').val(result.outlineWidth);
      }
    });
  }

  // Call loadOptions when the popup is opened
  $(document).ready(loadOptions);

  // Get the input elements
  var keyBindingInput = $('#webframe-options-keybind-keys-input');
  var outlineStyleInput = $('#webframe-outline-style-select');
  var checkboxInputs = $('.webframe-element-container-checkbox');
  var colorInputs = $('.webframe-element-container-color');
  var outlineWidthInput = $('#webframe-outline-width-field');
  var outlineModeSelect = $('#webframe-outline-mode-select');
  var selectAllButton = $('#webframe-elements-selectAll');
  var unselectAllButton = $('#webframe-elements-unselectAll');

  // Function to save the options
  function saveOptions() {
    var keyBinding = keyBindingInput.val();
    var outlineStyle = outlineStyleInput.val();
    var elements = checkboxInputs.filter(':checked').map(function () { return this.id; }).get();
    var elementColors = {}; // New object to store element colors
    var outlineWidth = outlineWidthInput.val();
    var outlineMode = outlineModeSelect.val();


    // Loop through each checkbox and save its corresponding color
    checkboxInputs.each(function () {
      var element = this.id;
      var color = $('#' + element + 'Color').val();
      elementColors[element] = color;
    });


    // Save the options to local storage
    chrome.storage.local.set({
      keyBinding: keyBinding,
      outlineStyle: outlineStyle,
      outlineModeSelect: outlineMode,
      elements: elements,
      elementColors: elementColors, // Save the element colors
      outlineWidth: outlineWidth
    });
  }

  // Add event listeners to the input elements
  keyBindingInput.on('change', saveOptions);
  outlineStyleInput.on('change', saveOptions);
  outlineModeSelect.on('change', saveOptions);
  checkboxInputs.on('change', saveOptions);
  colorInputs.on('change', saveOptions);
  outlineWidthInput.on('change', saveOptions);
  selectAllButton.on('click', function () {
    checkboxInputs.prop('checked', true);
    saveOptions(); // Save options after selecting all checkboxes
  });
  unselectAllButton.on('click', function () {
    checkboxInputs.prop('checked', false);
    saveOptions(); // Save options after unselecting all checkboxes
  });
});



