import React, {useState} from "react";
import Modal from "@/components/ui/modal";
import NewFileInput from "@/components/newFileInput";
import NewFolderInput from "@/components/newFolderInput";
import ItemsContainer from "@/components/itemsContainer";
import {v4 as uuidv4} from 'uuid';
import EditModal from "@/components/editModal";
import DeleteModal from "@/components/deleteModal";
import {findItem} from "@/utils/findItem";
import ActionsButton from "@/components/actionsButton";
import {createPortal} from "react-dom";

type Items = {
  id: string
  name: string,
  type: "FILE" | "FOLDER"
  children: []
}

const Sidebar = () => {
  //States
  const [items, setItems] = useState<Array<Items>>([])
  const [itemId, setItemId] = useState<string | null>(null)
  const [modalType, setModalType] = useState<"FOLDER" | "FILE" |"EDIT"|"DELETE" | null>(null)

  //Functions
  const create = (name:string,id:string,type:"FILE"|"FOLDER") => {
    const newItem:Items = {
      id: uuidv4(),
      name,
      type,
      children: []
    }
    if (!id) {
      setItems((prev ) => [...prev, newItem])
    } else {
      const newArr = [...items]
      findItem(newArr, id).children.push(newItem)
      setItems([...newArr])
      setItemId(null)
    }
    setModalType(null)
  }
  const editHandler = (value:string , id:string) => {
    const newArr = [...items]
    findItem(newArr, id).name = value
    setItems([...newArr])
    setItemId(null)
    setModalType(null)
  }
  const deleteHandler = (arr:Items[], id:string) => {
    const iterate = (arr:Items[], id:string) => {
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
  const insertHandler = (type:"FILE"|"FOLDER"|"EDIT"|"DELETE", id:string) => {
    setModalType(type)
    setItemId(id)
  }
  const closeModal=()=>{
    setModalType(null);
    setItemId(null)
  }


  const Inputs = {
    "FILE": <NewFileInput closeHandler={closeModal} submitHandler={(value,type) => create(value, itemId as string ?? null,type)}/>,
    "FOLDER": <NewFolderInput closeHandler={closeModal} submitHandler={(value,type) => create(value, itemId as string ?? null,type)}/>,
    "EDIT": <EditModal closeHandler={closeModal} editHandler={(value) => editHandler(value, itemId as string)} defaultValue={findItem(items, itemId as string)}/>,
    "DELETE": <DeleteModal deleteHandler={() => deleteHandler(items, itemId as string)}/>
  }

  return (
      <section className="w-full lg:w-4/12 bg-gray-900/40 h-full">
        <div className="text-gray-300 text-2xl p-5 border-b border-gray-700/40">Shopino</div>
        <div className="flex items-center justify-between p-5">
          <div>Files</div>
          <div className="flex gap-4 text-gray-300 text-xs ">
           <ActionsButton hasText={true} clickHandler={() => setModalType("FOLDER")} type={"FOLDER"}/>
           <ActionsButton hasText={true} clickHandler={() => setModalType("FILE")} type={"FILE"}/>
          </div>
        </div>
        <ItemsContainer items={items} insertHandler={insertHandler}/>
        {!!modalType && createPortal(<Modal closeHandler={closeModal}>{Inputs[modalType]}</Modal>, document.body)}
      </section>
  )
}

export default Sidebar