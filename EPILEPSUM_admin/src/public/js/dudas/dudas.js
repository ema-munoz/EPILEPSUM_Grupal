class noHayArchivo {
    constructor() {
        this.imagenPregunta = document.getElementById("imagenPregunta")
        this.imagenCambio = document.getElementById("iconImagen")
        this.imagenSubidaPregunta = document.getElementById("imagenSubidaPregunta")
        
        this.videoPregunta = document.getElementById("videoPregunta")
        this.videoCambio = document.getElementById("iconVideo")
        this.videoSubidoPregunta = document.getElementById("videoSubidoPregunta")
    }

    inicio() {
        this.imagenPregunta.style.display = "none"
        dudas.mostrarImagenPregunta()
        /*dudas.mostrarImagenRespuesta()*/
    }

    mostrarImagenPregunta() {
        if (dudas.imagenSubidaPregunta.src.length == 42) {
            this.imagenCambio.style.display = "block"
        } else {
            if (this.imagenSubidaPregunta.src.length > 42) {
                this.imagenCambio.style.display = "none"
                this.imagenPregunta.style.display = "block"
            }
        }
    }

    mostrarVideoPregunta() {
        if (dudas.videoSubidoPregunta.src.length == 44) {
            this.videoCambio.style.display = "block"
        } else {
            if (this.videoSubidoPregunta.src.length > 44) {
                this.videoCambio.style.display = "none"
                this.videoPregunta.style.display = "block"
            }
        }
    }

    /*mostrarImagenRespuesta() {
        if (dudas.imagenSubidaRespuesta.src.length == 42) {
            this.imagenCambio.style.display = "block"
        } else {
            if (this.RimagenSubidaespuesta.src.length > 42) {
                this.imagenCambio.style.display = "none"
                this.imagen.style.display = "block"
            }
        }
    }*/
}

let dudas = new noHayArchivo

window.onload = dudas.inicio()
