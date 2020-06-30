var http = require('http');
var url = require('url');
var fs= require('fs');

var server=http.createServer(function (req, response) 
                    {
                        var url_parts=url.parse(req.url,true);//true face metoda sa returneze un obiect
                            var query=url_parts.query;
                            let mesaj;
                            if(url_parts.pathname=="/register")//am pus conditie ca sa stiu pe ce pagina sunt
                                                //fiindca sunt pe pagina de register voi adauga datele in fisierul json
                            {
                            nameU=query.username;
                            passwordU=query.parola;
                            emailU=query.email;
                            var utilizator={"name":nameU,"password":passwordU,"email":emailU};
                            fs.readFile('user_data.json', 'utf-8',  function ( err, data) 
                                                    {var vJS=JSON.parse(data);
                                                    vJS.push(utilizator);
                                                    console.log(utilizator);
                                                    sJSON=JSON.stringify(vJS);
                                                    fs.writeFile('user_data.json', sJSON, function(err, result)
                                                    {
                                                        if(err) console.log("error", err);
                                                    });
                                                    mesaj=" "+vJS.length+"utilizatori"
                                                    response.writeHead(200,{Location: './submit.html'});
                                                    response.end(" "+vJS.length+"utilizatori");
                                                    }
                                        )  
                            }
                        if(url_parts.pathname=="/submit")
                        //cand sunt pe pagina de submit voi verifica daca datele introduse de gasesc in fisierul json
                        {
                            nameU=query.username;
                            passwordU=query.parola;
                            var utilizator={"name":nameU,"password":passwordU};//iau parola si username-ul si creez un utilizator
                            fs.readFile('user_data.json', 'utf-8',  function ( err, data) //citesc din documentul json ca sa verific daca utilizatorul are cont
                                                    {
                                                        var ok=0;
                                                        var vJS=JSON.parse(data);
                                                        console.log(data);
                                                        for(let i=0; i<vJS.length; i++)
                                                        {
                                                            if(vJS[i].name==utilizator.name && vJS[i].password==utilizator.password)
                                                            {
                                                                ok=1;
                                                            }
                                                        }
                                                        if(ok==1)//daca are cont vreau sa retin date despre logarea sa
                                                        {
                                                            fs.readFile('activity-data.xml', 'utf-8',  function ( err, data) //citesc fisierul xml si caut ultima aparitia a lui "</"= acolo se 																	//termina "lista mea"
                                                            {
                                                                let poz=data.lastIndexOf("</");
                                                                let activity="<username>"+nameU+"</username>"+"<time>"+new Date()+"</time>";//creez o noua activitate
                                                                let new_data="\n"+data.substr(0,poz-1) + activity +"\n"+ data.substr(poz, data.length-1)+"\n";//updatez string-ul pt xml
                                                                fs.writeFile('activity-data.xml', new_data, function(err, result)//pun noul string in fisierul xml
                                                                {
                                                                    if(err) console.log("error", err);
                                                                });
                                                                response.writeHead(200,{Location: './submit.html'});//utilizatorul va fi redirectionat la o pagina unde i se spune ca e logat
                                                                response.end("Bine ai revenit "+utilizator.name+"!");
                                                            });
                                                        }
                                                        else
                                                        {
							//i se spune utilizatorului ca logarea a esuat
                                                            response.writeHead(200,{Location: './submit.html'});
                                                            response.end("Logarea a esuat, te rugam sa incerci din nou..");
                                                        }
                                                    });

                        }
                    });
	server.listen(7000);

