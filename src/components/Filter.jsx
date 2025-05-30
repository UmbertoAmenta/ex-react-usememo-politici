export default function Filter({
  selectedPosition,
  setSelectedPosition,
  onlyPositions,
}) {
  return (
    <div className="filter">
      <select
        value={selectedPosition}
        onChange={(e) => setSelectedPosition(e.target.value)}
      >
        <option value="">All positions</option>
        {onlyPositions.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}
