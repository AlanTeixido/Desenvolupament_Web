import FiguraGeometrica from "./FiguraGeometrica";

class Triangulo extends FiguraGeometrica{
    base;
    altura;
    
    constructor(base,altura){
        super(nombre);
        this.base = base;
        this.altura= altura;
    }

    calcularArea(){
        return (this.base  * this.altura) / 2;
    }
}

export default Triangulo;