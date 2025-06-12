// Usage: Make optional keys to become required.
//
// type Initial = {
//   foo: string
//   bar?: string
//   baz?: string
// }
//
// type Required = RequireProp<Initial, "bar">
// type Required = RequireProp<Initial, "bar" | "baz">
export type RequireKey<T, K extends keyof T> = T & { [P in K]-?: T[P] }
