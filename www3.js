const http = require('http');
//moodul päringu parimiseks
const url = require('url');
//moodul faili tee haldamiseks
const path = require('path');
//moodul failide haldamiseks, ASYNC puhul on vaja seda toetavat erilist moodulit
//const fs = require('fs');
const fs = require('fs').promises;
let time = require('./src/dateTimeET');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Kaspar Rooste, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Kaspar Rooste, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p> \n\t<hr>';
const pageInfo =  `<p>Leht avati kell ${time.timeFormattedET()}.</p><p>Täna on ${time.dateFormattedET(1)}.</p><p> ${time.weekdayET()}</p>`
const pageBanner = '<img src="veebiprogrammeerimine_2026_TA.png" alt="">'
const pohjus = '<h1>Miks ma tulin Tallinna ülikooli õppimia</h1><p>Ma tulin Tallinna ülikooli õppima, sest tahtis õppida tarkvaraarendajaks ja see kool võimaldab mul seda teha.</p><p>Mind huvitab programmeerimine ja soovin tulevikus sellega erialaselt tegeleda.</p>'
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res){
    //parsin url-i
    console.log('Päring: ' + req.url)
    let currentURL = url.parse(req.url, true);
    console.log('Parsituna: ' + currentURL.pathname);

    //hakkame erinevaid lehti vaatama routes

    if(currentURL.pathname === '/') {
        res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pageBody);
        res.write(pageInfo);
        res.write('\n\t<ul>');
        res.write('\n\t\t<li><a href="/vanasona"> Tänane vanasõna</a></li>');
        res.write('\n\t<ul>');
        res.write(pageFoot);
        //res.write('Veeb läkski käima!');
        return res.end();
    }
    else if (currentURL.pathname === '/vanasona'){
        res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write('\t<h1>Eesti vanasonad</h1>\n\t<p>Siin näed tänase päeva vanasõna.</p>\n\t<hr>');
        res.write('\n\t<p><a href= "/">Tagasi avalehele</a></p>')
        res.write(pageFoot);
        //res.write('Veeb läkski käima!');
        return res.end();
    }
    else if (currentURL.pathname === '/põhjus'){
        res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
        res.write(pageHead);
        res.write(pageBanner);
        res.write(pohjus);
        res.write(pageFoot);
        return res.end();
    }
    else if (currentURL.pathname === '/veebiprogrammeerimine_2026_TA.png'){
        //teeme pildi tegeliku asukoha programmilse kätte saadavaks
        let picPath = path.join(__dirname, 'pic', currentURL.pathname);

        try {
            const data = await fs.readFile(picPath)
            res.writeHead(200,{"Contenet-type": "image/png"});
            res.end(data);
        }
        catch (err){
                res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
                return res.end('Pilti ei leitud!');
            }
            

    }
    else {
        res.end('Viga 404, ei leia sellist lehte!')
    }


   
}).listen(5107);