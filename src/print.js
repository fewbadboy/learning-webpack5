export function printMe() {
  console.log('I get called from print.js, Again!!')
  console.log('index page has multiple entry points, so add config optimization.runtimeChunk: \'single\'')
}

export function treeShaking() {
  console.log('Tree Shaking!!')
}
