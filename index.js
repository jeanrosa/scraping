const cheerio = require('cheerio');
const  fs = require('fs');
const request = require('request');
const link = 'http://www.perinoladigital.com/';
const images = [];

request(link, (err, res, body) => {
    if (!err && res.statusCode == 200) {
        let $ = cheerio.load(body);
        $('img').each(function () {
            var urlImg = $(this).attr('src');
            images.push(link+urlImg);
        })
        console.log(images);
        for (var i = 0; i < images.length; i++){
            request(images[i]).pipe(fs.createWriteStream('images/imagen'+[i]+'.png'));
        }
    }
    /*for (var i = 0; i < images.length; i++){
        request(images[i]).pipe(fs.createWriteStream('images/${i}.png'))
    }*/
});
