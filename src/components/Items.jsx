import React from "react";

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
          <ul>
            {
              itemList.map((item) => (
                <li key={item.id}>
                  <input type="checkbox" onChange={() => handleCheck(item.id)}/>
                  <span style={{ textDecoration: item.packed ? 'line-through' : 'none'}}>
                    {
                      item.count > 1 ? 
                      `${item.count} ${item.name}s` : 
                      `${item.count} ${item.name}`
                    }
                  </span>
                  <span className="remove" onClick={() => removeItem(item.id)}> x</span>
                </li> 
              ))
            }
          </ul>
        ) 
        : 
        (
          <div>No items to display</div>
        )
      }
    </div>
  )
}

export default React.memo(Items);