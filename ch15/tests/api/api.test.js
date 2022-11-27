// Тесты для API вызовов

const fetch = require('node-fetch')

const baseUrl = 'http://localhost:3000'

// Функция хелпер
const _fetch = async (method, path, body) => {
  // Кодирует тело запроса в JSON
  body = typeof body === 'string' ? body : JSON.stringify(body)
  // Добавляет требуемые заголовки
  const headers = { 'Content-Type': 'application/json' }
  // Проверяет коды состояния
  const res = await fetch(baseUrl + path, { method, body, headers })
  if(res.status < 200 || res.status > 299) throw new Error(`API returned status ${res.status}`)
  return res.json()
}

describe('API tests', () => {

  test('GET /api/vacations', async () => {
    const vacations = await _fetch('get', '/api/vacations')
    expect(vacations.length).not.toBe(0)
    const vacation0 = vacations[0]
    expect(vacation0.name).toMatch(/\w/)
    expect(typeof vacation0.price).toBe('number')
  })

  test('GET /api/vacation/:sku', async() => {
    const vacations = await _fetch('get', '/api/vacations')
    expect(vacations.length).not.toBe(0)
    const vacation0 = vacations[0]
    const vacation = await _fetch('get', '/api/vacation/' + vacation0.sku)
    expect(vacation.name).toBe(vacation0.name)
  })

  test('POST /api/vacation/:sku/notify-when-in-season', async() => {
    const vacations = await _fetch('get', '/api/vacations')
    expect(vacations.length).not.toBe(0)
    const vacation0 = vacations[0]
    // Проверяем успешность HTTP запроса
    await _fetch('post', `/api/vacation/${vacation0.sku}/notify-when-in-season`,
      { email: 'test@meadowlarktravel.com' })
  })

  test('DELETE /api/vacation/:sku', async() => {
    const vacations = await _fetch('get', '/api/vacations')
    expect(vacations.length).not.toBe(0)
    const vacation0 = vacations[0]
    // Проверяем успешность HTTP запроса
    await _fetch('delete', `/api/vacation/${vacation0.sku}`)
  })

})
