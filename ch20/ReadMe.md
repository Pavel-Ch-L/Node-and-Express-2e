# 20. Отладка

	• Debugging - Отладка.
	• REPL - read eval print loop (цикл чтения вычисления печати).
	• node inspect meadowlark - отдадчик node. (help, n - next, s - step in, o - step out).
	• node --inspect meadowlark
		chorome://inspect ► страница DevTools в разделе Devices нажать Open dedicated DevTools for Node.
	• node --inspect-brk meadowlark - остановиться на первой строке приложения.
	• node debug-brk meadowlark - остановиться на первой строке приложения.
	
	• Обзор иходного кода Express:
		- Создание приложения Express (lib/express.js function createApplication())
			Эта функция запускается при вызове app = express
		- Инициализация приложения Express (lib/application.js app.defaultConfiguration)
			Инициализация Express значения по умолчанию
		- Добавление промежуточного ПО (lib/application.js app.use)
			Фунция подключается каждый раз, когда промежуточное ПО подключается к Express
		- Отобразить представления (lib/applicatio.js app.render)
			Механизм представления
		- Запрос расширений (lib/request.js)
			Методы добавляемые к объектам запроса
		- Отправить ответ (lib/response.js res.send)
			Ответ всегда добавляется к этой функции
		- Расширение объекта ответа (lib/response.js)
			Как ваше приложение овечает на запрос
		- Промежуточное ПО для предоставления статических файлов (node_modules/serve-static/index.js staticMiddleware)
		- Промежуточное ПО для управления сеансами (node_modules/express-session/index.js session)
		- Промежуточное ПО для обеспечения логирования (node_modules/morgan/index.js logger)
		- Парсер Url кодированного тела (node_modules/body-parser/index.js urlencoded)