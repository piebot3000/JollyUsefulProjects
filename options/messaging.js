'use strict';

class QuestionAnswerPair {
  questionText;
  answerText;

  constructor(questionText, answerText) {
    this.questionText = questionText;
    this.answerText = answerText;
  }

  formatQuizlet() {
    let buffer = "";
    buffer += this.questionText;
    buffer += "----";
    buffer += this.answerText;
    buffer += "||||"
  }
}