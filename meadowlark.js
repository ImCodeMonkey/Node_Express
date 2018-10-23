var express = require('express');

var app = express();

//设置 handlebars 视图引擎
var handlebars = require('express3-handlebars')
		.create({ defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars');

//指定应用程序端口
app.set('port', process.env.POST || 3000);

/*static中间件配置
 * public下的目录中的所有文件都会直接对外开放
 * 相当于给发送的所有静态文件创建了个路由
 */
app.use(express.static(__dirname + '/public'));

//*******页面路由部分********//

app.get('/', function(req, res){
	res.render('home');
//	res.type('text/plain');
//	res.send('主页内容');
})

app.get('/about', function(req, res){
	var fortunes = [
		"Conquer your fears or they will conquer you.",
		"Rivers need springs.",
		"Do not fear what you don't know.",
		"You will have a pleasant surprise.",
		"Whenever possible, keep it simple."
	]
	
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', {fortune: randomFortune});
//	res.type('text/plain');
//	res.send('关于我们');
})

//*******页面路由部分********//

//定制404页面
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - 找不到这个页面!');
})

//定制500页面
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.render('500');
	//res.send('500 - 服务器错误!');
})

app.listen(app.get('port'), function(){
	console.log('Express 服务启动，请访问 http://localhost:' + app.get('port') + '; 按 Ctrl-C 停止服务.');
})