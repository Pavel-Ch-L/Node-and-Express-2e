# 14. Маршрутизация

	• Маршрутизация - механизм, с помощю которого запросы находят путь к обрабатывающему их коду.
	• Express по умолчанию не учитывает поддомены. Для обработки поддоменов используйте vhost.
	• Использовать в адресе ресурса только буквы в нижнем регистре, цифры, тире, подчеркивания.
	• URL влияет на поисковую оптимизацию.
	• app.get() - специализированное промежуточное ПО.
	• В пути маршрутов можно использовать регулярные выражения.
	• Принципы организации маршрутов:
		- Использовать именованные функции для обработчиков маршрутов;
		- Маршрут не должен выглядеть загадочно;
		- Огранизация маршрутов дб расширяемой;
		- Для статических страниц использовать автоматические обработчики маршрутов.

	• Несколько способов разместить маршруты в собственном модуле:
		- Модуль возвращает массив объектов, содержащих свойства method и handler.
			Затем подключить маршруты с помощю 
			const routes = require('./routes.js') 
			routes.forEach( route => app[route.method](route.handler) )
		- Другой способ передавать в модуль экземпляр app
			Создадим файл routes.js и переместим туда все маршруты
			module.exports = app => {
				app.get('/', (req, res) => app.render('home'))
				//...
			}
			Импортируем маршруты
			require('./routes)(app)
			или
			const addRoutes = require('./routes')
			addroutes(app)
		
	• Логическая групировка обработчиков
		Группируем обработчики handlers/main.js handlers/vacations.js
		const fortune = require('../lib/fortune')
		exports.home = (req, res) => res.render('home)
		exports.about = (req, res) => {
			const fortune = fortune.getFortune()
			res.render('about, { fortune })
		}
		//...
		Затем напишем routes.js
		const main = require('./handlers/main')
		module.exports = function(app) {
			app.get('/', main.home)
			app.get('/about', main.about)
			//...
		}

	• 