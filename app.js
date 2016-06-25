// Wordnik API and URL
var URL = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=10&limit=2000&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"

// Global Variables
// Times array we will push times into
var times = [];
// A totalTime
var totalTime = 0;
// An average of the times
var avg = 0;

// A counter
var counter = 0;

// Click event -- when the search button is clicked...
$("#search").on('click', function(){

	// Get a start time
	var start = window.performance.now();
	console.time("Time for Request: ");

	// GET request to Wordnik API
	$.ajax({method: 'GET', url: URL})
	.done(function(response){
		counter++;
		console.log(response);
		// For the length of the response...
		for(var i=0; i<response.length; i++){
			// dump the word into the #wordDump div
			$('#wordDump').append('<div>');
			$('#wordDump').append('<span>'+response[i].word+'</span>');
			$('#wordDump').append('</div>');
		}
		// Get an end time for the request
		var end = window.performance.now();
		console.timeEnd("Time for Request: ");
		// Calculate the difference
		var time = end-start;
		console.log("Window Performance Time: " + time);
		// Push the time to an array
		times.push(time);

		// Loop through and add the totals
		for(var j=0; j<times.length; j++){
			totalTime += times[j];
		}
		// See all the individual times
		console.log("All the Times: " + times);
		// The total time
		console.log("Total Time: " + totalTime);
		// Calculate the average
		avg = totalTime / counter;
		console.log("Counter: " + counter);
		console.log("Average Request Time: " + avg);
		// Reset the totalTime
		totalTime = 0;
	})	
});
