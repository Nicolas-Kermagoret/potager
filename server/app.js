const express = require('express')
const app = express()
var cors = require('cors')
const fs = require('fs');
const CronJob = require('cron').CronJob;
const csvFilePath='./data.csv'
const parse=require('csv-parse')
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const endOfLine = require('os').EOL;

app.use(cors())
app.use(express.static('../dist'));                 // set the static files location /public/img will be /img for users

const port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600
});
const parser = new Readline();
let lastMoisture = [0,0];
parser.on('data', data => {
  lastMoisture = data;
});
port.pipe(parser);

new CronJob('0 * * * *', function() {
  const newLine = (new Date()).toISOString() + ','  + lastMoisture + endOfLine;
  fs.appendFileSync(csvFilePath, newLine);
}, null, true);

app.get('/moisture', async function (res, res) {
  const parser = parse({delimiter: ',', columns: true}, (err, data) => {
    res.send(data);
  })
  fs.createReadStream(csvFilePath).pipe(parser);
})

app.get('/moisture/last', async function (res, res) {
  res.send(lastMoisture.split(','));
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
