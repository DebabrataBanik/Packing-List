function Filter({
  setSortMtd
}) {

  function handleChange(e){
    setSortMtd(e.target.value)
    console.log(e.target.value)
  }

  return (

    <div>
      <select name="sortMethod" onChange={handleChange}>
        <option value='input'>Sort by Input Order </option>
        <option value='name'>Sort by Name </option>
        <option value='packed'>Sort by Packed Status</option>
      </select>
    </div>
  )
}

export default Filter