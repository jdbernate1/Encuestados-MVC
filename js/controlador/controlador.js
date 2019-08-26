/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  eliminarPregunta: function(id){
    this.modelo.eliminarPregunta(id);
  },
  
  eliminarTodo: function(){
    this.modelo.eliminarTodo();
  },

  editarPregunta: function(id,nuevaPregunta){
    this.modelo.editarPregunta(id,nuevaPregunta);
  },

  agregarRespueta: function(id,respuesta){
    this.modelo.agregarRespueta(id,respuesta);
  },

  agregarVotos: function(id,respuesta){
    this.modelo.agregarVotos(id,respuesta);
  }
};
