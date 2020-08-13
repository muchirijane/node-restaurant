//importing modules
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');


const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf8');



const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf8');
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
    const pathName = req.url;
    // console.log(url.parse(req.url, true));
    const {query, pathname} = url.parse(req.url,true); // true in order to pass the query into an object (?id=0)
    if(pathname === '/' || pathname === '/overview') {
        
        res.writeHead(200, { 'Content-Type': 'text/html'});
        const cardHtml = dataObj.map(data => templateReplace(templateCard, data)).join('');
        const output = templateOverview.replace('{%PRODUCT__CARD%}', cardHtml);
        
        //console.log(cardHtml);
        res.end(output);
    }else if(pathname === '/product'){
        res.writeHead(200, { 'Content-Type': 'text/html'});
        console.log(query);
        const product = dataObj[query.id];
        const output = templateReplace(templateProduct, product);
        res.end(output);
    }else if(pathname === '/api'){
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