import React, {useState} from "react";
import Modal from "@/components/ui/modal";
import NewFileInput from "@/components/newFileInput";
import NewFolderInput from "@/components/newFolderInput";
import ItemsContainer from "@/components/itemsContainer";
import {v4 as uuidv4} from 'uuid';
import NewFolderSVG from "@/svgs/newFolderSVG";
import NewFileSVG from "@/svgs/newFileSVG";
import EditModal from "@/components/editModal";
import DeleteModal from "@/components/deleteModal";

type Items = {
  id: string
  name: string,
  type: "FILE" | "FOLDER"
  children: []
}

const Sidebar = () => {
  const [items, setItems] = useState<>([])
  const [itemId, setItemId] = useState()
  const [modalType, setModalType] = useState<"FOLDER" | "FILE" | null>(null)
  const findItem = (arr, id) => {
    let res = null
    const iterate = (arr, id) => {
      for (let item of arr) {
        if (item.id === id) {
          res = item
        } else {
          if (item.children.length > 0) {
            iterate(item.children, id)
          }
        }
      }
    }
    iterate(arr, id)
    return res
  }

  const createFolder = (name, id) => {
    const newItem = {
      id: uuidv4(),
      name,
      type: "FOLDER",
      children: []
    }
    if (!id) {
      setItems(prev => [...prev, newItem])
    } else {
      const newArr = [...items]
      findItem(newArr, id).children.push(newItem)
      setItems([...newArr])
      setItemId(null)
    }
    setModalType(null)
  }
  const createFile = (name, id) => {
    const newItem = {
      id: uuidv4(),
      name,
      type: "FILE",
      children: []
    }
    if (!id) {
      setItems(prev => [...prev, newItem])
    } else {
      const newArr = [...items]
      findItem(newArr, id).children.push(newItem)
      setItems([...newArr])
      setItemId(null)
    }
    setModalType(null)
  }
  const editHandler = (value, id) => {
    const newArr = [...items]
    findItem(newArr, id).name = value
    setItems([...newArr])
    setItemId(null)
    setModalType(null)
  }
  const deleteHandler = (arr, id) => {
    const iterate = (arr, id) => {
      for (let item of arr) {
        if(item.id===id){
          let targetIndex = arr.findIndex(item=>item.id===id)
          arr.splice(targetIndex,1)
        }else {
          iterate(item.children, id)
        }
      }
    }
    iterate(arr, id)
    setItems([...arr])
    setItemId(null)
    setModalType(null)
  }
  const insertHandler = (type, id) => {
    setModalType(type)
    setItemId(id)
  }
  const closeModal=()=>{
    setModalType(null);
    setItemId(null)
  }

  const Inputs = {
    "FILE": <NewFileInput closeHandler={closeModal} submitHandler={(value) => createFile(value, itemId ?? null)}/>,
    "FOLDER": <NewFolderInput closeHandler={closeModal} submitHandler={(value) => createFolder(value, itemId ?? null)}/>,
    "EDIT": <EditModal closeHandler={closeModal} editHandler={(value) => editHandler(value, itemId)} defaultValue={findItem(items, itemId)}/>,
    "DELETE": <DeleteModal deleteHandler={() => deleteHandler(items, itemId)}/>
  }

  return (
      <section className="w-4/12 bg-gray-900/40 h-full">
        <div className="text-gray-300 text-2xl p-5 border-b border-gray-700/40">Shopino</div>
        <div className="flex items-center justify-between p-5">
          <div>Files</div>
          <div className="flex gap-4 text-gray-300 text-xs ">
            <div className="hover:text-white cursor-pointer flex items-center gap-2"
                 onClick={() => setModalType("FOLDER")}>
              <span className=" w-4 h-4 relative inline-block"><NewFolderSVG/></span>
              New Folder
            </div>
            <div className="hover:text-white cursor-pointer flex items-center gap-2"
                 onClick={() => setModalType("FILE")}>
              <span className=" w-4 h-4 relative inline-block"><NewFileSVG/></span>
              New File
            </div>
          </div>
        </div>
        <ItemsContainer items={items} insertHandler={insertHandler}/>
        <Modal isOpen={!!modalType} closeHandler={closeModal}>
          {Inputs[modalType]}
        </Modal>
      </section>
  )
}

export default Sidebar