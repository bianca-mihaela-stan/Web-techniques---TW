# Site-TW
 
### Partea de JS

## BAZA

- [x] modificare de proprietati
````
b.style.display = "block";
````
- [x] modificare  a stilului unui element 
````
call.style="text-align:center;display:block;font-size:1.4em;margin-bottom:10%;";
````
- [x] modificare  eveniment (ex: el.onclick)
````
c.onclick= function()//daca cineva da click pe butonul "sign in" sau "register"
    {
        var username=document.getElementById("username").value;
        var parola=document.getElementById("parola").value;

        [...]
     }
                
````
- [x] selectare dupa id,tag,clasa,selectorCSS
````
var username=document.getElementById("username").value;
var copil = parinte.getElementsByTagName("input")[0];
var rem=document.getElementsByClassName("form")[0];
var radio3=document.querySelector("section:nth-of-type(2) input:nth-of-type(3)");
````
- [x] creare si stergere element (createElement si removeChild)
````
var avertizare=document.createElement("p");
rem.parentNode.removeChild(rem);
````
- [x] inputuri functionale(buton,text,radio,checkbox)
````
var btn = document.getElementsByTagName("button")[0];
var username=document.getElementById("username").value;
var radio1=document.querySelector("section:nth-of-type(2) input");
var caseta=document.getElementById("checkbox").checked;
````


## AVANSAT


- [x] className
````
var b = document.getElementsByClassName(a.className)[1];//"am deja cont"
````
- [x] classList
````
var radio2=document.getElementsByClassName(radio1.classList[0])[1];
````
- [x] getComputedStyle
````
var wpatrat=window.getComputedStyle(patrat).width;
var hpatrat=window.getComputedStyle(patrat).height;
````
- [x] cate o metoda din clasele predefinite
- [x] Math
````
x=Math.ceil((255*x)/wpatrat);
````
     
 - [x] Array
 ````    
lista_clienti.push(ob);
````
- [x] String
 ````
 if (txt.value.indexOf('@') == -1) {
                adaugare_avertizare_mail(txt, input_corect);
            }
````
- [x] Date
 ````
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
````
- [x] setInterval(cu cel putin 3 parametrii) , clearInterval
````
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
    
    clearInterval(clear);
````
- [x] event 
    - [x] proprietati
   - [x] target
````
if(event.target==radio2)//daca targetul inital a fost radio2 culoarea devine un mov deschis
        {
            section.style.backgroundColor="rgb(226, 209, 255)";
        }
        else if(event.target==radio3)//daca targetul initial a fost radio3 culoarea devine un mov mai inchis
        {
            section.style.backgroundColor="rgb(170, 120, 255)";
        }
        else if(event.target==section)//daca targetul inital a fost chear sectiunea se coloreaza la fel
        {
            section.style.backgroundColor="rgb(132, 66, 245)";
        }
````
   - [x] key
 ````
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
````
   - [x] pageX
````
 var x=event.pageX;
````
 - [x] metode 
        - [x] stopPropagation
 ````
 event.stopPropagation();//il opresc din a face bubble
````
   - [x] preventDefault
````
if(apasat==0)//daca nu e apasat radio3 nu este permis accesul la link-ul initial
        {
             event.preventDefault();
        }
````
- [x] obiect nou
````
var ob=new client(mail, username, parola);
````
- [x] proprietate noua adaugata unui obiect existent
````
text.proprietatea_mea=2;//2 inseamna ca se afla in starea register
````
- [x] addEventListener (necesar param3=true)
````
b.addEventListener("click", function () {

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
````
- [x] innerHTML
````
avertizare.innerHTML = "Username and password must contain characters. <br> You need to accept the terms and conditions to login.";
````
- [x] localStorage,JSON(parse, stringify)
````
let ob_serialized = JSON.stringify(ob);
var x=JSON.parse(localStorage.getItem("client"+JSON.stringify(i)));
````
- [x] this
````
function client(mail, username, parola)
{
    this.mail=mail;
    this.username=username;
    this.parola=parola;
}
````
- [x] navigare in arbore (children, parentElement, ..)
````
var text=b.parentNode.parentNode.firstChild.nextSibling;//navigare in arbore
````
- [x] window- open, close
````
home=window.open("index.html", "HOME", "width=300,height=300");
 home.close();
````
