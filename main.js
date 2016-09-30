
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

function init(){
    console.log("page Loaded!!");
    //document.getElementsByClassName('image')[0].addEventListener('click', clickImage)
    //document.getElementsByClassName('groupBtn')[0].addEventListener('click', sortGroups)
    //el.innerHTML = '';

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
      //img.addEventListener('mouseenter', highlight)
      //img.addEventListener('mouseleave', removeHighlight)
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

  }
  function removeHighlight(event){
    console.log('remove highlight this :', event);
  }

  function imgMouseDown () {
    console.log('mouse down:')
    stateMouseDown = true;
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
  // function randomStudent(){
  //   console.log("HERE");
  //   //Get names
  //   var el = document.querySelector('#textArea');
  //   var names  = el.value.split(/[ ,]+/);
  //   Allnames = Allnames.concat(names);
  //   console.log("all Names: " + Allnames);
  //   console.log(names.length);
  //   var rand = Math.floor(Math.random() * (names.length));
  //   //console.log('random student: ' + names[rand]);
  //   var el2 = document.querySelector('.pickedStud');
  //   el2.innerHTML = '<p>' + names[rand] + '</p>';
  //   el2.style.height = '50px';
  //   //el.style.color = "transparent";

  //   /*var hideentext = names;
  //   var hiddenNames = document.querySelector('.hiddenNames');
  //   hiddenNames.innerHTML(hideentext);*/
  //   //el.empty();
  //   el.value = '';
  // }

  //   function sortGroups(){
  //   //var testing = document.querySelector('.hiddenNames');
  //   //console.log("testing: " + testing.value);


  //   var groupss = document.querySelector('#textArea3');
  //   //console.log("groups:" + groupss.value);   
  //   var el = document.querySelector('#textArea');
  //   //var names  = el.value.split(/[ ,]+/);
  //   console.log("all names in sortgroups: " + Allnames);
  //   var n = Allnames.length;
  //   var m = groupss.value;
  //   var groups = 0;
  //   if( m != 0){
  //     //console.log("m: " + m);
  //     groups = Math.floor(n/m);
  //   }
  //   else if(m == 0)
  //     alert("Invalid Entry");
  //   //console.log("groupsHERE: " + groups);
    

  //   var elem = document.querySelector('div.grouplist');
  //   elem.innerHTML = '';
    
  //   for(var i = 0; i<groups; i++){
  //     var group = document.createElement('span');
  //     group.classList.add('group' + i);
  //     group.innerHTML = ("<h4> Group " + i)
  //     group.style.marginLeft = "5%";
  //     var ref = document.querySelector('div.grouplist');
  //     ref.appendChild(group);
  //     //console.log("-----------------");
  //       for(var j =0; j<m; j++){
  //         var rand = Math.floor(Math.random() * (Allnames.length));
  //         //console.log(names[rand]);
  //         var spanEl = document.createElement('li');
  //         spanEl.innerHTML =  Allnames[rand];
  //         group.appendChild(spanEl);
  //         Allnames.splice(rand, 1);
  //         var ref = document.querySelector('span.group' + i);
  //         ref.appendChild(spanEl);
  //       }
  //   }
  //   //console.log("-----------------");

  //   if(Allnames.length !=0 && groups>0){
  //     var group = document.createElement('span');
  //     group.classList.add('group' + groups);
  //     group.innerHTML = ("<h4> Group " + groups);
  //     group.style.marginLeft = "5%";
  //     var ref = document.querySelector('div.grouplist');
  //     ref.appendChild(group);
  //     while(Allnames.length){
  //       var rand = Math.floor(Math.random() * (Allnames.length));
  //       //console.log(names[rand]);
  //       var spanEl = document.createElement('li');
  //       spanEl.innerHTML =  Allnames[rand];
  //       group.appendChild(spanEl);
  //       var ref = document.querySelector('span.group' + i);
  //       ref.appendChild(spanEl);
  //       Allnames.splice(rand, 1);
  //     }
  //   }

  //   if(groups == 0 && m!=0)
  //     alert("Not Enough Student to form groups of size " + m);
  //   //el.value = '';
  //   groupss.value = '';

  // }