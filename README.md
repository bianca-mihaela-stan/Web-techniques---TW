# Web-techniques

<p>
<img src="resources/site-tw.gif" width=75%>
</p>

## Assignment 1 : HTML and CSS
Build a website with 3 pages, using the following conepts:
HTML
- tags: header, nav, section, article, aside, dic, span, h1, h2, h3, p, img, ol, ul, a, table, meta

CSS
- selectors: id, class, tag, child elements, nth-of-type, :hover, [atribbute*=val]
- properties: width, height, color, background, text-align, vertical-align, font, header, padding, margin, display, visibility
- drop-down menu, image gallery with figcaption
- transform, transition, animation
Responsiveness:
- %, em, vh, wh, media-query
- position (relative, absolute, sticky)
- z-index
- flex, grid

## Assignment 2 : Javascript
### Basic part

- [x] modify a propery
````
b.style.display = "block";
````
- [x] modify the style of an element
````
call.style="text-align:center;display:block;font-size:1.4em;margin-bottom:10%;";
````
- [x] modify for an event
````
c.onclick= function()//daca cineva da click pe butonul "sign in" sau "register"
    {
        var username=document.getElementById("username").value;
        var parola=document.getElementById("parola").value;

        [...]
     }
                
````
- [x] select by id,tag,clasa, querySelector
````
var username=document.getElementById("username").value;
var copil = parinte.getElementsByTagName("input")[0];
var rem=document.getElementsByClassName("form")[0];
var radio3=document.querySelector("section:nth-of-type(2) input:nth-of-type(3)");
````
- [x] create and delete an element (createElement si removeChild)
````
var avertizare=document.createElement("p");
rem.parentNode.removeChild(rem);
````
- [x] inputs: button text radio checkbox
````
var btn = document.getElementsByTagName("button")[0];
var username=document.getElementById("username").value;
var radio1=document.querySelector("section:nth-of-type(2) input");
var caseta=document.getElementById("checkbox").checked;
````


### Advanced


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
- [x] setInterval(at least 3 parameters) , clearInterval
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
    - [x] properties
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
 - [x] methods
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
- [x] new object
````
var ob=new client(mail, username, parola);
````
- [x] new property added to an existing object
````
text.proprietatea_mea=2;//2 inseamna ca se afla in starea register
````
- [x] addEventListener (with 3rd parameter set true)
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
- [x] localStorage, JSON(parse, stringify)
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
- [x] navigation through tree (children, parentElement, ..)
````
var text=b.parentNode.parentNode.firstChild.nextSibling;//navigare in arbore
````
- [x] window- open, close
````js
home=window.open("index.html", "HOME", "width=300,height=300");
 home.close();
````

# Assignment 3 : NodeJS

Using the following concepts:
- form
- xml and json files
- ajax (xmlhttprequest)
- node modules: http, fs, url
send a request to a server from an html file and receive the response.

# Final assignment

### Task 22, nivel 3 - 1,5p
Pagina codificata, protejata prin parola. Una dintre paginile site-ului va avea continut protejat, in sensul ca la intrarea pe pagina utilizatorul va vedea textul codificat in felul urmator: fiecare caracter afisabil din fiecare element din main (continutul paginii fara partile de header si footer) va fi inlocuit prin program cu caracterul avand codul ASCII cu 3 mai mare, de exemplu, a va fi inlocuit cu d, b cu e, e cu f etc. Pentru a vizualiza continutul corect al paginii utilizatorului i se va cere o parola. Parola se va cere prin intermediul unui input aflat la inceputul paginii. Parola va egala cu aa#zz#ll, unde aa sunt ultimele doua cifre ale anului curent, zz reprezinta ziua curenta, ll reprezinta luna curenta (in cazul in care numarul zilei sau al lunii e sub 10 se adauga un 0 in fata, de exemplu 5 devine 05). Dupa ce se introduce parola si se apasa enter, textul se schimba in cel corect.

unde? in pagina `secret_recipe.html`

### Task 3, nivel 4 - 2p
Sa sorteze/filtreze/grupeze elementele unui tabel (sau afisaj tabelar, precum grid) dupa minim 3 criterii complexe. Studentul isi poate alege singur cerintele insa trebuie sa fie la nivelul de dificultate al cerintelor de mai jos (e bine sa se sfatuiasca cu profesorul de laborator in legatura cu asta). 
Am sortat articolele de pe blog dupa:
- culoarea generala a imaginii ce corespunde articolului
- titlul aticolului
- numarul de tag-uri ale articolului

unde? in pagina `blog.html`

### Task 4, nivel 4 - 2p
Posibilitatea de a marca portiuni din text (asa cum se face cu markerul pe un text tiparit) si salvarea acelor marcaje in localStorage pentru a le gasi in aceeasi forma la reintrarea in pagina. Zonele marcate ar aparea cu o culoare de background si de text diferita. Marcajul se face selectand textul (pentru simplitate se va marca doar text care nu contine alte taguri, precum elemente b, i, a, etc) si apoi apasand o combinatie de taste care sa salveze textul ca fiind marcat (se va inlocui bucata de text cu un element de tip <mark> avand contintul egal cu cel al textului selectat). Indicatii: la mouseup, sau keyup se verifica daca e vreun text selectat cu window.getSelection() si document.selection.createRange().text. Mai multe informatii utile la: https://javascript.info/selection-range
    
unde? in pagina `blog.html`
    
### Task 5, nivel 4 - 2p
(site descriptiv) Pentru sectiunile cu mai mult text (lungime peste N cuvinte, de exemplu N=500)  sa existe un buton numit "Page mode". La click pe el, in locul sectiunii, se va afisa un div in care se vad primele 100 de cuvinte din text, iar la finalul acestui div se va afisa pagina 1/NrPag. Vor exista butoane de next si previous page. La click pe next, utilizatorul poate sa vada urmatoarele 100 de cuvinte din text (trebuie sa se sectioneze textul la nivel de blank character, nu in mijlocul cuvantului). Daca nu face click pe next, oricum dupa k secunde prin program se trece la urmatoarea "pagina", si actiunea se continua, oprindu-se cand se ajunge la final. Utilizatorul poate sa iasa oricand din "Page mode", facand click pe un buton de dezactivare. Efectul acesta trebuie sa se aplice pe minim 2 sectiuni, dar fara repetarea codului (fara copy-paste, ci refolosind acelasi cod).

unde? paginile: `recipe1.html`, `recipe2.html`, `secret_recipe.html`
