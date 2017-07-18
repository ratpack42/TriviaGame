//  This code will run as soon as the page loads.
window.onload = function() {
//Global Variables
// Click events for the buttons
	 $("#start").click(timer.start);

	 $(".answerChoice").click(trivia.checker)

};
var questionCount = 0, corrrectAnswers = 0, incorrectAnswers = 0;
var unanswered = 0;
var correct = false;
$(".container").hide();
console.log(questionCount);

var intervalId;

//Prevents the clock from being speed up unnecessarily
var clockRunning = false;

//Create trivia object to hold questions
//=====================================================================================

var trivia = {

	"questions" : [
		{

			"question" : "What do the letters ZIP stand for in the United States postal code?",
			"answer" : "b",
			"multipleChoice" : [
					"Zone Interstate Project", "Zone Improvement Plan", "Zone Interstate Plan"
			]
		},
		{

			"question" : "Which country won the 2012 UEFA European Championship?",
			"answer" : "b",
			"multipleChoice" : [
					"Portugal", "Spain", "Italy"
			]
		},

		{

			"question" : "What is the national animal of Scotland?",
			"answer" : "c",
			"multipleChoice" : [
					"Lion", "Dragon", "Unicorn"
			]						
		},

		{

			"question" : "South Africa completely surrounds which African nation?",
			"answer" : "a",
			"multipleChoice" : [
					"Lesotho", "Gabon", "Cape Verde"
			]
		},

			{

			"question" : "What is a group of owls called?",
			"answer" : "c",
			"multipleChoice" : [
					"Flock", "School", "A Parliamant"
			]
		},

				{

			"question" : "What fast food franchise has the most worldwide chains?",
			"answer" : "a",
			"multipleChoice" : [
					"Subway", "McDonalds", "chick-fil-A"
			]
		}
	],
//Function to display questions
//=================================================================================
	askquestion: function(){
		$("#triviaQuestion").html(trivia.questions[questionCount].question);
		$("#a").html(trivia.questions[questionCount].multipleChoice[0]);
		$("#b").html(trivia.questions[questionCount].multipleChoice[1]);
		$("#c").html(trivia.questions[questionCount].multipleChoice[2]);
	},
//Runs the checking of the click versus the answer
	checker: function() {
		if ($(this).attr("id")===trivia.questions[questionCount].answer) {
			corrrectAnswers = corrrectAnswers +1;
			console.log("Hello");
		}
//Stores incorrect answer for results page
		else {
			incorrectAnswers = incorrectAnswers +1;
		}
//Stops error from occuring after all the questions have been guessed
	questionCount = questionCount +1;
		if (questionCount < trivia.questions.length){
			trivia.askquestion();

		}
//Hides questions, timer, etc to display result page
		else {

		trivia.results();

		}

	
	},

	results: function() {
			$("#display").hide();
			$("#triviaQuestion").hide();
			$("#multipleChoice").hide();

//Show Results After all the questions have been answered
			$("#results").show();
			$("#correct").html("Correct Answers: " + corrrectAnswers);
			$("#wrong").html("Incorrect Answers: " + incorrectAnswers);
			$("#unanswered").html("Unanswered: " + unanswered);

	}
		
}




//Timer
//===================================================================================
//Create object timer to create countdown
var timer = {

	time: 120,

	start: function() {
		$(".container").show()
		$("#start").hide()
		$("#results").hide()
		trivia.askquestion();
//Use setInterval to set the counter and start the clock running
		 if (!clockRunning) {

          intervalId = setInterval(timer.count,1000);
          clockRunning = true;
      }

	},

	count: function() {

    // Deduct time by 1, remember we cant use "this" here.
        timer.time--;
        $('#display').html(timer.time + " " + "Seconds");

        if (timer.time===0) {
        	clearInterval(intervalId);
        	unanswered = trivia.questions.length - (incorrectAnswers + corrrectAnswers);
        	trivia.results();
        	console.log(unanswered);
        	

        	

        }
    }



  
};