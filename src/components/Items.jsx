import React from "react";
import { Trash } from "lucide-react";

function Items({
  itemList, 
  removeItem,
  handleCheck
}) {

  return (
    <div>
      {
        itemList.length > 0 ? 
        (
          <div className="list-container">
            <ul>
              {
                itemList.map((item) => (
                  <li className="item" key={item.id}>
                    <label class="custom-checkbox">
                      <input type="checkbox" onChange={() => handleCheck(item.id)} />
                      <span class="checkmark"></span>
                    </label>
      
                    <span style={{ textDecoration: item.packed ? 'line-through' : 'none'}}>
                      {
                        item.count > 1 ? 
                        `${item.count}  ${item.name}s` : 
                        `${item.count}  ${item.name}`
                      }
                    </span>
                    <span className="remove" onClick={() => removeItem(item.id)}><Trash size={15} /></span>
                  </li> 
                ))
              }
            </ul>
          </div>
        ) 
        : 
        (
          <div className="default-msg">No items in your packing list yet. <br /> Add your first item above to get started!</div>
        )
      }
    </div>
  )
}

export default React.memo(Items);