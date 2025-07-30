import * as XLSX from 'xlsx';

export class ArchivoProcesador {
  private static instance: ArchivoProcesador | null = null;

  private constructor() {}

  public static getInstance(): ArchivoProcesador {
    if (!this.instance) this.instance = new ArchivoProcesador();
    return this.instance;
  }

  public leerDatos(pathArchivo: string): any[] {
    const esExcel = pathArchivo.toLowerCase().endsWith('.xlsx') || pathArchivo.toLowerCase().endsWith('.xls');
    const workbook = XLSX.readFile(pathArchivo);
    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const datos: any[] = XLSX.utils.sheet_to_json(hoja, {
      header: ['nombre', 'apellidos', 'codVivienda', 'pagoImpuesto'],
      range: 1,
      defval: '',
    });

    return datos.map((fila) => {
      if (esExcel) {
        return {
          nombre: String(fila.nombre),
          apellidos: String(fila.apellidos),
          codVivienda: fila.codVivienda,
          pagoImpuesto: String(fila.pagoImpuesto),
        };
      } else {
        return {
          nombre: Buffer.from(String(fila.nombre), 'latin1').toString('utf8'),
          apellidos: Buffer.from(String(fila.apellidos), 'latin1').toString('utf8'),
          codVivienda: fila.codVivienda,
          pagoImpuesto: String(fila.pagoImpuesto),
        };
      }
    });
  }
}
