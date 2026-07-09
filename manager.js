let params =
new URLSearchParams(location.search);



let space =
params.get("space");


let type =
params.get("type");


let folderIndex =
params.get("folder");



let key =
space+"_"+type;



let root =
JSON.parse(
localStorage.getItem(key)
)
||
[];





document
.getElementById("backSpace")
.href =
"space.html?name="+space;




document
.getElementById("pageTitle")
.innerHTML =
space+" / "+type;





let current=root;



if(folderIndex!==null){

current =
root[folderIndex].children;

}






let importBtn =
document.getElementById("importBtn");



if(type==="Website"){

importBtn.innerHTML=
"Import Website";


}else{


importBtn.innerHTML=
"Import File";


}





importBtn.onclick=function(){


if(type==="Website"){


addWebsite();


}else{


chooseFile();


}


};









function save(){


localStorage.setItem(

key,

JSON.stringify(root)

);


}








function render(){


let box =
document.getElementById("cards");


box.innerHTML="";



current.forEach(
(item,index)=>{


let card =
document.createElement("div");


card.className="card";



let icon;



if(item.type==="folder"){

icon="📁";

}

else if(item.type==="website"){

icon="🌐";

}

else{

icon="📄";

}





card.innerHTML=

`

<div class="menu"
onclick="openMenu(event,${index})">

⋮

</div>


<h3>

${icon}

${item.name}

</h3>


<p>

${item.info || item.type}

</p>

`;





if(item.type==="folder"){


card.onclick=function(){


let id =
root.indexOf(item);



location.href=

"manager.html?space="
+
space
+
"&type="
+
type
+
"&folder="
+
id;


};


}



box.appendChild(card);



});


}









function toggleMenu(){


let menu =
document.getElementById("addMenu");



menu.style.display =
menu.style.display==="block"
?
"none"
:
"block";


}









function createFolder(){


let name =
prompt(
"Folder name:"
);



if(!name)
return;



current.push({

type:"folder",

name:name,

children:[]

});



save();

render();


}










function addWebsite(){


let name =
prompt(
"Website name:"
);



let url =
prompt(
"Website URL:"
);



if(!name||!url)
return;



current.push({

type:"website",

name:name,

info:url

});



save();

render();


}









function chooseFile(){


let input =
document.getElementById(
"fileInput"
);



input.click();



input.onchange=function(){



let file =
input.files[0];



if(!file)
return;



current.push({

type:"file",

name:file.name,

info:file.type || "File"

});



save();

render();



};



}









function openMenu(e,index){


e.stopPropagation();



let menu =
document.createElement("div");


menu.className="popup";


menu.innerHTML=

`

<div onclick="renameItem(${index})">

Rename

</div>


<div onclick="deleteItem(${index})">

Delete

</div>

`;



e.target.parentElement
.appendChild(menu);



}









function renameItem(index){


let name =
prompt(

"New name:",

current[index].name

);



if(name){


current[index].name=name;


save();

render();


}


}










function deleteItem(index){


if(confirm(
"Delete this item?"
)){


current.splice(index,1);


save();

render();


}


}







render();
