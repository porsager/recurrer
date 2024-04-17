import Recurrer from '../index.js'
//import { t } from 'fantestic'
import recur from 'recur'

const recurrer = Recurrer()

const start = (end) => {
  console.log('start - ends at:', end)
}

const end = (start) => {
  console.log('end - started at:', start)
}

process.on('uncaughtException', (err) => {
  console.log(err)
  console.log(global.i)
  process.exit()
})

const a = Date.now()
recurrer.add(
  recur(
    'DTSTART:20240417T115300\nDTEND:20240417T115310\nRRULE:FREQ=SECONDLY;INTERVAL=20;COUNT=10000'
  ),
  start,
  end
)

console.log(Date.now() - a, global.i)
