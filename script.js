var clear;
window.onload = function () {

    //PARTEA DE SIGN IN
    var lista_clienti=[];
    var a = document.getElementById("adaugare_mail");//"nu am cont"
    var b = document.getElementById("sterge_mail");//"am deja cont"
    var c= document.getElementsByTagName("button")[0];//butonul de login
    var text=b.parentNode.parentNode.firstChild.nextSibling;//navigare in arbore
    var input_corect= new Boolean(true);
    var stare="sign in";
    var lista_clienti=[];
    var icr=0;//daca e activa averizarea pentru username sau parola incorecta
    var mst=0;//daca e activa vertizarea ca username-ul si parola nu pot fi vide

    modificare_stil_element(a, b);

    a.addEventListener("click", function () {//daca cineva da click pe a inseamna ca suntdem la stadiul de register
        stare="register";
        //creez caseta de e-mail si o adaug in formular
        creare_caseta_mail();

        //fac vizibil celalalt paragraf
        b.style.display = "block";
        a.style.display = "none";


        //modific sign in in register
        text.textContent="Register";


        //analizez inputul de la e-mail si daca nu contine @ il avertizez pe utilizator
        var txt = document.getElementsByTagName("input")[0];
        txt.onchange = function () {
            email=txt.value;
            if (txt.value.indexOf('@') == -1) {
                adaugare_avertizare_mail(txt, input_corect);
            }
            else {
                stergere_avertizare_email(txt, input_corect);
            }
        }

        // adaug caseta pentru "Terms & Conditions"
        adaugare_terms_conditions();


        //daca cumva era activa averizarea pentru username sau parola incorecta o sterg
        if(icr==1)
        {
            var av=document.getElementById("incorrect");
            av.parentNode.removeChild(av);
            icr=0;
        }

        text.proprietatea_mea=2;//2 inseamna ca se afla in starea register
        console.log(text.proprietatea_mea);


    }, true)




    //vreau sa intru in cont
    b.addEventListener("click", function () {

        stare="sign in";
        if(input_corect==false)//dac era activa averizarea o sterg
        {
            var txt = document.getElementsByTagName("input")[0];
            stergere_avertizare_email(txt, input_corect);
        }

        //sterg casuta de e-mail
        var rem = document.querySelector("input");
        rem.parentNode.removeChild(rem);

        //sterg checkbox-ul pentru Terms & Conditions
        var rem = document.querySelector("input[type=checkbox]");
        rem.parentNode.removeChild(rem);
        var rem = document.querySelector("label");
        rem.parentNode.removeChild(rem);

        //fac vizibil celalalt paragraf
        a.style.display = "block";
        b.style.display = "none";

        //modific sign in in register
        text.textContent="Sign in";
        text.proprietatea_mea=1;//1 insemna ca ne aflam in starea sign in
        console.log(text.proprietatea_mea);

        //daca cumva era activa avertizarea pentru username si parola nu pot fi vide
        if(mst==1)
        {
            var ms=document.getElementById("must");
            ms.parentNode.removeChild(ms);
            mst=0;
        }
    
    
    }, true)


    c.onclick= function()//daca cineva da click pe butonul "sign in" sau "register"
    {
        var username=document.getElementById("username").value;
        var parola=document.getElementById("parola").value;

        if(text.proprietatea_mea==1)//daca ne aflam in formularul de sign in
        {
            if(username!="" && parola!="")//nu poate sa aiba un username sau o parola goala
            {
                if(gaseste_client(username, parola, lista_clienti))//daca intr-adevar are cont
                {
                    var rem=document.getElementsByClassName("form")[0];//sterg tot formularul de sign in
                    rem.style.display="none";

                    adauga_casuta_din_stanga_sus();//adaug casuta care ii arata ca e logat
                    adaugare_username_in_casuta_de_sus(username);
                    adaugare_click_logout();
                    adaugare_optiuni();//adaug sectiunea care il intreaba ce optiune doreste(free, passionate sau chef) cu butoate radio
                }
                else//daca nu are cont
                {
                    var avertizare=document.createElement("p");//adaug o avertizare in care ii spun ca a gresit username sau parola
                    avertizare.style = "color: red;";
                    avertizare.textContent = "Incorrect username or password.";
                    avertizare.setAttribute("id", "incorrect");
                    icr=1;
                    a.parentNode.insertBefore(avertizare, a);
                }

            }
        }
        else if (text.proprietatea_mea==2)//daca vrea sa isi faca contul
        {

            var mail=document.getElementById("mail").value;
            var caseta=document.getElementById("checkbox").checked;
            
            //daca toate campurile sunt corecte
            if(username!="" && parola!="" && mail!="" && caseta==true
                && input_corect==true && username.indexOf(" ")==-1
                && parola.indexOf(" ")==-1 && mail.indexOf(" ")==-1)
            {


                //adaug clientul curent la lista de clienti
                var ob=new client(mail, username, parola);
                lista_clienti.push(ob);
                
                //il adaug si in localStorage
                let ob_serialized = JSON.stringify(ob);
                console.log(ob_serialized);
                localStorage.setItem("client"+JSON.stringify(localStorage.length), ob_serialized);
                

                //sterg sectiunea pentru logare ca sa pun altceva in loc
                var rem=document.getElementsByClassName("form")[0];
                rem.style.display="none";

                //la fel ca mai sus, adaug casuta acre ii spune ca e logat
                adauga_casuta_din_stanga_sus();
                adaugare_username_in_casuta_de_sus(username);
                adaugare_click_logout();
                adaugare_optiuni();
            }
            else//daca nu a completat iputurile corect ii dau o averizare in care ii zic ce poate fi gresit
            {
                var avertizare=document.createElement("p");
                avertizare.style = "color: red;";
                avertizare.innerHTML = "Username and password must contain characters. <br> You need to accept the terms and conditions to login.";
                avertizare.setAttribute("id", "must");
                mst=1;
                a.parentNode.insertBefore(avertizare, a);
            }
        }
    }

}

