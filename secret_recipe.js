let recipe_title= document.querySelector(".recipe h2").innerHTML;
let recipe_body = document.querySelector(".recipe p").innerText;
console.log(recipe_body);
let new_recipe_title="";
for(i=0; i<recipe_title.length; i++)
{
    new_recipe_title+=(String.fromCharCode(recipe_title.charCodeAt(i)+3));
}
document.querySelector(".recipe h2").innerHTML=new_recipe_title;
let new_recipe_body="";
for(i=0; i<recipe_body.length; i++)
{
    let code=recipe_body.charCodeAt(i);
    new_recipe_body+=(String.fromCharCode(code+3));
}
document.querySelector(".recipe p").innerText=new_recipe_body;

let btnn=document.querySelector("#pass");
btnn.addEventListener("click", () =>
{
    let password=document.querySelector("input").value;
    let date=new Date();
    let year=date.getFullYear();
    let day=date.getDay();
    let month=date.getMonth();
    year%=100;
    console.log(year);
    let correct_password= "";
    correct_password+=year + "#";
    if(day<10) correct_password+="0"+day+"#";
    else correct_password+=day+"#";
    if(month<10) correct_password+="0"+month;
    else correct_password+=month;
    console.log(correct_password);
    if(password==correct_password)
    {
        let modal=document.querySelector(".modal-pass");
        modal.style.display="none";
        document.querySelector(".recipe h2").innerHTML=recipe_title;
        document.querySelector(".recipe p").innerText=recipe_body;
    }
})