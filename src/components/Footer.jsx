function Footer({
  items
}) {

  const packed = items.filter(item => item.packed)
  const packedPercent = Math.floor((packed.length/items.length)*100);

  return (
    <div>
      {
        items.length > 0 ?
        <>
          <p>You have {items.length} {items.length > 1 ? 'items' : 'item'} in your list and packed {packed.length}. ({packedPercent}%)</p> 
        </> 
        :
        <p>Add some items to the list.</p>
      }
    </div>
  )
}

export default Footer