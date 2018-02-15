import * as fs from 'fs-extra'

export async function map<T, R>(tasks: T[], iterator: (task: T, index: number, ref: T[]) => Promise<R>, limit: number = 1): Promise<R[]> {
  return new Promise<R[]>((resolve, reject) => {
    let finished = false
    let runningCount = 0
    let result: R[] = new Array(tasks.length)
    let done = (err?: any) => {
      if (!finished) {
        finished = true
        err ? reject(err) : resolve(result)
      }
    }

    let queue = tasks.map((task, index, ref) => () => {
      runningCount++
      iterator(task, index, ref)
        .then(res => {
          result[index] = res
          runningCount--
          run()
        })
        .catch(done)
      run()
    })

    let runnable = () => (!limit || limit > runningCount) && queue.length

    let run = () => {
      if (finished || !queue.length && !runningCount) {
        done()
      } else if (runnable()) {
        (queue.shift() as any)()
      }
    }
    run()
  })
}

export async function replace(src: string, gregexp: RegExp, iterator: (mat: RegExpMatchArray) => Promise<string>, limit = 1) {
  let matches: RegExpExecArray[] = []

  let mat: RegExpExecArray | null
  /* tslint:disable: no-conditional-assignment */
  while ((mat = gregexp.exec(src))) {
    matches.push(mat)
  }

  let replacers = await map(matches, iterator, limit)

  let i = replacers.length
  let result: string[] = []
  let lastIndex = src.length
  while (i--) {
    let replacer = replacers[i]
    let match = matches[i]
    let raw = match[0]
    result.unshift(replacer + src.substring(match.index + raw.length, lastIndex))
    lastIndex = match.index
  }

  if (lastIndex) result.unshift(src.substring(0, lastIndex))
  return result.join('')
}

export function promisify<T>(func: (...args: any[]) => any, context?: any): ((...args: any[]) => Promise<T>) {
  return (...args: any[]) => new Promise((resolve, reject) => {
    func.call(context, ...args, (err: any, result: T) => {
      err ? reject(err) : resolve(result)
    })
  })
}

export function readFile(file: string) {
  return promisify<Buffer>(fs.readFile, fs)(file)
}
