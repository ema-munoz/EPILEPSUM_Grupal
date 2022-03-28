class objetivo{
    constructor(){
        this.contenedor = document.getElementById('objetivos')
        this.numero = document.getElementById('numeros')
    }
    crear(){
        for(let i = 0; i<parseInt(this.numero.value); i++){
        let input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.name = 'objetivos'
        this.contenedor.appendChild(input)
        }
    }
}

let objetivos = new objetivo