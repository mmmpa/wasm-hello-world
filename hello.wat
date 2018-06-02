(module
 (type $ii (func (param i32) (result i32)))
 (global $hello/memHead (mut i32) (i32.const 4096))
 (global $HEAP_BASE i32 (i32.const 8))
 (memory $0 1)
 (export "hello" (func $hello/hello))
 (export "memory" (memory $0))
 (func $hello/hello (; 0 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $1
   (get_global $hello/memHead)
  )
  (set_local $2
   (i32.add
    (get_local $0)
    (i32.const 4)
   )
  )
  (set_local $3
   (i32.load
    (get_local $0)
   )
  )
  (i32.store
   (get_global $hello/memHead)
   (get_local $3)
  )
  (set_global $hello/memHead
   (i32.add
    (get_global $hello/memHead)
    (i32.const 4)
   )
  )
  (block $break|0
   (set_local $4
    (i32.const 0)
   )
   (loop $repeat|0
    (br_if $break|0
     (i32.eqz
      (i32.lt_s
       (get_local $4)
       (get_local $3)
      )
     )
    )
    (block
     (i32.store8
      (get_global $hello/memHead)
      (i32.load8_u
       (i32.add
        (get_local $2)
        (get_local $4)
       )
      )
     )
     (set_global $hello/memHead
      (i32.add
       (get_global $hello/memHead)
       (i32.const 1)
      )
     )
    )
    (set_local $4
     (i32.add
      (get_local $4)
      (i32.const 1)
     )
    )
    (br $repeat|0)
   )
  )
  (return
   (get_local $1)
  )
 )
)
