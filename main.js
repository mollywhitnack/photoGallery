
document.addEventListener('DOMContentLoaded', init);
let selected = null; //Image to be moved
let x_pos = 0, y_pos = 0; //Cordinates for mouse pointer
let currImage = null; 
let imgSelected = false;
let replaceImg = null; //Image to replace with
let addleft = false;

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


function init(){
    renderImages();
    document.onmousemove = imgMove;
}

function renderImages(){
  currImage = null;
  imgSelected = false;
  replaceImg = null;
  var ref = document.querySelector('.gallery');

  while (ref.firstChild) {
    ref.removeChild(ref.firstChild);
  }

  for(let i=0; i<images.length; i++){
    let src = images[i].url;
    let img = document.createElement('img');
    let container = document.createElement('span');
    img.src = src;
    img.className = "image"
    img.id = i;
    container.id = i;
    container.className = "drag";
    container.style.position = "static";

    container.addEventListener('mousemove', highlight)
    container.addEventListener('mouseout', removeHighlight)

    container.onmousedown = function () {
      imgMouseDown(this);
      return false;
    };

    container.onmouseup = function () {
      selected = null;
      imgSelected = false;
      imgMouseUp(this);
    };

    container.appendChild(img)
    ref.appendChild(container);
  }
}

function highlight(event){

  if(!imgSelected){
    this.childNodes[0].style.border = "3px solid #F05A50";
  }

  if(imgSelected && currImage !== this.childNodes[0]){
    replaceImg = this.childNodes[0];
    var pX = event.pageX;
    let difference  = pX-this.childNodes[0].offsetLeft
    if(difference < 125){
      //this.childNodes[0].style.paddingLeft = "260px";
      //this.childNodes[0].style.paddingRight = "0px";
      addleft = true;     
    }
    else{
      //this.childNodes[0].style.paddingRight = "260px";
      //this.childNodes[0].style.paddingLeft = "0px";
      addleft = false;
    }
  }
}

function removeHighlight(event){
    this.childNodes[0].style.border = "3px solid #fbfaf9";
  if(currImage !== this.childNodes[0]){
    //this.childNodes[0].style.paddingLeft = "0px";
    //this.childNodes[0].style.paddingRight = "0px";
  }

}

function imgMouseDown (elem) {
  selected = elem;
  //x_elem = this.event.clientX-selected.offsetLeft;
  //y_elem = this.event.clientY-selected.offsetTop;
  stateMouseDown = true;
  imgSelected = true;
  if(currImage === null){
    currContainer = elem;
    currImage = elem.childNodes[0];
  }
}

function imgMove(e) {
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    
    if (selected !== null) {
        selected.childNodes[0].style.border = "3px solid #F05A50";
        selected.style.position = "absolute";
        selected.style.margin = "0px";
        selected.style.left = x_pos +'px';
        selected.style.top = y_pos +'px';
    }
}

function imgMouseUp (el) {


      if(replaceImg && currImage){
        let selectedImage = parseInt(currImage.id);
        let newPosition = parseInt(replaceImg.id);
        if(selectedImage < newPosition && addleft)
          newPosition--;
        else if(selectedImage > newPosition && !addleft)
          newPosition++;
        
        let insert = images.splice(selectedImage, 1);
        let first  = images.slice(0, newPosition);
        let last  = images.slice(newPosition, images.length);

        images = first.concat(insert, last);
        renderImages();
      }
}

