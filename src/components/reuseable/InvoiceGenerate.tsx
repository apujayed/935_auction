// @ts-nocheck
import React from 'react';

const Invoice = ({ buyer, products, sale }) => {
  const totalQty = products.reduce((total, product) => total + product.qty, 0);
  const totalAmount = products.reduce((total, product) => total + product.qty * product.rate, 0);
  const vat = totalAmount * 0.05;
  const grandTotal = totalAmount + vat;

  return (
    <div>
      <h2>{buyer} Invoice</h2>
      <p>Sale No: {sale}</p>
      {products.map((product) => (
        <p key={product.id}>
          {product.product} {product.qty} {product.rate} {product.qty * product.rate}
        </p>
      ))}
      <p>Total Quantity: {totalQty}</p>
      <p>Total Amount: {totalAmount}</p>
      <p>VAT: {vat}</p>
      <p>Grand Total: {grandTotal}</p>
    </div>
  );
};

const InvoiceGenerate = ({ sqlData,user ,saledetails}) => {
  const buyers = [...new Set(sqlData.map((data) => data.bidder))];
  const buyerData = buyers.map((bidder) =>
    sqlData.filter((data) => data.bidder === bidder)
  );

  const summaryTotals = buyerData.map((data) => {
    const totalAmount = data.reduce((total, product) => total + product.Package * product.pricemax, 0);
    const vat = totalAmount * 0.05;
    const grandTotal = totalAmount + vat;
    return { totalAmount, vat, grandTotal, sale: data[0].Sale_number };
  });

  const handleButtonClick = () => {
    const invoicesHtmlArray = [];
    const pageSize = 2; // Number of invoices per page
    const totalInvoices = buyerData.length;
  
    for (let i = 0; i < totalInvoices; i += pageSize) {
      const groupBuyerData = buyerData.slice(i, i + pageSize);
  
      let invoicesHtml = '';
      groupBuyerData.forEach((data, index) => {
        const buyerFullName = data[0].bidder;
        const invoiceContent = `
          <div style="margin-bottom: 45px;">
          <div class="header">
          <!-- Icon in the first row -->
          <div class="icon">
          <img class="icon" src="/ttab.png" alt="Icon Image" />
          </div>
        
          <!-- Span Container -->
          <div class="span-container">
            <p>hlw</p>
          </div>
          <div></div>
        </div>
            <hr/>
            <div class="head">
              <div style="flex-direction: column;">
                <p><strong>Buyer:</strong>${buyerFullName}</p>
              </div>
              <div class="rightdata" style="flex-direction: column-reverse;">
                <p>Sale Date :</p>
                <p>Prompt Date : </p>
                <p>Print Date : </p>
             
              </div>
            </div>
            <table>
              <thead>
                <tr>
                <th>LOT</th>
                <th>FACTORY</th>
                <th>INV.</br> NO</th>
                <th>GRADE</th>
                <th>PKGS</th>
                <th>NET </br> KG</th>
                <th>TOTAL </br> KG</th>
                <th>PRICE </br> TAKA</th>
                <th>AMOUNT </br> TAKA</th>
                <th>VAT @ 15% </br> TAKA</th>
                </tr>
              </thead>
              <tbody>
                ${data.map((product) => (
                  `<tr key=${product.id}>
                  <td>${product.Lot_number}</td>
                  <td>${product.expand.Factory.Company_name}</td>
                  <td>${product.Invoice}</td>
                  <td>${product.Grade}</td>
                    <td>${product.Package}</td>
                    <td>${product.Net_weight}</td>
                    <td>${product.Grand_total}</td>
                    <td>${product.pricemax}</td>
                    <td>${new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(product.pricemax * product.Grand_total)}</td>
                    <td>${new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(product.pricemax * product.Grand_total * 15 /100)}</td>
                  </tr>`
                )).join('')}
              </tbody>
              
              <tfoot>
                <tr>
                  <td colspan="2">Total :</td>
                  <td></td>
                  <td></td>
                  <td>${data.reduce((total, product) => total + product.Package, 0)}</td>
                  <td></td>
                  <td>${data.reduce((total, product) => total + Number(product.Grand_total), 0)}</td>
                  <td></td>
                  <td>${data.reduce((total, product) => total + product.pricemax * product.Grand_total, 0)}</td>
                  <td>${data.reduce((total, product) => total + product.pricemax * product.Grand_total *15/100, 0)}</td>
                  </tr>
                
              
              </tfoot>
            </table>
            <div class="totals">
            <p>Sub Total:${data.reduce((total, product) => total + product.pricemax * product.Grand_total, 0)}</p>
            <p>Vat (15%): ${data.reduce((total, product) => total + product.pricemax * product.Grand_total *15/100, 0)}</p>
            <p>Total: ${data.reduce((total, product) => total + product.pricemax * product.Grand_total, 0)+data.reduce((total, product) => total + product.pricemax * product.Grand_total *15/100, 0)}</h3>
        </div>
          </div>
        `;
        invoicesHtml += invoiceContent;
      });
  
      invoicesHtmlArray.push(invoicesHtml);
    }
  
    const htmlContent = invoicesHtmlArray.map((invoicesHtml, index) => `
      <html>
      <head>
        <title>Bidder Invoice</title>
        <link rel="icon"  type="image/png" href="/ttab.png" />
        <style>
        .rightdata{
          font-size:14px
        }
        .totals {
          font-size:14px;
          width: 50%;
          margin-left: auto;
          margin-right:20px !important;
          text-align: right;
      }
          .table-wrapper {
            margin: 0 auto;
            width: 980px;
            padding: 20px;
            background-color: #ffffff;
          }
          body {
            font-family: "Courier New", Courier, monospace;
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
          ${invoicesHtml}
        </div>
        ${index < invoicesHtmlArray.length - 1 ? '<div style="page-break-before: always;"></div>' : ''}
      </body>
    </html>
    `);
    const newWindow = window.open('', '_blank');
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  };

  return (
  
          <button className="btn btn-primary w-100 text-center mb-2 d-flex justify-content-between align-items-center" onClick={handleButtonClick}>
   <span className="text-center mx-auto">Bidder Invoice</span>
  <span className="icon my-auto">&#x1F512;</span>
  </button>
    
  );
};

export default InvoiceGenerate;
