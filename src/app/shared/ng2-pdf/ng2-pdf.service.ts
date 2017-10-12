import { Injectable } from '@angular/core';
declare var jsPDF: any; // Important

@Injectable()
export class Ng2PdfService {

    constructor() { }

    // Only pt supported (not mm or in)
    pdfTable( columns: string[], rows: any[], titleTable = 'Table', fileName = 'File.pdf') {
        const doc = new jsPDF('p', 'pt', 'a4');
        doc.autoTable(columns, rows, {
            theme: 'striped',
            margin: { top: 60 },
            addPageContent: data => {
            doc.text(titleTable, 40, 30);
            }
        });
        doc.save(fileName);
    }
}
