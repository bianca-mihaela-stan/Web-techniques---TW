

var ultima_culoare_retinua_rosu="rgb(0,0,0)";
var ultima_culoare_retinua_patrat="rgb(0,0,0)";
var index=0;
window.onload =function()
{

    let titles=document.getElementsByTagName("h2");
    let paragraphs=document.getElementsByTagName("p");

    //atribui fiecaruit titlu sau articol un id de tipul box9
    for(let i=0; i<titles.length; i++)
    {
        titles[i].setAttribute("id", "box"+index);
        index++;
    }

    for(let i=0; i<paragraphs.length; i++)
    {
        paragraphs[i].setAttribute("id", "box"+index);
        index++;
    }

    //apelez functia care sa imi ia din localStorage textul marcat
    afiseaza_text_marcat();

    //cand apas tasta f se apeleaza functia veridica_text_marcat
    document.addEventListener("keydown", function(key)
    {
        if(key.keyCode=="70")
        {
            verifica_text_marcat();
        }
    });

    var btn=document.getElementsByTagName("button")[0];
    btn.onclick=function()//daca se da click pe color picker
    {
        deschide_modal();
    }




    var close=document.getElementsByClassName("modal-close-button")[0];
    close.onclick=function()//daca se da click pe butonul de inchis color picker-ul
    {
        inchide_modal();
    }






    var patrat=document.getElementById("patrat");
    patrat.onmousemove = function(event)//daca se misca mouse-ul pe patrat se schimba culoarea in functie de coordonate
    {
        //console.log("patrat");
        coloreaza_patratul(event);
    }





    patrat.onclick = function(event)//daca se da click pe patrat se salveaza culoarea corespunzatoare ultimului click ca cea selectata
    {
        //console.log("patrat");
        retine_culoare_patrat(event);
    }





    patrat.onmouseout=function(event)//cand se iese cu mouse-ul din patrat se revine la ultima culoare pe care s-a dat click
    {
        seteaza_ultima_culoare_patrat(event, ultima_culoare_retinua_patrat);
    }





    var rosu=document.getElementById("rosu");//acelasi mecanism pentru rosu
    rosu.onmousemove = function(event)
    {
        //console.log("patrat");
        coloreaza_rosu(event);
    }

    rosu.onclick = function(event)
    {
        //console.log("patrat");
        retine_culoare_rosu(event);
    }

    rosu.onmouseout=function(event)
    {
        seteaza_ultima_culoare_rosu(event, ultima_culoare_retinua_rosu);
    }




    var yes=document.getElementById("YES");
    yes.onclick = function(event)//daca se da click pe yes se schimab culoarea blogului si se iese din patrat
    {
        schimba_culoarea_blogului(event);
        inchide_modal();
    }






    document.addEventListener("keydown", function(key)
    {
        if(key.keyCode=="65")//daca utilizatorul apasa pe a se deschide fereastra de home foarte mica
        {   
            home=window.open("index.html", "HOME", "width=300,height=300");
        }
        if(key.keyCode=="66")//daca da pe b se inchide fereastra deschisa
        {   
            home.close();
        }

    })


    //am butonele de sortare
    var sort_buttons=document.querySelectorAll(".sort-buttons");
    sort_buttons[0].addEventListener("click", function()
    {
        sortare_dupa_culoare();
    });

    sort_buttons[1].addEventListener("click", function()
    {
        sortare_dupa_titlu();
    });

    sort_buttons[2].addEventListener("click", function()
    {
        sortare_dupa_taguri();
    });

    sort_buttons[3].addEventListener("click", function()
    {
        sortare_dupa_toate();
    });
    
}




function deschide_modal()
{
    //se face vizibil modalul
    var modal=document.getElementsByClassName("modal")[0];
    modal.style.display="block";


    //se pune overlay-ul peste blog
    var overlay=document.getElementById("overlay");
    overlay.style.opacity="80%";
}





function inchide_modal()
{
    //se face invizibil si modalul si overlay-ul
    var modal=document.getElementsByClassName("modal")[0];
    modal.style.display="none";
    var overlay=document.getElementById("overlay");
    overlay.style.opacity="0";
}






