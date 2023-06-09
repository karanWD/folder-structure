import React, {FC, useState} from "react";
import Item from "@/components/item";

type Items = {
  id: string
  name: string,
  type: "FILE" | "FOLDER"
  children: []
}
type Props={
  items:Items[],
  insertHandler:(type:"FILE"|"FOLDER"|"EDIT"|"DELETE",id:string)=>void
}

const ItemsContainer:FC<Props> = ({items, insertHandler}) => {
  const [isVisible, setVisible] = useState<Array<string>>([])
  
  const dropdownHandler = (e:React.MouseEvent<HTMLInputElement>, id:string) => {
    e.stopPropagation()
    const visibleIndex = isVisible.findIndex(item => item === id)
    if (visibleIndex === -1) {
      setVisible(prev => [...prev, id])
    } else {
      let newArr = [...isVisible]
      newArr.splice(visibleIndex, 1)
      setVisible(newArr)
    }
  }

  return (
      <>
        {
          items.map((item) => {
            const style = isVisible.find(value=>value===item.id) ? "max-h-full" : "max-h-[38px]"
            return (
                <div className={`${style} overflow-hidden transition-all duration-300 ml-4`}
                     onClick={(e:React.MouseEvent<HTMLInputElement>) => dropdownHandler(e, item.id)}
                     key={"ITEM_" + item.id}
                >
                  <Item  name={item.name} type={item.type} id={item.id}
                         insertHandler={insertHandler} expanded={!!isVisible.find(value=>value===item.id)}/>
                  {
                      item.children.length > 0 &&
                      <ItemsContainer items={item.children} insertHandler={insertHandler}/>
                  }
                </div>
            )
          })
        }
      </>
  )
}

export default ItemsContainer