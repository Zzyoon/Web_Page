var args = process.argv;
// node syntax/conditional.js one two three ...
// 출력된 애
//node js runtime 위치
//실행시킨 파일 경로
//one
//two
//three
console.log(args); //위의 값(문자형태)들이 배열로 저장된 애 출력하기 one은 args[2]


console.log('A');
console.log('B');
if(args[2]=='one'){
    console.log('C1');
} else{
    console.log('C2');
}
console.log('D');