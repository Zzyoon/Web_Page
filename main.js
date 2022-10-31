//solved
var http = require('http');
var fs = require('fs');
var url = require('url'); //url변수를 통해 url이란 모듈을 사용할거야!
// var qs = require('querystring');

function templateHTML(title, list, body, control){
    return `
        <!doctype html>
        <html>
        <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${control}
            ${body}
        </body>
        </html>
        `;
}

function templateList(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i++;
    }
    list = list + '</ul>';
    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //_url정보 중에서 query값만 보여주기
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){ //home화면일때

        if(queryData.id === undefined){
            fs.readdir('./data', function(error, filelist){
                var title = "Welcome";
                var description = "Hello! Node.js-!";

                var list = templateList(filelist);
                var template = templateHTML(title, list, 
                    `<h2>${title}</h2>${description}`, 
                    `<a href="/create">create</a>`
                );
                response.writeHead(200); //성공
                //사용자에게 보여줄 내용 response.end
                response.end(template);
            }) 
        
        }
        else{
            fs.readdir('./data', function(error, filelist){
            
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list, 
                `<h2>${title}</h2>${description}`, 
                `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
            );
                
            response.writeHead(200); //성공
            //사용자에게 보여줄 내용 response.end
            response.end(template);
            });     
        });
    }
    }
    else if(pathname === '/create'){
        fs.readdir('./data', function(error, filelist){
            var title = "Web - create";
            var list = templateList(filelist);
            var template = templateHTML(title, list, 
                `<form action="/create_process" method="post">
                <p><input type = "text" name="title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p> 
                <p>
                    <input type = "submit">
                </p>
                </form>`,``);
            response.writeHead(200); //성공
            //사용자에게 보여줄 내용 response.end
            response.end(template);
            });     
    }
    else if(pathname === '/create_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        }); //웹브라우저가 post로 데이터 전송될 때 해당 콜백함수 사용됨. 모든 정보말고 단편단편만
        request.on('end', function(){
            // var post = qs.parse(body); //post변수에 body내용 담아서 전달
            let post = new URLSearchParams(body);
            var title = post.get('title');
            var description = post.get('description');
            fs.writeFile(`data/${title}`, description, 'utf-8', 
            function(err){
                response.writeHead(302, 
                    {location : `/?id=${title}`}); //redirect해주는 응답
                response.end();

            });
        }); //더 이상 전송되는 데이터가 없으면 이 콜백함수 호출 == 정보 수신 끝
    }
    else if(pathname==="/update"){
        fs.readdir('./data', function(error, filelist){
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list, 
                `
                <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <p><input type = "text" name="title" placeholder="title" value="${title}"></p>
                <p>
                    <textarea name="description" placeholder="description" >${description}</textarea>
                </p> 
                <p>
                    <input type = "submit">
                </p>
                </form>
                `, 
                `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
            );
                
            response.writeHead(200);
            response.end(template);
            });     
        });
    }
    else{
        response.writeHead(404); //찾을 수 없다
        response.end('NOT FOUND');
    }
    
});

app.listen(3000);