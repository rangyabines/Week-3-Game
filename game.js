var soccer = ["New York FC", "NY Red Bull", "New England Revolution", "Philadelphia Union", "Columbus Crew", "Orlando City SC", "Toronto FC", "Montreal Impact", "DC United", "Chicago Fire SC", "Atlanta United FC", "Vancouver Whitecaps", "Seattle Sounders", "Portland Timbers", "Real Salt Lake", "Houston Dynamo", "FC Dallas", "Sporting Kansas", "Colorado Rapids", "San Jose Earthquakes", "LA Galaxy", "Los Angeles FC", "Minnesota FC"];
var rand = 0;
var word = "";
var numWrong = 0;
var numRight = 0;
var phraseLength = 0;
var numChar = 0; 

function sp(){
    document.getElementById('introPage').style.display = "none";
    document.getElementById('multiPage').style.display = "none";
    document.getElementById('singlePage').style.display = "block";
}

function mls(){
    rand = Math.floor(Math.random()*soccer.length);
    word = soccer[rand];
    document.getElementById('singlePage').style.display = "none";
    document.getElementById('categoryName').innerHTML = "Major League Soccer";
    hangman();
}

function challengeGuess(){
    var target = event.target || event.srcElement;
    target.style.visibility = "hidden";
    var lower = target.id;
    var upper = document.getElementById(lower).getAttribute('value');
    var results = document.getElementById('results');
    if(document.getElementById('letter1').innerHTML === upper){
        document.getElementById('letter1').style.visibility = "visible";
        numRight++;
    }
    if(numRight==0){
        numWrong++;
        hang();
    }
    if(numRight==1){
        results.style.visibility = "visible";
        results.style.color = "red";
        results.innerHTML = "You lose!";        
        if(document.getElementById('underline1').offsetWidth == 50){
            results.style.fontSize = "200px";
            results.style.height = "200px";
            results.style.lineHeight = "200px";
        }
        if(document.getElementById('underline1').offsetWidth == 28){
            results.style.marginTop = "20px";
            results.style.fontSize = "100px";
            results.style.height = "100px";
            results.style.lineHeight = "100px";
        }
        if(document.getElementById('underline1').offsetWidth == 18){
            results.style.marginTop = "15px";
            results.style.fontSize = "75px";
            results.style.height = "75px";
            results.style.lineHeight = "75px";
        }
        document.getElementById('challengeBank').style.display = "none";
        document.getElementById('vidSent').style.display = "block";
        document.getElementById('again').style.display = "block";
        document.getElementById('home').style.display = "block";
    }
    if(numWrong==25){
        results.style.visibility = "visible";
        results.style.color = "#00b100";
        results.innerHTML = "You win!";        
        if(document.getElementById('underline1').offsetWidth == 50){
            results.style.fontSize = "200px";
            results.style.height = "200px";
            results.style.lineHeight = "200px";
        }
        if(document.getElementById('underline1').offsetWidth == 28){
            results.style.marginTop = "20px";
            results.style.fontSize = "100px";
            results.style.height = "100px";
            results.style.lineHeight = "100px";
        }
        if(document.getElementById('underline1').offsetWidth == 18){
            results.style.marginTop = "15px";
            results.style.fontSize = "75px";
            results.style.height = "75px";
            results.style.lineHeight = "75px";
        }
        document.getElementById('challengeBank').style.display = "none";
        document.getElementById('vidSent').style.display = "block";
        document.getElementById('again').style.display = "block";
        document.getElementById('home').style.display = "block";
        document.getElementById('letter1').style.visibility = "visible";
    }
}

function countChars(countfrom,displayto) {
    var len = document.getElementById(countfrom).value.length;
    document.getElementById(displayto).innerHTML = len;
}

function readText(){
    word = document.getElementById('input').value;
    hangman();
}

