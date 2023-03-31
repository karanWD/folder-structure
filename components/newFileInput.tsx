import React, {useEffect, useRef, useState} from "react";


const NewFileInput = ({submitHandler,closeHandler}) => {
  const [value, setValue] = useState<string>("")
  const inputRef = useRef(null)
  const formHandler=(e)=>{
    e.preventDefault()
    submitHandler(value)
  }
  const clickHandler=(e)=>{if(e.key === "Escape") {closeHandler()}}
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  return (
      <div className="bg-gray-900 w-[25vw] px-4">
        <form onSubmit={formHandler} className="flex flex-col ">
          <label htmlFor="" className="text-white font-bold py-4 ">Create new file</label>
          <input type="text" ref={inputRef} value={value} placeholder="like app.js"
                 onChange={e => setValue(e.target.value)} onKeyUp={clickHandler}
                 className="p-2 bg-gray-800 border border-gray-700 rounded-lg"/>
          <button className="my-2 py-3 rounded-lg border border-gray-800 hover:bg-gray-800" onClick={formHandler}>create file</button>
        </form>

      </div>
  )
}

export default NewFileInput