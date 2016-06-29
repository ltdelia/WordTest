// Wordnik API and URL
var URL = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=10&limit=1000&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"

// Global Variables

// --------------------------------------------------------------------------
// TIMING
// Times array we will push times into
var times = [];
// A totalTime
var totalTime = 0;
// An average of the times
var avg = 0;

// A counter
var counter = 0;
// --------------------------------------------------------------------------

var words = [];

// Click event -- when the search button is clicked...
$("#search").on('click', function(){

	// GET request to Wordnik API
	$.ajax({method: 'GET', url: URL})
	.done(function(response){
		counter++;
		// console.log(response);
		// For the length of the response...

		// Get a start time
		var start = window.performance.now();

		for(var i=0; i<response.length; i++){
			// if the word begins with a capital letter...
			if(response[i].word[0] >='A' && response[i].word[0]<='Z'){
				// don't do anything
			}else{
				// push the remaining words to an array
				words.push(response[i].word);				
			}
		}
		console.log("Number of words in initial call: " + response.length);
		console.log("Number of words in our array: " + words.length);
		
		// Get an end time for the request
		var end = window.performance.now();
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

		var randomIndex = Math.floor(Math.random() * words.length);

		var wordDiv = $('<div>');
		wordDiv.attr('id', 'currentWord');
		wordDiv.append('<h2>');
		var wordLabel = $('<span>'+words[randomIndex]+'</span>');
		wordLabel.attr('class', 'label');
		wordLabel.attr('class', 'label-primary');
		wordLabel.css('color', 'white');
		wordDiv.append(wordLabel);
		wordDiv.append('</h2>');
		wordDiv.append('</div>');
		$('#wordDump').html(wordDiv);

		// Reset the totalTime
		totalTime = 0;


	})	
});


