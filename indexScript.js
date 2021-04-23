
/* Intialization of variables*/
var min = 2;
var max = 100;
 /*while randomly generating variable min and max are used in range in between the number will get generated*/
var score = 0; //Score variable stores score obtained by user in one round
var maxscore = 0; /*maxscore is the highest score a user obtained but if page refreshes then maxscore will get reintializes to 0*/
var testEndMessage , testMessage; //message to be displayed after test ends
var timerId;
var symbol = "+"; //symbol denotes the type of question asked ie. add, sub, mul, div
var attemptTime = 30; //maxtime given to user to do test
var timeLeft = attemptTime; /*time left for user to do test, it starts from attemptTime and then starts decreasing till it becomes zero*/
var elem = document.getElementById('countdown');
var arrayop = new Array(); //stores operation (question type :add, sub,mul, div) selected by user during changing settings
arrayop.push("+"); //initially arrayop contains only + ie additiontype question but if setting is changed content of arrayop will be modified
var num1, num2; //two numbers randomly generated
var correctAns; //correctAns

/*below variable stores range constraint for respective operation type selected via user.
Suppose if user selects multiplication then to identify in which range he/she wants the question to be asked it is stored in below variables which is fetched from class = rangeInputbox
here naming convention is that for number 1 range is op1a to op1b and for number 2 range is op2a to op2b where op can be add, sub, mul, div */
//addition range
var add1a, add1b, add2a, add2b;
add1a = add2a = 2;
add1b = add2b = 100;
//subtraction range
var sub1a, sub1b, sub2a, sub2b;
sub1a = 30; sub2a = 1;
sub1b = 100; sub2b = 29;
//multiplication range
var mul1a, mul1b, mul2a, mul2b;
mul1a = mul2a = 2;
mul1b = mul2b = 20;
//division range
var div1a, div1b, div2a, div2b;
div1a = div2a = 2;
div1b = div2b = 20;


/*these variables are the input field where range is entered for respective question checked by user*/
var ad1a = document.getElementById("add1a");
var ad1b = document.getElementById("add1b");
var ad2a = document.getElementById("add2a");
var ad2b = document.getElementById("add2b");

var sb1a = document.getElementById("sub1a");
var sb1b = document.getElementById("sub1b");
var sb2a = document.getElementById("sub2a");
var sb2b = document.getElementById("sub2b");

var ml1a = document.getElementById("mul1a");
var ml1b = document.getElementById("mul1b");
var ml2a = document.getElementById("mul2a");
var ml2b = document.getElementById("mul2b");

var dv1a = document.getElementById("div1a");
var dv1b = document.getElementById("div1b");
var dv2a = document.getElementById("div2a");
var dv2b = document.getElementById("div2b");





function shownavbar(){
    /*This function is responsible to change navigation icon button symbol when website is viewed in mobile*/
    const navigate = document.getElementById("nav");
    navigate.classList.toggle("showCrossNavIcon");

    if(navigate.classList.contains("showCrossNavIcon"))
    {
        document.getElementById('bar').innerHTML='&#10799;';
    }
    else{                
        document.getElementById('bar').innerHTML='&#8801;';
    }
}

/*When viewing in mobile navigation bar should open/close navbar on click*/
document.getElementById("tog").onclick = shownavbar;


/*When About button in sidenav bar is clicked then this function gets fired */
function clickAboutSection(){
    shownavbar();
    //for mobile-view calling shownavbar is imp because otherwise onclick on any thing on navbar it won't disappear
    document.getElementById("startbutton").style.display="block";
    document.getElementById("aboutsection").style.display="block";
    document.getElementById("settingsection").style.display="none";
    document.getElementById("playsection").style.display="none";
}

