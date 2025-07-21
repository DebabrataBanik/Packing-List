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
    <div>
      <p>What do u need for your trip?</p>
      <form 
        className="input-container" 
        onSubmit={handleFormSubmit}
      >
        <input 
          value={quantity} 
          onChange={handleSetQuantity} type="number" 
          min="1" max='20' 
          placeholder="quantity"
        />
        <input 
          value={item} 
          onChange={handleSetItem} 
          type="text" 
          placeholder="add item"  
        />
        
        <button type="submit">Add</button>   
      </form>
      <p>{msg}</p>
    </div>
  )
}

export default Form