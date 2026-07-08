
let spaces =
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




function render(){


let box=
document.getElementById("cards");


box.innerHTML="";



spaces.forEach(
(space)=>{


let card=
document.createElement("div");


card.className="card";


card.innerHTML=
`
<h3>${space.name}</h3>

<p class="tag">
${space.desc}
</p>

<p>
Website · Files · Notes
</p>

`;



card.onclick=()=>{

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
"New research space:"
);



if(name){


spaces.push({

name:name,

desc:"Personal Knowledge Space"

});


localStorage.setItem(

"spaces",

JSON.stringify(spaces)

);


render();


}

}


render();
