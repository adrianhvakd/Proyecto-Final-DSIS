export interface Paginar{
    paginas:any;
    paginaActual:number;
    siguiente:Boolean;
    anterior:Boolean;
    itemPaginas:number;
    paginaAnterior:number;
    paginaSiguiente:number;
}

export class Paginate{
    private constructor(){}
    private static instance:Paginate | null = null;
    public static getInstance(){
        return this.instance?this.instance:this.instance = new Paginate();
    }

    public paginar(actual:number,items:number,countItems:number){
        let paginacion:Paginar= {
            paginas:Array(),
            paginaActual:actual,
            siguiente:true,
            anterior:true,
            itemPaginas:items,
            paginaAnterior:Number(actual)-(1*items),
            paginaSiguiente:Number(actual)+(1*items),
        }        
        paginacion.siguiente=
            ((countItems/2)*items)===(Number(paginacion.paginaActual)+Number(items));
        paginacion.anterior=paginacion.paginaActual==0;
        for(let i=0;i<countItems/2;i++)
            paginacion.paginas.push({
                pagina:i+1,
                skip:i*items,
                activo:paginacion.paginaActual/items==(i)});
        return paginacion;
    }
}