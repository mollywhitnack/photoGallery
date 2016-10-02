
document.addEventListener('DOMContentLoaded', init);

var images = [
  {'url': "./images/1.png"},
  {'url': "./images/2.png"},
  {'url': "./images/3.png"},
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

let currImage = null; //image being dragged
let imgSelected = false;
let replaceImg = null;

function init(){
    console.log("page Loaded!!");
    renderImages();
    //window.addEventListener('mouseup', mouseUp, false);
}

/*function mouseUp()
{
    window.removeEventListener('mousemove', mouseMove, true);
}*/

function renderImages(){
  currImage = null;
  imgSelected = false;
  replaceImg = null;
  var ref = document.querySelector('.gallery');
  //remove elements
  while (ref.firstChild) {
    ref.removeChild(ref.firstChild);
  }

  console.log('ref:', ref);
  for(let i=0; i<images.length; i++){
    let src = images[i].url;
    console.log('src:', src);
    let img = document.createElement('img');
    img.src = src;
    img.className = "image"
    img.id = i;
    img.addEventListener('mouseenter', highlight)
    img.addEventListener('mouseleave', removeHighlight)
    img.addEventListener("mousedown" , imgMouseDown , false);
    ref.appendChild(img);
  }
}

function clickImage(){
  console.log('image clicked')
  //console.log('this:', this);
}

function highlight(event){
  //can set previous image margin to plus n width to create empty space....
  // then need to re-order image array and re-render(potentially)?

  if(!imgSelected){
    this.style.border = "2px solid #F05A50";
    //this.style.border = "2px solid #fbfaf9";
  }

  if(imgSelected){
    replaceImg = this;
    //this.style.marginRight = "260px";
    this.style.paddingLeft = "260px";
    console.log("replaceImg:", replaceImg);
  }
}

function removeHighlight(event){
  //this.style.border = "2px solid #fbfaf9;";
  console.log('remove highlight:', this);
  this.style.border = "2px solid #fbfaf9";
  this.style.paddingLeft = "0px";
}

function imgMouseDown () {
  console.log('mouse down:')
  stateMouseDown = true;
  imgSelected = true;

  if(currImage === null)
    currImage = this;

  console.log('set curr image to :', currImage);
  document.addEventListener ("mousemove" , mouseMove , false);
}

function mouseMove(event) {
  var pX = event.pageX+20;
  var pY = event.pageY;
    currImage.style.position = "absolute";
    currImage.style.border="2px solid #F05A50";
    currImage.style.left = pX + "px";
    currImage.style.top = pY + "px";
    document.addEventListener ("mouseup" , imgMouseUp , false);
  
}

function imgMouseUp (event) {
    console.log('up:');
    //need to shift whole array instead of swap
    imgSelected = false;
    console.log("selected image: ", currImage.id);
    console.log("new position: ", replaceImg.id);

    let selectedImage = parseInt(currImage.id);
    let newPosition = parseInt(replaceImg.id);
    let insert = images.splice(selectedImage, 1);
    console.log('spliced image:', insert)
    let first  = images.slice(0, newPosition);
    let last  = images.slice(newPosition, images.length)
    console.log('first:', first);
    console.log('last:', last);
    images = first.concat(insert, last);
    console.log('new images:', images);
    /*let temp = images[a];
    images[a] = images[b];
    images[b] = temp;*/
    //console.log('swap' , images[parseInt(currImage.id)], 'with', images[parseInt(replaceImg.id)]);
    currImage.style.position = "static";
    document.removeEventListener ("mousemove" , mouseMove , false);
    document.removeEventListener ("mouseup" , imgMouseUp , false);
    renderImages();
}
