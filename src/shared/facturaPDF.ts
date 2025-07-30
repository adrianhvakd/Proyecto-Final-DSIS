import * as FPDF from 'node-fpdf';
import * as path from 'path';
import { Factura } from './facturar';

export class FacturaPDF implements Factura {
    pdf: any;

    constructor() {
        this.pdf = new FPDF('P', 'cm', 'Letter');
    }

    generarFactura(data, namefile) {
        const pdf = this.pdf;
        pdf.AddPage();

        // Logo
        const imagePath = path.join(__dirname, '..', '..', 'reports', 'aea.png');
        pdf.Image(imagePath, 7, 1, 7); // centrado (aprox)

        pdf.SetFont('Arial', 'B', 18);
        pdf.Ln(5);
        pdf.Cell(0, 1, 'FACTURA DE VENTA', 0, 1, 'C');

        pdf.SetFont('Arial', '', 12);
        pdf.Cell(0, 0.7, `Factura N° ${data.factura}`, 0, 1, 'C');
        pdf.Cell(0, 0.7, `Fecha: ${new Date().toLocaleDateString()}`, 0, 1, 'C');

        pdf.Ln(1);
        pdf.SetDrawColor(0);
        pdf.Line(2, pdf.GetY(), 19, pdf.GetY()); // línea horizontal

        // Tabla de detalles
        pdf.Ln(1);
        pdf.SetFont('Arial', 'B', 12);
        pdf.Cell(5, 1, 'Comprador', 1, 0, 'C');
        pdf.Cell(5, 1, 'Precio (Bs)', 1, 0, 'C');
        pdf.Cell(5, 1, 'Ubicación', 1, 0, 'C');
        pdf.Cell(3, 1, 'N° Puesto', 1, 1, 'C');

        pdf.SetFont('Arial', '', 12);
        pdf.Cell(5, 1, data.comprador, 1, 0, 'C');
        pdf.Cell(5, 1, data.precio.toString(), 1, 0, 'C');
        pdf.Cell(5, 1, data.ubicacion, 1, 0, 'C');
        pdf.Cell(3, 1, data.numero.toString(), 1, 1, 'C');

        // Firma o mensaje final
        pdf.Ln(2);
        pdf.SetFont('Arial', 'I', 11);
        pdf.Cell(0, 0.7, 'Gracias por su compra.', 0, 1, 'C');
        pdf.Cell(0, 0.7, 'Este documento no requiere firma ni sello.', 0, 1, 'C');

        pdf.Output('F', `reports/${namefile}`);
    }
}
