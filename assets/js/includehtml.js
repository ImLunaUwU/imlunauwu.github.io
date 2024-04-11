$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
      var file = 'https://lunauwu.net/assets/html/' + $(this).data('include') + '.html'
      $(this).load(file)
    })
  });