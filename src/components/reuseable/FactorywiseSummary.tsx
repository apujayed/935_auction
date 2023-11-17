// @ts-nocheck
import React from 'react';

import { FaReact } from 'react-icons/fa';
import { AiOutlineUnlock } from 'react-icons/ai';
const FactorywiseSummary = ({ data,sale,season,broker }) => {
  const factoryData = data.reduce((acc, item) => {
    
    const factoryName = item.expand.Factory.Company_name;
    if (!acc[factoryName]) {
      acc[factoryName] = {
        offeredKg: 0,
        soldKg: 0,
        unsoldKg: 0,
        totalTk: 0,
        count: 0,
      };
    }

    const grossTotal = Number(item.Grand_total);
    acc[factoryName].offeredKg += grossTotal;
    if (item.Status === true) {
      acc[factoryName].soldKg += grossTotal;
      acc[factoryName].totalTk += grossTotal * Number(item.price_max);
    } else {
      acc[factoryName].unsoldKg += grossTotal;
    }
    acc[factoryName].count++;

    return acc;
  }, {});

  // Calculate total offered kilograms for each factory
  Object.keys(factoryData).forEach((factoryName) => {
    const factory = factoryData[factoryName];
    factory.totalOfferedKg = factory.offeredKg ;
  });

  // Calculate average price for each factory
  Object.keys(factoryData).forEach((factoryName) => {
    const factory = factoryData[factoryName];
    if (factory.soldKg > 0) {
      factory.averagePrice = factory.totalTk / factory.soldKg;
    } else {
      factory.averagePrice = 0;
    }
  });

  // Calculate Sold % for each factory
  Object.keys(factoryData).forEach((factoryName) => {
    const factory = factoryData[factoryName];
    factory.soldPercentage = ((factory.soldKg / factory.totalOfferedKg) * 100).toFixed(2);
  });

  // ... (your existing code here)

  const handleButtonClick = () => {
    const dataAsHtml = `
      <table>
      <thead>
      <tr>
        <th rowSpan="2">Factory Name</th>
        <th colSpan="1">Offered</th>
        <th colSpan="2">Sold</th>
        <th rowSpan="1">Unsold</th>
        <th rowSpan="2">Sold %</th>
      </tr>
      <tr>
        <th>Kgs</th>
        <th>Kgs</th>
        <th>Avg. (Tk)</th>
        <th>Kgs</th>
      </tr>
    </thead>
        <tbody>
          ${Object.keys(factoryData)
            .map((factoryName) => {
              const factory = factoryData[factoryName];
              return `
                <tr>
                  <td>${factoryName}</td>
                  <td>${factory.offeredKg.toFixed(2)}</td>
                  <td>${factory.soldKg.toFixed(2)}</td>
                  <td>${factory.averagePrice.toFixed(2)}</td>
                  <td>${factory.unsoldKg.toFixed(2)}</td>
                  <td>${factory.soldPercentage}%</td>
                </tr>
              `;
            })
            .join('')}
        </tbody>
        <tfoot>
        <tr>
          <td>Total</td>
          <td>${Object.values(factoryData).reduce((acc, factory) => acc + factory.offeredKg, 0).toFixed(2)}</td>
          <td>${Object.values(factoryData).reduce((acc, factory) => acc + factory.soldKg, 0).toFixed(2)}</td>
          <td>${Object.values(factoryData).reduce((acc, factory) => acc + factory.averagePrice, 0).toFixed(2)}</td>
          <td>${Object.values(factoryData).reduce((acc, factory) => acc + factory.unsoldKg, 0).toFixed(2)}</td>
          <td></td>
        </tr>
      </tfoot>
      </table>
    `;
    const htmlContent = `
    <html>
    <head>
      <title>Factory Wise Summary</title>
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
        padding:0px !important;
        margin:0px!important;
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

    <div >
    <button onClick={handleButtonClick}  className="bg-yellow-500 p-4  w-full flex items-center text-white px-4 py-4">
      <FaReact className="text-2xl mr-2" />
      <p>Factory Summary</p>
      {/* <AiOutlineUnlock className="text-white text-2xl ml-2"/> */}
    </button>
    </div>

  );
};

export default FactorywiseSummary;
