//solved
var http = require('http');
var fs = require('fs');
var url = require('url'); //url변수를 통해 url이란 모듈을 사용할거야!

function templateHTML(title, list, body){
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


    if(pathname === '/'){ //pathname으로는 home과 각각 페이지들을 구분 불가 (모두 다 /니까)

        if(queryData.id === undefined){
            fs.readdir('./data', function(error, filelist){
                var title = "Welcome";
                var description = "Hello! Node.js-!";

                var list = templateList(filelist);
                var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
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
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                
            response.writeHead(200); //성공
            //사용자에게 보여줄 내용 response.end
            response.end(template);
            });     
        });
    }
    }else{
        response.writeHead(404); //찾을 수 없다
        response.end('NOT FOUND');
    }
    
});
app.listen(3000);