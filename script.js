let spaces=
JSON.parse(
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
desc:"Programming and Computing"
},

{
name:"German",
desc:"German Language Learning"
},

{
name:"IELTS",
desc:"Academic English"
}

];



function save(){

localStorage.setItem(
"spaces",
JSON.stringify(spaces)
);

}




function render(){


let box=document
.getElementById("cards");


box.innerHTML="";



spaces.forEach((s,i)=>{


let card=document.createElement("div");


card.className="card";


card.innerHTML=

`

<div class="menu"
onclick="menu(event,${i})">

⋮

</div>


<h3>
${s.name}
</h3>


<p>
${s.desc}
</p>


<p>
Website · Files
</p>


`;



card.onclick=()=>{

location.href=
"space.html?name="
+s.name;

}



box.appendChild(card);


});


}





function addSpace(){


let name=
prompt(
"Space name:"
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





function menu(e,i){


e.stopPropagation();


let p=document.createElement("div");

p.className="popup";


p.innerHTML=

`

<div onclick="removeSpace(${i})">

Delete

</div>

`;


e.target.parentElement
.appendChild(p);


}





function removeSpace(i){


if(confirm("Delete this space?")){


spaces.splice(i,1);

save();

render();

}


}




render();
