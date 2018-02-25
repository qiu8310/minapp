/// <reference path="./component.d.ts" />

interface Behavior {

}
declare interface BehaviorConstructor {
  new(): Behavior
  (options: Component.Options): Behavior
}
declare var Behavior: BehaviorConstructor
