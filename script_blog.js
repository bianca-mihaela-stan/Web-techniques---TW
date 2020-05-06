var ultima_culoare_retinua_rosu="rgb(0,0,0)";
var ultima_culoare_retinua_patrat="rgb(0,0,0)";
window.onload =function()
{
    var btn=document.getElementsByTagName("button")[0];
    btn.onclick=function()//daca se da click pe color picker
    {
        deschide_modal();
    }




    var close=document.getElementById("modal-close-button");
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