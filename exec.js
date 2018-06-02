const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const encoder = new util.TextEncoder("utf-8")
const decoder = new util.TextDecoder("utf-8")

async function main () {
  const wasm = await readFile('hello.wasm')
  const memory = new WebAssembly.Memory({ initial: 1 })
  const importObject = { js: { memory } }
  const wasmSet = await WebAssembly.instantiate(wasm, importObject)

  const {
    instance: {
      exports: {
        hello,
        memory: { buffer }
      },
    },
  } = wasmSet

  const register = storeArgumentAndGetPointer(buffer, 0)
  const registeredArguments = ['Hello, Wasm.', 'Yay!']
  const argumentPointers = registeredArguments.map((arg) => register(arg))

  argumentPointers.forEach(pointer => {
    console.log(
      readHelloResult(
        buffer,
        hello(pointer)
      )
    )
  })
}

function readHelloResult (buffer, offset) {
  const view = new DataView(buffer)
  const stringLength = view.getUint32(offset, true)
  const array = new Uint8Array(view.buffer, offset + 4, stringLength)

  return decoder.decode(array)
}

function storeArgumentAndGetPointer (buffer, head = 0) {
  let offset = head

  return function (string) {
    const pointer = offset
    const { length } = string

    new Uint32Array(buffer, offset, 1).set([length])
    offset += 4
    new Uint8Array(buffer, offset, length).set(encoder.encode(string))
    offset += length+ (8 - (string.length % 8))

    return pointer
  }
}

main()
