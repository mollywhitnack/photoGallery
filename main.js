
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

let currImage = null;
let imgSelected = false;
let replaceImg = null;

function init(){
    console.log("page Loaded!!");

    //render images in inital order
    //let imageAr = [];
    renderImages();

  }

  function renderImages(){
    var ref = document.querySelector('.gallery');

    //remove elements
    //var myNode = document.getElementById("foo");
    while (ref.firstChild) {
      ref.removeChild(ref.firstChild);
    }

    console.log('ref:', ref);
    //use a map 
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

    //console.log('highlight this', event);
    if(!imgSelected)
    this.style.border = "2px solid #F05A50";
      //this.style.marginLeft = "250px";
      //this.style.marginTop = "100px";
    if(imgSelected){
      //console.log('replaceImg:', this);
      //replace highlight with empty square
      replaceImg = this;
      this.style.marginRight = "250px";
      //console.log('replaceImg:', replaceImg);
      /*let temp = images[parseInt(this.id)];
      console.log('replace', images[parseInt(this.id)].url, ' with ', images[parseInt(currImage.id)].url )
      images[parseInt(this.id)].url = images[parseInt(currImage.id)];
      let first = images.slice(0, parseInt(this.id)-1);
      let last  = images.slice(parseInt(this.id)-1, images.length);
      console.log('first:', first);
      console.log('last:', last);
      images = first.concat([{'url':'blank'}], last);*/

    }
  }

  function removeHighlight(event){
    this.style.border = "2px solid #000";
    this.style.marginRight = "5px";

    //console.log('remove highlight this :', event);
  }

  function imgMouseDown () {
    console.log('mouse down:')
    stateMouseDown = true;
    imgSelected = true;
    currImage = this;
    console.log('set curr image to :', currImage);
    document.addEventListener ("mousemove" , imgMouseMove , false);
  }

  function imgMouseMove(event) {
    var pX = event.pageX+20;
    var pY = event.pageY;
    //console.log('move:', currImage);
    //console.log('event:', event);
    //console.log('currImage:', currImage);
    currImage.style.position = "absolute";
    currImage.style.border="2px solid #F05A50";
    currImage.style.left = pX + "px";
    currImage.style.top = pY + "px";
    document.addEventListener ("mouseup" , imgMouseUp , false);
  }

  function imgMouseUp (event) {
      console.log('up:');
      imgSelected = false;
      var pX = event.pageX;
      var pY = event.pageY;
      console.log('px:', pX);
      console.log('py:', pY);
      console.log("old: ", currImage);
      console.log("new: ", replaceImg)
      /*let temp = images[0];
      console.log('temp:', temp);
      images[0] = images[1];
      images[1] = temp;*/
      console.log('images:', images);
      console.log('swap temp and re-render')
      renderImages();
      //console.log('swap' , images[parseInt(currImage.id)], 'with', images[parseInt(replaceImg.id)]);
      currImage.style.position = "static";
      document.removeEventListener ("mousemove" , imgMouseMove , false);
      document.removeEventListener ("mouseup" , imgMouseUp , false);
  }
  