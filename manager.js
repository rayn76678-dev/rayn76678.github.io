let params =
new URLSearchParams(location.search);



let space =
params.get("space");


let type =
params.get("type");



document
.getElementById("title")
.innerHTML=
space+" / "+type;



document
.getElementById("back")
.href=
"space.html?name="+space;




let key =
space+"_"+type;



let items =
JSON.parse(
localStorage.getItem(key)
)
||
[];





// 根据类型改变导入按钮


if(type=="Website"){

document
.getElementById("importButton")
.innerHTML=
"Import Website";


}
else{


document
.getElementById("importButton")
.innerHTML=
"Import File";


}







document
.getElementById("importButton")
.onclick=function(){


if(type=="Website"){

importWebsite();

}
else{

importFile();

}


};







function save(){

localStorage.setItem(
key,
JSON.stringify(items)
);

}





function render(){


let box =
document.getElementById("items");


box.innerHTML="";



items.forEach((item,index)=>{


let card =
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


<p>
Folder
</p>

`;



}

else{


if(type=="Website"){


card.innerHTML=

`

<h3>

🌐 ${item.name}

</h3>


<p>

${item.url}

</p>

`;



}


else{


card.innerHTML=

`

<h3>

📄 ${item.name}

</h3>


<p>

File

</p>

`;


}


}





box.appendChild(card);



});



}






function showAdd(){


let menu =
document.getElementById("menu");


if(menu.style.display=="none")

menu.style.display="block";


else

menu.style.display="none";



}






function createFolder(){


let name =
prompt(
"Folder name:"
);



if(name){


items.push({

type:"folder",

name:name

});


save();

render();


}


}






function importWebsite(){


let name =
prompt(
"Website name:"
);


let url =
prompt(
"Website URL:"
);



if(name&&url){


items.push({

type:"website",

name:name,

url:url


});


save();

render();


}



}






function importFile(){


let name =
prompt(
"File name:"
);



if(name){


items.push({

type:"file",

name:name

});


save();

render();


}


}






function showMenu(e,index){


e.stopPropagation();



let old =
document.querySelector(".popup");


if(old)
old.remove();



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
items[index].name
);



if(name){


items[index].name=name;


save();

render();


}



}





function deleteItem(index){


if(confirm(
"Delete this item?"
)){


items.splice(index,1);


save();

render();


}


}




render();
