const Select = ({ setBoroughFilter }) => {
  const selecter = (e) => {
    const newValue = e.target.value.toLowerCase();
    setBoroughFilter(newValue);
  };
  return (
    <>
      <label htmlFor="boroughs">Borough</label>
      <select onChange={selecter} name="boroughs" id="boroughs">
        <option value="Select">Select</option>
        <option value="Manhattan">Manhattan</option>
        <option value="Brooklyn">Brooklyn</option>
        <option value="Queens">Queens</option>
        <option value="Bronx">Bronx</option>
        <option value="Staten Island">Staten Island</option>
      </select>
    </>
  );
};

export default Select;
