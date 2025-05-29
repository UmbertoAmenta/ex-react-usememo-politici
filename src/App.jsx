import { useEffect, useState } from "react";

export default function App() {
  const [politicians, setPoliticians] = useState([]);

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

  console.log(politicians);

  return (
    <>
      <div className="grid">
        {politicians.map((p, i) => (
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
