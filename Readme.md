#Getting Started with Node
- Node is a runtime environment for executing JS code.
- Essentially, Node is a C++ program that embeds Chrome’s v8 engine, the fastest
  JS engine in the world.
- We use Node to build fast and scalable networking applications. It’s a perfect
  choice for building RESTful services.
- Node applications are single-threaded. That means a single thread is used to
  serve all clients.
- Node applications are asynchronous or non-blocking by default. That means
  when the application involves I/O operations (eg accessing the file system or the
  network), the thread doesn’t wait (or block) for the result of the operation. It is
  released to serve other clients.
- This architecture makes Node ideal for building I/O-intensive applications.
- You should avoid using Node for CPU-intensive applications, such as a video
  encoding service. Because while executing these operations, other clients have
  to wait for the single thread to finish its job and be ready to serve them.
- In Node, we don’t have browser environment objects such as window or the
  document object. Instead, we have other objects that are not available in
  browsers, such as objects for working with the file system, network, operating
  system, etc.

###Download Node.js
The official Node.js website has installation instructions for Node.js: https://nodejs.org

#Node Module System
Modules are JavaScript libraries.
A set of functions you want to include in your application.


###Global Objects
- We don’t have the window object in Node.
- The global object in Node is “global”.
- Unlike browser applications, variables we define are not added to the “global”
  object.
```js
console.log()
setTimeout()
clearTimeout()
setInterval() 
clearInterval()
```

###Module Wrapper Function
- Node.js treats each JavaScript file as a separate module ```(xyz.js => xyz)``` <br>
- Node automatically wraps the code
  in each file with an IIFE (Immediately-invoked Function Expression) to create
  scope. So, variables and functions defined in one file are only scoped to that file
  and not visible to other files unless explicitly exported.
- Before executing the code written inside a module, Node takes the entire code and encloses it within a function wrapper
```js
(function (exports,require,module, __filename, __dirname)
{  //Entire code here 
})
```
You can create your own modules, and easily include them in your applications.
The following example creates a module that returns a date and time object:
```js
exports.myDateTime = function () {
    return Date();
}
```
Use the ```module.exports``` keyword to make properties and methods available outside the module file.
Save the code above in a file called "mymodule.js"


To load a module, use the ```require()``` function. This function returns the
  ```module.exports``` object exported from the target module:
  ```js
const dt = require('./mymodule');

console.log("The date and time are currently: " + dt.myDateTime());
```







##Built-in Modules
Node.js has a set of built-in modules which you can use without any further installation and enable us to work with the file system, path
objects, network, operating system, etc.<br>

Module | Description | . 
--- | --- | ---
assert | Provides a set of assertion tests 
buffer | To handle binary data
child_process |	To run a child process
cluster	|To split a single Node process into multiple processes
crypto	|To handle OpenSSL cryptographic functions
dgram	|Provides implementation of UDP datagram sockets
dns	|To do DNS lookups and name resolution functions
domain	|Deprecated. To handle unhandled errors
events	|To handle events
fs	|To handle the file system
http	|To make Node.js act as an HTTP server
https	|To make Node.js act as an HTTPS server.
net	|To create servers and clients
os	|Provides information about the operation system
path	|To handle file paths
punycode	|Deprecated. A character encoding scheme
querystring	|To handle URL query strings
readline	|To handle readable streams one line at the time
stream	|To handle streaming data
string_decoder	|To decode buffer objects into strings
timers	|To execute a function after a given number of milliseconds
tls	|To implement TLS and SSL protocols
tty	|Provides classes used by a text terminal
url	|To parse URL strings
util	|To access utility functions
v8	|To access information about V8 (the JavaScript engine)
vm	|To compile JavaScript code in a virtual machine
zlib	|To compress or decompress files


###HTTP Module
Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).<br>
```js
const http = require('http')
http.createServer(run).listen(8080)

function run(req, res) {
if(req.url === '/'){
res.writeHead(200, {'Content-Type': 'text/html'});
 res.write('Hello World!');
 res.end();
}} 
```
###Path Module
```js
const path = require('path');
const pathObj = path.parse(__filename);
console.log(pathObj);
```
###URL Module
The URL module splits up a web address into readable parts.
```js
const url = require('url')
const adr = 'http://localhost:8080/default.htm?year=2017&month=february';
const q = url.parse(adr, true);


console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

const qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //=> 'february'
```

###File Module
The Node.js file system module allows you to work with the file system on your computer.

```js
const fs = require('fs');
fs.readFile('demofile1.txt')
fs.appendFile('mynewfile1.txt', 'Hello content!')
fs.open('mynewfile2.txt', 'w')
fs.writeFile('mynewfile3.txt', 'Hello content!')
fs.unlink('mynewfile2.txt')
fs.rename('mynewfile1.txt', 'myrenamedfile.txt')
```
###OS  Module
```js
const os = require('os');
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
```
###Events  Module
Every action on a computer is an event. Like when a connection is made or a file is opened.
Node.js has a built-in module, called "Events", where you can create-, fire-, and listen for- your own events
EventEmitter is one of the core classes in Node that allows us to raise (emit) and
handle events. Several built-in classes in Node derive from EventEmitter. To create a class with the ability to raise events, we should extend EventEmitter:
  ```
  class Logger extends EventEmitter {
  }
  ```
  
  

```js
const events = require('events');
const eventEmitter = new events.EventEmitter();
//Create an event handler:
const myEventHandler = function () {
  console.log('I hear a scream!');
}

//Assign the event handler to an event:
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
eventEmitter.emit('scream');
```


# Node Package Manager
NPM is a package manager for Node.js packages, or modules.
- Every Node application has a package.json file that includes metadata about the
  application. This includes the name of the application, its version, dependencies,
  etc.
- We use NPM to download and install 3rd-party packages from NPM registry:
- All the installed packages and their dependencies are stored under
  node_modules folders. This folder should be excluded from the source control.
- Node packages follow semantic versioning: major.minor.patch
- Useful NPM commands are:


var uc = require('package-name');

Initialize Node and create a package.json file
```
npm init
```
Install a package
```
npm install packageName
```

Install a specific version of a package 
```
npm install packageName@version
```

Install a package as a development dependency
```
npm install packageName –save-dev
```

Uninstall a package
```
npm uninstall packageName
```

List installed packages
```
npm list
npm list –depth=0
```

View package details
```
npm view package-name
npm view package-name dependancies
npm view package-name versions
```

View outdated packages
```
npm outdated
```

Update packages
```
npm update

//  OR 

npm install -g npm-check-updates   then
npm-check-updates                  then
npm-check-updates -u               then
npm install
```
To install/uninstall packages globally, use -g flag.


#RESTful API
REST stands for REpresentational State Transfer. REST is web standards based architecture and uses HTTP Protocol.
Following four HTTP methods are commonly used in REST based architecture.
- GET − This is used to provide a read only access to a resource.
- PUT − This is used to create a new resource.
- DELETE − This is used to remove a resource.
- POST − This is used to update a existing resource or create a new resource.

Express is a simple, minimalistic and lightweight framework for building web
servers.
```
npm install express
```
We use Nodemon to watch for changes in files and automatically restart the
node process.
```
npm install -g nodemon
```
You should never trust data sent by the client. Always validate! Use Joi package
  to perform input validation.
```
npm install joi

//OR 

npm install joi@13.1.0   
```

We can use environment variables to store various settings for an application. To
read an environment variable, we use ```process.env.PORT``` for dynamic port

