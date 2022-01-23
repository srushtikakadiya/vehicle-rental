import React from "react";

const TableSelect = ({ fuel, setFuel }) => {
  const arr = ['', "benzin", "lpg", "diesel"];
  return (
    <ul className="list-group">
      {arr.map(ele => (
        <li onClick={() => setFuel(ele)} key={ele} className={ele === fuel ? "list-group-item active" : "list-group-item" }>
          {ele ? ele : 'All cars'}
        </li>
      ))}
    </ul>
  );
};

export default TableSelect;
