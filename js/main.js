function search(query) {
  var $api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&continue=&srsearch='+query+'&srwhat=text&srprop=snippet';
  $.ajax({
    method: 'GET',
    url: $api,
    dataType: 'jsonp',
    success: function(response) {
      if (response.query.search.length === 0) {
        $('.results').text('There were no results matching the query.');
      }
      response.query.search.forEach(function(result) {
        var $link = 'https://en.wikipedia.org/?curid='+result.pageid;
        var $newLink = $('<a href="'+$link+'">');
        var $newDiv = $('<div class="snippet">');
        var $title = $('<h3>', {text: result.title});
        var $snippet = $('<div>', {html: result.snippet});
        $newDiv.append($title);
        $newDiv.append($snippet);
        $newLink.append($newDiv);
        $('.results').append($newLink);
        $('.results').addClass('active');
      })
    }
  })
}

$('#search').on('keyup', function(e) {
  if (e.keyCode === 13) {
    $('.results').html(' ');
    $('.results').removeClass('active');
    var $search = $('#search').val()
    search($search);
    $('#search').val(' ');
  }
});