# Extension to save questions in quizlet
Saves questions from canvas, and multiple choice questions from mindtap to a string which can be imported to quizlet.

# Docs so I don't forget
## Messages
The two message types passed are quizletString, and quizletQuestions.

### quizletQuestions
```json 
{ 
  quizletQuestions: true, 
  quizletData: [{question: string, answer: string}]
}
```
Sent by content scripts for background to pickup, format into a string and save to session storage under ```"quizletString" + tab.id```.

### quizletString
```json
{ 
  quizletString: true, 
  quizletData: string 
}
```
Sent by background for popup to pickup, allows instant update to the popup.