import {Reporte} from './reporte';
export class Print implements Reporte{
    generarReportCliente(dataArray:any[],fileName:string) {
        let salida = `
        <h1>Lista de Ventas</h1>
        <br>
        <table>
            <tr> 
                <th>Numero</th>
                <th>Ubicacion</th>
                <th>Precio</th>
                <th>Comprador</th>
                <th>Numero de factura</th>
                <th>Codigo de vivienda</th>
            </tr>

        `;
        dataArray.forEach(element=>{
            salida += `
                <tr>
                    <td>${element.numero}</td>
                    <td>${element.ubicacion}</td>
                    <td>${element.precio}</td>
                    <td>${element.comprador}</td>
                    <td>${element.factura}</td>
                    <td>${element.codVivienda}</td>
                </tr>
            `;
        })
        salida += '</table>'
        console.log(salida);
        return salida;
    }
}