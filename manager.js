let params =
new URLSearchParams(
location.search
);


let space =
params.get("space");


let type =
params.get("type");


let folder =
params.get("folder");



let key =
space+"_"+type;



let data =
JSON.parse(
localStorage.getItem(key)
)
||
[];




// 返回按钮

document
.getElementById("backSpace")
.href=
"space.html?name="+space;



// 标题

document
.getElementById("pageTitle")
.innerHTML=
space+" / "+type;





// 当前目录

let current = data;



if(folder!==null){


current =
data[folder].children;


}





// 初始化导入按钮


let importBtn =
document.getElementById(
"importBtn"
);



if(type==="Website"){


importBtn.innerHTML=
"Import Website";


}
else{


importBtn.innerHTML=
"Import File";


}



importBtn.onclick=function(){


if(type==="Website"){

addWebsite();

}

else{

addFile();

}


};






function save(){

localStorage.setItem(
key,
JSON.stringify(data)
);

}





function render(){


let box =
document.getElementById(
"cards"
);


box.innerHTML="";



current.forEach(
(item,index)=>{


let card =
document.createElement(
"div"
);


card.className="card";



card.innerHTML=


`

<div class="menu"
onclick="openMenu(event,${index})">

⋮

</div>


<h3>

${item.type==="folder"
?
"📁 "
:
(type==="Website"?"🌐 ":"📄 ")
}

${item.name}

</h3>


<p>

${item.type==="folder"
?
"Folder"
:
item.info||"File"
}

</p>


`;





if(item.type==="folder"){


card.onclick=function(){


location.href=

"manager.html?space="
+
space+
"&type="
+
type+
"&folder="
+
getRealIndex(index);


};



}




box.appendChild(card);



});


}





// 找真实index

function getRealIndex(i){

return data.indexOf(current[i]);

}





function toggleMenu(){


let menu =
document.getElementById(
"addMenu"
);


if(menu.style.display==="none"){

menu.style.display="block";

}

else{

menu.style.display="none";

}


}







function createFolder(){


let name =
prompt(
"Folder name:"
);



if(!name)return;



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







function addFile(){


let name =
prompt(
"File name:"
);



if(!name)
return;



current.push({

type:"file",

name:name,

info:"File"

});


save();

render();


}







function openMenu(e,index){


e.stopPropagation();



let menu =
document.createElement(
"div"
);


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
