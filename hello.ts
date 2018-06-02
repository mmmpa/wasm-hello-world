let memHead = 4096

export function hello (head: i32): i32 {
  const pointer  = memHead
  const stringHead = head + 4
  const length   = <i32>load<u32>(head)

  i32.store(memHead, length)
  memHead += 4

  for (let i = 0; i < length; i++) {
    i32.store8(memHead, <i32>load<u8>(stringHead + i))
    memHead++
  }

  return pointer
}