function coloreaza_patratul(event)
{
    //am nevoie de coordonatele mouse-ului
    var x=event.pageX;
    var y=event.pageY;


    //mai am nevoie de dimensiunea reala a patratului
    var patrat=document.getElementById("patrat");
    var wpatrat=window.getComputedStyle(patrat).width;
    var hpatrat=window.getComputedStyle(patrat).height;

    //prelucrez ce imi da getComputedStyle
    wpatrat=parseInt(wpatrat.substring(0, wpatrat.length-2));
    hpatrat=parseInt(hpatrat.substring(0, hpatrat.length-2));
    const rect_patrat=patrat.getBoundingClientRect();


    x=x-rect_patrat.x;//pozitia patratului relativ la marginea din stanga
    y=y-rect_patrat.top;//pozitia patratului relativ la margiena de sus


    x=Math.ceil((255*x)/wpatrat);//calculez niste valuri intre 0 si 255 ca sa le pun in rgb
    y=Math.ceil((255*y)/hpatrat);


    //din rgb(..., ..., ...) iau la rosu ce e de la prima paranetza pana la prima virgula
    var rosu=ultima_culoare_retinua_rosu.substring(4, ultima_culoare_retinua_rosu.indexOf(","));


    //cu valoarea din rosu calculez culoarea pe care o are patratul
    patrat.style.backgroundColor="rgb("+rosu+","+(x).toString()+","+y.toString()+")";
}







function coloreaza_rosu(event)
{
    //am nevoie doar de coordonatele pe orizontala
    var x=event.pageX;
    var rosu=document.getElementById("rosu");

    //am nevoie si de dimensiunea dreptunghiului pentru rosu
    var wrosu=window.getComputedStyle(rosu).width;

    //si mai am nevoie de coodonatele marginii din stanga a dreptunghiului
    wrosu=parseInt(wrosu.substring(0, wrosu.length-2));
    const rect_rosu=rosu.getBoundingClientRect();
    x=x-rect_rosu.x;

    //calculez culoarea si schimb culoarea dreptunchiului
    x=Math.ceil((255*x)/wrosu);
    rosu.style.backgroundColor="rgb("+(x).toString()+",0,0)";
}





function retine_culoare_rosu(event)
{
    //retin culoarea pe care s-a dat click
    var rosu=document.getElementById("rosu");
    ultima_culoare_retinua_rosu=rosu.style.backgroundColor;
}




function seteaza_ultima_culoare_rosu(event)
{
    //setez culoarea dreptunchiului ca fiind ultia culoare pe acre s-a dat click
    var rosu=document.getElementById("rosu");
    rosu.style.backgroundColor=ultima_culoare_retinua_rosu;
}





function retine_culoare_patrat(event)
{
    //retinm culoarea pe care s-a dat click in patrat
    var patrat=document.getElementById("patrat");
    ultima_culoare_retinua_patrat=patrat.style.backgroundColor;
}





function seteaza_ultima_culoare_patrat(event)
{
    //setez culoarea patratului ca fiind ultia culoare pe acre s-a dat click
    var patrat=document.getElementById("patrat");
    patrat.style.backgroundColor=ultima_culoare_retinua_patrat;
}


function schimba_culoarea_blogului(event)
{
    //pentru fiecare figcaption ii shcimb culoarea de background in culoarea selectata
    var a=document.getElementsByClassName("box");
    for(i=0; i<a.length; i++)
    {
        element=a[i];
        element.style.backgroundColor=ultima_culoare_retinua_patrat;
    }
    
}









function selectare_figures()
{
    var figures=document.querySelectorAll("figure");
    return figures;
}


