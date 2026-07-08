let space =
new URLSearchParams(location.search)
.get("space");



document.getElementById("title")
.innerHTML=
space+" / Website";



document.getElementById("path")
.innerHTML=
"Website Collection";



document.getElementById("backSpace")
.href=
"space.html?name="+space;






let key=
"website_"+space;



let data=
JSON.parse(
localStorage.getItem(key)
)
||
[];







function save(){

localStorage.setItem(
key,
JSON.stringify(data)
);

}





function render(){


let box=
document.getElementById("content");


box.innerHTML="";



data.forEach((item,index)=>{



let card=
document.createElement("div");


card.className="card";




if(item.type=="folder"){


card.innerHTML=

`

<div class="menu"
onclick="showMenu(event,${index})">

⋮

</div>


<h3>
📁 ${item.name}
</h3>


<small>
Folder
</small>

`;



card.onclick=function(){

location.href=
"website.html?space="
+
space+
"&folder="
+
index;


}



}

else{


card.innerHTML=

`

<h3>
🌐 ${item.name}
</h3>


<small>

${item.url}

</small>

`;



card.onclick=function(){

window.open(
item.url
);

}


}



box.appendChild(card);



});

}





function showAddMenu(){


document
.getElementById("addMenu")
.classList
.toggle("hidden");


}







function addFolder(){


let name=
prompt(
"Folder name:"
);


if(name){


data.push({

type:"folder",

name:name,

children:[]

});


save();

render();


}


}







function addWebsite(){


let name=
prompt(
"Website name:"
);



let url=
prompt(
"Website URL:"
);



if(name&&url){


data.push({

type:"website",

name:name,

url:url

});


save();

render();


}


}







function showMenu(e,index){


e.stopPropagation();



let old=
document.querySelector(".popup");


if(old)
old.remove();



let menu=
document.createElement("div");

menu.className="popup";


menu.innerHTML=

`

<div onclick="rename(${index})">

Rename

</div>


<div onclick="removeItem(${index})">

Delete

</div>

`;



e.target.parentElement
.appendChild(menu);



}






function rename(index){


let name=
prompt(
"New name:",
data[index].name
);



if(name){


data[index].name=name;


save();

render();


}

}





function removeItem(index){


let yes=
confirm(
"Delete this item?"
);



if(yes){


data.splice(index,1);


save();

render();


}


}



render();
