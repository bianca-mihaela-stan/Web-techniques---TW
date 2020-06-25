var btn=document.querySelector("#view");
//daca cineva apasa pe butonul pentru vazut membri
btn.addEventListener("click", ()=>
{
    //se activeaza modal-ul
    var modal=document.querySelector("#modal");
    var overlay=document.querySelector("#overlay");
    overlay.style.opacity="80%";
    modal.style.display="block";
    var overlay=document.querySelector("#overlay");
    var close=document.querySelector("#modal-close-button");

    //pun si un event listener la X ca sa pot sa ies din modal si totodata sa stearga toate elementele din modal
    close.addEventListener("click", ()=>
    {
        modal.style.display="none";
        overlay.style.opacity="0%";

        let node_list=document.querySelectorAll("#modal-body p");//returneaza node-list care nu este dinamica
        console.log(node_list);
        for(let i=0; i<node_list.length-1; i++)
        {
            //sterg toate elementele din node-list cand se apasa pe x si afisez lista ca sa se vada ca nu se modifica
            //HTML collection s-ar fi modificat, adica dac foloseam getElementsByTagName
            node_list[i].remove();
            console.log(node_list);
        }
    })
    //trimit o cerere sa mi se dea informatii din user-data.json
    var HTTPRequest = new XMLHttpRequest();
    HTTPRequest.open("GET", "./user_data.json", true);
    var users_data;
    HTTPRequest.onload = function()
    {
        if(this.status==200)//daca s-a deschis bine fisierul
        {
            //in users-data o sa am lista de obiecte din json
            users_data=JSON.parse(this.responseText);
            for(var i=0; i<users_data.length; i++)
            {
                //creez cate un paragraf pe care sa il adaug in modal-body dupa paragraful invizibil
                var elem= document.createElement("p");
                elem.innerText=users_data[i].name;
                var inv=document.querySelector("#invisible-paragaph");
                inv.parentNode.insertBefore(elem, inv);
            }

            //pentru toate elementele din modal-body adaug un evenimnet la click
            let node_list=document.querySelectorAll("#modal-body p");
            for(let i=0; i<node_list.length-1; i++)//daca puneam var aici se evalua la iesirea din functie si nu se mai faceau mov
            {
                node_list[i].onclick= ()=>
                {
                    node_list[i].style.color="violet";
                };
                console.log(node_list);
            }
            
        }
    }
    HTTPRequest.send();
})


