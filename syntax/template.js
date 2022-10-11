var tem = 'hot or iced';
var letter1 = 'coffee ' + tem +'\ncold brew iced only \ngranita \ngelato \ntea ' + tem;

//console.log(letter1);

// `` : 템플릿 리터럴 시작과 끝을 나타내는 기호

var letter2 = `coffee ${tem} 

cold brew iced only 

granita 

gelato 

tea ${tem}`;

console.log(letter2);