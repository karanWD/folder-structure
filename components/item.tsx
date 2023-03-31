import React from "react";
import EditSVG from "@/svgs/editSVG";
import DeleteSVG from "@/svgs/deleteSVG";
import NewFileSVG from "@/svgs/newFileSVG";
import NewFolderSVG from "@/svgs/newFolderSVG";
import ChevronSVG from "@/svgs/chevronSVG";


const Item = ({name, type, insertHandler, id, expanded, editHandler}) => {
  const isFolder = type === "FOLDER"
  return (
      <div
          className={`flex items-center my-1 group justify-between overflow-hidden transition-all duration-300 cursor-pointer text-gray-400 hover:text-white`}>
        <div>
          <span
              className={`${isFolder ? "opacity-100" : "opacity-0"} ${expanded ? "rotate-90" : "rotate-0"} inline-block transition-all duration-300 w-4 h-4 `}>
            <ChevronSVG/>
          </span>
          <span className="p-2">{name}</span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 text-gray-500 flex text-xs gap-2 pr-4">
          {isFolder &&
              <>
                  <div className="cursor-pointer w-4 h-4 relative hover:text-white"
                       title="new file"
                       onClick={(e) => {
                         e.stopPropagation()
                         insertHandler("FILE", id)
                       }}><NewFileSVG/></div>
                  <div className="cursor-pointer w-4 h-4 relative hover:text-white  "
                       title="new folder"
                       onClick={(e) => {
                         e.stopPropagation()
                         insertHandler("FOLDER", id)
                       }}><NewFolderSVG/></div>
              </>
          }
          <div className="cursor-pointer w-4 h-4 relative hover:text-white" title="edit" onClick={e => {
            e.stopPropagation()
            insertHandler("EDIT", id)
          }}><EditSVG/></div>
          <div className="cursor-pointer w-4 h-4 relative hover:text-white" title="delete"
               onClick={e => {
                 e.stopPropagation()
                 insertHandler("DELETE", id)
               }}>
            <DeleteSVG/>
          </div>
        </div>
      </div>
  )
}

export default Item