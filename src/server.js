const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Code socket io
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(port, () => {
	console.log('Domain listening at http://localhost:' + port);
});
// io.on('connection', function (socket) {
// 	console.log('Co nguoi ket noi: ' + socket.id);

// 	//socket.join('Nodejs');
// 	//console.log(socket.adapter.rooms);

// 	socket.on('disconnect', function () {
// 		console.log(socket.id + ': ngat ket noi !!!');
// 	});

// 	socket.on('Client-Send-Data', function (data) {
// 		console.log(socket.id + ' vua gui: ' + data);
// 		//TH1: Gửi tất cả các client
// 		io.sockets.emit('Server-send-data', data + '888');
// 		//TH2: Gửi lại chính client
// 		//socket.emit('Server-send-data', data + '888');
// 		//TH3: Gửi tất cả các client trừ chính client gửi
// 		//socket.broadcast.emit('Server-send-data', data + '888');
// 		//TH4: Gửi tất cả các client trong 1 room nhất định, ví dụ rooms "NODEJS"
// 		io.sockets.in('NODEJS').emit('Server-Send-Data', data + '888');
// 	});

// 	socket.on('Join-Room', function (data) {
// 		//Kiểm tra xem có room chưa, nếu chưa có thì tạo room, có rồi thì join
// 		socket.join(data);
// 	});
// 	socket.on('Leave-Room', function (data) {
// 		//Thoát room, nếu room còn 0 socket sẽ tự động xóa room
// 		socket.leave(data);
// 	});
// });

//End Code socket io

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './src/resources/views');
app.use(express.static('./src/public/'));

app.get('/', (req, res) => {
	res.render('index');
});

// app.get('/tradingview', (req, res) => {
// 	res.render('tradingview');
// });

// app.post('/tradingview', (req, res) => {
// 	//console.log(req.body);
// 	io.sockets.emit('Server_Send_Data', req.body);
// 	res.send({ response: 'success' });
// });

app.get('/:option', (req, res) => {
	let emitSend = req.params.option + '_Server_Send_Data'
	res.render('options', {emitSend: emitSend});
});

app.post('/:option', (req, res) => {
	let emitSend = req.params.option + '_Server_Send_Data'
	io.sockets.emit(emitSend, req.body);
	res.send({ response: 'success' });
});
