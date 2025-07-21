import { useMemo, useState, useCallback } from 'react'
import Form from './components/Form'
import Items from './components/Items';
import Filter from './components/Filter';

function App() {

  const [ quantity, setQuantity ] = useState('1');
  const [ itemList, setItemList ] = useState([]);
  const [ item, setItem ] = useState('');
  const [msg, setMsg] = useState('')
  const [sortMethod, setSortMethod] = useState('input');

  // console.log('Number of items',quantity)
  // console.log('Items array',itemList)
  // console.log('Item',item)

  function appendItem(){
    if(!item.trim()){
      setMsg('Item name cannot be empty.')
      return
    }
    if(isNaN(quantity) || quantity < 1 || quantity > 20){
      setMsg('Quantity must be between 1 and 20.')
      return
    }
    const existingItem = itemList.find(i => i.name.trim().toLowerCase() === item.trim().toLowerCase()) 
    if(existingItem){
      setMsg('Item already exists.')
      return
    }
    setItemList(prev => [
      ...prev, {
      id: Date.now(),
      name: item,
      count: quantity,
      packed: false
    }
  ]);
  }

  const removeItem = useCallback((id) => {
    setItemList(prev => prev.filter(item => item.id !== id))
  }, [])

  const handleCheck = useCallback((id) => {
    setItemList(prev => 
      prev.map(item => item.id === id ? {...item, packed: !item.packed } : item 
    ));
  }, [])

  const sortedItems = useMemo(() => {
    let sorted = [...itemList];
    if (sortMethod === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMethod === 'packed') {
      sorted.sort((a, b) => Number(a.packed) - Number(b.packed));
    }
    return sorted;
  }, [itemList, sortMethod]);
  

  return (
    <>
    <header>
      <h1>BackPack</h1>
      <p>Fill your bag with BackPack. Make sure you don't forget anything.</p>
    </header>
    <main>
      <Form item={item} quantity={quantity} setQuantity={setQuantity} handleSubmit={appendItem} setItem={setItem} msg={msg} setMsg={setMsg}/>

      <Items itemList={sortedItems} removeItem={removeItem} handleCheck={handleCheck} />

      <Filter sortMethod={sortMethod} setSortMethod={setSortMethod} />
    </main>
    </>
  )
}

export default App