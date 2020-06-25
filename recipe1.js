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
    //iau textul care trebuie afisat
    let text=document.querySelector(".recipe p").innerHTML;

    //voi avea in jur de 1000 de caractere pe pagina
    let n=1000;


    let lista_pagini=[];

    let i=n;//incep de la caracterul 1000
    let prev=0;//ianitea lui a fost caracterul 0
    while(i<text.length)
    {
        while(text[i]!=" ")//daca caracterul curent nu e spatiu
        {
            i--;//decrementez
        }
        //cand ajung la un spatiu atasez pagina curenta la lista de pagini
        lista_pagini.push(text.substr(prev,i-prev+1));
        prev=i+1;//fac update la prev si la i
        i+=n;
    }
    //pun is ultima pagina in lista
    lista_pagini.push(text.substr(i-n+1, text.length-i+n));
    nr_pagini=lista_pagini.length;


    let modal_body=document.querySelector(".modal-body-read");
    let next=document.querySelector(".modal-next-button-read");
    let previous=document.querySelector(".modal-previous-button-read");
    let inv=document.querySelector(".inv");

    //fac un nou paragraf care sa caontina prima pagina
    new_element=document.createElement("p");
    new_element.innerHTML=lista_pagini[0];
    
    //daca primul element din modal este paragraful invizibil insezer noul element in modal
    if(inv==modal_body.firstElementChild)modal_body.insertBefore(new_element, inv);

    let page_number = document.querySelector(".page-number");
    //si fac update la numarul paginii afisat
    page_number.innerHTML="1/"+nr_pagini;
    //de la indicele 1 incep un setInterval
    i=1;
    var timer=setInterval( () =>
    {
        if(i<nr_pagini)//daca nu am ajuns la final
        {
            new_element.innerHTML=lista_pagini[i];//modific continutul textului
            page_number.innerHTML=(i+1)+"/"+nr_pagini;//modific numarul paginii
            i++;
        }
    }, 10000)
    next.addEventListener("click", ()=>//cand se da click pe next
    {
        clearInterval(timer);//se opreste intervalul
        if(i<nr_pagini-1)//daca eram pe maxim penultima pagina
        {
            //modific paragraful si pagina
            new_element.innerHTML=lista_pagini[i];
            page_number.innerHTML=(i+1)+"/"+nr_pagini;
            i++;
            //pornesc din nou intervalul
            timer=setInterval( () =>
            {
                if(i==nr_pagini) i=0;
                new_element.innerHTML=lista_pagini[i];
                page_number.innerHTML=(i+1)+"/"+nr_pagini;
                

                i++;
            }, 10000)
        }
    });
    //analog pentru previous
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
