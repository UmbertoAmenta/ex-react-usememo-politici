export default function SearchBar({ search, setSearch }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Cerca per Nome o Biografia"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
