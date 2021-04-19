let remain = document.getElementById('timeRemaining');
let startButton = document.getElementById('startButton');
let startToHide = document.getElementById('startToHide');
let finishButton = document.getElementById('finishButton');

let hour;
let minute;
let second;
let nowTime;
let times;
let timeIntId;

var sound = new Audio('IMSLP246987-PMLP02533-Peer_Gynt_Suite_No._1,_Op._46_-_I._Morning.mp3');
sound.addEventListener("ended",function(){
    sound.currentTime = 0;
    sound.play();
}, false);

function start(){
    hour = parseInt(document.getElementById('hour').value,10);
    minute = parseInt(document.getElementById('minute').value,10);
    second = parseInt(document.getElementById('second').value,10);
    nowTime = hour * 3600 + minute * 60 + second;
    if(hour <= 0 && minute <= 0 && second <= 0){
        $('#divHide').attr('id','divAble');
        return 0;
       }
    $('#divAble').attr('id', 'divHide')
    startToHide.hidden = true;
    finishButton.disabled = false;
    startButton.className = "btn btn-warning rounded-pill";
    startButton.innerHTML = "一時停止";
    startButton.onclick = "";
    startButton.removeEventListener("click",start);
    startButton.addEventListener("click",stop);

    if(nowTime / 3600 > 1){
        remain.innerHTML = ('00' + Math.floor(nowTime / 3600)).slice(-2) + ":" + ('00' + Math.floor(nowTime % 3600 / 60)).slice(-2)+ ":" + ('00' + Math.floor(nowTime % 3600 % 60)).slice(-2);
    }else if(nowTime / 3600 <= 1){
        remain.innerHTML = ('00' + Math.floor(nowTime / 60)).slice(-2) + ":" + ('00' + Math.floor(nowTime % 60)).slice(-2);
    }
    timeIntId = setInterval(nextTime,1000);
}

function stop(){
    clearInterval(timeIntId);
    startButton.innerHTML = "再開";
    startButton.className = "btn btn-success rounded-pill";
    startButton.removeEventListener("click",stop);
    startButton.addEventListener("click",restart);
}

function restart(){
    startToHide.hidden = true;
    finishButton.disabled = false;
    startButton.className = "btn btn-warning rounded-pill";
    startButton.innerHTML = "一時停止";
    startButton.removeEventListener("click",restart);
    startButton.addEventListener("click",stop);
    nowtime = remain;
    timeIntId = setInterval(nextTime,1000);
}

function finish(){
    startButton.disabled=false;
    startToHide.hidden=false;
    finishButton.disabled=true;
    remain.innerHTML = "";
    startButton.className = "btn btn-success rounded-pill";
    startButton.innerHTML = "開始";
    startButton.removeEventListener("click",stop);
    startButton.removeEventListener("click",restart);
    startButton.addEventListener("click",start);
    clearInterval(timeIntId);
}

function nextTime(){
    if (nowTime > 0) {
        nowTime = --nowTime;
        if(nowTime / 3600 > 1){
            remain.innerHTML = ('00' + Math.floor(nowTime / 3600)).slice(-2) + ":" + ('00' + Math.floor(nowTime % 3600 / 60)).slice(-2)+ ":" + ('00' + Math.floor(nowTime % 3600 % 60)).slice(-2);
        }else if(nowTime / 3600 <= 1){
            remain.innerHTML = ('00' + Math.floor(nowTime / 60)).slice(-2) + ":" + ('00' + Math.floor(nowTime % 60)).slice(-2);
        }
    } else if (nowTime <= 0) {
        clearInterval(timeIntId);
        startButton.disabled=false;
        startToHide.hidden=false;
        remain.innerHTML = "";
        startButton.className = "btn btn-success rounded-pill";
        startButton.innerHTML = "開始";
        startButton.removeEventListener("click",stop);
        startButton.addEventListener("click",start);
        finishButton.disabled = true;
        sound.currentTime = 0;
        sound.play();
        alert("終了しました");
        sound.pause();
    }
}
