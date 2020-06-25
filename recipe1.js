var btn=document.querySelector(".page_mode_button");
//daca cineva apasa pe butonul pentru page-mode
btn.addEventListener("click", ()=>
{
    //se activeaza modal-ul
    var modal=document.querySelector(".modal-read");
    var overlay=document.querySelector(".overlay-read");
    overlay.style.opacity="80%";
    modal.style.display="block";
    var overlay=document.querySelector(".overlay-read");
    var close=document.querySelector(".modal-close-button-read");

    //pun si un event listener la X ca sa pot sa ies din modal si totodata sa stearga toate elementele din modal
    close.addEventListener("click", ()=>
    {
        modal.style.display="none";
        overlay.style.opacity="0%";

    })


    let titlu=document.querySelector(".recipe h2");
    let text=document.querySelector(".recipe p").innerHTML;
    console.log(text);

    let n=1000;


    let lista_pagini=[];

    let i=n;
    let prev=0;
    while(i<text.length)
    {
        while(text[i]!=" ")
        {
            i--;
        }
        lista_pagini.push(text.substr(prev,i-prev+1));
        prev=i+1;
        i+=n;
    }
    lista_pagini.push(text.substr(i-n+1, text.length-i+n));
    nr_pagini=lista_pagini.length;
    console.log(lista_pagini);

    let modal_body=document.querySelector(".modal-body-read");
    let next=document.querySelector(".modal-next-button-read");
    let previous=document.querySelector(".modal-previous-button-read");
    let inv=document.querySelector(".inv");
    new_element=document.createElement("p");
    new_element.innerHTML=lista_pagini[0];
    if(inv==modal_body.firstElementChild)modal_body.insertBefore(new_element, inv);
    let page_number = document.querySelector(".page-number");
    page_number.innerHTML="1/"+nr_pagini;
    i=1;
    var timer=setInterval( () =>
    {
        if(i==nr_pagini) i=0;
        new_element.innerHTML=lista_pagini[i];
        page_number.innerHTML=(i+1)+"/"+nr_pagini;
        

        i++;
    }, 10000)
    next.addEventListener("click", ()=>
    {
        clearInterval(timer);
        console.log("next");
        if(i==nr_pagini) i=0;
        new_element.innerHTML=lista_pagini[i];
        page_number.innerHTML=(i+1)+"/"+nr_pagini;
        i++;
        timer=setInterval( () =>
        {
            if(i==nr_pagini) i=0;
            new_element.innerHTML=lista_pagini[i];
            page_number.innerHTML=(i+1)+"/"+nr_pagini;
            

            i++;
        }, 10000)
    });
    previous.addEventListener("click", ()=>
    {
        console.log("previous");
        clearInterval(timer);
        i-=2;
        if(i==-1) i=nr_pagini-1;
        new_element.innerHTML=lista_pagini[i];
        page_number.innerHTML=(i+1)+"/"+nr_pagini;
        i++;
        timer=setInterval( () =>
        {
            if(i==nr_pagini) i=0;
            new_element.innerHTML=lista_pagini[i];
            page_number.innerHTML=(i+1)+"/"+nr_pagini;
            

            i++;
        }, 10000)
    });
});
