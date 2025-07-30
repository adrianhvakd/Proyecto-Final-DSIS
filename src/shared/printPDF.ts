import * as FPDF from 'node-fpdf'
import * as path from 'path';
import { Reporte } from './reporte';
export class printPDF implements Reporte{
    pdf:any
    constructor(){
        this.pdf = new FPDF('L','cm','Letter');
    }
    generarReportCliente(data: any[], namefile: string) {
        this.pdf.AddPage();
        this.pdf.SetFont('Arial', 'B', 16);
        this.pdf.Cell(0, 1, "Lista de Ventas", 0, 1, 'C');

        const imagePath = path.join(__dirname, '..', '..', 'reports', 'aea.png');
        this.pdf.Image(imagePath, 17, 0.5, 4); 
        const widths = {
            numero: 3,
            ubicacion: 5,
            precio: 3,
            comprador: 7,
            factura: 4,
            codVivienda: 4
        };

        this.pdf.SetFont('Arial', 'B', 10);
        this.pdf.Cell(widths.numero, 1, "Numero", 1, 0, 'C');
        this.pdf.Cell(widths.ubicacion, 1, "Ubicacion", 1, 0, 'C');
        this.pdf.Cell(widths.precio, 1, "Precio", 1, 0, 'C');
        this.pdf.Cell(widths.comprador, 1, "Comprador", 1, 0, 'C');
        this.pdf.Cell(widths.factura, 1, "Numero de factura", 1, 0, 'C');
        this.pdf.Cell(widths.codVivienda, 1, "Codigo de vivienda", 1, 1, 'C');

        this.pdf.SetFont('Arial', '', 10);
        data.forEach(element => {
            this.pdf.Cell(widths.numero, 1, String(element.numero), 1, 0, 'C');
            this.pdf.Cell(widths.ubicacion, 1, element.ubicacion, 1, 0, 'C');
            this.pdf.Cell(widths.precio, 1, String(element.precio), 1, 0, 'C');
            this.pdf.Cell(widths.comprador, 1, element.comprador, 1, 0, 'C');
            this.pdf.Cell(widths.factura, 1, String(element.factura), 1, 0, 'C');
            this.pdf.Cell(widths.codVivienda, 1, element.codVivienda, 1, 1, 'C');
        });

        this.pdf.Output('F', `reports/${namefile}`);
    }

}