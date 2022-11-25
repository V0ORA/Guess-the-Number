const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

//Generate random number :
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//SPEECH RECOGNITION FUNCTIONALITY//
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

let recognition = new SpeechRecognition();

//Start recognition and game:
recognition.start();

//Capture user speak:
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

//Write message on the DOM
function writeMessage(msg) {
  msgEl.innerHTML = `<div>You said :</div>

                      <span class="number gradient">${msg}</span>`;
}

//play again function
window.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});

//Checking range of number:
function checkNumber(msg) {
  const number = +msg;

  //check if valid number:
  if (Number.isNaN(number)) {
    msgEl.innerHTML = `<div>That is not a valid Number!</div>`;
    return;
  }

  //check in range:
  if (number > 100 || number < 1) {
    msgEl.innerHTML += `<div>Number must be in range between 1 and 100 !</div>`;
    return;
  }

  if (number === randomNum) {
    document.body.innerHTML = `<div class="container">
                                <h2> Congrats! You have guessed the right number! <br> <br>
                                it was <span class="gradient"> ${number} </span> </h2>
                                <button class="btn-grad" id="play-again"> Play again 
                                </button>  
                                </div>
                                `;
  } else if (number > randomNum) {
    msgEl.innerHTML += `<div> GO LOWER &#8595 </div>`;
  } else {
    msgEl.innerHTML += `<div> GO HIGHER &#8593 </div>`;
  }
}

//Speak result:
recognition.addEventListener("result", onSpeak);

//End SR service
recognition.addEventListener("end", () => recognition.start());

console.log(randomNum);
