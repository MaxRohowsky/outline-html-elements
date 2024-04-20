chrome.storage.local.get(['keyBinding', 'outlineStyle', 'elements', 'elementColors', 'outlineWidth'], function (result) {
      var keyBinding = result.keyBinding || 'b';
      var outlineStyle = result.outlineStyle || 'dashed';
      var elements = result.elements;
      var elementColors = result.elementColors || {}; // Retrieve the element colors
      var outlineWidth = result.outlineWidth || '1px';
      var elementsWithOutline = [];
      console.log(elements);

      document.addEventListener('keydown', function (event) {
            // Check if the key combination Ctrl + keyBinding was pressed
            if (event.ctrlKey && event.key === keyBinding) {
                  // Loop through all unique element types

                  elements.forEach(function (elementType) {
                        // If a color for this element type does not exist, use black as default
                        var color = elementColors[elementType] || 'black';

                        // Get all elements of this type
                        var elementsOfType = document.getElementsByTagName(elementType);
                        // Loop through all elements of this type
                        Array.from(elementsOfType).forEach(function (element) {
                              // Draw an outline around the element with the color
                              element.style.outline = outlineWidth + 'px ' + outlineStyle + ' ' + color;

                              // Add the element to the array of elements with an outline
                              elementsWithOutline.push(element);
                        });
                  });
            }
      });

      document.addEventListener('keyup', function (event) {
            // Check if the key combination Ctrl + keyBinding was released
            if (event.key === keyBinding) {
                  // Loop through the elements that had an outline added
                  elementsWithOutline.forEach(function (element) {
                        // Remove the outline from the element
                        element.style.outline = '';
                  });

                  // Clear the array of elements with an outline
                  elementsWithOutline = [];
            }
      });

      chrome.storage.onChanged.addListener(function (changes, namespace) {
            for (var key in changes) {
                  var storageChange = changes[key];
                  if (key === 'keyBinding') {
                        keyBinding = storageChange.newValue;
                  } else if (key === 'outlineStyle') {
                        outlineStyle = storageChange.newValue;
                  } else if (key === 'elements') {
                        elements = storageChange.newValue;
                  } else if (key === 'elementColors') { // Update elementColors when it changes
                        elementColors = storageChange.newValue;
                  } else if (key === 'outlineWidth') { // Add this line
                        outlineWidth = storageChange.newValue; // Add 'px' to the new value
                  }
            }
      });
});