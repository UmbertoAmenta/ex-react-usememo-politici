import { useEffect, useMemo, useState } from "react";

import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import Filter from "./components/Filter";

export default function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const onlyPositions = useMemo(
    () =>
      politicians.reduce((positionsList, politician) => {
        if (!positionsList.includes(politician.position)) {
          positionsList.push(politician.position);
        }
        return positionsList;
      }, []),
    [politicians]
  );

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
        (p.name.toLowerCase().includes(lowerSearch) ||
          p.biography.toLowerCase().includes(lowerSearch)) &&
        (selectedPosition === "" || p.position === selectedPosition)
    );
  }, [politicians, search, selectedPosition]);

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <Filter
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        onlyPositions={onlyPositions}
      />
      <div className="grid">
        {filteredPoliticians.map((p) => (
          <Card key={p.id} politician={p} />
        ))}
      </div>
    </>
  );
}
