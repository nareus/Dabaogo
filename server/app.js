const express = require("express")
const app = express()
const mysql = require("mysql")
const port = process.env.PORT || 3000
const dotenv = require('dotenv')
dotenv.config();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const util = require("util");
const MySQLEvents = require('@rodrigogs/mysql-events');

//Importing Routes
const register = require('./routes/register.js')
const logIn = require('./routes/logIn.js')
const otpToEmail = require('./routes/otpToEmail.js')
const otpToPhone = require('./routes/otpToPhone.js')
const outlets  = require('./routes/outlets.js')
const orders = require('./routes/orders.js')
const menu = require('./routes/menu.js')
const users = require('./routes/users.js')
const transporters = require('./routes/transporters.js')
const outlet = require("./listeners/outlets.js")


app.use(function(req, res, next) {
    req.io = io;
    next();
});

//Using Routes
app.use('/register', register);
app.use('/logIn', logIn);
app.use('/', otpToEmail);
app.use('/', otpToPhone);
app.use('/outlets', outlets);
app.use('/orders', orders);
app.use('/menu', menu);
app.use('/users', users);
app.use('/transporters', transporters)


//Getting data in JSON format
app.use(express.json());

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

const query = util.promisify(connection.query).bind(connection);

connection.connect(err => {
    if (err) console.log(err.message);
    else {
    console.log("connected to database");
    }
});


io.of("/transporterStatus").on('connection', (socket) => {
    socket.emit('join', 'hello')
    socket.on("join", async (roomName) => {
        const search = "SELECT * FROM Orders WHERE buyerId =? and delivered = 0";
        const searchQuery = mysql.format(search, [roomName]);
        const result = await query(searchQuery);
        const room = result[0].transporterId
        console.log("join: " + room);
        await socket.join(room);
        console.log(socket.rooms);
      });
})

io.of("/updateOutlets").on('connection', async (socket) => {
    socket.on("join", async (roomName) => {
        console.log(roomName)
        const search = "SELECT * FROM Users WHERE userId=?";
        const searchQuery = mysql.format(search, [roomName]);
        const result = await query(searchQuery);
        const room = result[0].location
        console.log("join: " + room);
        await socket.join(room);
        console.log(socket.rooms);
      });
})
io.of("/maxOrders").on('connection', (socket) => {
    socket.on("join", async (userId, outletId) => {
        const search = "SELECT * FROM Users WHERE userId=?";
        const searchQuery = mysql.format(search, [userId]);
        const result = await query(searchQuery);
        const location = result[0].location
        const orderId = result[0].currOrderId
        // const searchOrder = "SELECT * FROM Orders WHERE orderId=?";
        // const searchOrderQuery = mysql.format(searchOrder, [orderId]);
        // const order = await query(searchOrderQuery);
        // const outletId = order[0].outletId
        const room = location + outletId.toString()
        console.log("join: " + room);
        await socket.join(room);
        console.log(socket.rooms);
      });
})
io.of("/transporterOrder").on('connection', (socket) => {

} )

// const program = async () => {
//     const instance = new MySQLEvents({host: DB_HOST,
//         user: DB_USER,
//         password: DB_PASSWORD
//     }, {
//       startAtEnd: true,
//     });
  
//     await instance.start();
  
//     instance.addTrigger({
//       name: 'Transporters Availability',
//       expression: '*',
//       statement: MySQLEvents.STATEMENTS.ALL,
//       onEvent: (event) => { // You will receive the events here
//       },
//     });
    
//     instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
//     instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
//   };
  
//   program()
//     .then(() => console.log('Waiting for database events...'))
//     .catch(console.error);





//listening on port set in environment 
server.listen(port, 
()=> console.log(`Server Started on port 3000...`))