function modificare_stil_element(a, b)
{
    //pe b il ascunt, si ambelor le dau un aspect de link
    b.style.display = "none";
    a.style.color = "blue"
    a.style.textDecoration = "underline";
    b.style.color = "blue"
    b.style.textDecoration = "underline";
    a.style.cursor="pointer";
    b.style.cursor="pointer";
} 





function adaugare_avertizare_mail(txt, input_corect)
{
    //fac un contur rosu la casuta de mail
    txt.style.border = "1px red";
    txt.style.borderStyle = "solid";

    //creez elementul
    var mail = document.createElement("p");
    mail.style = "color: red;";
    mail.innerHTML = "This is <strong>not</strong> a valid e-mail address";
    mail.setAttribute("id", "avertizare-mail");

    //inserez elementul
    txt.parentNode.insertBefore(mail, txt.nextElementSibling);

    //modific obiectul boolean care imi spune daca inputul este corect
    modifyVar(input_corect, false);
}






function stergere_avertizare_email(txt, input_corect)
{
    //selectez elemntul pe care o sa il sterg
    var rem = document.getElementById("avertizare-mail");

    //il sterg
    rem.parentNode.removeChild(rem);

    //sterg si marginea rosie
    txt.style.border = "none";

    //modific obiectul boolean care imi spune daca inputul este corect pentru mail
    modifyVar(input_corect, true);
}




function creare_caseta_mail()
{
    //creez caseta de mail
    var mail = document.createElement("input");
    mail.style.marginTop = "1vh";
    mail.type = "text";
    mail.placeholder = "e-mail";
    mail.setAttribute("id", "mail");


    //o inserez inainte de primul copil din register form
    var parinte = document.getElementsByClassName("register-form")[0];
    var copil = parinte.getElementsByTagName("input")[0];
    parinte.insertBefore(mail, copil);
}





function modifyVar(obj, val) 
{
    //modificare "prin referinta" a obiectului Boolean
    obj.valueOf = obj.toSource = obj.toString = function(){ return val; };
}






function adaugare_terms_conditions()
{
    var container = document.createElement("div");
    container.style.display="block";
    var nou1 = document.createElement("input");
    nou1.type = "checkbox";
    nou1.setAttribute("id", "checkbox");
    var nou2 = document.createElement("label")
    nou2.textContent = "I agree to the Terms & Conditions.";

    //fac un container cu checkbox-ul
    container.appendChild(nou1);
    container.appendChild(nou2);

    //inserez acest container inaintea butonului de login
    var btn = document.getElementsByTagName("button")[0];
    btn.parentNode.insertBefore(container, btn);
}






function gaseste_client(username, parola, lista_clienti) 
{
    //caut clientul in localStorage
    for(i=0; i<localStorage.length; i++)
    {
        var x=JSON.parse(localStorage.getItem("client"+JSON.stringify(i)));
        if(x!=null && x.parola==parola && x.username==username)//daca se potrivesc datele
        {
            return true;
        }
    }
    return false;
}







