// @ts-nocheck

import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PocketBase from 'pocketbase';
import { serverURL,secretKey } from '../../../config';

const pb = new PocketBase(serverURL);
pb.autoCancellation(false)

const Generatepdf = async(tickets,status) => {
    console.log(pb.authStore.model.expand.reference);
    const eligibility = await pb.collection('Eligibility').getFullList({
        sort: '-created',
    });
    console.log(eligibility[0].Sale_number);
    const profile = await pb.collection('profiles').getOne(`${pb.authStore.model.reference}`, {
        expand: 'relField1,relField2.subRelField',
    });
    console.log(profile);
    
    const filter_data = tickets.filter((item)=>item.Status===status);

  const tableColumn = ["SL", "LOT", "INVOICE","BROKER", "FACTORY",  "GRADE","BAG" ,"N.TOTAL", "OFFER","MAX","AMOUNT", "REMARKS"];
  const tableRows = [];

  let totalNetTotal = 0;
  let totalPkgTotal = 0;
  let totalTkTotal = 0;

  filter_data.forEach((ticket, i) => {
    const ticketData = [
      i + 1,
      ticket.Lot_number,
      ticket.Invoice,
      ticket.expand.brokersID.expand.reference.Company_name,
      ticket.expand.Factory.Company_name,
      ticket.Grade,
      ticket.Package,
      ticket.Grand_total,
      ticket.Offer_price,
      ticket.price_max,
      (ticket.Grand_total *ticket.price_max).toFixed(2),
      ticket.Remarks,
    ];

    totalNetTotal += ticket.Grand_total;
    totalPkgTotal += ticket.Package;
    totalTkTotal += ticket.Grand_total *ticket.price_max;
    tableRows.push(ticketData);
  });


  const totalRow = ["Total", "", "", "", "", "",totalPkgTotal.toFixed(2), totalNetTotal.toFixed(2) +' kg',"", "", totalTkTotal.toFixed(2), ""];
  tableRows.push(totalRow);
  // e.preventDefault();

  let doc = new jsPDF("l", "mm", [370, 250]);
//   let doc = new jsPDF({
//     orientation: "landscape",
//   });
  doc.setFontSize(10);

  const pageSize = doc.internal.pageSize;
  const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  const cen = pageWidth / 2;
  const Line = pageWidth - 15;


 

  doc.autoTable({
    startY:35,
    margin: { bottom: 20 },
    head: [tableColumn],
    body: tableRows,
    didDrawPage: function (data) {
      // Reseting top margin. The change will be reflected only after print the first page.
      data.settings.margin.top = 35;
      data.settings.margin.bottom = 20; },
    theme: "plain",
    headStyles: {
      halign:'center',
      textColor:'black',
      fillColor: '',
    },
    // styles: { font: "WorkSans" },
  
    
    columnStyles: {
      0: { halign: "right", textColor:'black', fontSize: 10,},
      1: { halign: "center", textColor: 'black', fontSize: 10,},
      2: { halign: "left", textColor: 'black', fontSize: 10,},
      3: { columnWidth: 60},
      4: { columnWidth: 50},
      6: { halign: "center",},
      7: { halign: "right",},
      8: { halign: "right",},
      9: { halign: "right",},
      10: { halign: "center",},
    },
    bodyStyles: { lineColor: [0, 0, 0] },
    tableWidth: "auto",
    columnWidth: "wrap",
    showHeader: "everyPage",
    tableLineColor: 200,
    tableLineWidth: 0,
  });
  

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    autoTable(doc, {
      startY: 3,
      body: [
        [
          {
            content: `${profile.Company_name}`,
            styles: {
              halign: "center",
              fontSize: 16,
              fontStyle: "bold",
              // font: "WorkSans",
            },
          },
        ],
      ],
      theme: "plain",
      
    });
    autoTable(doc, {
  margin: { bottom: 40 },
      startY: 10,
      body: [
        [
          {
            content:
             `Season: ${eligibility[0].Season}`+
             `\nSale: ${eligibility[0].Sale_Number}`+
             `\n (${status?"Sold":"Unsold"} Report)`,

            styles: {
              halign: "center",
              fontSize: 10,
              // font: "WorkSans",
            },
          },
        ],
      ],
      theme: "plain",
    });
  
  // doc.setLineWidth(1.5);
  doc.setDrawColor(0, 0, 0);
  doc.line(15, 30, Line, 30);
  doc.setLineWidth(0);



    doc.setPage(i);
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const footer = `Page ${i} of ${pageCount}`;


    doc.setFont("courier");

    const footerTextLeft = 'This automated report is generated by ittechpointbd';

  doc.setFontSize(12);

  // Add the left text at the beginning of the line
  doc.text(10, doc.internal.pageSize.height - 10, footerTextLeft);

  // Add the right text at the end of the line
 
  const textWidth = doc.getStringUnitWidth(footer)+25 ;

  doc.text(pageWidth - 10 - textWidth, doc.internal.pageSize.height - 10, footer);
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
    title: "Sale report",
  });
  // doc.setFont('courier');
  doc.output("dataurlnewwindow");
};

export default Generatepdf;