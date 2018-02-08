interface PolyfillPromise<T> {
  finally(callback?: () => T): Promise<T>
}
interface Promise<T> extends PolyfillPromise<T> {}

Promise.prototype.finally = function<T>(callback: () => T): Promise<T> {
  let P = this.constructor as PromiseConstructor
  return this.then(
    function(value) { return P.resolve(callback()).then(function() { return value }) },
    function(reason) { return P.resolve(callback()).then(function() { throw reason }) }
  )
}
