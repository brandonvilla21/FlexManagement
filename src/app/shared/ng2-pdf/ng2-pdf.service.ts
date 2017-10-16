import { Injectable } from '@angular/core';
declare var jsPDF: any; // Important

@Injectable()
export class Ng2PdfService {
    private styles = {
      lineColor: 200,
      lineWidth: 0,
      fontStyle: 'normal', // normal, bold, italic, bolditalic
      halign: 'left', // left, center, right
      valign: 'middle', // top, middle, bottom
      columnWidth: 'auto', // 'auto', 'wrap' or a number
      overflow: 'linebreak',
      fontSize: 8,
      font: 'helvetica'
    }
    constructor() { }

    // Only pt supported (not mm or in)
    pdfTableDate( columns: string[], rows: any[], titleTable = 'Table', fileName = 'File.pdf', date) {
        const doc = new jsPDF('p', 'pt', 'a4');
        doc.autoTable(columns, rows, {
            theme: 'striped',
            margin: { top: 70 },
            styles: this.styles,
            addPageContent: data => {
                // Set the Date
                doc.text(date, 400, 30);
                // Set the Title
                doc.text(titleTable, 40, 30);
            }
        });
        doc.save(fileName);
    }

    pdfTableWithDates( columns: string[], rows: any[], titleTable = 'Table', fromDate, toDate, customerName, fileName = 'File.pdf') {
      const doc = new jsPDF('p', 'pt', 'a4');

      doc.autoTable(columns, rows, {
        margin: { top: 95 },
        styles: this.styles,
        headerStyles: {
          fillColor: [51, 122, 183],
          textColor: [255],
          halign: 'center'
        },
        theme: 'grid',
        addPageContent: data => {
          doc.text(titleTable, 40, 30);
          doc.setFontSize(12);
          doc.text(customerName, 40, 60);
          doc.text(fromDate, 40, 80);
          doc.text(toDate, 200, 80);
        }
      });
      doc.save(fileName);
  }
}
