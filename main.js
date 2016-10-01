
document.addEventListener('DOMContentLoaded', init);

var images = [
  {url: "./images/1.png"},
  {url: "./images/2.png"},
  {url: "./images/3.png"},
  {url: "./images/4.png"},
  {url: "./images/5.png"},
  {url: "./images/6.png"},
  {url: "./images/7.png"},
  {url: "./images/8.png"},
  {url: "./images/9.png"},
  {url: "./images/10.png"},
  {url: "./images/11.png"},
  {url: "./images/12.png"},
]

let currImage = null;
let imgSelected = false;
let replaceImg = null;

function init(){
    console.log("page Loaded!!");

    //render images in inital order
    //let imageAr = [];
    var ref = document.querySelector('.gallery');
    console.log('ref:', ref);
    //use a map 
    for(let i=0; i<images.length; i++){
      let src = images[i].url;
     // imgCont.class = 'image';
      let img = document.createElement('img');
      img.src = src;
      img.className = "image"
      img.id = i;
      //add hover border
      img.addEventListener('mouseenter', highlight)
      img.addEventListener('mouseleave', removeHighlight)
      img.addEventListener("mousedown" , imgMouseDown , false);
      ref.appendChild(img);
    }

  }

  function clickImage(){
    console.log('image clicked')
    console.log('this:', this);
  }

  function highlight(event){
    console.log('highlight this', event);
    this.style.border = "2px solid #e65c00";
    if(imgSelected){
      replaceImg = this;
    }
  }

  function removeHighlight(event){
    this.style.border = "2px solid #000";
    console.log('remove highlight this :', event);
  }

  function imgMouseDown () {
    console.log('mouse down:')
    stateMouseDown = true;
    imgSelected = true;
    currImage = this;
    document.addEventListener ("mousemove" , imgMouseMove , false);
  }

  function imgMouseMove(event) {
    var pX = event.pageX;
    var pY = event.pageY;
    console.log('move:', currImage);
    //console.log('event:', event);
    //console.log('currImage:', currImage);
    currImage.style.position = "absolute";
    currImage.style.left = pX + "px";
    currImage.style.top = pY + "px";
    document.addEventListener ("mouseup" , imgMouseUp , false);
  }

  function imgMouseUp () {
      console.log('up:');
      currImage.style.position = "static";
      document.removeEventListener ("mousemove" , imgMouseMove , false);
      document.removeEventListener ("mouseup" , imgMouseUp , false);
  }
  