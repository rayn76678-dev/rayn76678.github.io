let categories =
JSON.parse(localStorage.getItem("categories"))
||
[
"IELTS",
"German",
"CS",
"GIS"
];



function render(){

let box=document.getElementById("categories");

box.innerHTML="";


categories.forEach(
function(name){


let div=document.createElement("div");


div.className="card";


div.innerHTML=name;



div.onclick=function(){

location.href=
"category.html?name="
+
name;

}


box.appendChild(div);



}

);


}



document.getElementById("add").onclick=function(){


let name=
prompt("输入新分区名称：");


if(name){

categories.push(name);


localStorage.setItem(
"categories",
JSON.stringify(categories)
);


render();


}


}



render();
