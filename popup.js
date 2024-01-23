// popup.js
document.addEventListener("DOMContentLoaded", function () {
  var parseButton = document.getElementById("parseButton");
  var resultContainer = document.getElementById("resultContainer");

  parseButton.addEventListener("click", function () {
    // Send a message to the background script to initiate parsing
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      
      // Send a message to the content script to initiate parsing
      chrome.tabs.sendMessage(activeTab.id, { action: "parse" }, function (response) {
        // Update the popup UI with the parsed content
        updatePopupUI(response.sum,response.count);
      });
    });
  });

  // Function to update the popup UI with parsed content
  function updatePopupUI(sum,count) {
    // Clear previous content
    resultContainer.innerHTML = "";

    var parsedContentElement = document.createElement("div");
      parsedContentElement.textContent = sum;
      resultContainer.appendChild(parsedContentElement);

    var countElement = document.createElement("div");
    countElement.textContent = count;
      resultContainer.appendChild(countElement);

  }
});
