// @ts-nocheck
import React from "react";

function generateTable(data,seasonSELECTED,saleSELECTED,broker_name) {
    const tableLimit= 40;
    const rowsPerTable= 33;
  const timestamp = new Date().toLocaleString();
  const numRows = Math.ceil(data.length / (tableLimit * rowsPerTable));
  let currentRow = 0;
  let html = '';
  let lastTable = '';
  
  for (let i = 0; i < numRows; i++) {
    currentRow++;
    html += '<div class="table-row">';

    for (let j = 0; j < tableLimit; j++) {
      const start = i * tableLimit * rowsPerTable + j * rowsPerTable;
      const end = start + rowsPerTable;
      const tableData = data.slice(start, end);

      if (tableData.length === 0) {
        break;
      }

      html += '<table class="table">';
      html += '<thead><tr><th>LOT</th><th>VALUE</th></tr></thead>';
      html += '<tbody>';

      for (let k = 0; k < tableData.length; k++) {
        const rowData = tableData[k];
        html += '<tr>';
        html += `<td>${rowData.Lot_number}</td>`;
        html += `<td>${rowData.Offer_price}</td>`;
        html += '</tr>';
      }

      // Add empty cells to fill remaining space
      const lastRow = tableData[tableData.length - 1];
      const numCells = Object.keys(lastRow).length;
      if (numCells < 2) {
        for (let k = numCells; k < 2; k++) {
          html += '<td></td>';
        }
      }

      html += '</tbody>';
      html += '</table>';

      // Keep track of the last table
      if ((i === numRows - 1) && (j === tableLimit - 1)) {
        lastTable = html;
      }

      if (j === tableLimit - 1) {
        html += '<br>';
      }
    }

    html += '</div>';
  }

  const sum = data.reduce((acc, val) => acc + val.price, 0);

  const newWindow = window.open('');
  newWindow.document.write(`
    <html>
      <head>
        <title>Valuation Report</title>
        <style>
          .table-wrapper {
            margin: 0 auto;
            width: 800px;
            padding: 20px;
            background-color: #ffffff;
          }
          body {
            font-family: "Courier New", Courier, monospace;
            color: #000;
            background: #757677;
            font-size: 12px;
          }
          .table-row {
            align-items: start;
            display: flex;
            flex-wrap: wrap;
          }
          .table {
            margin: 10px;
          }
          .table th,
          .table td {
            padding: 5px;
          }
        </style>
      </head>
      <body>
        <div class="table-wrapper">
        <div class="header">
        <h1 style="text-align:center">${broker_name}</h1>
          <p style="text-align: center;">Season ${seasonSELECTED}</p>
          <div class="season">
            <span style="text-align: center;">Sale No: ${saleSELECTED}</span>
           
          </div>
        </div>
          <hr />
          ${html}
        </div>
      </body>
    </html>
  `);
}

const ValuationReport = ({ data,seasonSELECTED,saleSELECTED,broker_name }) => {
  const handleClick = () => {
    generateTable(data,seasonSELECTED,saleSELECTED,broker_name)
  };

  return <button className="btn btn-primary w-100 text-center mb-2 d-flex justify-content-between align-items-center" onClick={() => generateTable(data,seasonSELECTED,saleSELECTED,broker_name )}>
 <span className="text-center mx-auto">Valuation</span>
  <span className="icon my-auto">&#x1F512;</span>
  </button>;
};
export default ValuationReport;
