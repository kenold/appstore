$( document ).ready(function() {
	// display date
	var day = moment().format('dddd');
	var month = moment().format('MMMM');
	var dayNumber = moment().format('D');

	var longDate = day + ', ' + month + ' ' + dayNumber;
	$('.date-sub').first().html(longDate);
});

// get data
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

// helpers
Handlebars.registerHelper('ifEquals', function(a, b, options) {
  if (a === b) {
    return options.fn(this);
  }

  return options.inverse(this);
});