function calculare_avg_culori()
{
    var lista_culori=new Array();
    var figures=document.querySelectorAll("figure");

    //iau toate imaginile
    var images=document.querySelectorAll("figure img");

    //am un canvas ascuns in document
    var canvas=document.querySelector("canvas");
    
    //trec prin toate imaginile
    for(i=0; i<images.length; i++)
    {
        var c=canvas.getContext('2d');
        canvas.width=images[i].width;
        canvas.height=images[i].height;
        c.width=images[i].width;
        c.width=images[i].height;
        c.drawImage(images[i], 0,0, canvas.width, canvas.height);

        //iau datele despre imagine( datele despre fiecare pixel)
        var img_data=c.getImageData(0, 0, canvas.width, canvas.height);
        var data=img_data.data;

        //din aceste imagini ma intereseaza red, green, blue
        var red=0;
        var green=0;
        var blue=0;
        var count=0;//count e numarul de pixeli
        
        
        //adun gradul de rosu, verde si albastru din fiecare pixel
       for(j=0; j<data.length; j+=4)
       {
            red+=data[j];
            green+=data[j+1];
            blue+=data[j+2];
            count++;
       }
       
       //lista asta nu face nimic dar e de referinta: am luat rosu, galben, verde, albastru ca culori canonice
       lista_culori_canonice=["rgb(255,0,0)","rgb(255,255,0)", "rgb(0,255,0)", "rgb(0,0,255)"];
       
       //calculez distante pana la culoarea de referinta
       var a1=Math.abs(255-Math.floor(red/count));
       var b1=Math.abs(0-Math.floor(green/count));
       var c1=Math.abs(0-Math.floor(blue/count));

       var a4=Math.abs(255-Math.floor(red/count));
       var b4=Math.abs(255-Math.floor(green/count));
       var c4=Math.abs(0-Math.floor(blue/count));


       var a5=Math.abs(0-Math.floor(red/count));
       var b5=Math.abs(255-Math.floor(green/count));
       var c5=Math.abs(0-Math.floor(blue/count));


       var a6=Math.abs(0-Math.floor(red/count));
       var b6=Math.abs(0-Math.floor(green/count));
       var c6=Math.abs(255-Math.floor(blue/count));

       var minn=Math.min(a1+b1+c1, a4+b4+c4, a5+b5+c5, a6+b6+c6);

       //unde distanta e minima inseamna ca culoarea accea reprezinta cel mai bine imaginea
       if(a1+b1+c1==minn)
       {
           lista_culori.push({culoare: "rgb(255,0,0)", figura: figures[i]});
       }
       if(a4+b4+c4==minn)
       {
        lista_culori.push({culoare: "rgb(255,255,0)", figura: figures[i]});
       }
       if(a5+b5+c5==minn)
       {
        lista_culori.push({culoare: "rgb(0,255,0)", figura: figures[i]});
       }
       if(a6+b6+c6==minn)
       {
        lista_culori.push({culoare: "rgb(0,0,255)", figura: figures[i]});
       }
    }
    return lista_culori;//lista_culori[i] = culoarea corespunzato
}


function sortare_dupa_culoare()
{
    //in primul rand trebuie sa calculez culoarea average a fiecarei poze
    var lista=calculare_avg_culori();

    var figure=document.getElementsByTagName("figure");
    var new_figures=[];
    for(i=0; i<lista.length; i++)//merg prin lista de culori
    {
        if(lista[i].culoare=="rgb(255,0,0)")
        {
            //mut figura asta la final
            put(lista[i].figura);
        }
    }
    for(i=0; i<lista.length; i++)
    {
        if(lista[i].culoare=="rgb(255,255,0)")
        {
            put(lista[i].figura);
        }
    }
    for(i=0; i<lista.length; i++)
    {
        if(lista[i].culoare=="rgb(0,255,0)")
        {
            put(lista[i].figura);
        }
    }
    for(i=0; i<lista.length; i++)
    {
        if(lista[i].culoare=="rgb(0,0,255)")
        {
            put(lista[i].figura);
        }
    }
}





function sortare_dupa_titlu()
{
    //iau figurile
    var figures=document.querySelectorAll("figure");
    //le transform in array ca erau NodeList si sortez dupa o functie de comparare
    var new_figures=(Array.from(figures)).sort(
        function(a, b)
        {
            if(a.querySelector("h2").innerText<b.querySelector("h2").innerText)
                {
                    return false;
                }
            return true;
        }
    );


    for(let i=0; i<new_figures.length; i++)
    {
        put(new_figures[i]);
    }
    
}

function sortare_dupa_taguri()
{
    var figures=document.querySelectorAll("figure");
    //sortez figurile dupa o fucntie de comparatie
    var new_figures=Array.from(figures).sort(
        function(a, b)
        {
            if(a.querySelectorAll("button").length>b.querySelectorAll("button").length)
                return 0;
            return 1;
        }
    );



    for(let i=0; i<new_figures.length; i++)
    {
        put(new_figures[i]);
    }
}




