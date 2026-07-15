// ==============================
// 参数
// ==============================

const params = new URLSearchParams(location.search);


const space = params.get("space");

const type = params.get("type");


const folderId = params.get("folder");


// 当前目录
let currentFolder = folderId ? Number(folderId) : null;




// ==============================
// 初始化
// ==============================


document.getElementById("pageTitle").innerHTML =
space + " / " + type;



document.getElementById("backSpace").href =
"space.html?name=" + space;



const cards =
document.getElementById("cards");



// ==============================
// 菜单
// ==============================


function toggleMenu(){

let menu =
document.getElementById("addMenu");


menu.style.display =
menu.style.display === "block"
?
"none"
:
"block";

}




// ==============================
// 加载内容
// ==============================


async function loadContent(){


cards.innerHTML="";


/*
加载文件夹
*/

const {data:folders,error:folderError}
=
await supabaseClient
.from("folders")
.select("*")
.eq("space",space)
.eq("type",type);



if(folderError){

console.log(folderError);

return;

}




folders
.filter(
f=>f.parent_id===currentFolder
)
.forEach(
folder=>{


createCard(
folder,
"folder"
);


});





/*
加载文件
*/


const {data:files,error:fileError}
=
await supabaseClient
.from("files")
.select("*")
.eq("space",space);



if(fileError){

console.log(fileError);

return;

}



files
.filter(
f=>f.folder_id===currentFolder
)
.forEach(
file=>{


createCard(
file,
"file"
);


});


}







// ==============================
// 卡片
// ==============================


function createCard(item,type){


let card =
document.createElement("div");


card.className="card";



let icon =
type==="folder"
?
"📁"
:
"📄";



card.innerHTML=
`

<div class="menu"
onclick="openMenu(event,'${type}',${item.id})">

⋮

</div>


<h3>
${icon}
${item.name}
</h3>


<p>
${type==="folder"
?
"Folder"
:
"File"}
</p>


`;





// 文件夹点击

if(type==="folder"){


card.onclick=function(){


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
item.id;



};


}




// 文件点击

else{


card.onclick=function(){


window.open(
item.url,
"_blank"
);


};


}





cards.appendChild(card);



}







// ==============================
// 新建文件夹
// ==============================


async function createFolder(){


let name =
prompt(
"Folder name:"
);



if(!name)
return;



const {error}
=
await supabaseClient
.from("folders")
.insert({

name:name,

parent_id:currentFolder,

space:space,

type:type

});



if(error){

alert(error.message);

return;

}



loadContent();



}







// ==============================
// 上传文件
// ==============================


async function chooseFile(){


let input =
document.getElementById("fileInput");



input.click();



input.onchange =
async function(){


let file =
input.files[0];



if(!file)
return;



let path =
Date.now()
+
"_"
+
file.name;



// 上传 Storage


let {data,error}
=
await supabaseClient
.storage
.from("files")
.upload(
path,
file
);



if(error){

alert(error.message);

return;

}




// 获取公开URL


let {data:urlData}
=
supabaseClient
.storage
.from("files")
.getPublicUrl(path);



let url =
urlData.publicUrl;




// 写入数据库


const {error:dbError}
=
await supabaseClient
.from("files")
.insert({

name:file.name,

url:url,

path:path,

space:space,

folder_id:currentFolder


});



if(dbError){

alert(dbError.message);

return;

}



alert("Upload success");


loadContent();



};



}








// ==============================
// 右键菜单
// ==============================


function openMenu(e,type,id){


e.stopPropagation();



let choice =
confirm(
"Delete this item?"
);



if(!choice)
return;



deleteItem(type,id);


}





async function deleteItem(type,id){


if(type==="folder"){


await supabaseClient
.from("folders")
.delete()
.eq("id",id);



}

else{


await supabaseClient
.from("files")
.delete()
.eq("id",id);



}



loadContent();



}






// ==============================
// 页面启动
// ==============================


loadContent();
