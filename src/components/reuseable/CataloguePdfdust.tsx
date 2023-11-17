// @ts-nocheck
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CataloguePdfdust = (filter_cat,seasonSELECTED,saleSELECTED,broker_name) => {


const tickets =filter_cat.filter((item)=>item.Category ==="DUST" )   
// console.log(filter_cat);

   const tableRows = [];



  tickets.forEach((ticket, i) => {
    console.log(ticket.expan);
    const ticketData = [
      i + 1,
      ticket.Lot_number,
      ticket.Invoice,
      ticket.expand.Factory.Company_name,
      ticket.expand.Warehose.Company_name,
      ticket.Grade,
      ticket.Package,
      ticket.Grand_total,
      ticket.Offer_price,
      ticket.Remarks,
      ticket.Gross_weight,
      ticket.Net_weight,
      ticket.Total_kg,
    ];

    

    tableRows.push(ticketData);
  });

  var groupedData = {};

  // Group the data by factory name
  for (var i = 0; i < tableRows.length; i++) {
    var factoryName = tableRows[i][3]; // The fourth column is the factory name
    if (!groupedData[factoryName]) {
      groupedData[factoryName] = [];
    }
    groupedData[factoryName].push(tableRows[i]);
  }

  // e.preventDefault();

  // let doc = new jsPDF("p", "mm", [350, 250]);
  let doc = new jsPDF({
    orientation: "potrait",
  });
  doc.setFontSize(10);

  const pageSize = doc.internal.pageSize;
  const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  const cen = pageWidth / 2;
  const Line = pageWidth - 15;

  // const logoWidth = 16; // Adjust as needed
  // const logoHeight = 16; // Adjust as needed
  // const margin = 6; // Margin from the top left corner

  // const logoSrc = "ttab.png";
  // doc.setPage(i);
  // doc.addImage(logoSrc, "PNG", 20, margin, logoWidth, logoHeight);


  autoTable(doc, {
    margin: { bottom: 40 },
        startY: 10,
        body: [
          [
            {
              content:
              `Season: ${seasonSELECTED}`+
              `\nSale: ${saleSELECTED}`,
           
  
              styles: {
                halign: "center",
                fontSize: 10,
                font: "courier",
              },
            },
          ],
        ],
        theme: "plain",
      });
    
    // doc.setLineWidth(1.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 25, Line, 25);
    doc.setLineWidth(0);
  
  doc.autoTable({
    margin: { top: 26 ,left:20,right:20},
    theme: "plain",
    body: [
      [
        {
          content: `As per Government Notification, in addition to the price of the tea, 15% Value Added Tax (VAT) will be charged for teas printed in this catalogue and purchased for internal use and 1% AIT will be charged for all teas. `,
          styles: {
            halign: "left",
            fontSize: 8,
             font: "courier",
          },
        },
       
      ],
      [
        {
          content: `Please note that unless otherwise shown 1.5 kg sample would have been drawn from each lot of CTC Leaf, 1 kg from Orthodox Leaf, 1 kg from Green Tea, 0.8 kg from each lot of Dust and 0.5 kg from each lot of supplement.`,
          styles: {
            halign: "left",
            fontSize: 8,
            font: "courier",
          },
        },
      ],
    ],
  });
  let startYPosition = 35; 


  for (const factoryName in groupedData) {

    const tableRows = [];
    let totalNetTotal = 0;
    let totalPkgTotal = 0;
    let totalGrossTotal = 0;
    let factory;
    let warehouse;
    const invoiceData = [];
    let firstExValue;
    let lastExValue;
    
    for (const rowData of groupedData[factoryName]) {
      console.log(rowData[12]);
    
      const row = [rowData[1], rowData[2], rowData[5], rowData[10], rowData[11], rowData[7], rowData[6],rowData[8],rowData[9]];
      tableRows.push(row);
      totalNetTotal += rowData[7]; // Adjust the index if needed
      totalGrossTotal += rowData[12]; // Adjust the index if needed
      totalPkgTotal += rowData[6]; // Adjust the index if needed
      if (!factory && !warehouse) {
        factory = rowData[3]; // Assuming the factory name is in the 4th element of the rowData array
        warehouse = rowData[4]; // Assuming the warehouse name is in the 5th element of the rowData array
      }
    
      // Collect 'ex-1' and 'ex-3' values
      const exValue = rowData[2];
      if (exValue) {
        if (!firstExValue) {
          firstExValue = exValue;
        }
        lastExValue = exValue;
      }
    }
    
    // Construct the desired output string
    const exRange = firstExValue === lastExValue ? `${firstExValue}` : `${firstExValue} to ${lastExValue}`;
    
    

    
      let head = [
        [
            {content:  `${factory}    ${warehouse}    ${exRange}`, colSpan:9, styles: {fontSize: 11,halign: 'left',fillColor:'', textColor: 'black' ,fontStyle:'bold',cellPadding: 1,}}, 
           
        ],
        
        ['LOT', 'INVOICE', 'GRADE', 'GROSS', 'NET','TOTAL','PACKAGE','OFFER','REMARKS'],
    ];
    let foot=[[
      {content:  `Inv. Total : ${totalGrossTotal.toFixed(1)}`, colSpan:5, styles: {fontSize: 10,halign: 'left',fillColor:'', textColor: 'black' ,fontStyle:'bold',cellPadding: 1, font: "courier",}}, 
      {content:  `${totalNetTotal.toFixed(1)} kg` , colSpan:4, styles: {fontSize: 9,halign: 'left',fillColor:'', textColor: 'black' ,fontStyle:'bold',cellPadding: 1, font: "courier",}}, 
    
  ],]
  let wantedTableWidth = 160;
let pageWidth = doc.internal.pageSize.width;
let margin = (pageWidth - wantedTableWidth) / 2;

    doc.autoTable({
 
      head: head,
      foot:foot,
      body: tableRows,
      theme: "striped",
      headStyles: {
        halign: 'center',
        textColor: 'white',
        fillColor: '#09e083',
        fontSize: 8,
        font: "courier",

      }, 
      
      showFoot: 'lastPage',
      columnStyles: {
        0: { halign: "center", textColor: 'black', fontSize: 9,cellPadding:1, font: "courier", },
        1: { halign: "center", textColor: 'black', fontSize: 9,cellPadding:1, font: "courier", },
        2: { halign: "center", textColor: 'black', fontSize: 9,cellPadding:1, font: "courier", },
        3: { halign: "center", textColor: 'black', fontSize: 9,cellPadding:1, font: "courier", },
        4: { halign: "center", textColor: 'black', fontSize: 9,cellPadding:1, font: "courier", },
        5: { halign: "center", textColor: 'black', fontSize: 9,cellPadding:1, font: "courier", },
        6: { halign: "center", textColor: 'black', fontSize: 9,cellPadding:1, font: "courier", },
        7: { halign: "center", textColor: 'black', fontSize: 9,cellPadding:1, font: "courier", },
        8: { halign: "center", textColor: 'black', fontSize: 9,cellPadding:1, font: "courier", },
      },
      bodyStyles: { lineColor: [0, 0, 0] },
      // didDrawPage: function (data) {
      //   data.settings.margin.top = 30;
      //   data.settings.margin.bottom = 20; },
        tableWidth: 160,
        
        lineWidth: 0.5,
        font: "courier",
      columnWidth: "wrap",
      showHeader: "everyPage",
      tableLineColor: 200,
      tableLineWidth: 0,  
      margin: {left: margin, right: margin},

      // didDrawPage: function (data) {
      //   const pageNumber = doc.internal.getNumberOfPages();
        
      //   // Check if this is the last page
      //   if (5 === doc.internal.getNumberOfPages()) {
      //     // This is the last page, add the "End" text
      //     const pageWidth = doc.internal.pageSize.width;
      //     const pageHeight = doc.internal.pageSize.height;
      
      //     doc.setFontSize(12);
      //     doc.setTextColor(0, 0, 0); // Set text color (black)
      //     doc.text("End", pageWidth / 2, pageHeight - 10, "center"); // Adjust the position as needed
      //   }
      // }
    });
    
   
    
     // Draw a line above the total value
  const lineX2 = 25; // Adjust the X position as needed
  const lineX1 = 185; // Adjust the X position as needed

  const lineY = doc.autoTableEndPosY()  -6; // Adjust the Y position as needed
  const lineY2 = doc.autoTableEndPosY()  +1; // Adjust the Y position as needed
  doc.setLineDash([1, 1]);
  doc.line(lineX1, lineY, lineX2, lineY);
  doc.line(lineX1, lineY2, lineX2, lineY2);
  doc.setLineDash([]);
  }

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    autoTable(doc, {
      startY: 3,
      body: [
        [
          {
            content: `${broker_name}`,
            styles: {
              halign: "center",
              fontSize: 16,
              fontStyle: "bold",
              font: "courier",
            },
          },
        ],
      ],
      theme: "plain",
      
    });
    

    doc.setPage(i);
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const footer = `Dust Page ${i} of ${pageCount}`;


    doc.setFont("courier");

    const footerTextLeft = 'This automated report is generated by ittechpointbd';

  doc.setFontSize(8);

  // Add the left text at the beginning of the line
  doc.text(17, doc.internal.pageSize.height -7, footerTextLeft);

  // Add the right text at the end of the line
 
  const textWidth = doc.getStringUnitWidth(footer)+25 ;

  doc.text(pageWidth - 10 - textWidth, doc.internal.pageSize.height - 7, footer);
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    doc.text("" + dateTime, pageWidth - doc.getTextWidth(dateTime) - 20, 5);
  }
  doc.setProperties({
    title: "Catalogue",
  });
  // doc.setFont('courier');
  doc.output("dataurlnewwindow");
};

export default CataloguePdfdust;