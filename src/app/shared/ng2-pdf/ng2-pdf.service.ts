import { Injectable } from '@angular/core';
declare var jsPDF: any; // Important

@Injectable()
export class Ng2PdfService {

    constructor() { }

    // Only pt supported (not mm or in)
    pdfTableDate( columns: string[], rows: any[], titleTable = 'Table', fileName = 'File.pdf', date?) {
        const doc = new jsPDF('p', 'pt', 'a4');
        doc.autoTable(columns, rows, {
            theme: 'striped',
            margin: { top: 70 },
            addPageContent: data => {
                // Set the Date
                doc.text(date, 400, 30);
                // Set the Title
                doc.text(titleTable, 40, 30);
            }
        });
        doc.save(fileName);
    }
}
