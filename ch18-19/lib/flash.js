module.exports = (req, res, next) => {
	// Если есть flash сообщение отправляем его в контекст
	// затем очищаем
	res.locals.flash = req.session.flash
	delete req.session.flash
	next()
}
