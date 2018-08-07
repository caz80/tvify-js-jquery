$(function () {

  var $tvShowsContainer =$('#app-body').find('.tv-shows')

 function renderShows(shows){
   $tvShowsContainer.find('.loader').remove();
   shows.forEach(function (show) {
     var article = template
     .replace(':name:', show.name)
     .replace(':summary:', show.summary)
     .replace(':img:', show.image ? show.image.medium:'')
     .replace(':img alt:', show.name + " LOGO")

     var $article=$(article);
     $article.hide();
     $tvShowsContainer.append($article.slideDown());

   })
 }
  $('#app-body')
  .find('form')
  .submit(function onsubmit(ev){
    ev.preventDefault();
    var busqueda = $(this)
    .find('input[type="text"]')
    .val();
    $tvShowsContainer.find('.tv-show').remove();
   var $loader =  $('<div class="loader">');
    $loader.appendTo($tvShowsContainer);
    $.ajax({
      url : 'http://api.tvmaze.com/search/shows',
      data : {q: busqueda},
      success: function(res, textStatus, xhr){
      $loader.remove();
      var shows =res.map(function(elemento){
        return elemento.show;
      })
      renderShows(shows);
    }
  })
    alert('se ha buscado : ' + busqueda)
  })

  //hacer request tipo ajax
var template='<article class="tv-show">' +
  '<div class="left img-container">' +
  '<img src=":img:"" alt=":img alt:">' +
  '</div>' +
  '<div class="rigth info">' +
  '<h1>:name:</h1>' +
  '<p>:summary:</p>' +
  '</div>' +
  '</article>';

if(!localStorage.shows){
  $.ajax('http://api.tvmaze.com/shows')
   .then(function(shows){
     $tvShowsContainer.find('.loader').remove();
     localStorage.shows = JSON.stringify(shows);
     renderShows(shows);
   })
 }else{

     renderShows(JSON.parse(localStorage.shows));
   }
})

//console.log(this)
/*var alerta = function (mensaje){
  alert(mensaje)
}
alerta('hola platzi')*/
/*$(document).ready(function (){
  alert('ready')
})
$(function(){
  var header=$('header');
  var tittle = $('h1', header[0])
  console.log(tittle);
})
$h1.css({
  'font-size':'70px'
})
var $h1 = $('h1');
$h1.addClass('danger');

setTimeout(function(){
  $h1.toggleClass('danger');
},1500)


$('button').on('click', function(){
  alert('me hicieron click');
})
*/
