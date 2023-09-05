//format a array of question objects { question: string, answer: string } into a string quizlet can import
function formatQuizlet(questions) {
  const COLUMN_DELIM = "----";
  const ROW_DELIM = "||||";

  var buffer = "";
  for (i of questions) {
    buffer += i.question;
    buffer += COLUMN_DELIM;
    buffer += i.answer;
    buffer += ROW_DELIM;
  }

  buffer = buffer.replace(/(\r\n|\n|\r)/gm, "");
  buffer = buffer.replace(/ +(?= )/g, '');

  return buffer;
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.quizletQuestions) {
    //get the key the data for this tab will be under
    let storageKey = "quizletString" + sender.tab.id;

    let formattedData = formatQuizlet(message.quizletData);
    //set the key to the string
    chrome.storage.session.set({ [storageKey]: formattedData });

    //send a message to the popup to instantly update it
    chrome.runtime.sendMessage({ quizletString: true, quizletData: formattedData });
  }
});