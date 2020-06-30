let recipe_title= document.querySelector(".recipe h2").innerHTML;//iau titlul si textul separat
let recipe_body = document.querySelector(".recipe p").innerText;
let new_recipe_title="";

//fromCharCode returneaza caracterul corespunzatorul codului ascii dat
//charCodeAt returneaza codul ascii al caracterului dat
for(i=0; i<recipe_title.length; i++)
{
    new_recipe_title+=(String.fromCharCode(recipe_title.charCodeAt(i)+3));//construiesc noul titlu
}
document.querySelector(".recipe h2").innerHTML=new_recipe_title;//inlocuiesc titlul cu titlul codificat

//fac acelasi lucru pentru text
let new_recipe_body="";
for(i=0; i<recipe_body.length; i++)
{
    let code=recipe_body.charCodeAt(i);
    new_recipe_body+=(String.fromCharCode(code+3));
}
document.querySelector(".recipe p").innerText=new_recipe_body;

//daca apas pe butonul de submit al parolei
let btnn=document.querySelector("#pass");
btnn.addEventListener("click", () =>
{
    let password=document.querySelector("input").value;//iau parola data de utilizator

    //calculez care ar trebui sa fie parola corecta
    let date=new Date();
    let year=date.getFullYear();
    let day=date.getDay();
    let month=date.getMonth();
    year%=100;
    let correct_password= "";
    correct_password+=year + "#";

    //pun conditiile pentru <10
    if(day<10) correct_password+="0"+day+"#";
    else correct_password+=day+"#";

    if(month<10) correct_password+="0"+month;
    else correct_password+=month;

    console.log(correct_password);

    //daca parola data e corecta
    if(password==correct_password)
    {
        //ascund modal-ul
        let modal=document.querySelector(".modal-pass");
        modal.style.display="none";

        //fac textul sa revina la normal
        document.querySelector(".recipe h2").innerHTML=recipe_title;
        document.querySelector(".recipe p").innerText=recipe_body;
    }
});
let input= document.querySelector("input");

//daca dau enter din input o sa imi apese butonul de submit
input.addEventListener("keyup", function(event)
{
    if(event.keyCode===13)
    {
        btnn.click();
    }
})