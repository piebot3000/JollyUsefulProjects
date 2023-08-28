console.log("GUS: canvasToQuizlet.js loaded");

function getData() {
  const REMOVE_FROM_ANSWER = " You selected this answer. This was the correct answer.";

  var questions = document.getElementsByClassName("question_text");
  var answers = document.getElementsByClassName("correct_answer");

  var results = [];
  for (var i = 0; i < questions.length; i++) {
    let questionText = questions[i].textContent.trim();
    let answerText = answers[i].title.replace(REMOVE_FROM_ANSWER, "").replace(". This was the correct answer.", "").trim();
    results.push({question: questionText, answer: answerText})
  }
  
  return results;
}

let finalValue = formatQuizlet(getData());
chrome.runtime.sendMessage({ type: "quizletString", quizletString: finalValue });