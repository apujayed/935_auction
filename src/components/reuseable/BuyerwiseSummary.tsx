// @ts-nocheck
import React,{useState} from 'react';

import { FaReact } from 'react-icons/fa';
const BuyerwiseSummary = ({ data ,season,sale,broker}) => {
  const tickets = data.filter(data => data.Status===true);
console.log(tickets);

  const [totalLeafPkgs, setTotalLeafPkgs] = useState(0);
  const [totalLeafKg, setTotalLeafKg] = useState(0);
  const [totalDustPkgs, setTotalDustPkgs] = useState(0);
  const [totalDustKg, setTotalDustKg] = useState(0);
  const [totalSupplementPkgs, setTotalSupplementPkgs] = useState(0);
  const [totalSupplementKg, setTotalSupplementKg] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAvgAmount, setTotalAvgAmount] = useState(0);

  const groupAndCalculate = (tickets) => {
    const result = {};

    let totalLeafKg = 0;
    let totalDustKg = 0;
    let totalSupplementKg = 0;
    let totalAmount = 0;
    let totalAvgAmount = 0;

    let totalLeafpkg = 0;
    let totalDustpkg = 0;
    let totalSupppkg = 0;

    for (const item of tickets) {
    console.log(item);
    
      const {
        expand: {
          bidder_current: {
            expand: {
              reference: { Company_name: bidder_current } = {},
            } = {},
          } = {},
        } = {},
        Category,
        Total_kg,
        Package,
        Grand_total,
        price_max,
      } = item;
      
      if (!result[bidder_current]) {
        result[bidder_current] = {
          leaf: { Package: 0, kg: 0, amount: 0 },
          dust: { Package: 0, kg: 0, amount: 0 },
          supplement: { Package: 0, kg: 0, amount: 0 },
          Grand_total: 0,
        };
      }

      switch (Category) {
        case 'LEAF':
          result[bidder_current].leaf.Package += Number(Package);
          result[bidder_current].leaf.kg += Grand_total;
          result[bidder_current].leaf.amount += Number(price_max * Grand_total);
          totalLeafKg += Grand_total;
          totalLeafpkg += Package;
          break;
        case 'DUST':
          result[bidder_current].dust.Package += Number(Package);
          result[bidder_current].dust.kg += Grand_total;
          result[bidder_current].dust.amount += Number(price_max * Grand_total);
          totalDustKg += Grand_total;
          totalDustpkg += Package;
          break;
        case 'SUPPLEMENT':
          result[bidder_current].supplement.Package += Number(Package);
          result[bidder_current].supplement.kg += Grand_total;
          result[bidder_current].supplement.amount += Number(price_max * Grand_total);
          totalSupplementKg += Grand_total;
          totalSupppkg += Package;
          break;
        default:
          break;
      }

      result[bidder_current].Grand_total += Number(Grand_total);
      totalAmount += Number(price_max * Grand_total);
      totalAvgAmount += Number(price_max);
    }

    setTotalLeafKg(totalLeafKg);
    setTotalDustKg(totalDustKg);
    setTotalSupplementKg(totalSupplementKg);
    setTotalAmount(totalAmount);
    setTotalAvgAmount(totalAvgAmount);

    setTotalLeafPkgs(totalLeafpkg)
    setTotalDustPkgs(totalDustpkg)
    setTotalSupplementPkgs(totalSupppkg)
    return result;
  };

  const handleButtonClick = () => {
    const groupedData = groupAndCalculate(tickets);

    // Calculations for totals, similar to the previous implementation...
    // You can directly calculate totals here without using useState and useEffect

    const dataAsHtml = `
    <table>
    <thead>
    <tr>
      <th rowSpan="2">Buyer Name</th>
      <th colSpan="2">Leaf</th>
      <th colSpan="2">Dust</th>
      <th colSpan="2">Supplement</th>
      <th rowSpan="2">Total Amount</th>
      <th rowSpan="2">Avg Amount</th>
    </tr>
    <tr>
      <th>Pkgs</th>
      <th>Kg</th>
      <th>Pkgs</th>
      <th>Kg</th>
      <th>Pkgs</th>
      <th>Kg</th>
    </tr>
  </thead>
      <tbody>
        ${Object.keys(groupedData).map((bidder_current) => {
          const { leaf, dust, supplement, Grand_total } = groupedData[bidder_current];
          const amountTotal = leaf.amount + dust.amount + supplement.amount;
          const avgAmount = totalAmount / Grand_total;

          return `
            <tr>
              <td>${bidder_current}</td>
              <td>${leaf.Package}</td>
              <td>${leaf.kg}</td>
              <td>${dust.Package}</td>
              <td>${dust.kg}</td>
              <td>${supplement.Package}</td>
              <td>${supplement.kg}</td>
              <td>${amountTotal.toFixed(2)}</td>
              <td>${avgAmount.toFixed(2)}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>${totalLeafPkgs}</td>
          <td>${totalLeafKg.toFixed(2)}</td>
          <td>${totalDustPkgs}</td>
          <td>${totalDustKg.toFixed(2)}</td>
          <td>${totalSupplementPkgs}</td>
          <td>${totalSupplementKg.toFixed(2)}</td>
          <td>${totalAmount.toFixed(2)}</td>
          <td>${totalAvgAmount.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  `;
  const htmlContent = `
  <html>
  <head>
    <title>Buyer Summary</title>
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
}

  return (
    <div >
    <button onClick={handleButtonClick}  className="bg-red-500 p-4  w-full flex items-center text-white px-4 py-4">
      <FaReact className="text-2xl mr-2" />
      <p>Buyer Summary</p>
    </button>
    </div>
   
  );
};

export default BuyerwiseSummary;


