//importing modules
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf8');

const templateReplace = (card, product) => {
    let output = card.replace(/{%PRODUCT__NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%TIME%}/g, product.time);
    output = output.replace(/{%SERVERS%}/g, product.servers);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%TITLE__ONE%}/g, product.titleOne);
    output = output.replace(/{%STEP__ONE%}/g, product.stepOne);
    output = output.replace(/{%TITLE__TWO%}/g, product.titleTwo);
    output = output.replace(/{%STEP__TWO%}/g, product.stepTwo);
    output = output.replace(/{%TITLE__THREE%}/g, product.titleThree);
    output = output.replace(/{%STEP__THREE%}/g, product.stepThree);
    output = output.replace(/{%TITLE__FOUR%}/g, product.titleFour);
    output = output.replace(/{%STEP__FOUR%}/g, product.stepFour);

    if(!product.vegetarian) output = output.replace(/{%NOT__VEGETARIAN%}/g, 'not-vegetarian');
    return output;
}

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf8');
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview') {
        console.log(req.url);
        res.writeHead(200, { 'Content-Type': 'text/html'});
        const cardHtml = dataObj.map(data => templateReplace(templateCard, data)).join('');
        const output = templateOverview.replace('{%PRODUCT__CARD%}', cardHtml);
        
        //console.log(cardHtml);
        res.end(output);
    }else if(pathName === '/product'){
        res.writeHead(200, { 'Content-Type': 'text/html'});
        const output = templateReplace(templateCard, data)
        res.end(output);
    }else if(pathName === '/api'){
        res.writeHead(200, { 'Content-Type': 'application/json'})
        res.end(data);
    }else{
        res.writeHead(400, {
             'Content-Type': 'text/html, charset=utf-8',
             'my-own-header': 'This is a error page'
        })

        res.end('<h1>Page not found</h1>');

    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening');
});