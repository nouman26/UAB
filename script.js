document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.getElementById("messageInput");
    const msgAppend = document.getElementById("msg");
  
    // Function to add a message to the chat container
    function addMessage(message, sender) {
      if (sender === "incoming") {
        let lastMessage = msgAppend.lastElementChild;
        const incomingDiv = document.createElement("div");

        const bubbleDiv = document.createElement("div");
        bubbleDiv.className = "bubble incoming";
        bubbleDiv.textContent = message;

        incomingDiv.appendChild(bubbleDiv);
        msgAppend.insertBefore(incomingDiv, lastMessage);
        document.getElementsByClassName("voldemort")[0].scrollIntoView(false);
      } else if (sender === "outgoing") {
        let lastMessage = msgAppend.lastElementChild;
        const outgoingDiv = document.createElement("div");
    
        const bubbleDiv = document.createElement("div");
        bubbleDiv.className = "bubble outgoing";
        bubbleDiv.textContent = message;
    
        outgoingDiv.appendChild(bubbleDiv);

        // msgAppend.appendChild(outgoingDiv);
        msgAppend.insertBefore(outgoingDiv, lastMessage);
        console.log(document.getElementById("msg").scrollHeight);
        document.getElementsByClassName("voldemort")[0].scrollIntoView(false);
      }
  
      messageInput.value = ""; // Clear the input field after sending
    }
  
    // Function to simulate a dummy response
    function getDummyResponse(userMessage) {
      let responses = {
        "hi": "Hi there!",
        "hello": "Hello there!",
        "how are you": "I'm just a computer program, but I'm here to help!",
        "what's your name": "I'm just a bot, so I don't have a name. How can I assist you today?",
        "goodbye": "Goodbye! If you have more questions in the future, feel free to ask.",
        "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
        "thanks": "You're welcome! If you need any more help, just let me know.",
        "haha":"I'm glad you liked it!",
        "what is your favorite color": "I like blue. What about you?",
        "what is your favorite food": "I like pizza. What about you?",
        "what is your favorite movie": "I like The Matrix. What about you?",
        "what is your favorite song": "I like Bohemian Rhapsody. What about you?",
        "what is your favorite book": "I like The Hitchhiker's Guide to the Galaxy. What about you?",
        "what is your favorite animal": "I like dogs. What about you?",
        "what is your favorite sport": "I like basketball. What about you?",
        "what is your favorite game": "I like chess. What about you?",
        "what is your favorite subject": "I like math. What about you?",
        "what is your favorite programming language": "I like Python. What about you?",
        "what is your favorite website": "I like Wikipedia. What about you?",
        "what is your favorite social media platform": "I like Twitter. What about you?",
        "what is your favorite country": "I like Japan. What about you?",
        "what is your favorite city": "I like New York City. What about you?",
        "what is your favorite holiday": "I like Christmas. What about you?",
        "what is your favorite season": "I like summer. What about you?",
        "what is your favorite weather": "I like sunny weather. What about you?",
        "what is your favorite time of day": "I like the morning. What about you?",
        "what is your favorite time of year": "I like the summer. What about you?",
        "what is your favorite time of the year": "I like the summer. What about you?",
        "what is your favorite time of day": "I like the morning. What about you?",
        "what is your favorite time of the day": "I like the morning. What about you?",
        "ok": "Great!",
        "how old are you": "I don't have an age. I'm a machine learning model designed to assist you.",
        "where are you from": "I exist in the digital realm and don't have a physical location.",
        "what is the meaning of life": "The meaning of life is a philosophical question. Some say it's 42, but others have different views.",
        "how can I learn programming": "Learning programming is a great choice! You can start by choosing a programming language and finding online tutorials and courses.",
        "recommend a book": "Sure, I recommend 'The Hitchhiker's Guide to the Galaxy' by Douglas Adams. It's a humorous science fiction classic.",
        "who is your creator": "I was created by OpenAI, a research organization focused on artificial intelligence.",
        "by": "You're welcome!",
        "default": "I'm not sure how to respond to that. Can you please rephrase your question?"
        
      };
        // Convert the userMessage to lowercase for case-insensitive matching
        const lowerCaseMessage = userMessage.toLowerCase();

        // Check if the userMessage matches any predefined responses
        for (const keyword in responses) {
          if (lowerCaseMessage.includes(keyword)) {
            return responses[keyword];
          }
        }

        // If no matching response is found, return the default response
        return responses["default"];
    }
  
    // Event listener for when the user submits a message
    document.querySelector("button[type='submit']").addEventListener("click", function () {
      const userMessage = messageInput.value;
      if (userMessage.trim() !== "") {
        addMessage(userMessage, "outgoing");
        document.getElementsByClassName("typing")[0].style.display="unset";
        setTimeout(function () {
          const dummyResponse = getDummyResponse(userMessage);
          document.getElementsByClassName("typing")[0].style.display="none"
          addMessage(dummyResponse, "incoming");
        }, 1000); // Simulate a response after 1 second (adjust as needed)
      }
    });
  
    // Event listener for pressing Enter key
    messageInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector("button[type='submit']").click();
      }
    });
  });
  