console.log("GUS: mindtapToQuizlet.js loaded");

function getQuestionLinks() {
  return [...document.querySelectorAll("a")].map((a) => a.href);
}

function getMultipleChoiceData() {
  var results = [];
  for (i of getQuestionLinks()) {
    doc = getSourceAsDOM(i);

    //get the question text
    var questionText = doc.querySelector("div.problemTypes").innerText;
    //get answer text
    var answerText = doc.querySelector("input:checked").parentElement.nextElementSibling.innerText;

    results.push({question: questionText, answer: answerText});
  }

  return results;
}

function getFillInData() {
  var results = [];
  for (i of getQuestionLinks()) {
    doc = getSourceAsDOM(i);

    //get the question text
    var questionText = doc.querySelector("div.problemTypes").innerText;
    console.log(questionText);
    //get answer text
    //var answerText = doc.querySelector("input:checked").parentElement.nextElementSibling.innerText;

    //results.push({question: questionText, answer: answerText});
  }

  return results;
}

setTimeout(function() {
  //make sure were done with the assignment
  if(document.querySelector("h2").innerText === "Take Details"){
    var finalValue;
    //if its a TD then its fill in the blank
    if(document.querySelector(".problemTypes").tagName === "TD") {
      var finalValue = formatQuizlet(getFillInData());
    //otherwise its a multiple choice
    } else {
      var finalValue = formatQuizlet(getMultipleChoiceData());
    }
    
    chrome.runtime.sendMessage({ type: "quizletString", quizletString: finalValue });
  }
}, 4000);