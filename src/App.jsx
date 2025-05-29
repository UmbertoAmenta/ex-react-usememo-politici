import { useEffect, useMemo, useState } from "react";

import SearchBar from "./components/SearchBar";

export default function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getPoliticians = async () => {
      try {
        const response = await fetch("http://localhost:5000/politicians");
        if (!response.ok) throw new Error("Errore nel recupero dei dati");
        const data = await response.json();
        setPoliticians(data);
      } catch (error) {
        console.error("Errore:", error.message);
        return null;
      }
    };
    getPoliticians();
  }, []);

  const filteredPoliticians = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return politicians.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.biography.toLowerCase().includes(lowerSearch)
    );
  }, [politicians, search]);

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="grid">
        {filteredPoliticians.map((p, i) => (
          <div key={i} className="card">
            <img src={p.image} alt={p.name} />
            <div className="info">
              <div>{p.name}</div>
              <div>{p.country}</div>
              <div>{p.position}</div>
              <p>{p.biography}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
