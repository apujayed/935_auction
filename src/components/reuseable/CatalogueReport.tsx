// @ts-nocheck
import { secretKey } from "../../config";
import { BiSolidPrinter } from "react-icons/bi";
import decryptData from "../../security/decryption";

const CatalogueReport = ({ data }) => {  

 const profile = decryptData(`${secretKey}`,'profile')
 
    
  const openNewTab = () => {
    const newTab = window.open("", "_blank");
    if (newTab) {
      // Calculate column totals
      const columnTotals = {
        Net_weight: 0,
        Package: 0,
        Total_kg: 0,
        Grand_total: 0,
        Offer_price: 0,
        Collection: 0,
        Gross_weight: 0,
        PriceMax: 0,
      };

      data.forEach((item) => {
        for (const key in columnTotals) {
          columnTotals[key] += item[key];
        }
      });
      const formatNumber = (value) =>
        new Intl.NumberFormat("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);
      const tableHtml = `
        <html>
          <head>
            <title>Data Table</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400&family=Play&display=swap" rel="stylesheet">
            <style>
           .table-header{
            text-align: center;
           }
            .table-wrapper {
                margin: 0 auto;
                width: 1500px;
                padding: 20px;
                background-color: #ffffff;
              }
              body {
                font-family: 'Play', sans-serif;
                color: #000;
                background: #757677;
                font-size: 12px;
              }
              table {
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
              td.align-left {
                text-align: left;
              }
            </style>
          </head>
          <body>
          <div class="table-wrapper">
           <div class="table-header">
           <h1>${profile[0].Company_name}</h1>
          
           </div>
            <table border="1">
              <thead>
                <tr>
                  <th>Lot</th>
                  <th>Invoice</th>
                  <th style="width:20%">Factory</th>
                  <th style="width:20%" >Warehouse</th>
                  <th style="width:10%" >Grade</th>
                  <th>Gross Weight</th>
                  <th>Net Weight</th>
                  <th>Package</th>
                  <th>Total KG</th>
                  <th>Collection</th>
                  <th>Grand Total</th>
                  <th>Offer Price</th>
                  <th style="width:10%">Season</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    (item) =>
                      `
                  
                  <tr>
                        <td>${item.Lot_number}</td>
                        <td>${item.Invoice}</td>
                        <td  class="align-left">${item.Factory}</td>
                        <td  class="align-left">${item.Warehouse}</td>
                        <td>${item.Grade}</td>
                        <td class="align-right">${formatNumber(
                          item.Gross_weight
                        )}</td>
                        <td class="align-right">${formatNumber(
                          item.Net_weight
                        )}</td>
                        <td class="align-right">${formatNumber(
                          item.Package
                        )}</td>
                        <td class="align-right">${formatNumber(
                          item.Total_kg
                        )}</td>
                        <td>${item.Collection}</td>
                     
                     
                        <td class="align-right">${formatNumber(
                          item.Grand_total
                        )}</td>
                        <td class="align-right">${formatNumber(
                          item.Offer_price
                        )}</td>
                    
                    
                        <td>${item.Season}</td>
                       
                        <td>${item.Category}</td>
                 
                        
                      </tr>
                  
                `
                  )
                  .join("")}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total:</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                 
                  <td>${formatNumber(columnTotals.Gross_weight)}</td>

                  <td>${formatNumber(columnTotals.Net_weight)}</td>
                  <td>${formatNumber(columnTotals.Package)}</td>
                  <td>${formatNumber(columnTotals.Total_kg)}</td>
                  <td>${formatNumber(columnTotals.Collection)}</td>

                  <td>${formatNumber(columnTotals.Grand_total)}</td>
                  <td></td>
                 
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
            </div>
          </body>
        </html>
      `;

      newTab.document.write(tableHtml);
      newTab.document.close();
    }
  };

  return <button onClick={openNewTab}><BiSolidPrinter/></button>;
};

export default CatalogueReport;
