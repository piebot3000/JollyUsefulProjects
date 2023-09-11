console.log("GUS: mindtapToQuizlet.js loaded");

//grab all the question links in the page
function getQuestionLinks() {
  var questionContainer = document.querySelector("#question-numbers-scroll");
  return [...questionContainer.querySelectorAll("a")].map((a) => a.href);
}

//grab the dom of a url
function getSourceAsDOM(url) {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  parser = new DOMParser();
  return parser.parseFromString(xmlhttp.responseText, "text/html");
}

function getMultipleChoiceData() {
  var results = [];

  //for each link to each question
  for (i of getQuestionLinks()) {
    //get the dom of that link seperately
    doc = getSourceAsDOM(i);

    //get the question text
    var questionText = doc.querySelector("div.problemTypes").innerText;
    //get answer text
    var answerText = doc.querySelector("input:checked").parentElement.nextElementSibling.innerText;

    //add that to the results array
    results.push({ question: questionText, answer: answerText });
  }

  return results;
}

//WIP
function getFillInData() {
  var results = [];

  //check all questions
  for (i of getQuestionLinks()) {
    //get each questions dom without relaoding the page a bunch
    var doc = getSourceAsDOM(i);

    //get our answer text first so we dont delete it in the next steps
    //all our answers are in the .control-value span
    var answerContainer = Array.from(doc.querySelectorAll(".control-value"));

    //important to note we may have multiple answers
    //the first child of each of our containers is a input containing our answer as the value
    var answers = answerContainer.map(node => node.childNodes[0].value);

    //join them nice to return
    var answerText = answers.join(", ");

    //our question lives in div.problemTypes
    var div = doc.querySelector("div.problemTypes");
    //remove unnecessary data since theres a ton and its easier to extract what we want
    [...div.children].forEach((node) => node.remove());

    //we can check which text nodes contain our data by seeing if they are not whitespace
    var filtered = [...div.childNodes].filter((node) => node.textContent.trim() !== '')
      //then get the text content of all the nodes
      .map(x => x.textContent);

    var answerAmount = filtered.length - 1;

    //each part of the question needs to be joined by a "_____" to introduce the blank
    //this is now our completed question text
    var questionText = filtered.join("_____");

    
    results.push({ question: questionText, answer: answerText });
  }

  return results;
}

//small delay to make sure the page loads everything
setTimeout(function() {
  //make sure were done with the assignment
  if (document.querySelector("h2").innerText === "Take Details") {
    var finalValue;
    //if its a TD then its fill in the blank
    if (document.querySelector(".problemTypes").tagName === "TD") {
      var finalValue = getFillInData();
      //otherwise its a multiple choice
    } else {
      var finalValue = getMultipleChoiceData();
    }

    //send the data
    chrome.runtime.sendMessage({ quizletQuestions: true, quizletData: finalValue });
  }
}, 4000);