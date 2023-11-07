const Search = ({ searchData, setSearchData }) => {

  const searchPut = (e) => {
    const newValue = e.target.value.toLowerCase();
    setSearchData(newValue);
 
  };
  return (
    <>
      <div>
        <form>
          <input type="text" onChange={searchPut} value={searchData}></input>
        </form>
      </div>
    </>
  );
};

export default Search;
