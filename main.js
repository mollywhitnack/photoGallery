
document.addEventListener('DOMContentLoaded', init);
var images = [
  {'url': "./images/1.png"},
  {'url': "./images/2.png"},
  {'url': "./images/3.png"},
  {'url': "./images/4.png"},
  {'url': "./images/5.png"},
  {'url': "./images/6.png"},
  {'url': "./images/7.png"},
  {'url': "./images/8.png"},
  {'url': "./images/9.png"},
  {'url': "./images/10.png"},
  {'url': "./images/11.png"},
  {'url': "./images/12.png"},]

let currImage = null; 
let imgSelected = false;
let replaceImg = null;
let addleft = false;
function init(){
    console.log("page Loaded!!");
    renderImages();
}

function renderImages(){
  currImage = null;
  imgSelected = false;
  replaceImg = null;
  var ref = document.querySelector('.gallery');
  //remove elements
  while (ref.firstChild) {
    ref.removeChild(ref.firstChild);
  }

  for(let i=0; i<images.length; i++){
    let src = images[i].url;
    let img = document.createElement('img');
    img.src = src;
    img.className = "image"
    img.id = i;
    //console.log('index: ', i, " image: ", src);
    img.addEventListener('mouseenter', highlight)
    img.addEventListener('mouseleave', removeHighlight)
    img.addEventListener("mousedown" , imgMouseDown , false);
    ref.appendChild(img);
  }
}

function highlight(event){
  if(!imgSelected){
    this.style.border = "2px solid #F05A50";
  }

  if(imgSelected){
    //console.log('set replaceImg:', this);
    replaceImg = this;
   // console.log('left:', this.offsetLeft);
   // console.log('top:', this.offsetTop);
    //console.log('width:', this.width);
    var pX = event.pageX;
    var pY = event.pageY;
    let difference  = pX-this.offsetLeft
    console.log("difference:", difference)
    if(difference < 125){
      addleft = true;
      let pic = this;
            console.log('add left');
      pic.style.paddingLeft = "260px";
      /*setTimeout(
        function(){
            }, 100);*/
      
    }
    else{
      addleft = false;
      let pic = this;
      console.log('add right');
      pic.style.paddingRight = "260px";
      /*setTimeout(function(){
        
      }, 100);*/
    }
    //this.style.border = "2px solid black";
    //console.log("replaceImg:", replaceImg);
  }
}

function removeHighlight(event){
  console.log("-----remove-----")
  //console.log('remove highlight:', this);
  this.style.border = "2px solid #fbfaf9";
  this.style.paddingLeft = "0px";
  this.style.paddingRight = "0px";
}

function imgMouseDown () {
  stateMouseDown = true;
  imgSelected = true;

  if(currImage === null)
    currImage = this;

  document.addEventListener ("mousemove" , mouseMove , false);
}

function mouseMove(event) {
  var pX = event.pageX+20;
  var pY = event.pageY-20;
  currImage.style.position = "absolute";
  currImage.style.border="2px solid #F05A50";
  currImage.style.left = pX + "px";
  currImage.style.top = pY + "px";
  document.addEventListener ("mouseup" , imgMouseUp , false); 
}

function imgMouseUp (event) {

  //image going after if after and before if before, needs to be consistnent
    console.log('up:');
    //imgSelected = false;
    let selectedImage = parseInt(currImage.id);
    let newPosition = parseInt(replaceImg.id);
    if(selectedImage < newPosition && addleft)
      newPosition--;
    else if(selectedImage > newPosition && !addleft)
      newPosition++;
    /*console.log('selectedImage:', selectedImage)
    console.log('newPosition:', newPosition)
    //remove selected image from array
    console.log('images after splice:', images);*/
    
    let insert = images.splice(selectedImage, 1);
    let first  = images.slice(0, newPosition);
    let last  = images.slice(newPosition, images.length);

    //console.log('first:', first);
    //console.log('last:', last);
    images = first.concat(insert, last);
    //console.log('new images:', images);
    currImage.style.position = "static";
    document.removeEventListener ("mousemove" , mouseMove , false);
    document.removeEventListener ("mouseup" , imgMouseUp , false);
    renderImages();
}




