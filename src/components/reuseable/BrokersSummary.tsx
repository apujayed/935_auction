// @ts-nocheck
import { FaReact } from 'react-icons/fa';
const BrokersSummary = ({ data,season,sale}) => {
  // Create a dictionary to store the data for each broker

  const formatNumber = (value) =>
        new Intl.NumberFormat("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);
  // Convert the data into HTML
  const dataAsHtml = data
    .map((item) => {
      const broker = item.expand.brokersID.expand.reference.Company_name;
      const soldPercentage = (item.soldkg / item.offeredkg) * 100;
      const avg = broker.totalAmount / broker.soldkg;
      return `
        <tr>
          <td>${broker}</td>
          <td>${item.totallot}</td>
          <td>${item.totalbag}</td>
          <td>${item.soldpkg}</td>
          <td class="totalright">${item.offeredkg.toFixed(2)}</td>
          <td class="totalright">${item.soldkg.toFixed(2)}</td>
          <td class="totalright">${formatNumber(item.soldtk)}</td>
          <td class="totalright">${(item.soldtk/item.soldkg).toFixed(2)}</td>
          <td class="totalright">${soldPercentage.toFixed(2)}%</td>
        </tr>
      `;
    })
    .join('');
    let totalTotalLot = 0;
    let totalTotalBag = 0;
    let totalTotalSoldpkg = 0;
    let totalTotalOffered = 0;
    let totalTotalSoldkg = 0;
    let totalTotalSoldtk = 0;

    // Loop through the array and sum up the totalbag values
    for (const item of data) {
      totalTotalLot +=item.totallot;
      totalTotalBag += item.totalbag;
      totalTotalSoldpkg += item.soldpkg;
      totalTotalOffered += item.offeredkg;
      totalTotalSoldkg += item.soldkg;
      totalTotalSoldtk += item.soldtk;

    }
    // Add more totals as needed

  const handleButtonClick = () => {
    const htmlContent = `
    <html>
    <head>
      <title>Broker Summary</title>
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
        padding:0px !important;
        margin:0px !important;
          font-size: 18px;
          font-weight:bold;
      }
.title{
  text-align: center;
}
.totalright{
  text-align:right !important;
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
    <p class="span1">SMALL TEA GARDEN OWNERS & TEA TRADERS ASSOCIATION OF BANGLADESH</p>
    <span class="span2">Season :${season}</span>
    <span class="span3">Sale No : ${sale}</span>
    </div>
    <div></div>
</div>
        <hr>  
        <p class="title">(Auction Summary Report)</p>
        <table>
    <thead>
      <tr>
        <th>Broker Name</th>
        <th>Total Lot</th>
        <th>Total Bag</th>
        <th>Sold (Bag)</th>
        <th>Offered KG</th>
        <th>Sold KG</th>
        <th>Total Amount</th>
        <th>Avg</th>
        <th>Sold%</th>
      </tr>
    </thead>
    <tbody>
        ${dataAsHtml}
        </tbody>
        <tfoot>
            <tr>
              <td class="total">Total</td>
              <td class="total">${totalTotalLot}</td>
              <td class="total">${totalTotalBag}</td>

              <td class="total">${totalTotalSoldpkg}</td>
              <td class="totalright">${formatNumber(totalTotalOffered)}</td>
              <td class="totalright">${formatNumber(totalTotalSoldkg)}</td>
              <td class="totalright">${formatNumber(totalTotalSoldtk)}</td>
              <td class="totalright"></td>
              <td class="total"></td>
            </tr>
          </tfoot>
        </table>
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
    
    <div className="">
    <button onClick={handleButtonClick}  className="bg-blue-500 p-4  w-full flex items-center text-white px-4 py-4">
      <FaReact className="text-2xl mr-2" />
      <p>Auction Summary</p>
    </button>
    </div>
    
  );
};

export default BrokersSummary;
