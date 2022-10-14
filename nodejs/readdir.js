var testFolder = 'data'; //파일들 읽어올 폴더
var fs = require('fs'); // file system 모듈 가져오기

fs.readdir(testFolder, function(error, filelist){
// fs모듈의 readdir함수를 사용해
// 첫번째 인자로 파일 목록을 읽을 폴더(dir)를 가져오고
// 콜백함수의 두번째 인자로 폴더(dir)의 파일_이름_목록(filelist)을 가져옴 
// [배열]로 저장됨

    console.log(filelist);

})