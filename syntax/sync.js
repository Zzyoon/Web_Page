var fs = require('fs'); //fs모듈을 불러와서 fs 변수로 선언

// //readFileSync == 동기 - 리턴값을 준다.
// console.log('a');
// var result = fs.readFileSync('syntax/sample.txt', 'utf-8');
// console.log(result);
// console.log('c');

//readFile == 비동기 - 함수를 인자로 넣어야한다.
console.log('a');
fs.readFile('syntax/sample.txt', 'utf-8', function(err,result){
    console.log(result);
});
console.log('c');