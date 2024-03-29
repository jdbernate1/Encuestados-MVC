/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada  = new Evento(this);


  this.verificarLocalStorage();
  
};



Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var idMax = 0;
    for (var i = 0; i < this.preguntas.length; i++) { 
      if(this.preguntas[i].id > idMax) {
        idMax = this.preguntas[i].id;
      }
    }
    return idMax;
    //return this.ultimoId; 
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  eliminarPregunta: function(id){
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id != id)
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  editarPregunta: function(id,nuevaPregunta){
    var preguntaElegida = seleccionarPregunta(id,this.preguntas);
    preguntaElegida.textoPregunta = nuevaPregunta;
    this.preguntaAgregada.notificar();
    this.guardar();

  },

  eliminarTodo: function(){
    this.preguntas = [];
    this.preguntaEliminada.notificar();
    this.reiniciarLocalStorage();

  },

  agregarRespuesta: function(id,respuesta){
    var preguntaElegida = seleccionarPregunta(id,contexto.preguntas);
    preguntaElegida.cantidadPorRespuesta.push({
      'textoRespuesta': respuesta,
      'cantidadPorRespuesta': 0
    });
    this.preguntaAgregada.notificar();
    this.guardar();

  },

  seleccionarPregunta: function (id){
    var seleccion = this.preguntas.filter(pregunta => pregunta.id == id)[0];
    return seleccion;
  },

  agregarVotos: function(id,respuesta){
    var preguntarElegida = this.seleccionarPregunta(id);
    preguntarElegida.cantidadPorRespuesta.forEach(element => {
      if(element.textoRespuesta==respuesta){
        element.cantidadPorRespuesta ++;
      };  
    });
    this.guardar();


  },


  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas',JSON.stringify(this.preguntas));
  },

  verificarLocalStorage : function(){
    if(localStorage.getItem('preguntas') !== null){
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'))
    }
  },

  reiniciarLocalStorage: function(){
    localStorage.setItem('preguntas',JSON.stringify([]))
  }
};
