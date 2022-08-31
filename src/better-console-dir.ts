const dir = console.dir
console.dir = (v: unknown) => dir(v, { colors: true })