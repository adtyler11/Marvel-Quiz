const marvelQuiz = document.getElementById("quizDiv");
//Linking the variable name "quiz" to a <div> with the ID of "quizDiv"

let scoreDisplay = document.getElementById("scoreDisplay");
//Assigns a variable for the scoreDisplay Div

var totalScore = 0;
//To keep track of the score

const questions = [
    {name: "What name did Black Widow use when FIRST introduced to Tony Stark in Iron Man 2?", answer: "2",
options: [ "Natasha Romanoff","Natalie Roman", "Natalie Rushman", "Natalia Romanoff"]
}, 
  {name: "Who is the FIRST avenger to lift Thors hammer besides Thor himself?", answer: "1",
 options: [ "The Hulk", "Vision", "Captain America", "Iron Man" ]
},
 {name: "Who is Captain Americas first love?", answer: "3",
options: ["Agent Romanoff", "Janet Van Dyne", "Maria Stark", "Agent Peggy Carter" ]
},
 {name: "Who is TChalla?", answer: "1",
options: ["The Black Widow", "The Black Panther", "The Ant Man", "The Spider Man"]
},
 {name: "What planet is Thanos from?", answer: "0",
options: ["Titan", "Atlas", "Alantis", "Xandar"]
},
 {name: "What is the name of Tony Starks new AI after Jarvis is fused into Vision?", answer: "2",
options: ["Zordon", "Jarvis 2.0", "Friday", "Ultron"]
},
 {name: "What name does not belong?", answer: "3",
options: ["AntMan", "Iron Man", "Bruce Banner", "BatMan"]
},
 {name: "The Flerkens are dangerous aliens that resembles what animal?", answer: "2",
options: ["Dinosaurs", "Black Panthers", "Cats", "Dogs"]
},
 {name: "Who sacrificed themself for the soul stone?", answer: "0",
options: ["Gamora", "Ramona", "Nebula", "Hawkeye"]
},
 {name: "How many infinity stones are there?", answer: "2",
options: ["Ten", "Five", "Six", "Seven"]
},

];
//This is an array of objects that hold the data for each question.

let currentQuestion = 0;
//Index for the questions array

let submitted = false;


function renderQuestion() {

    submitted = false;

    let question = questions[currentQuestion];
    //Selects the question object to populate the form below based on the current value of the index counter

    marvelQuiz.innerHTML = `
        <h1>${question.name}</h1>
        <form id="myForm">
            <input type="radio" id="0" name="option" value="0">
            <label for="0">${question.options[0]}</label><br>

            <input type="radio" id="1" name="option" value="1">
            <label for="1">${question.options[1]}</label><br>

            <input type="radio" id="2" name="option" value="2">
            <label for="2">${question.options[2]}</label><br>

            <input type="radio" id="3" name="option" value="3">
            <label for="3">${question.options[3]}</label><br>

            <p id="message"></p>
        </form> 
    `;
//Can't put comments inside the block above, so it has to all go here.
//One critical thing I found out is that we don't need to create elements then assign them variables to populate a <div>
//We can just use .innerHTML on a variable assigned to a <div>, then create the HTML elements we need just like we would in HTML.

//First we create a <h1> using a question objects name value as the innerHTML/text
//Then we create a <form> and give it the ID "myForm"
//From there create four <inputs>, and give them each four attributes. Type to make it a radio button, the name "option", and a value and ID from 0-3.
//Below that, the <label> tags allow us to label the radio buttons. We can do this by using the "for" attribute and supplying the radio buttons ID as an argument
//We use the options[] inside the question objects for the innerHTML of the labels
//Below that we have a <p> with the message
}



function nextQuestion() {

    const msg = document.getElementById('message');
    //Sets a variable called "msg" to reference the <p> in the form with the ID of "message"
    
    if (document.querySelector('input[name="option"]:checked') === null) {
    //Checks if a radio button is selected
      msg.innerHTML = "Select an answer to proceed."
      //Sets the text of the <p> in the form to inform the user to select an answer
      return; // Exit from function.
    }

    if (!submitted) {
      msg.innerHTML = "Please submit your answer before proceeding."
      return; // Exit from function.
    }
    //Checks if submitted is false or true before proceeding
    
    if (currentQuestion < questions.length - 1) {
    //Checks if the index is at the end of the array yet
      currentQuestion++;
      renderQuestion();
      //increments the counter then renders the question again
    } else {
      scoreDisplay.innerHTML = totalScore;
      //Display the score if theres no more questions
      let reloadButton = document.createElement("button");
      //Sets a variable, reloadButton, to reference a newly created <button>
      reloadButton.innerHTML = "Reload";
      //Sets the text inside the button
      reloadButton.setAttribute("onclick","location.reload()");
      //Sets an onclick attribute that invokes the built-in location.reload function
      let endDiv = document.getElementById("endDiv");
      //Sets a variable, endDiv, to refer to the <div> with the ID "endDiv"
      endDiv.appendChild(reloadButton);
      //Adds the reload button
    }
}



function submitAnswer() {
    const msg = document.getElementById("message");
    //Sets a variable to reference the <p> from the form
    const ans = document.querySelector('input[name="option"]:checked');
    //Sets a variable to reference the selected radio button
  
    if (!ans) {
    //If answer is null
      msg.innerHTML = "Please select an answer."
      return; // Exit from function.
    }
  
    const question = questions[currentQuestion];
    //Sets a variable to reference the question object currently displayed in the form
    const correctAns = question.answer;
    //Sets a variable to reference the answer property of the question object currently displayed in the form
    const userAns = ans.value;
    //Sets a variable to reference the value property of the currently selected radio button
  
    if (correctAns === userAns) {
    //If the value property of the currently selected radio button is equal to the answer property of the object currently dislpayed in the form
      totalScore = totalScore + 1
      //Add 1 to the total score
    }
  
    document.getElementById("0").disabled = true;
    document.getElementById("1").disabled = true;
    document.getElementById("2").disabled = true;
    document.getElementById("3").disabled = true;
    //Supposed to disable all the radio buttons when one is selected
    
    submitted = true;
}

renderQuestion();