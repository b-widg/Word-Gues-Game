
const names = ["Arya","Bran", "Cersei", "Daenerys","Jamie", "Jon", "Sansa", "Samwell", "Tyrion"];

const imagePath = [
    "assets/images/arya.png",
    "assets/images/bran.png",
    "assets/images/cersei.png",
    "assets/images/daenerys.png",
    "assets/images/jamie.png",
    "assets/images/jon.png",
    "assets/images/sansa.png",
    "assets/images/samwell.png",
    "assets/images/tyrion.png",
];

const hints = [
    "This girl definitely has a name!",
    "Please don't be the Night King!",
    "When you play the game of thrones, you win or you die.",
    "Mother of Dragons",
    "Uncle Daddy",
    "Found cool loophole for Night's Watch commitment.",
    "I'll never forgive her for lying about that wolf.",
    "Maester The Making.",
    "I drink and I know things.",
];


function startGame(){
    let randomInt = Math.floor(Math.random()* names.length);
    let randomName = names[randomInt].toUpperCase();
    let randomHint = hints[randomInt];
    let matchingImagePath = imagePath[randomInt];
    let gameContainerSpan = document.getElementById("guess-container-div");
    let correctGuessesArry = [];
    let incorrectGuessArry  = [];
    let correctGuessCount = 0;
    let incorrectGuessCount = 0;
    let incorrectAllowedCount = 6;
    let gameOver = false;

    console.log(randomName);

    let makeUnderscores = () => {
        for(let i = 0; i < randomName.length; i++){
            gameContainerSpan.innerHTML += '<span class="guess-holder">&nbsp</span>'
        }
    }
    makeUnderscores();

    document.getElementById("hintSpan").innerHTML = "Hint: " + randomHint;

    document.addEventListener('keypress', (event) => {
    
        let guess = String.fromCharCode(event.keyCode).toUpperCase();
        
        if(randomName.indexOf(guess) > -1){

             var keySound = new Audio();
             keySound.src = "assets/audio/coin.mp3";
             keySound.play();
           
            //  console.log(correctGuessesArry.indexOf(guess));

            let guessSpans = document.getElementsByClassName('guess-holder');
            //If there was a march, but nothing is in correctGuessArry then this is the first match.
            if(correctGuessesArry.indexOf(guess) == -1){
                let matchingGuessSpan = guessSpans[randomName.indexOf(guess)];
                matchingGuessSpan.innerText = guess;
                correctGuessesArry.push(guess);
                correctGuessCount++;
            }else{
                // If we have character in correctGuessArry, we look for second guess
                //Not handlineg if you have 3 or more of the same character.
                let indexOfFirst = randomName.indexOf(guess);
                let matchingGuessSpan = guessSpans[randomName.indexOf(guess, indexOfFirst + 1)];
                matchingGuessSpan.innerText = guess;
                correctGuessesArry.push(guess);
                correctGuessCount++;
            }
        }else{ //Handle No Match
            incorrectGuessCount += 1;
            let incorrectGuessDisplay = incorrectAllowedCount - incorrectGuessCount;
            if(incorrectGuessDisplay < 1){incorrectGuessDisplay = 0} //keep from going negative if player keeps hitting keys
            document.getElementById("incorrect-tries").innerHTML = incorrectGuessDisplay;
            incorrectGuessArry.push(guess);
            if(incorrectGuessArry.length <= 6){
                document.getElementById("incorrect-characters").innerHTML = incorrectGuessArry;
            }
            if(incorrectGuessCount < 6 && incorrectGuessArry.length <= 6){
                let boing = new Audio();
                boing.src = "assets/audio/boing.mp3";
                boing.play();
            
            }else if(incorrectGuessCount >= 6 && incorrectGuessArry.length <= 6){
                let gasp = new Audio();
                gasp.src = "assets/audio/gasp.mp3";
                gasp.play();
                document.getElementById("win-lose-msg").innerHTML = "You lost!";
                setTimeout(function(){ document.location.reload(); }, 3000);
            }
            
        }
        
            let gameGuessSpaces = $('.guess-holder');
            let notEmpty = 0;
        
            for (let i = 0; i < gameGuessSpaces.length; i++){
              
                if(gameGuessSpaces[i].innerHTML != "&nbsp;"){
                    notEmpty++;                    ;
                }
            if(notEmpty == gameGuessSpaces.length){
                document.getElementById("pic").src=matchingImagePath;
                var cheer = new Audio();
                cheer.src = "assets/audio/cheer.mp3";
                cheer.play();
                document.getElementById("win-lose-msg").innerHTML = "You Won!";
                setTimeout(function(){ document.location.reload(); }, 5000);
            }
        }
        
    });
  


}