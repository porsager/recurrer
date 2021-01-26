import Recurrer from '../src/index.js'
//import { t } from 'fantestic'
import recur from 'recur'

const recurrer = Recurrer()

const start = (end) => {
  p('start - ends at:', end)
}

const end = (start) => {
  p('end - started at:', start)
}

process.on('uncaughtException', (err) => {
  console.log(err)
  console.log(global.i)
  process.exit()
})

const a = Date.now()
recurrer.add(
  recur(
    'DTSTART:20210125T222000\nDTEND:20210125T222010\nRRULE:FREQ=SECONDLY;INTERVAL=20;COUNT=10000'
  ),
  start,
  end
)

p(Date.now() - a, global.i)
