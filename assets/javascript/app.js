$( document ).ready(function() {


	var game = {
		questions: [
		{
	   		question: 'How many total teams are in the NBA?',
	   		possibles: ['24', '34', '28', '30'],
	   		id: 'question-one',
	   		answer: 3
		}, {
			question: 'How many total teams are in the NFL?',
			possibles: ['32', '28', '26', '30', '24'],
			id: 'question-two',
			answer: 0
		}, {
			question: 'What is Currys Number?',
			possibles: ['23', '11', '30', '40', 'He cant shoot'],
			id: 'question-three',
			answer: 2
		}, {
			question: 'What team plays for Sacramento?',
			possibles: ['Lakers', 'Kings', 'Clippers', 'Mavs', 'Celtics'],
			id: 'question-four',
			answer: 1
		}, {
			question: 'What team plays for Washington?',
			possibles: ['Celtics', 'Bulls', 'Wizards', 'Knicks', 'Supersonics'],
			id: 'question-five',
			answer: 2
		}, {
			question: 'What team plays for Houston?',
			possibles: ['Mavs', 'Rockets', 'Bulls', 'Cowboys', 'Colts'],
			id: 'question-six',
			answer: 1

		}, {
			question: 'What team plays for New York?',
			possibles: ['Nets', 'Heat', 'Knicks', 'Nuggets', 'Mavs'],
			id: 'question-seven',
			answer: 2
		}, {
			question: 'What team plays for Miami?',
			possibles: ['Warriors', 'Jags', 'Rockets', 'Kings', 'Heat'],
			id: 'question-eight',
			answer: 4
		}, {
			question: 'What team plays for Oklahoma?',
			possibles: ['Wizards', 'Mavs', 'Thunder', 'Heat', 'Warriors'],
			id: 'question-nine',
			answer: 2
		}, {
			question: 'What team plays for Denver?',
			possibles: ['Lakers', 'Nuggets', 'Clippers', 'Mavs', 'Kings'],
			id: 'question-ten',
			answer: 1
		}, {
			question: 'How many NBA teams play in California?',
			possibles: ['2', '1', '3', '4', '5'],
			id: 'question-eleven',
			answer: 3
		}, {
			question: 'How many teams play in Texas',
			possibles: ['3', '0', '1', '5', '2'],
			id: 'question-twelve',
			answer: 4
		}
		]}

	var message = 'Game Over!';
	

 
    $(".startGame").on("click", function (){
		$('.wrapper').show();
		console.log('hello');

		$(this).hide();
	});

    var number = 30;
    $('#timeLeft').on('click', run);


    function decrement(){
        number--;
        $('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');
        if (number === 0){
        stop();
        $('#message').html('time up!');
        checkAnswers();
        }
    }
    
    function run(){
        counter = setInterval(decrement, 1000);
    }
    
    function stop(){
        clearInterval(counter);
    }

    run();

function formTemplate(data) {

	var qString = "<form id='questionOne'>"+ data.question +"<br>";
	var possibles = data.possibles;
	for (var i = 0; i < possibles.length; i++) {
		var possible = possibles[i];
		console.log(possible);
		qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;

	}
	return qString + "</form>";
}
window.formTemplate = formTemplate;

function buildQuestions(){
	var questionHTML = ''
	for (var i = 0; i<game.questions.length; i++) {
		questionHTML = questionHTML + formTemplate(game.questions[i]);
	}
	$('#questions-container').append(questionHTML);

}

function isCorrect(question){
	var answers = $('[name='+question.id+']');
	var correct = answers.eq(question.answer);
	var isChecked = correct.is(':checked');
	return isChecked;
}

buildQuestions();

function resultsTemplate(question){
	var htmlBlock = '<div>'
	htmlBlock = htmlBlock + question.question + ': ' + isChecked;
	return htmlBlock + "</div>";
}

function checkAnswers (){

	var resultsHTML = '';
	var guessedAnswers = [];
	var correct = 0;
	var incorrect = 0;
	var unAnswered =0

	for (var i = 0; i<game.questions.length; i++) {
		if (isCorrect(game.questions[i])) {
			correct++;
		} else {
			if (checkAnswered(game.questions[i])) {
				incorrect++;
			} else {
				unAnswered++;
			}
		}

	}
	$('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
}

function checkAnswered(question){
	var anyAnswered = false;
	var answers = $('[name='+question.id+']');

	for (var i = 0; i < answers.length; i++) {
		if (answers[i].checked) {
			anyAnswered = true;
		}
	}
	return anyAnswered;

}

	$('#doneButton').on('click', function() {
	checkAnswers();
	stop();
	$("#messageDiv").html("Game Over!");
	})
});