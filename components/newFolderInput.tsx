import React, {FC, useEffect, useRef, useState} from "react";


type Props = {
  submitHandler: (value:string,type:"FILE"|"FOLDER") => void
  closeHandler: () => void
}
const NewFolderInput:FC<Props> = ({submitHandler,closeHandler}) => {
  const [value, setValue] = useState<string>("")
  const inputRef = useRef<any>(null)
  const formHandler=(e: React.FormEvent<HTMLElement>)=>{
    e.preventDefault()
    if (value){
    submitHandler(value,"FOLDER")
    }else{alert("Folder should have a name")}
  }
  const clickHandler=(e:React.KeyboardEvent<HTMLInputElement>)=>{if(e.key === "Escape") {closeHandler()}}
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  return (
      <div className="bg-gray-900 w-[25vw] px-4">
        <form onSubmit={formHandler} className="flex flex-col ">
          <label htmlFor="" className="text-white font-bold py-4 ">Create new folder</label>
          <input type="text" ref={inputRef} placeholder="like components" onChange={e => setValue(e.target.value)}
                 className="p-2 bg-gray-800 border border-gray-700 rounded-lg" onKeyUp={clickHandler}/>
          <button className="my-2 py-3 rounded-lg border border-gray-800 hover:bg-gray-800" onClick={formHandler}>create folder</button>
        </form>
      </div>
  )
}

export default NewFolderInput