/* 
 * SpookifyJS
 * version 0.1
 * Warning: thar be spaghetti code below!
 */

console.log("This page has been Spookified! Go to https://spookify.me to learn more.");

var domain = 'https://spookify.me';

// Attach the spookify styles to the document
var head = document.getElementsByTagName('head')[0];
var css = document.createElement('link');
css.rel="stylesheet";
css.type="text/css";
css.href = domain + "/dist/spookify.css";
head.appendChild(css);

var body = document.getElementsByTagName('body')[0];
body.classList.add('spookify');

// Use an IIFE to self-initialize the spookify overlay
var spookScreen = function(){
  var screen = document.createElement('div');
  screen.id = 'spookify';
  var msg = document.createElement('p');
  msg.id = 'message';
  screen.appendChild(msg);
  body.appendChild(screen);
  return screen;
}();

// Track created elements
var messages = ["hello", "boo!", "", "", "", "I'm taking over", ":-)", "ha ha ha ha"];
var spooks = [];
var current = [];

// Glitch Backdrop
var glitch = document.createElement('div');
glitch.classList.add('glitch');
spookScreen.appendChild(glitch);
spooks.push(glitch);

//Skull
var skull = document.createElement('div');
skull.classList.add('skull');
spookScreen.appendChild(skull);
spooks.push(skull);

// Help Me!
var helpLink = document.createElement('a');
helpLink.classList.add('help');
helpLink.href = domain + "/help.html";
helpLink.target = "_blank";
helpLink.innerHTML = "What's happening? Help me!";

// Event manager
function sequencer() {
  spookScreen.appendChild(helpLink);

  setInterval(function(){
    var randToggle = Math.floor(Math.random() * spooks.length);
    spooks[randToggle].classList.toggle('active');
    if (spooks[randToggle] === skull) {
      skull.style.left = (Math.floor(Math.random() * spookScreen.clientWidth + 100)) - spookScreen.clientWidth * 0.3 + 'px';
    }

    var randMsg = Math.floor(Math.random() * messages.length);
    spookScreen.querySelector('#message').innerHTML = messages[randMsg];
  }, 28 * 1000);
}

// Blood Drips
function createBlood(el) {
  var blood = document.createElement('div');
  blood.classList.add('blood');
  blood.style.left = Math.floor(Math.random() * el.clientWidth) + 'px';

  var streak = document.createElement('div');
  streak.classList.add('streak');
  blood.appendChild(streak);

  var drip = document.createElement('div');
  drip.classList.add('drip');
  blood.appendChild(drip);

  el.appendChild(blood);
  setTimeout(function(){el.removeChild(blood)}, 30 * 1000);
}

//Launch event 'manager'
setTimeout(function(){sequencer()}, 20 * 1000);

//Start bleeding independently
setTimeout(function(){createBlood(spookScreen)}, 3 * 1000);
setInterval(function(){createBlood(spookScreen)}, ((Math.random() * 8) + 9) * 1000);
