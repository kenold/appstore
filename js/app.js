var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'data/appstore-data.json');
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    var data = JSON.parse(ourRequest.responseText);
    createHTML(data);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();

function createHTML(appsData) {
    var rawTemplate = document.getElementById("apps-template").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var ourGeneratedHTML = compiledTemplate(appsData);

    var appsContainer = document.getElementById("apps-container");
    appsContainer.innerHTML = ourGeneratedHTML;
}