function hangman(){
    var x = word.length;
        if(x==0){
            alert("Please enter something into the text box.");
            return;
        }
    var y = x-1;
    var spaces = 0;
    var validChar = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "?", "!", ",", ".", "-", "'");
    for(z = 0; z < word.length; z++){
        var letter = word.substring(y,x);
        if(validChar.indexOf(letter) > -1){
            x--;
            y--;
        }
        else{
            alert("Please remove any special characters.");
            return;
        }
    }
    x = word.length;
    y = x-1;
    while (x>0){
        numChar++;
        var letter = word.substring(y,x);
        if(letter === " "){
            document.getElementById('letter'+x).innerHTML = "&nbsp;";
            document.getElementById('letter'+x).style.visibility = "hidden";
            document.getElementById('letter'+x).style.display = "block";
            document.getElementById('underline'+x).style.display = "block";
            spaces++;
        }
        else if(letter === "?" || letter === "!" || letter === "," || letter === "." || letter === "-" || letter === "'"){
            document.getElementById('letter'+x).innerHTML = letter;
            document.getElementById('letter'+x).style.display = "block";
            document.getElementById('underline'+x).style.display = "block";
            spaces++;
        }
        else{
            document.getElementById('letter'+x).innerHTML = letter;
            document.getElementById('letter'+x).style.visibility = "hidden";
            document.getElementById('underline'+x).style.display = "block";            
            document.getElementById('underline'+x).style.borderBottom = "3px solid black";
        }
        x--;
        y--;
    }
    phraseLength = word.length - spaces;
    document.getElementById('multiPage').style.display = "none";
    document.getElementById('gamePage').style.display = "block";
    splitWords();
    document.getElementById('challengeBank').style.display = "none";
    draw();
}

function splitWords(){
    var placeKeep = 0;
    var countBack = 16;
    if(numChar > 15){
        while(countBack > 1){
            if(document.getElementById('letter16').innerHTML == "&nbsp;"){
                document.getElementById('underline16').style.width = "0px";
                document.getElementById('underline16').style.marginRight = "0px";
            }
            if(document.getElementById('letter'+countBack).innerHTML == "&nbsp;"){
                document.getElementById('underline'+countBack).style.width = (document.getElementById('underline1').offsetWidth)*(16-countBack)+"px";
                placeKeep = countBack;
                countBack = 0;
            }
            countBack--;
        }
    }
    for(x=0;x<8;x++){
        countBack = 15+placeKeep;
        if(numChar > countBack){
            while(countBack > 1){
                if(document.getElementById('letter'+countBack).innerHTML == "&nbsp;"){
                    document.getElementById('underline'+countBack).style.width = (document.getElementById('underline1').offsetWidth*((16+placeKeep)-countBack))+"px";
                    placeKeep = countBack;
                    countBack = 0;
                }
                countBack--;
            }
        }
    }
    
}

function guessLetter(){
    var correct = 0;
    var target = event.target || event.srcElement;
    target.style.visibility = "hidden";
    var lower = target.id;
    var upper = document.getElementById(lower).getAttribute('value');
    var results = document.getElementById('results');
    var ul1 = document.getElementById('underline1').offsetWidth;
    for(a = 1; a < 101; a++){
        if(document.getElementById('letter'+a).innerHTML === upper || document.getElementById('letter'+a).innerHTML === lower){
            document.getElementById('letter'+a).style.visibility = "visible";
            correct++;
            numRight++;
        }
    }
    if(correct==0){
        numWrong++;
        hang();
    }
    if(numWrong==6){
        results.style.visibility = "visible";
        results.style.color = "red";
        results.innerHTML = "You can't miss another letter!";
        if(ul1 == 50){
            results.style.lineHeight = "70px";
            results.style.fontSize = "30px";
        }
        if(ul1 == 28){
            results.style.lineHeight = "50px";
            results.style.fontSize = "25px";
        }
        if(ul1 == 18){
            results.style.lineHeight = "40px";
            results.style.fontSize = "20px";
        }
    }
    if(numWrong==7){
        results.innerHTML = "You lose!<br>Keep guessing until you get it right.";
        document.getElementById('again').style.display = "block";
        document.getElementById('home').style.display = "block";
        document.getElementById('vidSent').style.display = "block";
        if(ul1 == 50){
            results.style.lineHeight = "40px";
        }
        if(ul1 == 28){
            results.style.lineHeight = "25px";
        }
        if(ul1 == 18){
            results.style.lineHeight = "20px";
        }
    }
    if(numRight==phraseLength){
        win();
    }
}

