var http = require('http');
var fs = require('fs');
var url = require('url'); //url변수를 통해 url이란 모듈을 사용할거야!

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //_url정보 중에서 query값만 보여주기
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;


    if(pathname === '/'){ //pathname으로는 home과 각각 페이지들을 구분 불가 (모두 다 /니까)

        if(title === undefined){
            fs.readdir('./data', function(error, filelist){
                title = "Welcome";
                description = "Hello! Node.js";

                /*
                var list = `
                    <ol>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                    </ol>`;
                */
                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
                    i++;
                }
                list = list + '</ul>';

                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200); //성공
                //사용자에게 보여줄 내용 response.end
                response.end(template);
            }) 
            
        }
        else{
            fs.readdir('./data', function(error, filelist){
                title = "Welcome";
                description = "Hello! Node.js";

                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
                    i++;
                }
                list = list + '</ul>';

            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var template = `
            <!doctype html>
            <html>
            <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                <p>${description}</p>
            </body>
            </html>
            `;
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

    // console.log(queryData);
    // console.log(url.parse(_url, true)) //_url정보 전체
    // console.log(queryData.id);
    //console.log(_url);
    // if(_url == '/'){ //최상위 url : localhost:3000
    //     // _url = '/index.html';
    //     title = 'Welcome';
    // }
    // if(_url == '/favicon.ico'){
    //     return response.writeHead(404);
    // }

    
    //console.log(__dirname+url);
    //template변수는 강의 16주차에 있음!
    
});
app.listen(3000);