const cluster = require('cluster')

// Создание воркера
function startWorker() {
  const worker = cluster.fork()
  console.log(`CLUSTER: Worker ${worker.id} started`)
}

if(cluster.isMaster){  //Верно, если процесс является первичным

  require('os').cpus().forEach(startWorker)  // Запуск воркера для каждого ядра

  // Записываем в лог все отключившиеся исполнители, ждем события завершения
  // работы исполнителя для порождения нового испонителя на замену.
  cluster.on('disconnect', worker => console.log(
    `CLUSTER: Worker ${worker.id} disconnected from the cluster.`
  ))

  // Когда исполнитель завершает работу, создаем ему на замену другой исполнитель
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `CLUSTER: Worker ${worker.id} died with exit ` +
      `code ${code} (${signal})`
    )
    startWorker()
  })

} else {

    const port = process.env.PORT || 3000
    // Запуск приложения на исполнителе - 01-server.js
    require('./01-server.js')(port)

}
