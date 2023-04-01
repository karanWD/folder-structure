import React, {FC} from "react";
import EditSVG from "@/svgs/editSVG";
import DeleteSVG from "@/svgs/deleteSVG";
import NewFileSVG from "@/svgs/newFileSVG";
import NewFolderSVG from "@/svgs/newFolderSVG";
import ChevronSVG from "@/svgs/chevronSVG";

type Props={
  name:string
  type:"FILE"|"FOLDER",
  insertHandler:Function,
  id:string,
  expanded:boolean
}
const Item:FC<Props> = ({name, type, insertHandler, id, expanded}) => {
  const isFolder = type === "FOLDER"
  const folderStyle = isFolder ? "opacity-100" : "opacity-0"
  const expandStyle = expanded ? "rotate-90" : "rotate-0"
  const chevronStyle =folderStyle+" "+expandStyle+" inline-block transition-all duration-300 w-4 h-4"

  return (
      <div className={`flex items-center my-1 group justify-between overflow-hidden transition-all duration-300 cursor-pointer text-gray-400 hover:text-white`}>
        <div>
          <span className={chevronStyle}><ChevronSVG/></span>
          <span className="p-2">{name}</span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 text-gray-500 flex text-xs gap-3 pr-4">
          {isFolder &&
              <>
                  <div className="cursor-pointer w-4 h-4 relative hover:text-white" title="new file" onClick={()=>insertHandler("FILE", id)}><NewFileSVG/></div>
                  <div className="cursor-pointer w-4 h-4 relative hover:text-white  " title="new folder" onClick={()=>insertHandler("FOLDER", id)}><NewFolderSVG/></div>
              </>
          }
          <div className="cursor-pointer w-4 h-4 relative hover:text-white" title="edit" onClick={()=>insertHandler("EDIT", id)}><EditSVG/></div>
          <div className="cursor-pointer w-4 h-4 relative hover:text-white" title="delete" onClick={()=>insertHandler("DELETE", id)}><DeleteSVG/></div>
        </div>
      </div>
  )
}

export default Item