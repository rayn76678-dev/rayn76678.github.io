let spaces = JSON.parse(
localStorage.getItem("spaces")
)
||
[

{
name:"GIS",
desc:"Geoinformation Science"
},

{
name:"CS",
desc:"Programming & Computing"
},

{
name:"German",
desc:"Deutsch Learning"
},

{
name:"IELTS",
desc:"English Academic Skills"
}

];





function save(){

localStorage.setItem(
"spaces",
JSON.stringify(spaces)
);

}





function render(){


let box=document.getElementById("cards");

box.innerHTML="";



spaces.forEach((space,index)=>{


let card=document.createElement("div");

card.className="card";


card.innerHTML=

`

<div class="menu"
onclick="showMenu(event,${index})">

⋮

</div>


<h3>
${space.name}
</h3>


<small>
${space.desc}
</small>


<p>
Website · Files
</p>


`;



card.onclick=function(){

location.href=
"space.html?name="
+
space.name;

}



box.appendChild(card);



});


}





function addSpace(){


let name=
prompt(
"Input new space name:"
);



if(name){


spaces.push({

name:name,

desc:"Personal Knowledge Space"

});


save();

render();


}



}






function showMenu(e,index){

e.stopPropagation();



let old=document.querySelector(".popup");

if(old)
old.remove();



let menu=document.createElement("div");

menu.className="popup";


menu.innerHTML=

`

<div onclick="renameSpace(${index})">

Rename

</div>


<div onclick="deleteSpace(${index})">

Delete

</div>

`;



e.target.parentElement.appendChild(menu);



}





function renameSpace(index){


let name=
prompt(
"New name:",
spaces[index].name
);


if(name){

spaces[index].name=name;

save();

render();

}


}





function deleteSpace(index){


let yes=
confirm(

"Are you sure to delete "
+
spaces[index].name
+
"?"

);



if(yes){

spaces.splice(index,1);

save();

render();

}


}



render();
