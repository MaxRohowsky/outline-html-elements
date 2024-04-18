chrome.storage.local.get(['keyBinding', 'outlineStyle', 'elements', 'elementColors'], function (result) {
      var keyBinding = result.keyBinding || 'b';
      var outlineStyle = result.outlineStyle || 'dashed';
      var elements = result.elements || ['div', 'p'];
      var elementColors = result.elementColors || {}; // Retrieve the element colors
    
      var elementsWithBorder = [];
      var elementColorddd = {
            'DIV': 'blue',
            'P': 'green',
            'H1': 'red',
            'H2': 'orange',
            'H3': 'purple',
            'H4': 'brown',
            'H5': 'pink',
            'H6': 'grey',
            'SPAN': 'cyan',
            'A': 'magenta',
            'IMG': 'yellow',
            'BUTTON': 'black'
      };
    
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
                              element.style.outline = '1px ' + outlineStyle + ' ' + color;
    
                              // Add the element to the array of elements with an outline
                              elementsWithBorder.push(element);
                        });
                  });
            }
      });
    
      document.addEventListener('keyup', function (event) {
            // Check if the key combination Ctrl + keyBinding was released
            if (event.key === keyBinding) {
                  // Loop through the elements that had an outline added
                  elementsWithBorder.forEach(function (element) {
                        // Remove the outline from the element
                        element.style.outline = '';
                  });
    
                  // Clear the array of elements with an outline
                  elementsWithBorder = [];
            }
      });
    
      chrome.storage.onChanged.addListener(function(changes, namespace) {
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
          }
        }
      });
    });