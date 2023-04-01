import React, {FC, useEffect, useRef, useState} from "react";

type Props={
  editHandler:(value:string,defaultValue:{})=>void,
  defaultValue:{name:string},
  closeHandler:()=>void
}
const EditModal:FC<Props> = ({editHandler, defaultValue,closeHandler}) => {
  const [value, setValue] = useState<string>("")
  const inputRef = useRef<any>(null)
  const submitHandler=(e:React.FormEvent<HTMLElement>)=>{e.preventDefault();if (value) {editHandler(value, defaultValue)}else{alert("It cant be empty")}
  }
  const clickHandler=(e:React.KeyboardEvent)=>{if(e.key === "Escape") {closeHandler()}}

  useEffect(() => {
    inputRef?.current?.focus()
    defaultValue&&
    setValue(defaultValue.name)
  }, [defaultValue])

  return (
      <div className="bg-gray-900 w-[25vw] px-4">
        <form onSubmit={submitHandler} className="flex flex-col ">
          <label htmlFor="" className="text-white font-bold py-4 ">Edit</label>
          <input type="text" ref={inputRef} onChange={e => setValue(e.target.value)} value={value}
                 className="p-2 bg-gray-900 border border-gray-700 rounded-lg" onKeyUp={clickHandler}/>
          <button className="my-2 py-3 rounded-lg border border-gray-800 hover:bg-gray-800" onClick={submitHandler}>submit</button>
        </form>
      </div>
  )
}

export default EditModal