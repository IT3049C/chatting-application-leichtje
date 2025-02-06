const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
    return `<div class="mine messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${formattedTime}
        </div>
      </div>`;
  } else {
    return `<div class="yours messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${message.sender} ${formattedTime}
        </div>
      </div> `;
  }
}

function fetchMessages() {
  return [
    {
      id: 1,
      text: "Testing Testing",
      sender: "Jonathon",
      timestamp: 1537410673072
    },
    {
      id: 2,
      text: "Echo Echo",
      sender: "Jonathon Leicht",
      timestamp: 1537410673072
    },
    {
      id: 3,
      text: "Testing Testing from someone else",
      sender: "Someone Else",
      timestamp: 1537410673072
    }
  ];
}

function updateMessages() {
  const messages = fetchMessages();
  let formattedMessages = "";
  messages.forEach(message => {
    formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}

updateMessages();