//VALIDATE USER DATA
/*To validate that user has entered value between allowed given range ( which is min=1 and max=1000 )inside the input tag (class name = rangeInputbox)  */
function validateUserSetting() {
  
    if (ad1a.validity.valid && ad1b.validity.valid && ad2a.validity.valid && ad2b.validity.valid && sb1a.validity.valid && sb1b.validity.valid && sb2a.validity.valid && sb2b.validity.valid && ml1a.validity.valid && ml1b.validity.valid && ml2a.validity.valid && ml2b.validity.valid && dv1a.validity.valid && dv1b.validity.valid && dv2a.validity.valid && dv2b.validity.valid) {
  
      // this if statement is executed if entered input is valid and its value is in specified range
      alert("Settings submitted are valid. Now click Save Setting button to save settings, otherwise setting will not be saved! You can edit setting by clicking on reset button. If  you have not changed settings then default settings will be used to ask questions.")
  
      /*this readonly attribute is added so that once settings are validated then no one should change it because now save setting button is made visible and user can try to save unvalidated data
      Therefore input field are made non-editable*/
      ad1a.setAttribute('readonly', true); ad1b.setAttribute('readonly', true); ad2a.setAttribute('readonly', true); ad2b.setAttribute('readonly', true);
      sb1a.setAttribute('readonly', true); sb1b.setAttribute('readonly', true); sb2a.setAttribute('readonly', true); sb2b.setAttribute('readonly', true);
      ml1a.setAttribute('readonly', true); ml1b.setAttribute('readonly', true); ml2a.setAttribute('readonly', true); ml2b.setAttribute('readonly', true);
      dv1a.setAttribute('readonly', true); dv1b.setAttribute('readonly', true); dv2a.setAttribute('readonly', true); dv2b.setAttribute('readonly', true);
    
      /*Once user has clicked validateEntereddata button then save setting  and resetData button will appear and validate button will hide. If he again wants to modify setting data then he/she can select resetData otherwise he/she can select save setting  */
      document.getElementById("validateEnteredData").style.display = "none";
      document.getElementById("resetData").style.display = "block";
      document.getElementById("settingsubmit").style.display = "block";
    }
    else {
  
      //this else is executed if entered range for checked question type is wrong. 
      //it shows user a message that his value that he gave was wrong
      ad1a.reportValidity(); ad1b.reportValidity(); ad2a.reportValidity(); ad2b.reportValidity();
      sb1a.reportValidity(); sb1b.reportValidity(); sb2a.reportValidity(); sb2b.reportValidity();
      ml1a.reportValidity(); ml1b.reportValidity(); ml2a.reportValidity(); ml2b.reportValidity();
      dv1a.reportValidity(); dv1b.reportValidity(); dv2a.reportValidity(); dv2b.reportValidity();
  
      //untill user enters correct range he/she cannot see save setting button or even reset data
      document.getElementById("settingsubmit").style.display = "none";
      document.getElementById("resetData").style.display = "none";
    }
  
  }
  
  //resetData button
  /*This is used to allow users to edit input rangeInputBox which was made non-editable when user selected validateEnteredData button and above function ie validateUserSetting() was fired*/
  function undoInputValues() {
  
   /*note that when input field was made readonly  : it was done by setattribute(readonly, true) but to make input field again editable you cannot write like setattribute(readonly, false) as readonly is not a true or false attribute it is rather a present or notpresent attribute therefore we need to remove attruibute like done below*/
    ad1a.removeAttribute("readonly"); ad1b.removeAttribute("readonly"); ad2a.removeAttribute("readonly"); ad2b.removeAttribute("readonly");
    sb1a.removeAttribute("readonly"); sb1b.removeAttribute("readonly"); sb2a.removeAttribute("readonly"); sb2b.removeAttribute("readonly");
    ml1a.removeAttribute("readonly"); ml1b.removeAttribute("readonly"); ml2a.removeAttribute("readonly"); ml2b.removeAttribute("readonly");
    dv1a.removeAttribute("readonly"); dv1b.removeAttribute("readonly"); dv2a.removeAttribute("readonly"); dv2b.removeAttribute("readonly");
  
    /*now when user selects resetData button he/she should only see validate wala button and save setting and resetData button will disappear */
    document.getElementById("validateEnteredData").style.display = "block";
    document.getElementById("settingsubmit").style.display = "none";
    document.getElementById("resetData").style.display = "none";
  }
  
  
  //Set user given timings
  /*This function sets maximum time user will have to attempt the test and default value is 30 seconds */
  function changeTestSettings() {
  
    // timeSetByUser = prompt("Set maximum time you need to play(in seconds only)", "30");
    timeSetByUser= document.getElementById("testTime").value;
  
    if (timeSetByUser != null && timeSetByUser>0 && timeSetByUser<300) {
        attemptTime = timeSetByUser;
        alert("Sankhya has saved time as you told. Time set = "+attemptTime+" second");
    }   
    else {
        attemptTime = 30;
    alert("The duration you entered was inavlid hence Sankhya will set default duration for quiz i.e. Time set = "+attemptTime+" second");}

    //console.log(timeSetByUser);
  }

