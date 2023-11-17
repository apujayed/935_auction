// @ts-nocheck
import React from "react";
import { FaReact } from 'react-icons/fa';

    // const storedValue = localStorage.getItem("isVisible");
    // const str = JSON.parse(storedValue);
    // console.log(typeof(str));
let tableCount = 1;

function generateCategoryTable(data,season,sale,broker) {
console.log(data);

  const categories = [...new Set(data.map(item => item.Factory))];
  const invoices = [...new Set(data.map(item => item.Factory))];

  let tableHTML = '';
tableHTML=` <html>
<title>Catalogue</title>
<link rel="icon"  type="image/png" href="/ttab.png" />
<head>
  <meta charset="UTF-8">
  <style>
  .page-header,
  .page-header-space,
  .page-footer,
  .page-footer-space {
    display: none;
  }

  @media print {
    .page-header,
    .page-header-space,
    .page-footer,
    .page-footer-space {
      display: block;
    }
  }

  .page-header, .page-header-space {
    height: 80px;
  }
  
  .page-footer, .page-footer-space {
    height: 50px;
  
  }
  
  .page-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid black; /* for demo */
    background: yellow; /* for demo */
  }
  
  .page-header {
    position: fixed;
    top: 0mm;
    width: 100%;
    border-bottom: 1px solid black; /* for demo */
    background: yellow; /* for demo */
  }
  
  .page {
    page-break-after: always;
  }
  
  @page {
    margin: 20mm
  }
  
  @media print {
     thead {display: table-header-group;} 
     tfoot {display: table-footer-group;}
     
     button {display: none;}
     
     body {margin: 0;}
  }


  table {
    border-collapse: collapse;
   
  }
  
  td {
    width: 150px;
    padding: 5px;
    border: none;
    text-align: center;
    font-size: 16px;
    color: black;
  }
  
    .table-wrapper {
        margin: 0 auto;
        width: 950px;
        padding: 20px;
        background-color: #ffffff;
        
    
    }
    td.top-border {
      border-top: 2px solid black;
    }
    
    td.bottom-lines {
      position: relative;
    }
    
    td.bottom-lines::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      border-bottom: 1px solid black;
    }
    
    td.bottom-lines::before {
      content: "";
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      border-bottom: 1px solid black;
    }
    
    
    
    #t-header .h1{
      padding:0px;
    }
    .brokers-n{
      padding:0px;
      text-align:center;
    }
    .season{
      text-align:center;

    }
    .tbl-data{
      display: flex;
  justify-content: center;
  align-items: center;
    }
    .factory-name{
      text-align:center;
    }
    
    body{
      font-family: 'Courier New', Courier, monospace;
      color: #000;
background: #ededed;
font-size: 12px;
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
  
   
  </div>

 
  <div class="print-btn" style="position: fixed; top: 0; left: 0; padding: 10px; background-color: white;">
    <button id="print-button" onclick="window.print()">Print</button>
    <button onclick="window.close()">Close</button>
  </div>
  
  <div class="table-wrapper">
  <div class="print-header">
  <div class="span-container">
  <p class="span1">${broker}</p>
  <span class="span2">Season :${season}</span>
  <span class="span3">Sale No : ${sale}</span>
  </div>
 

<p>As per Government Notification, in addition to the price of the tea,
15% Value Added Tax (VAT) will be charged for teas printed in this
catalogue and purchased for internal use and 1% AIT will be charged
for all teas.</p>
<p>Please note that unless otherwise shown 1.5 kg sample would have been
drawn from each lot of CTC Leaf, 1 kg from Orthodox Leaf, 1 kg from
Green Tea, 0.8 kg from each lot of Dust and 0.5 kg from each lot of
supplement.</p>
</div>
</div>
  `
   categories.forEach(category => {
    invoices.forEach(invoice => {
      const categoryData = data.filter(item => item.Factory === category && item.Factory === invoice);

      if (categoryData.length > 0) {
   
        
        let totalSales = 0;
        let totalPkgs = 0;
let totalinvSales = 0;
        tableHTML += `
         
              
              <div class="table-wrapper">
           
                <h3 class="factory-name">FACTORY: ${category}-${categoryData[0].warehouse} </h3>
                <div class="tbl-data">
                <table>
                  <thead>
                    <tr>
                      <th>Sl</th>
                      <th>Lot</th>
                      <th>Grade</th>
                      <th>Weight/bag</th>
                      <th>Pkg</th>
                      <th>Total</th>
                      <th>Offer</th>
                      <th>Remark</th>
                    </tr>
                  </thead>
                  <tbody>
        `;

        categoryData.forEach((item, index) => {
          tableHTML += `
            <tr>
              <td>${index + 1}</td>
              <td>${item.Lot_number}</td>
              <td>${item.Grade}</td>
              <td>${item.Net_weight}</td>
              <td>${item.Package}</td>
              <td>${item.Grand_total}</td>
              <td>${item.Offer_price}</td>  
              <td>${item.Remarks}</td>
            
            </tr>
          `;

          totalSales += Number(item.Grand_total);
          totalinvSales += Number(item.Total_kg);
          totalPkgs += Number(item.Package);
        });

        tableHTML += `
                  </tbody>
                  <tfoot>
                    <tr>
                    <th>INV KG ${totalinvSales}</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td class="top-border bottom-lines">${totalPkgs} Bag</td>
                      <td class="top-border bottom-lines">${totalSales.toFixed(2)} Kg</td>
                    </tr>
                  </tfoot>
                </table>
                </div>
              
              </div>
              <script>
                function printTable() {
                  window.print();
                }
              </script>
            </body>
          </html>
        `;

        tableCount++;
      }
    });
  });

  const newTab = window.open('', '_blank');
  newTab.document.body.innerHTML = tableHTML;


}

const Catalogue = ({ data,season,sale,broker}) => {
  const handleClick = () => {
    generateCategoryTable(data,season,sale,broker)
  };


  return(
    <div >
    <button onClick={handleClick}  className="bg-blue-500 p-4  w-full flex items-center text-white px-4 py-4">
      <FaReact className="text-2xl mr-2" />
      <p>Catalogue</p>
    </button>
    </div>
  )
};

export default Catalogue;
