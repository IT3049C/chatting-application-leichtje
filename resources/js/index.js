const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

let messages = fetchMessages();

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


const serverURL = `https://it3049c-chat.fly.dev/messages`;

async function fetchMessages() {
  const response = await fetch(serverURL);
  return response.json();
}

async function updateMessages() {
  const messages = await fetchMessages();

  const MILLISECONDS_IN_TEN_SECONDS = 10000;
  setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);
}

updateMessages();

function sendMessages(username, text) {
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date()
  };

  fetch(serverURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage)
  });
}



function sendMessages(sender, text) {
  const timestamp = Date.now();
  const message = {
    sender,
    text,
    timestamp,
  };

  const formattedMessage = formatMessage(message, sender);
  chatBox.innerHTML += formattedMessage;
}


sendButton.addEventListener("click", function(e) {
  e.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;
  sendMessages(sender, message);
  myMessage.value = "";
});