/*When Setting button in sidenav bar is clicked then this function gets fired */
function clickSettingSection(){
    shownavbar();
    console.log("Setting button clicked");
    document.getElementById("startbutton").style.display="none";
    document.getElementById("aboutsection").style.display="none";
    document.getElementById("settingsection").style.display="block";
    document.getElementById("playsection").style.display="none";
}

/*Inside Setting section there is button settingsubmit if it is clicked then it will display start button and hide setting section when below settingComplete function gets fired */
/*Also Once the user has saved settings by clicking on save setting button then collectusersettings() function is fired which stores data entered by user and store it in variable */
function collectusersetting(){
   
    /*arrayop[] will store operations that are selected by user.
  suppose user checked mul and sub checkbox then arrayop = [-, *];
  By default it is initialised with + but now we are making it empty and only user selected option will go in this array*/
  arrayop = [];
  /* Another way to select checked fields :
  var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    markedCheckbox is the check box element*/
  var markedCheckbox = document.getElementsByClassName('operationCheckbox');
  /* This for loop traverses through all checkbox whose class name is operationCheckbox and then if the checkbox is selected it pushes the value of checkbox in the arrayop*/
  for (var checkbox of markedCheckbox) {

    if (checkbox.checked) {
      arrayop.push(checkbox.value);
      //console.log("Inside collectusersetting() and checkedbox value = ", checkbox.value);
      //console.log("Numbers before calling function are: mul1a= ", mul1a, " ,mul1b = ", mul1b, " , mul2a = ", mul2a, ",mul2b = ", mul2b);
      /* this function below will fetch range entered by user for checked operation which means suppose user checks division the this function will select what range has user entered for this */
      collectUserSetNumberRange(checkbox.value);
      //console.log("Numbers after calling function are: mul1a= ", mul1a, " ,mul1b = ", mul1b, " , mul2a = ", mul2a, ",mul2b = ", mul2b);
    }

  }
  //console.log(arrayop);
  //if user has not checked anything and even then trying to save it then this if will be executed because in this case arrayop is empty
  if (arrayop.length == 0) {
    alert("Since, you have not checked any checkbox Sankhya will go with set default values.")
    arrayop = ["+"];
    collectUserSetNumberRange("+");
  }
    //console.log("Setting done button clicked to confirm by user that settings are complete");
    document.getElementById("startbutton").style.display="block";
    document.getElementById("aboutsection").style.display="none";
    document.getElementById("playsection").style.display="none";
    document.getElementById("settingsection").style.display="none";
    
}


