export default function PriorityQueue(compare = (a, b) => a < b, array = []) {
  let size = array.length

  return {
    add,
    remove,
    peek,
    pop,
    forEach,
    clear
  }

  function clear() {
    array.length = size = 0
  }

  function add(x) {
    let i = size
    array[size++] = x
    let n
    let next
    while (i > 0) {
      n = (i - 1) >> 1
      next = array[n]
      if (!compare(x, next))
        break
      array[i] = next
      i = n
    }
    array[i] = x
  }

  function remove(fn) {
    if (size === 0)
      return []

    const limit = size

    let resultSize = 0
    let x = new Array(limit)
    let tmpSize = 0
    let tmp = new Array(size)

    while (resultSize < limit && size !== 0) {
      let item = pop()
      fn(item)
        ? x[resultSize++] = item
        : tmp[tmpSize++] = item
    }

    x.length = resultSize

    let i = 0;
    while (i < tmpSize)
      add(tmp[i++])

    return x
  }

  function peek() {
    return size === 0
      ? undefined
      : array[0]
  }

  function pop() {
    if (size == 0)
      return

    const first = array[0]
    if (size > 1) {
      array[0] = array[--size]
      let i = 0
      let s = size
      let hsize = s >>> 1
      let ai = array[i]
      let l
      let r
      let bestc
      while (i < hsize) {
        l = (i << 1) + 1
        r = l + 1
        bestc = array[l]
        if (r < s) {
          if (compare(array[r], bestc)) {
            l = r
            bestc = array[r]
          }
        }
        if (!compare(bestc, ai))
          break

        array[i] = bestc
        i = l
      }
      array[i] = ai
    } else {
      size -= 1
    }

    return first
  }

  function forEach(fn) {
    let i = size
    while(i--)
      fn(array[i], size - i)
  }
}
