# 11. Отправка электронной почты

	• Ни у Node, ни у Express нет встроенной возможности отправки электронной почты.
	• Nodemailer - пакет созданный Андрисом Рейнманом.
	• SMTP - Simple Mail Transfer Protocol.
	• MSA - Mail Submission Agent (агент помогающий при перебоях в обслуживании и работы с возвращенными письмами) 
		SendGrid MailGun.
	• MTA - Mail Transfer Agent (почтовый сервер).
	• Сообщение электронной почты состоит из заголовка и тела. Заголовки содержат информацию о письме: от кого, 
		кому, дату, каждый сервер и MTA через который прошло письмо.
	• Спуфинг - когда заголовок "от" не совпадает с адресом отправителя.
	• Письмо м.б. или неформатированным текстом Unicode или HTML. Nodemailer поддерживает автоматическую генерацию 
		текстовой версии из HTML.
	• Litmu сервис тестирования писем HTML https://www.litmus.com/email-testing
	• Шаблон для HTML писем http://htmlemailboilerplate.com/
	• Сервисы организации рассылки:
		- Emma https://myemma.com
		- MailChimp http://mailchimp.com
		- Campaign Monitor http://www.compaignmonitor.com/
	• Пакат для автоматической генерации текста из HTML версии письма html-to-formatted-text
	• Для вставки изображения в тело письма необходимо поместить изображение в папку ./public/email
	• 