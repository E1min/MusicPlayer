import { musicList } from "./data.js"

let switchbtn=document.querySelector(".switch");
let rightelem=document.querySelector(".right");
let ielem=document.querySelector(".switch i");

let leftbtn=document.querySelector(".left-btn i");
let playbtn=document.querySelector(".play-btn .fa-play");
let pausebtn=document.querySelector(".play-btn .fa-pause");
let rightbtn=document.querySelector(".right-btn i");

let playlist=document.querySelector(".right ul");
let audio=document.getElementById("audio")

let imagedisplay=document.querySelector(".image img");
let musicName=document.querySelector(".song-name");
let artistName=document.querySelector(".artist-name");

let progresBar=document.querySelector(".bar");
let currentTimenelem=document.querySelector(".currentEl");
let durationelem=document.querySelector(".durationEl");

durationelem.innerHTML="00:00"
let  currentIndex=0;
domRender(currentIndex)

musicList.forEach(item=>{
    let lists=document.createElement("li")
    lists.innerText=`${item.artistName}-${item.musicName}`;
    playlist.appendChild(lists)
})

let lielem=document.querySelectorAll("li");
lielem.forEach((item,index)=>{
     item.addEventListener("click",()=>{
        domRender(index)
        audio.play()
        pausebtn.classList.add("active")
        playbtn.classList.add("deactive")
     })
    })


switchbtn.addEventListener("click",()=>{
    rightelem.classList.toggle("right-1")
    ielem.classList.toggle("left-arrow")
})

playbtn.addEventListener("click",()=>{
    pausebtn.classList.add("active")
    playbtn.classList.add("deactive")
    audio.play()

})


pausebtn.addEventListener("click",()=>{
    pausebtn.classList.remove("active")
    playbtn.classList.remove("deactive")
    audio.pause()
})

rightbtn.addEventListener("click",()=>{
    
    pausebtn.classList.add("active")
    playbtn.classList.add("deactive")
    currentIndex++
    if (currentIndex===musicList.length) {
        currentIndex=0
    }
    domRender(currentIndex)
    audio.play()
})


leftbtn.addEventListener("click",()=>{
    pausebtn.classList.add("active")
    playbtn.classList.add("deactive")
    currentIndex--
    if (currentIndex===-1) {
        currentIndex=musicList.length-1
    }
    domRender(currentIndex)
    audio.play()
})


function domRender(param) {
    audio.src=`./assets/audio/${musicList[param].musicPath}`
    imagedisplay.src=`./assets/image/${musicList[param].imagePath}`
    document.body.style.backgroundImage=`url(./assets/image/${musicList[param].imagePath})`
    musicName.textContent=musicList[param].musicName
    musicName.textContent=musicList[param].musicName
    artistName.textContent=musicList[param].artistName
}

function setProgressbar(e) {
    const {duration ,currentTime}=audio;
    const progressPercent=(currentTime/duration)*100 
    progresBar.style.width=`${progressPercent}%`;
    const formatTime=(time)=>String(Math.floor(time)).padStart(2,'0');
    currentTimenelem.textContent=`${Math.floor(currentTime/60)}:${formatTime(currentTime % 60)}`
    durationelem.textContent=duration? `${Math.floor(duration/60)}:${formatTime(duration % 60)}` : "00:00"
}

audio.addEventListener("timeupdate",setProgressbar)