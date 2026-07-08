let language={

zh:{

title:"个人档案",

intro:
"关于语言、科技与探索的个人知识系统。"

},


en:{

title:"Personal Archive",

intro:
"A personal knowledge system about language, technology and exploration."

},


de:{

title:"Persönliches Archiv",

intro:
"Ein persönliches Wissenssystem über Sprache, Technologie und Exploration."

}

};




function changeLanguage(lang){


document
.getElementById("title")
.innerHTML=
language[lang].title;



document
.getElementById("intro")
.innerHTML=
language[lang].intro;



}
