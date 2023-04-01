import React, {FC} from "react";
import NewFolderSVG from "@/svgs/newFolderSVG";
import NewFileSVG from "@/svgs/newFileSVG";

type Props={
  type:"FOLDER"|"FILE"
  hasText:boolean
  clickHandler:Function
}
const ActionsButton:FC<Props> = ({hasText=false,clickHandler,type}) =>{
  const TYPES = {
    "FILE":{text:"file",icon:<NewFileSVG/>},
    "FOLDER":{text:"folder",icon:<NewFolderSVG/>},
  }
  return(
      <div className="hover:text-white cursor-pointer flex items-center gap-2"
           onClick={clickHandler}>
        <span className=" w-4 h-4 relative inline-block">{TYPES[type].icon}</span>
        {hasText && TYPES[type].text}
      </div>
  )
}

export default ActionsButton