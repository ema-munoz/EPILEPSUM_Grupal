class noHayArchivo {
    constructor() {
        this.imagen = document.getElementById('imagenPregunta')
        this.imagenCambio = document.getElementById('iconImagen')
        this.imagenSubida = document.getElementById('imagenSubida')
    }

    inicio() {
        this.imagen.style.display = 'none'
        dudas.mostrarImagenPregunta()
    }

    mostrarImagenPregunta() {
        if (dudas.imagenSubida.src.length == 42) {
            this.imagenCambio.style.display = 'block'
        } else {
            if (this.imagenSubida.src.length > 42) {
                this.imagenCambio.style.display = 'none'
                this.imagen.style.display = 'block'
            }
        }
    }
}

let dudas = new noHayArchivo

window.onload = dudas.inicio()
