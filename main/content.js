chrome.storage.local.get(['keyBinding', 'outlineStyle', 'outlineModeSelect', 'elements', 'elementColors', 'outlineWidth'], function (result) {
      var keyBinding = result.keyBinding;
      var outlineStyle = result.outlineStyle;
      var outlineModeSelect = result.outlineModeSelect;
      var elements = result.elements;
      var elementColors = result.elementColors || {}; // Retrieve the element colors
      var outlineWidth = result.outlineWidth;
      var elementsWithOutline = [];
      var isOutlineActive = true;


      document.addEventListener('keydown', function (event) {
            // Check if the key combination Ctrl + keyBinding was pressed
            if (event.ctrlKey && event.key === keyBinding) {

                  if (outlineModeSelect === 'persist') {
                        isOutlineActive = !isOutlineActive;
                  } else {
                        isOutlineActive = true;
                  }

                  if (isOutlineActive) {

                        elements.forEach(function (elementType) {
                              var color = elementColors[elementType];

                              // Get all elements of this type
                              var elementsOfType = document.getElementsByTagName(elementType);

                               // Loop through all elements of this type
                              Array.from(elementsOfType).forEach(function (element) {

                                    element.style.outline = outlineWidth + 'px ' + outlineStyle + ' ' + color;
           
                                    // Add the element to the array of elements with an outline
                                    elementsWithOutline.push(element);
                              });
                        });
                  } else {
                        elementsWithOutline.forEach(function (element) {
                              element.style.outline = '';
                        });
                        elementsWithOutline = [];
                  }
            }
      });

      document.addEventListener('keyup', function (event) {
            if (event.key === keyBinding && outlineModeSelect !== 'persist') {
                  elementsWithOutline.forEach(function (element) {
                        element.style.outline = '';
                  });
                  elementsWithOutline = [];
                  isOutlineActive = false;
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
                  } else if (key === 'elementColors') {
                        elementColors = storageChange.newValue;
                  } else if (key === 'outlineWidth') {
                        outlineWidth = storageChange.newValue;
                  } else if (key === 'outlineModeSelect') {
                        outlineModeSelect = storageChange.newValue;
                  }
            }
      });
});