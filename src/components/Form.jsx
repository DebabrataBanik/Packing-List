import { Trash } from 'lucide-react';
import { Plus } from 'lucide-react';

function Form({
  quantity,
  item,
  setQuantity,
  setItem,
  handleSubmit,
  setMsg,
  msg
}) {
  
  function handleSetQuantity(e){
    setQuantity(e.target.value)
    setMsg('')
  }

  function handleSetItem(e){
    setItem(e.target.value)
    setMsg('')
  }

  function handleFormSubmit(e){
    e.preventDefault()

    setItem('')
    setQuantity('1')
    handleSubmit()
  }

  return (
    <div className="form-container">
      {/* <p>What do u need for your trip?</p> */}
      <form 
        className="input-container" 
        onSubmit={handleFormSubmit}
      >
        <input 
          value={item} 
          onChange={handleSetItem} 
          type="text" 
          placeholder="add item to list..."  
        />
        <input 
          value={quantity} 
          onChange={handleSetQuantity} type="number" 
          min="1" max='20' 
          placeholder="quantity"
        />
        
        <button type="submit"><Plus size={17} /></button>   
      </form>
      {/* <p>{msg}</p> */}
    </div>
  )
}

export default Form