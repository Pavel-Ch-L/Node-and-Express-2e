const portfinder = require('portfinder')
const puppeteer = require('puppeteer')

const app = require('../meadowlark')

let server = null
let port = null

//Запуск нашего приложения на незанятом порту после каждого теста (функция хелпер jest - beforeEach)
beforeEach(async() => {
  port = await portfinder.getPortPromise()
  server = app.listen(port)
})

//Остановка нашего приложения после каждого теста (функция хелпер jest - afterEach)
afterEach(() => {
  server.close()
})

test('Домашняя страница ссылается на страницу Описание', async () => {

  //Запуск браузера в режиме headless и открытие новой страницы
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  //Переход на домашнюю страницу нашего приложения
  await page.goto(`http://localhost:${port}`)

  //Оборачиваем вместе щелчек по ссылке и навигацию, чтобы устранить условие гонки(race condition)
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-test-id="about"]'),
  ])

  //Проверяет, что мы находимся на странице /about
  expect(page.url()).toBe(`http://localhost:${port}/about`)

  //Закрывает браузер
  await browser.close()
})