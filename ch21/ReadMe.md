# 21. Ввод в эксплуатацию

	• Обычно, когда вы покупаете хостинг, вам автоматически присваевается 
		поддомен (yc2-54-201-235.us-west.amaz.com).
	• После того, как у вас появится домен и вы запустите сайт в эксплуатацию, 
		он будет доступен по многим URL адресам.
	• DNS (Domain Name System) - Система доменных имен.
	• TDL (Top Level Domain) - Домен верхнего уровня (ru, com, net).
	• ICAAN (Internet Corporation for Assigned Names and Numbers) - Отвечает 
		за управление доменами верхнего уровня.
	• Обычная практика владение двумя доменами: коротким, чо прост в наборе, и
		подлиннее, более подходящим для маркетинга.
	• Поддомен (www) - используется для разделения ощутимо разных частей сайта или сервиса.
	• При настройке учетной записи хостинга вам дадут имена серверов имен. Перейдите к вашему 
		доменному регистратору, установите имена серверов для домена, который вы хотите хостить.
	• Поскольку у сервера или прокси, который обслуживает ваш сайт, есть IP-адрес, вы
		можете убрать посредника, зарегистрировав IP-адрес с распознавателями DNS. Для того,
		чтобы этот подход работал, хостинг должен назначить вам статический IP.
	• Если вы хотите установить соответствия домена вашему сайту напрямую, минуя серверы 
		имен вашего хостера, вам добавят запись либо А, либо CNAME. Запись типа А устанавливает 
		прямое соответствие между доменным именем и IP-адресом, а CNAME - соответствие 
		одного доменного имени другому.
	• При изменении записи домена прикрепление его к новому серверу может занять до 48 часов.
	
	• SaaS (Software as a Service) - сайты приложения (google документы или Dropbox).
	• PaaS (Platform as a Service) - все, что нудно для написания приложения.
	• IaaS (Infrastructure as a Service) - виртуальные машины и соединяющая их основная сеть.
	• FaaS (Function as a Service) - Запус отдельных вункций в облаке без необходимости 
		самотоятельно настраиваить среду исполнения (безсерверная архитектура AWS Lambda, Google Function).
	
	• Для развертывания не пользоваться FTP тк не безопасен (данные передются не зашифрованном виде).
	• SFTP FTPS безопасны.
	• CD continuouse delivery - непрерывное развертывание.
	• CI continuouse integration - непрерывная интеграция.
	• Варианты CI/CD:
		- Travis CI
		- CircleCI
		- Jenkins
		- Semaphore
		- Microsoft Azure Web Apps
		- Google cloud Build.
	
	• git pull --ff-only // Предотвращает автоматическое слияние или перебазирование.