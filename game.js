// Iteration 1: Declare variables required for this game
let gameBody = document.getElementById("game-body");
let timerBox = document.getElementById("timer")
let zombieId = 0;
let zombieImages =[
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
] 
// Iteration 1.2: Add shotgun soundz
let shotgun=new Audio("./assets/shotgun.wav");
gameBody.onclick = ()=> {
    shotgun.pause();
    shotgun.play();
}
// Iteration 1.3: Add background sound
let bgAudio = new Audio ("./assets/bgm.mp3")
bgAudio.play();
bgAudio.loop = true;
bgAudio.volume = 1;
// Iteration 1.4: Add lives
let lives = 4;
// Iteration 2: Write a function to make a zombie
function makeZombie(){
let zombie = document.createElement("img");
let zomimages = zombieImages[getRandomInt(0, zombieImages.length)]
zombie.src = `./assets/${zomimages}`;
zombie.classList.add("zombie-image");
zombie.id = `zombie${zombieId}`//to give ids to the html for having unique id's for each zombies
zombie.style.transform = `translateX(${getRandomInt(10,90)}vw)`
zombie.style.animationDuration = `${getRandomInt(2 , 6)}s`
gameBody.append(zombie);
zombie.onclick = ()=> {
    zombieKill(zombie)
}
}
// Iteration 3: Write a function to check if the player missed a zombie
function checkcollision(){
    //access zombie from html page
    let zombie=document.getElementById("zombie"+ zombieId)
    console.log(zombie.getBoundingClientRect().top);
    if(zombie.getBoundingClientRect().top <=0){
        lives--;
        zombieKill(zombie);
    } 
}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieKill(zombie){
    zombie.style.display = "none";
    zombieId++;
    makeZombie();
}
// Iteration 5: Creating timer
function startTimer(){
    let timeLeft = 60;
    timerBox.textContent = timeLeft;
    setInterval(()=>{
        timeLeft--;
        timerBox.textContent = timeLeft;
        //checking if player missed to kill
        checkcollision();
        if(lives==0){
            window.location.href = "./game-over.html"
        }
        // winning condition if i survived for 60 seconds
        if(timeLeft == 0){
            window.location.href = "./win.html"
        }
    },1000)
}
startTimer();
// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie();
// Iteration 7: Write the helper function to get random integer
// for randomly viewing the 
function getRandomInt(min, max){ //min : 0(including) max:6 (excluding)
    let randomInt = Math.floor(Math.random()*(max - min))+min   //min:0 max:5
    return randomInt;    
}