/*This function is called by collectusersetting() and is used to fetch user entered range for two numbers for given checked operation. Suppose addition checkbox was checked by user then this function will fetch what is the corresponding range entered
Since numbers are generated randomly hence we need to range in which numbers should be given as question for corresponding operation */
function collectUserSetNumberRange(selectedOperator) {

    let tempvalueA, tempvalueB, symb;
  
    /*this is to see which id should we talk about for selected operation
    because if selectedOperator is + then range for number 1 and number 2 are entered in input fields
    whose id is add1a, add2a, add2a, add2b. Similar naming is done for other operations*/
    if (selectedOperator == "+") symb = "add";
    else if (selectedOperator == "-") symb = "sub";
    else if (selectedOperator == "*") symb = "mul";
    else if (selectedOperator == "/") symb = "div";
  
    let a1, a2, b1, b2;
    //a1 will become 'add1a' if selectedOperator is '+'
    a1 = symb + "1a"; 
    b1 = symb + "1b";
    a2 = symb + "2a";
    b2 = symb + "2b";
  
    let val1a, val1b, val2a, val2b;
  
    /*Now tempvalueA and tempvalueB are fetching range (a to b) for number 1 entered by user */
    tempvalueA = document.getElementById(a1).value;
    tempvalueB = document.getElementById(b1).value;
    //console.log("tempvalueA = ", tempvalueA, tempvalueB);
    //console.log(typeof tempvalueB);
    // if(tempvalueA == null|| tempvalueB == null )
    //if(document.getElementById(a1).value == null|| document.getElementById(b1).value == null )
  
    if (tempvalueA == "" || tempvalueB == "") {
      /*If user enters nothing in rangeInputBox for number 1 then default value is assigned,
      but since for different operator different default values are there we will check for which operator this function is called */
      if (selectedOperator == "+") { val1a = 2; val1b = 100; }
      else if (selectedOperator == "-") { val1a = 30; val1b = 100; }
      else if (selectedOperator == "*") { val1a = 2; val1b = 20; }
      else if (selectedOperator == "/") { val1a = 2; val1b = 20; }
  
    }
    else if (tempvalueB < tempvalueA) {
       
      /*This is to ensure that range entered is correct because if in html For number 1 From a to b range was asked from user and he entered a > b then it is wrong and will lead to wrong calculation while generating random number so in this case we just swap value of a and b */
      val1b = tempvalueA;
      val1a = tempvalueB;
    }
    else {
  
      /* This else is executed if entered range(a to b) for number 1 by user is correct, then we will assign the range to val1a and val1b */
      val1a = tempvalueA; val1b = tempvalueB;
    }
  
   /*Now tempvalueA and tempvalueB are fetching range (a to b)for number 2 entered by user */
    tempvalueA = document.getElementById(a2).value;
    tempvalueB = document.getElementById(b2).value;
    if (tempvalueA == "" || tempvalueB == "") {
  
      /*If user enters nothing in rangeInputBox for number 2 then default value is assigned,
      but since for different operator different default values are there we will check for which operator this function is called */
      if (selectedOperator == "+") { val2a = 2; val2b = 100; }
      else if (selectedOperator == "-") { val2a = 1; val2b = 29; }
      else if (selectedOperator == "*") { val2a = 2; val2b = 20; }
      else if (selectedOperator == "/") { val2a = 2; val2b = 20; }
    }
    else if (tempvalueB < tempvalueA) {
  
      /*This is to ensure that range entered is correct because if in html For number 2 From a to b range was asked from user and he entered a > b then it is wrong and will lead to wrong calculation while generating random number so in this case we just swap value of a and b */
  
      val2b = tempvalueA;
      val2a = tempvalueB;
    }
    else {
       /* This else is executed if entered range(a to b) for number 2 by user is correct, then we will assign the range to val2a and val2b */
      val2a = tempvalueA; val2b = tempvalueB;
    }
  
    /*now once we obtain val1a,val1b, val2a, val2b we assign it to correct variable for correct selectedoperator which called this function 
    We are using parseInt() so that val1a (and others) typeof is number and not string otherwise it will lead to mis-calculation because while generating random number multiplication and addition of string is not same as number variables*/
    val1a = parseInt(val1a); val1b = parseInt(val1b);
    val2a = parseInt(val2a); val2b = parseInt(val2b);
  
    //console.log("val1a = ", val1a, ", val1b = ", val1b, " val2a= ", val2a, " val2b = ", val2b);
    //console.log("Type of val1a = ", typeof val1a, ", val1b = ", typeof val1b, " val2a= ", typeof val2a, " val2b = ", typeof val2b);
    if (selectedOperator == "+") { add1a = val1a; add1b = val1b; add2a = val2a; add2b = val2b; }
    else if (selectedOperator == "-") { sub1a = val1a; sub1b = val1b; sub2a = val2a; sub2b = val2b; }
    else if (selectedOperator == "*") { mul1a = val1a; mul1b = val1b; mul2a = val2a; mul2b = val2b; }
    else if (selectedOperator == "/") { div1a = val1a; div1b = val1b; div2a = val2a; div2b = val2b; }
  
  
  }
  
  
  function operateNumbers(m, n, sym) {
    /*This function is used to find correct calculation for given two numbers */
    //console.log("operate number executed and symbol is", sym);
    //console.log("in op num func array op =", arrayop);
    if (sym == "+") return m + n;
    else if (sym == "-") return m - n;
    else if (sym == "*") return m * n;
    else if (sym == "/") return m / n;
    else return m + n;
  
  }
  /*selectTwoRandomNumber will generate two random number and that will be given as question two user */
  function selectTwoRandomNumber(operator) {
  
    //FORMULA
    // randomNumber = Math.floor(Math.random() * (maxvalue - minvalue + 1)) + minvalue;
  
    if (operator == "+") {
      //IF ADDTITION
      num1 = Math.floor(Math.random() * (add1b - add1a + 1)) + add1a;
      num2 = Math.floor(Math.random() * (add2b - add2a + 1)) + add2a;
    }
    else if (operator == "-") {
  
      //IF SUBTRACTION
  
     // console.log("Inside select randome num .... Numbers after calling function are: sub1a= ", sub1a, " ,sub1b = ", sub1b, " , sub2a = ", sub2a, ",sub2b = ", sub2b);
      let greater;
      let sameNumbers = 1;
  
      while (sameNumbers == 1) {
        /*this is to ensure that two numbers generated are not same because then ans is obvious zero a-a = 0*/
        num1 = Math.floor(Math.random() * (sub1b - sub1a + 1)) + sub1a;
        num2 = Math.floor(Math.random() * (sub2b - sub2a + 1)) + sub2a;
  
        if (num1 == num2) sameNumbers = 1;
        else sameNumbers = 0;
  
      }
      if (num2 > num1) {
        greater = num2;
        num2 = num1;
        num1 = greater;
        //this swapping of values is done to ensure that subtraction value of num1 - num2 is always positive
      }
      // console.log("type of sub1a", typeof sub1a);
      // console.log("type of sub1a", typeof parseInt(sub1a));
      // console.log("sub1b- sub1a +1 ", sub1b - sub1a + 1);
      // console.log("num1 = ", num1);
      // console.log("num2 = ", num2);
    }
    else if (operator == "*") {
      //IF MULTIPLICATION
      num1 = Math.floor(Math.random() * (mul1b - mul1a + 1)) + mul1a;
      num2 = Math.floor(Math.random() * (mul2b - mul2a + 1)) + mul2a;
    }
    else if (operator == "/") {
      //IF DIVISION
      let remainder = 1;
      let sameNumbers = 1;
      //sameNumbers = 1 indicates num1 = num2
      //whereas sameNumbers = 0 indicates false : numbers are not same i.e. num1!=num2
  
      /*This while loop is to ensure that numbers generated randomly are divisible i.e. num1%num2== 0
      and num1 > num2 so that num1 / num2 > 0
      (if numbers are not divisible then user will have to enter floating number as ans so to avoid it we only generate divisible number so ans is always an integer)
      and num1 != num2 is ensured otherwise user will have no fun because say 14/14 is asked then it becomes very easy solve that 14/14 = 1 */
      while (remainder != 0 || sameNumbers == 1) {
        num1 = Math.floor(Math.random() * (div1b - div1a + 1)) + div1a;
        num2 = Math.floor(Math.random() * (div2b - div2a + 1)) + div2a;
  
        let greater;
        if (num2 > num1) {
          greater = num2;
          num2 = num1;
          num1 = greater;
          //this swapping of values is done to ensure that division value of num1 / num2 is always  > 0.
        }
        if (num2 == 0) { num2 = 1; }/*this if is to double ensure and avoid division by zero error even if constraints in generating num2 works fine and never results in zero*/
  
        //it is checked so that there is no probability of asking division of num1 by num2 where num1 = num2
        if (num2 == num1) sameNumbers = 1;
        else sameNumbers = 0;
  
        remainder = num1 % num2;
      }
  
  
  
    } else {
      /*this else is to ensure that even if wrong operator is given then also
       script should behave normally and act like it has got addition operator.
      */
      num1 = Math.floor(Math.random() * (add1b - add1a + 1)) + add1a;
      num2 = Math.floor(Math.random() * (add2b - add2a + 1)) + add2b;
    }
  
  }



  function displayQuestion() {
    /*This function displays question which is based on two numbers randomly generated */
  
    //console.log("Value of array op is ", arrayop);
  
    /*Symbol randomly obatins any value inside arrayop array and then gives it to selectTwoRandomNumber() function to generate two random number for that operator*/
  
    symbol = arrayop[Math.floor(Math.random() * arrayop.length)];
    selectTwoRandomNumber(symbol);
  
    // num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    // num2 = Math.floor(Math.random() * (max - min + 1)) + min;
  
    //here the question is displayed
    document.getElementById('question').innerHTML = num1 + " " + symbol + " " + num2 + " =  ";
    //here correctans is stored for random generated numbers
    correctAns = operateNumbers(num1, num2, symbol);
  }
  
  
  function calculate() {
    /*This function checks if user entered correct value for given question or not.
    This function is triggered oninput and everytime user writes anything in answer box this function matches user's ans with correct ans if ans does not match nothing happens but if the ans matches then next question is generated and whole process repeats of answer matching */
    var enteredAns = document.getElementById('answer').value;
  
    if (enteredAns == correctAns) {
      //if ans correct then increase score by one
      score++;
      //also show remarks and new current score to user
      document.getElementById("message").innerHTML = "Well done!!<br>Current Score : " + score;
      //since ans is matched correct now new question will be generated
      displayQuestion();
      //and now empty the answer box as now user needs to write new answer for new question
      document.getElementById('answer').value = "";
    }
  }
  
  function displaytest() {
  
    /*When user selects start button this function is called */
  
    //console.log("Inside display test| Value of array op is ", arrayop);
  
    /*When start button is clicked then it's background changes, it gets disabled, text changes to Test Ongoing
      Start button is important to disable so that no one can click it again while test is going on because 
      it is affecting the setInterval and time gets manipulated*/
    document.getElementById('startbutton').style.backgroundColor = "RosyBrown";
    document.getElementById('startbutton').disabled = true;
    document.getElementById('startbutton').innerHTML = "Test Ongoing";

    /*Once the test starts stop button should become visible */
    document.getElementById('stopbutton').style.display = "block";

    //when the test was ongoing setting and about button are disabled so test cannot be interrupted and in order to enable it user needs to stop the test
    document.getElementById('aboutbtn').disabled = true;
    document.getElementById('settingbtn').disabled = true;
  
    /*It displays question and input field for answer*/
    /*testarea is whole div area where countdown, question, ans box, after-test message is shown*/
    document.getElementById("testarea").style.display = "block";
    document.getElementById('scoreAfterTest').style.display = "none";
    //This is done to clear input field if anything is there
    document.getElementById('answer').value = ""; 
    
  
    //timerId is set interval so that count down starts 
    timerId = setInterval(displaytime, 1000);
  
    //question generated randomly is asked here
    displayQuestion();
  
    //Setting time for attempting test
    timeLeft = attemptTime;
  
    //responsible for displaying time left
    displaytime();
  
  }
  
  
  
  
  function displaytime() {
  
    /*This shows countdown that is the time left to attempt test */
  
    if (timeLeft == -1) {
      //if time becomes less than zero then this if is executed
  
      clearTimeout(timerId);
  
      /*Here  elem = document.getElementById('countdown'); and is declared with other variables in this document. Usually elem is showing time left but once its zero it will show game over msg*/
      elem.innerHTML = ' Game Over';

      //if the game is over stop button should hide since its not needed
      document.getElementById('stopbutton').style.display = "none";

      //when the test was ongoing setting and about button was disabled, now we need to enable it
      document.getElementById('aboutbtn').disabled = false;
      document.getElementById('settingbtn').disabled = false;
  
      /*message was showing current score  during the test was ongoing but now we are hiding it and now total score will be shown by other tag */
      document.getElementById('message').innerHTML = "";
      /*test area displayed ques and answerbox and now we are hiding it since time is over */
      document.getElementById('testarea').style.display = "none";
      /*start button was diabled since test was ongoing but now we are enabling it so that if user wish he/she can start test again and setting will remain same if user has not refreshed browser or changed the settings */
      document.getElementById('startbutton').disabled = false;
      /*We are making the css style of start button as done initially since it is enabled */
      document.getElementById('startbutton').style.backgroundColor = "Tan";
      document.getElementById('startbutton').innerHTML = "Start Again";
      document.getElementById('scoreAfterTest').style.display = "block";
  
      /*This message is shown at end of test when total score is shown */
  
      /*remarks based on what range user scores falls in */
      if (score == 0) testMessage = "Uh Oh!! ";
      else if (score > 0 && score < 9) testMessage = "Keep Going ! ";
      else if (score >= 9 && score < 30) testMessage = "Good!! ";
      else testMessage = "Excellent! ";

      //it updates everytime score improves to show user the max score he got
      if(maxscore<score) maxscore =score;
  
      /*This message displays score obtained by user in the test that just ended  */
      testEndMessage = "<br>Your score was : " + score ;
      
      let redoRemark = "<br>You can improve this score.  Challenge yourself again!";
      let highestscoreMsg = "<br> Your highest score till now is "+maxscore+"!<br>";

      testMessage = testMessage.concat(testEndMessage);
      document.getElementById('scoreAfterTest').innerHTML = testMessage + highestscoreMsg + redoRemark;
  
      /*Now after showing user his/her score we will set score=0 so that if user starts test again score is initialized as 0 only and nothing else */
      score = 0;
      /*Same reason as with score since user can restart test we are initalizing timeLeft with maximum time given to user to solve test */
      timeLeft = attemptTime;
  
  
    } else {
  
      /*This else will execute if time for test has not ended 
      and test is ongoing.
      here
      elem is countdown message and will show time left to do test in seconds*/
      elem.innerHTML = timeLeft + ' seconds';
      
      /*since this function is called by setInterval method this function is repeated again and again as per setInterval and thus we are decrementing  the time left variable every second passes the moment test starts*/
      timeLeft--;
    }
  
    //console.log("Inside displaytest here arrayop = ",arrayop);
  }
  

function stopTest(){
//this function is to stop test by making time left -1
    timeLeft = -1;

}
/*This function is used to display the playsection where the main thing happens that is question answer section */
function displayplaysection(){

    document.getElementById("startbutton").style.display="block";
    document.getElementById("aboutsection").style.display="none";
    document.getElementById("playsection").style.display="block";
    document.getElementById("settingsection").style.display="none";
    displaytest();

}