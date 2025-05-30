import React from "react";

const Card = React.memo(({ politician }) => {
  console.log(politician.name);
  return (
    <div className="card">
      <img src={politician.image} alt={politician.name} />
      <div className="info">
        <div>{politician.name}</div>
        <div>{politician.country}</div>
        <div>{politician.position}</div>
        <p>{politician.biography}</p>
      </div>
    </div>
  );
});

export default Card;
