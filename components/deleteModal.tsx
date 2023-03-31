import React from "react";

const DeleteModal = ({deleteHandler}) =>{
  return(
      <div className="flex flex-col bg-gray-900 w-[25vw] p-4">
        <div>Are you sure you want to delete it?</div>
        <button className="py-3 mt-4 border border-gray-800 rounded-lg hover:bg-gray-800" onClick={deleteHandler}>delete</button>
      </div>
  )
}

export default DeleteModal