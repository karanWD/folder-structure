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
  const [itemId, setItemId] = useState()
  const [modalType, setModalType] = useState<"FOLDER" | "FILE" | null>(null)

  //Functions
  const create = (name, id,type) => {
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
    "FILE": <NewFileInput closeHandler={closeModal} submitHandler={(value,type) => create(value, itemId ?? null,type)}/>,
    "FOLDER": <NewFolderInput closeHandler={closeModal} submitHandler={(value,type) => create(value, itemId ?? null,type)}/>,
    "EDIT": <EditModal closeHandler={closeModal} editHandler={(value) => editHandler(value, itemId)} defaultValue={findItem(items, itemId)}/>,
    "DELETE": <DeleteModal deleteHandler={() => deleteHandler(items, itemId)}/>
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