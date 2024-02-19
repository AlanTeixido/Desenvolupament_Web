import FiguraGeometrica from "./FiguraGeometrica";

class Rectangulo extends FiguraGeometrica{
    base;
    altura;

    constructor(nombre, base, altura){
        super(nombre);
        this.base = base;
        this.altura = altura;
    }

    calcularArea(){
        return this.base * this.altura;
    }
}

export default Rectangulo;