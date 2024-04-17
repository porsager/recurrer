import Queue from './queue.js'

export default function Recurrer() {
  const queue = Queue((a, b) => a.date < b.date)

  let timer

  return {
    add,
    remove,
    next: (fn) => {
      let result
      queue.forEach(x => {
        !result && (x.onstart === fn || x.onend === fn) && (result = x)
      })
      return result && result.date
    }
  }

  function add(rule, onstart, onend) {
    const duration = rule.utcDuration()
        , start = onstart && rule.iterator(new Date())
        , end = onend && duration && rule.iterator(new Date(Date.now() - duration))

    start && addNext({ rule, iterator: start, onstart, duration })
    end && addNext({ rule, iterator: end, onend, duration })
  }

  function addNext(x) {
    const next = x.iterator.next().value
    if (!next)
      return

    x.date = next.getTime() + (x.onstart ? 0 : x.duration)
    queue.add(x)
    check()
  }

  function check() {
    clearTimeout(timer)
    const x = queue.peek()
    x && (timer = setTimeout(run, x.date - Date.now(), x))
  }

  function run(x) {
    const date = new Date(x.onstart ? x.date : x.date - x.duration)
    queue.pop()
    addNext(x)
    x.onstart ? x.onstart(date) : x.onend(date)
  }

  function remove(fn) {
    queue.remove((x) => x.onstart === fn || x.onend === fn)
    check()
  }
}
