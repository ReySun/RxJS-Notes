// export const operators={
//   "create": ["fromEvent", "of"],
//   "transform": ["scan"],
//   "filter": ["take"]
// }
export const operators={
  "create": {
    fromEvent: {
      name: "fromEvent",
      path: "assets/rxjs/operator/fromEvent",
      fragment: 'html,js'
    },
    of: {
      name: "of",
      path: "assets/rxjs/operator/of",
      fragment: 'html,js'
    }
  },
  "transform": {
    scan: {
      name: "scan",
      path: "assets/rxjs/operator/scan",
      fragment: 'html,css,js'
    }
  },
  "filter": {
    take: {
      name: "take",
      path: "assets/rxjs/operator/take",
      fragment: 'html,js'
    }
  }
}