function sortare_dupa_toate()
{
    var lista=calculare_avg_culori();
    var figure=document.getElementsByTagName("figure");
    //pun figurile in 4 array-uri diferite, una pentru fiecare culoare
    var rosu=[];
    var galben=[];
    var verde=[];
    var albastru=[];
    for(i=0; i<lista.length; i++)
    {

        if(lista[i].culoare=="rgb(255,0,0)")
        {
            rosu.push(lista[i].figura);
        }
    }
    for(i=0; i<lista.length; i++)
    {
        if(lista[i].culoare=="rgb(255,255,0)")
        {
            galben.push(lista[i].figura);
        }
    }
    for(i=0; i<lista.length; i++)
    {
        if(lista[i].culoare=="rgb(0,255,0)")
        {
            verde.push(lista[i].figura);
        }
    }
    for(i=0; i<lista.length; i++)
    {
        if(lista[i].culoare=="rgb(0,0,255)")
        {
            albastru.push(lista[i].figura);
        }
    }

    //le sortez pe toate dupa acelasi functie de comparatie
    rosu.sort(
        function(a, b)
        {
            if(a.querySelectorAll("button").length>b.querySelectorAll("button").length)//mai intai compa dupa numarul de taguri
                return 0;
            else if((a.querySelectorAll("button").length==b.querySelectorAll("button").length))
            {
                if(a.querySelector("h2").innerText<b.querySelector("h2").innerText)//apoi dupa titlu
                    return 0;
                return 1;
            }
            return 1;
        }
    );
    for(let i=0; i<rosu.length; i++)
    {
        put(rosu[i]);
    }


    galben.sort(
        function(a, b)
        {
            if(a.querySelectorAll("button").length>b.querySelectorAll("button").length)
                return 0;
            else if((a.querySelectorAll("button").length==b.querySelectorAll("button").length))
            {
                if(a.querySelector("h2").innerText<b.querySelector("h2").innerText)
                    return 0;
                return 1;
            }
            return 1;
        }
    );
    for(let i=0; i<galben.length; i++)
    {
        put(galben[i]);
    }


    verde.sort(
        function(a, b)
        {
            if(a.querySelectorAll("button").length>b.querySelectorAll("button").length)
                return 0;
            else if((a.querySelectorAll("button").length==b.querySelectorAll("button").length))
            {
                if(a.querySelector("h2").innerText<b.querySelector("h2").innerText)
                    return 0;
                return 1;
            }
            return 1;
        }
    );
    for(let i=0; i<verde.length; i++)
    {
        put(verde[i]);
    }

    albastru.sort(
        function(a, b)
        {
            if(a.querySelectorAll("button").length>b.querySelectorAll("button").length)
                return 0;
            else if((a.querySelectorAll("button").length==b.querySelectorAll("button").length))
            {
                if(a.querySelector("h2").innerText<b.querySelector("h2").innerText)
                    return 0;
                return 1;
            }
            return 1;
        }
    );
    for(let i=0; i<albastru.length; i++)
    {
        put(albastru[i]);
    }

}

function put(x)
{
    var container=document.querySelector(".container-blog");
    container.insertBefore(x, container.lastChild);

}

function verifica_text_marcat()
{
    sel = window.getSelection();//imi returneaza date despre selectia din pagina

    //anchorNode = nodul in care apare selectia
    //anchorOffset = numarul de caractere de la inceputul nodului anchor pana la selectie

    //focusNode = nodul unde se termina selectia
    //focusOffset = numarul de caractere de la inceputul nodului focus pana la selectie

    //rangeCount = numarul de selectii care s-au facut in pagina

    if (sel.rangeCount)//daca s-a facut o selectie
    {
        let replacementText=sel.toString();//iau textul care a fost selectat

        //returneaza un range object care incepe de la 0
        range = sel.getRangeAt(0);

        range.deleteContents();

        //fac un element de tip mark
        let replacement_node=document.createElement("mark");
        replacement_node.innerText=replacementText;

        //ii schimb culoarea textului (asa scria in cerinta)
        replacement_node.style.color="green";

        //inserez in range noul nod
        range.insertNode(replacement_node);

        //apoi ma apuc de salvarea in localStorage
        if(localStorage.getItem("saved_text")===null)
        {
            localStorage["saved_text"] = "[]";
        }

        //fac obiectul care va fi salvat
        let obj=
        {
            nod: sel.anchorNode.parentNode.id,//iau id-ul : box9
            text: sel.anchorNode.parentNode.innerHTML// si textul din tot box-ul
        }

        let ok=0;
        let saved_texts=JSON.parse(localStorage["saved_text"]);
        //caut prin localStorage sa vad daca mai e vreo versiunea a acestui articol deja acolo
        for(let i=0; i<saved_texts.length; i++)
        {
            if(saved_texts[i].nod==sel.anchorNode.parentNode.id)
                {
                    saved_texts[i].text=sel.anchorNode.parentNode.innerHTML;
                    ok=1;
                }
        }

        //daca nu am mai avut selectii in acest articol fac push la lista
        if(ok==0)
        {
            saved_texts.push(obj);
        }

        //pun lista inapoi in localStorage
        localStorage["saved_text"]=JSON.stringify(saved_texts);
    
    }
    
    
}


function afiseaza_text_marcat()
{
    //daca am vreun text salvat in localStorage
    if(localStorage["saved_text"]!=null)
    {
        console.log(localStorage["saved_text"])
        let saved_texts=JSON.parse(localStorage["saved_text"]);

        //inlocuiesc textul din box9 cu textul salvat pentru box9
        for(let i=0; i<saved_texts.length; i++)
        {
            let box=document.getElementById(saved_texts[i].nod);
            box.innerHTML=saved_texts[i].text;
        }
    }
}
