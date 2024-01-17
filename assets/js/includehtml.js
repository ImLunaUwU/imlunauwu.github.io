$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
      var file = 'assets/html/' + $(this).data('include') + '.html'
      $(this).load(file)
    })
  });