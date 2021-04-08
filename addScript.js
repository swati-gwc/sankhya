var min = 2;
var max= 100;
var score=0;
 var testEndMessage; var testMessage ;
var num1 = Math.floor(Math.random() * (max - min + 1)) + min;
var num2 = Math.floor(Math.random() * (max - min + 1)) + min;
document.getElementById('question').innerHTML = num1 + " " + "+" + " " + num2+" =  ";
var correctAns = num1 + num2;
 
function calculate() {
var enteredAns = document.getElementById('answer').value;
      if (enteredAns== correctAns) {
        score++;
        document.getElementById("message").innerHTML = "Well done!! Current Score : "+score;
         num1 = Math.floor(Math.random() * (max - min + 1)) + min;
        num2 = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('answer').value ="";
        document.getElementById('question').innerHTML = num1 + " " + "+" + " " + num2+" =  ";
correctAns = num1 + num2;
      
               
      } 
 }
var timerId;// = setInterval(displaytime, 1000);
function displaytest(){
  
   document.getElementById('startbutton').style.backgroundColor = "RosyBrown";
   document.getElementById('startbutton').disabled = true;
 document.getElementById('startbutton').innerHTML= "Test Ongoing";
    document.getElementById("testarea").style.display="block";
  document.getElementById('scoreAfterTest').style.display="none";
    document.getElementById('answer').value ="";
  timerId = setInterval(displaytime, 1000);
    displaytime();
  
}
var timeLeft = 30;
var elem = document.getElementById('countdown');


function displaytime(){
  if (timeLeft == -1) {
        clearTimeout(timerId);
         elem.innerHTML = ' Game Over';
    document.getElementById('message').innerHTML="";
         document.getElementById('testarea').style.display="none";
         document.getElementById('startbutton').disabled = false;
     document.getElementById('startbutton').style.backgroundColor = "SaddleBrown";
         document.getElementById('startbutton').innerHTML="Start Again";
      document.getElementById('scoreAfterTest').style.display="block";
     
       if(score == 0)  testMessage = "Uh Oh!! ";
      else if (score > 0 && score <30)  testMessage = "Good!! ";
      else testMessage = "Well done!! ";
     testEndMessage =" Your last score was : "+ score +"<br> Can you improve this score? Try again! <br> फिर से कोशिश करें और बेहतर बने । ";
     testMessage = testMessage.concat(testEndMessage);
      document.getElementById('scoreAfterTest').innerHTML=testMessage;
        // "Well done, Your last score was : "+score +"<br> Can you improve this score? Try again!";
    score=0;
    timeLeft=30;
    
    
      } else {
        elem.innerHTML = timeLeft + ' seconds';
        timeLeft--;
      }
}
