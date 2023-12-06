import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ columns, headings, data, className, linkPath }) => {
  return (
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
              <React.Fragment key={colIndex}>
                {colIndex === 0 ? ( // Check if it's the first column
                  <td>
                    <Link to={`${linkPath}/${row.eid}`}>{row.name}</Link>
                  </td>
                ) : (
                  <td>{row[column]}</td>
                )}
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
