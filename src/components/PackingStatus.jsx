function PackingStatus({
  items
}) {

  let packed = items.filter(item => item.packed)
  const packedPercent = Math.floor((packed.length/items.length)*100);

  return (
    <div className="packing-status">
      {
        <>
          <div className="status">
            <p>Packing Progress</p>
            <span>{packed.length}/{items.length} packed</span>
          </div>

          <div className="progress">
            <div className="bar">
              <span style={{ width: `${packedPercent}%` }}></span>
            </div>
          </div>
        </> 
      }
    </div>
  )
}

export default PackingStatus