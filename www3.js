const http = require('http');
let time = require('./src/dateTimeET');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Kaspar Rooste, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Kaspar Rooste, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p> \n\t<hr>';
const pageInfo =  `<p>Leht avati kell ${time.timeFormattedET()}.</p><p>Täna on ${time.dateFormattedET(1)}.</p><p> ${time.weekdayET()}</p>`
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
    res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
    res.write(pageHead);
    res.write(pageBody);
    res.write(pageInfo);
    res.write(pageFoot);
    //res.write('Veeb läkski käima!');
    return res.end();
}).listen(5107);