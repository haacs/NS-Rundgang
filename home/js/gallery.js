$('#galleryModal').on('show.bs.modal', function (event) {
  var start = $(event.relatedTarget).data('start');
  $('#galleryCarousel').carousel(Number(start));
})