function adauga_casuta_din_stanga_sus()
{
    var casuta=document.getElementById("loged-box");
    casuta.style.display="block";

    var ora=document.getElementById("ora");


    //clear este variabila, globala, variabila returnata de set_interval
    //este variabila globala pentru a putea fi accesata si pentru clearInterval


    var clear=setInterval(function() //la fiecare 1 secunda modifica ora
    {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //ianuarie e 0
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        var time=new Date();
        var hh=String(time.getHours());
        var min=String(time.getMinutes());
        var sec=String(time.getSeconds());

        time=hh+ ":" + min + ":" + sec;

        ora.textContent=today+" "+time;
    }, 1000, ora);


}





function adaugare_username_in_casuta_de_sus(username)
{
    //adaug username-ul, cu cateva stilizari
    var b=document.getElementById("box-username");
    b.textContent=username;
    b.style.float="left";
    b.style.margin="0";
    b.style.marginBottom="0.2em";

}






function adaugare_click_logout()
{
    //adaug butonul epntru logout
    var a=document.getElementById("logout");
    a.style.float="right";
    a.style.margin="0";
    a.style.marginBottom="0.2em";
    a.style.cursor="pointer";




    a.addEventListener("click", function() {//cand cineva da click pe logout
        //apare din nou formularul de inregistrare
        var rem=document.getElementsByClassName("form")[0];
        rem.style.display="block";


        //dispare casuta care ii indica ca e logat
        var casuta=document.getElementById("loged-box");
        casuta.style.display="none";


        //se opreste functia care calcula ora la fiecare secunda
        clearInterval(clear);

        //ascund sectiunea cu optiuni
        var section=document.getElementById("selectare");
        section.style.display="none";

        //ascund si link-ul pentru call
        var call=document.getElementById("call");
        call.style.display="none";
    }, true)



}






function adaugare_optiuni()//adaug sectiunea care il intreaba daca vrea sa fie utilizator free, passionate sau chef
{
    //fac viziliba sectiunea
    var section=document.querySelector("section:nth-of-type(2)");
    section.style.display="block";

    var apasat=0;//daca este sau nu apasat radio3
    var radio1=document.querySelector("section:nth-of-type(2) input");
    console.log(radio1.classList[0]);
    var radio2=document.getElementsByClassName(radio1.classList[0])[1];
    var radio3=document.querySelector("section:nth-of-type(2) input:nth-of-type(3)");





    radio1.addEventListener("click",function(event)//cand este selectata optiunea free
    {
        apasat=0;
        event.stopPropagation();//il opresc din a face bubble

        //dar ii modific culoarea de background
        var btn=document.getElementsByTagName("button")[1];
        btn.style.backgroundColor="lightblue";
    })





    radio2.addEventListener("click",function()//cand este selectata optiunea passionate
    {
        apasat=0;
        //pe el il las sa faca bubble

        //si ii modific background-ul
        var btn=document.getElementsByTagName("button")[2];
        btn.style.backgroundColor="lightblue";
    })






    radio3.addEventListener("click",function()
    {
        apasat=1;
        //pe el il las sa faca bubble

        //si ii modific background-ul
        var btn=document.getElementsByTagName("button")[3];
        btn.style.backgroundColor="lightblue";
    })





    section.addEventListener("click",function(event)
    {
        console.log(event.target);
        if(event.target==radio2)//daca targetul inital a fost radio2 culoarea devine un mov deschis
        {
            section.style.backgroundColor="rgb(156, 143, 196)";
        }


        if(event.target==radio3)//daca targetul initial a fost radio3 culoarea devine un mov mai inchis
        {
            section.style.backgroundColor="rgb(224, 214, 255)";
        }
        else//daca targetul inital a fost chear sectiunea se coloreaza la fel
        {
            section.style.backgroundColor="rgb(224, 214, 255)";
        }
    }, true)





    var call=document.getElementById("call");
    call.style="text-align:center;display:block;font-size:1.4em;margin-bottom:10%;";//modific stilul elementului
    
    
    
    
    call.addEventListener("click", function(event)
    {
        if(apasat==0)//daca nu e apasat radio3 nu este permis accesul la link-ul initial
        {
             event.preventDefault();
        }
    }, true)

}


function client(mail, username, parola)
{
    this.mail=mail;
    this.username=username;
    this.parola=parola;
}