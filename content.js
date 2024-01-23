// content.js
console.log("Content script loaded!");

// Listen for messages from the extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "parse") {
    // Your parsing logic goes here
    parseElementsWithClass().then(function (result) {
      // Send the sum, count, and parsed content back to the extension
      sendResponse(result);
    });

    // Indicate that the response will be asynchronous
    return true;
  }
});

// Function to parse elements with class "pvs-entity__caption-wrapper"
async function parseElementsWithClass() {
  return new Promise(function (resolve) {
    var elements = document.querySelectorAll(".pvs-entity__caption-wrapper");
    var sum = 0;
    var count = 0;

    // Iterate through the found elements and extract information
    elements.forEach(function (element) {
      // Extract text content inside the <span> element
      var spanContent = element.textContent.trim();

      // Extract the "X mos" part
      var regex = /\b(\d{1,2}) mos\b/g;
      var matches = regex.exec(spanContent);

      if (matches) {
        var months = parseInt(matches[1], 10);
        var years = months / 12;

        // Accumulate the converted value
        sum += years;

        // Increment the count
        count++;
      }
    });

    resolve({ sum: sum, count: count });
  });
}
