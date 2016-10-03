
document.addEventListener('DOMContentLoaded', init);
var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

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
    document.onmousemove = _move_elem;
    //document.onmouseup = OnMouseUp;
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
    let container = document.createElement('span');
    img.src = src;
    img.className = "image"
    img.id = i;
    container.id = i;
    container.className = "drag";
    container.style.position = "static";

    container.addEventListener('mousemove', highlight)
    //onmouse move over for element?
    container.addEventListener('mouseout', removeHighlight)
    //mouse out or mouse leave?

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
  console.log('ref:', ref);
}

//should have something always listening?
function highlight(event){

  if(!imgSelected){
    this.childNodes[0].style.border = "2px solid #F05A50";
  }

  if(imgSelected && currImage !== this.childNodes[0]){
    replaceImg = this.childNodes[0];
    var pX = event.pageX;
    var pY = event.pageY;
    let difference  = pX-this.offsetLeft
    console.log('difference:', difference);
    if(difference < 125){
      addleft = true;
      let pic = this;
      this.childNodes[0].style.paddingLeft = "260px";      
    }
    else{
      addleft = false;
      let pic = this;
      this.childNodes[0].style.paddingRight = "260px";
    }
  }
}

function removeHighlight(event){
  this.childNodes[0].style.border = "2px solid #fbfaf9";
  this.childNodes[0].style.padingLeft = "0px";
  this.childNodes[0].style.paddingRight = "0px";
}

function imgMouseDown (elem) {
  selected = elem;

  x_elem = selected.offsetLeft;
  y_elem = selected.offsetTop;

  stateMouseDown = true;
  imgSelected = true;

  if(currImage === null){
    currContainer = elem;
    currImage = elem.childNodes[0];
  }
}

function _move_elem(e) {

    console.log('e:', e);
    console.log('selected:', selected);
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    
    if (selected !== null) {
        selected.style.position = "absolute";
        selected.style.margin = "0px";
        selected.style.left = x_pos + 'px';// - x_elem) + 'px';
        selected.style.top = y_pos + 'px';// - y_elem) + 'px';
        //console.log("x_pos:", x_pos);
        //console.log("y_pos:", y_pos);
    }
}

function imgMouseUp (el) {

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

