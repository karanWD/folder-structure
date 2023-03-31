import React, {useState} from "react";
import Item from "@/components/item";

type Props = {
  items: []
}
const ItemsContainer = ({items, insertHandler}) => {
  const [isVisible, setVisible] = useState()
  const dropdownHandler = (e, id) => {
    e.stopPropagation()
    setVisible(prev => prev === id ? null : id)
  }

  return (
      items.map((item, index) => {
        const style = isVisible === item.id ? "max-h-[1000px]" : "max-h-[28px]"
        return (
            <div className={`${style} overflow-hidden transition-all duration-500 ml-4`}
                 onClick={(e) => dropdownHandler(e, item.id)}
                 key={"ITEM_" + item.id}
            >
              <Item key={"ITEM_" + index} name={item.name} type={item.type} id={item.id}
                    insertHandler={insertHandler} expanded={isVisible === item.id}/>
              {
                  item.children.length > 0 &&
                  <ItemsContainer items={item.children} insertHandler={insertHandler}/>
              }
            </div>
        )
      })
  )
}

export default ItemsContainer