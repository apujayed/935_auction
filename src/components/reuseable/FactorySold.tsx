// @ts-nocheck
import React from 'react';

import { FaReact } from 'react-icons/fa';
const FactorySold = ({ data,sale,season,broker }) => {
  // ... (same calculations as before)
  const soldData = data.filter((item) => item.Status === true);

  // Calculate the total sold packages for each factory
  const factorySoldPkgs = soldData.reduce((acc, item) => {
    
    
    const factoryName = item.expand.Factory.Company_name;
    if (!acc[factoryName]) {
      acc[factoryName] = 0;
    }
    acc[factoryName] += item.Package;
    return acc;
  }, {});

  // Calculate the total sold kilograms for each factory
  const factorySoldKg = soldData.reduce((acc, item) => {
    const factoryName = item.expand.Factory.Company_name;
    if (!acc[factoryName]) {
      acc[factoryName] = 0;
    }
    acc[factoryName] += parseFloat(item.Grand_total);
    return acc;
  }, {});

  // Calculate the total amount (Grand_total * price_max) for each factory
  const factoryTotalAmount = soldData.reduce((acc, item) => {
    const factoryName = item.expand.Factory.Company_name;
    if (!acc[factoryName]) {
      acc[factoryName] = 0;
    }
    acc[factoryName] += parseFloat(item.Grand_total) * parseFloat(item.price_max);
    return acc;
  }, {});

  // Calculate the average price (total amount / Grand_total) for each factory
  const factoryAvgPrice = Object.keys(factoryTotalAmount).reduce((acc, factoryName) => {
    acc[factoryName] = factoryTotalAmount[factoryName] / factorySoldKg[factoryName];
    return acc;
  }, {});
  const handleButtonClick = () => {
    const dataAsHtml = `
      <h2 style="text-align: center;">Factory Wise Sold Report</h2>
      <table>
        <thead>
          <tr>
            <th>Factory Name</th>
            <th>Total Sold Packages</th>
            <th>Total Sold Kg</th>
            <th>Total Amount</th>
            <th>Average Price</th>
          </tr>
        </thead>
        <tbody>
          ${Object.keys(factorySoldPkgs)
            .map((factoryName) => {
              return `
                <tr>
                  <td>${factoryName}</td>
                  <td>${factorySoldPkgs[factoryName]}</td>
                  <td>${factorySoldKg[factoryName].toFixed(2)}</td>
                  <td>${factoryTotalAmount[factoryName].toFixed(2)}</td>
                  <td>${factoryAvgPrice[factoryName].toFixed(2)}</td>
                </tr>
              `;
            })
            .join('')}
        </tbody>
      </table>
    `;
    const htmlContent = `
    <html>
    <head>
      <title>Factory Wise Sold</title>
      <link rel="icon"  type="image/png" href="/ttab.png" />
      <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400&family=Play&display=swap" rel="stylesheet">
      
      <style>
        .table-wrapper {
          margin: 0 auto;
          width: 980px;
          padding: 20px;
          background-color: #ffffff;
        }
        body {
          font-family: 'Play', sans-serif;
          color: #000;
          background: #757677;
          font-size: 12px;
        }
        .head {
          padding: 0px 50px;
          display: flex;
          justify-content: space-between;
        }
        table {
          width: 940px;
          margin: 0 auto;
          border-collapse: collapse;
        }
        th,
        td {
          padding: 5px;
          border: 1px solid black;
          text-align: center;
        }
        th.align-right,
        td.align-right {
          text-align: right;
        }
        .total {
          font-weight: bold;
          color: purple;
        }
        .green-text {
          font-weight: 400;
          color: purple;
        }
        .red-text {
          color: red;
        }
        .season {
          display: flex;
          align-items: space-between;
          justify-content: center;
        }
        @media print {
          body {
            margin: 0;
            font-size: 10px;
          }
          .table-wrapper {
            page-break-inside: avoid;
          }
        }
        .header {
         
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
      }

      /* Icon in the first row */
      .icon {
          width: 60px;
          height: 60px;
             }

      /* Span Container */
      .span-container {
          display: flex;
          flex-direction: column;
          align-items: center; /* Center the container horizontally */
      }

      /* Individual Spans */
      .span1, .span2, .span3 {
          padding: 2px 10px;
          text-align: center;
      }

      .span1 {
        padding:0px!important;
        margin:0px !important;
          font-size: 26px;
          font-weight:bold;
      }

      .span2, .span3 {
          font-size: 14px;
      }
      </style>
    </head>
    <body>
    <div class="table-wrapper">
    <div class="header">
    <!-- Icon in the first row -->
    <div class="icon">
    <img class="icon" src="/ttab.png" alt="Icon Image" />
    </div>

    <!-- Span Container -->
    <div class="span-container">

    <p class="span1">${broker}</p>
    <span class="span2">Season :${season}</span>
    <span class="span3">Sale No : ${sale}</span>
  
    </div>
    <div></div>
</div>
        <hr>
        ${dataAsHtml}
        <hr>
        <p style="text-align: center;">This automated report is generated by IT Tech Point BD. Please note that this report will only be visible until the 2nd sale. After that, you will need to become a premium member to access it.</p>
      </div>
      </div>
     
    </body>
  </html>
    `;
    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  };

  return (

    <div>
    <button onClick={handleButtonClick}  className="bg-pink-500 p-4  w-full flex items-center text-white px-4 py-4">
      <FaReact className="text-2xl mr-2" />
      <p>Factory Sold</p>
    </button>
    </div>
      
  );
};

export default FactorySold;
