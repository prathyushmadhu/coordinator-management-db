import React from 'react';

const Table = ({ columns, headings, data, className }) => (
  <table className={className}>
    <thead>
      <tr>
        {headings.map((heading, index) => (
          <th key={index}>{heading}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((column, colIndex) => (
            <td key={colIndex}>{row[column]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;