function win(){
    var ul1 = document.getElementById('underline1').offsetWidth;
    var again = document.getElementById('again');
    var results = document.getElementById('results');
        results.style.visibility = "visible";
        results.style.color = "#00b100";
    if(numWrong > 6){
        results.innerHTML = "It's about time you figured it out...";
        document.getElementById('letterBank').style.display = "none";
        again.style.display = "block";
        document.getElementById('home').style.display = "block";
        document.getElementById('vidSent').style.display = "block";
        if(ul1 == 50){
            results.style.lineHeight = "70px";
            results.style.fontSize = "30px";
        }
        if(ul1 == 28){
            results.style.lineHeight = "50px";
            results.style.fontSize = "25px";
        }
        if(ul1 == 18){
            results.style.lineHeight = "40px";
            results.style.fontSize = "20px";
        }
    }
    else{
        results.innerHTML = "You win!";
        document.getElementById('letterBank').style.display = "none";
        again.style.display = "block";
        document.getElementById('home').style.display = "block";
        document.getElementById('vidSent').style.display = "block";
        if(ul1 == 50){
            again.style.marginTop = "75px";
            results.style.marginTop = "75px";
            results.style.fontSize = "200px";
        }
        if(ul1 == 28){
            again.style.marginTop = "50px";
            results.style.marginTop = "40px";
            results.style.fontSize = "100px";
        }
        if(ul1 == 18){
            again.style.marginTop = "40px";
            results.style.marginTop = "15px";
            results.style.fontSize = "75px";
        }
    }
}

function hang(){
    var ctx = document.getElementById("hangman").getContext('2d');
    if(numWrong==1){
    }
    if(numWrong==2){
    }
    if(numWrong==3){
    }
    if(numWrong==4){
    }
    if(numWrong==5){
    }
    if(numWrong==6){
    }
    if(numWrong==7){
    }
    if(numWrong==8){
    }
    if(numWrong==9){
    }
    if(numWrong==10){
    }
    if(numWrong==11){
    }
    if(numWrong==12){
    }
    if(numWrong==13){
    }
    if(numWrong==14){
    }
    if(numWrong==15){
    }
    if(numWrong==16){
    }
    if(numWrong==17){
    }
    if(numWrong==17){
    }
    if(numWrong==18){
    }
    if(numWrong==19){
    }
    if(numWrong==20){
    }
    if(numWrong==21){
    }
    if(numWrong==22){
    }
    if(numWrong==23){
    }
    if(numWrong==24){
    }
    if(numWrong==25){
    }
}

function reset(){
    var ul1 = document.getElementById('underline1').offsetWidth;
    var results = document.getElementById('results');
    var again = document.getElementById('again');
    for(a = 1; a < 101; a++){
        document.getElementById('letter'+a).innerHTML = "&nbsp;";
        document.getElementById('underline'+a).style.width = ul1 + "px";
        if(ul1 == 50){
            document.getElementById('underline'+a).style.marginRight = "5px";
            results.style.height = "70px";
        }
        else if(ul1 == 28){
            document.getElementById('underline'+a).style.marginRight = "3px";
            results.style.height = "50px";
        }
        else{
            document.getElementById('underline'+a).style.marginRight = "3px";
            results.style.height = "40px";
        }
        document.getElementById('underline'+a).style.display = "none";
        document.getElementById('underline'+a).style.borderBottom = "0px";
    }
    var bank = document.getElementById("letterBank").querySelectorAll("div");
    var cBank = document.getElementById("challengeBank").querySelectorAll("div");
    for(b = 0; b < 26; b++){
        bank[b].style.visibility = "visible";
        cBank[b].style.visibility = "visible";
    }
    numWrong = 0;
    numRight = 0;
    phraseLength = 0;
    numChar = 0;
    results.style.marginTop = "5px";
    results.style.lineHeight = "40px";
    results.innerHTML = " ";
    document.getElementById('vidSent').style.display = "none";
    document.getElementById('letterBank').style.display = "block";
    again.style.marginTop = "0px";
    again.style.display = "none";
    document.getElementById('home').style.display = "none";
    if(phrases.indexOf(word) > -1){
        phrases.splice(rand,1);
        phrase();
    }
    else if(soccer.indexOf(word) > -1){
        soccer.splice(rand,1);
        mls();
    }
    else if(songs.indexOf(word) > -1){
        songs.splice(rand,1);
        song();
    }
    else if(document.getElementById('charcount').innerHTML > 0){
        document.getElementById('gamePage').style.display = "none";
        document.getElementById('input').value = "";
        document.getElementById('charcount').innerHTML = "0";
        document.getElementById('multiPage').style.display = "block";
    }
    else{
        challenge();
    }
}