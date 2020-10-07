const SearchBox = ({ searchString, setSearchString }) => {
  return (
    <div className="input-wrapper input-search-wrapper">
      <img src="/icons/magnifying_glass.svg" />
      <input
        className="input input-search"
        id="email"
        type="text"
        autoComplete="off"
        spellCheck={false}
        placeholder="Search by name or role"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
