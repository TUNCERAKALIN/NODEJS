const http=require('http')
const host='localhost'
const port=process.env.PORT || 8080;
const server =http.createServer((req,res)=>{
    const number1=10
    if(req.url=='/'){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end('<html><head><body><h1>Welcome to Home</h1></body></head></html>');
    }
    else if(req.url=='/state'){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end('<html><head><body><h1>OK State Number:</h1></body></head></html>'+number1);
    }else if(req.url=='/add'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<html><head><body><h1>OK still working State Number:</h1></body></head></html>'+number1+1);
    }else if(req.url=='/subtract'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<html><head><body><h1>OK still working State Number:</h1></body></head></html>'+number1-1);
    }else if(req.url=='/reset'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<html><head><body><h1>OK still working State Number:</h1></body></head></html>'+number1);
    }else if(req.url=='/bad'){
        res.writeHead(404,{'Content-Type': 'text/html'});
        res.end('<html><head><body><h1>Hello I think you should check what did you wrote!!!</h1></body></head></html>');
    }
});
server.listen(port,host,()=>{
    console.log(`the server is at http://${host}:${port}/`)
});