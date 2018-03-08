var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=b4e87c6a3e8148e985321f5a66fba03d';

$.ajax(url, {
  crossDomain: true,
  method: 'get',
  dataType: 'JSON',
  success: function (data) {

    var arr = data.articles;

    var cardTitle = arr[0].title;
    $('#title0').text(cardTitle);

    var cardUrl = arr[0].url;
    $('#a0').attr('href', cardUrl);

    var image = arr[0].urlToImage;
    $('#newsImage').attr('src', image);

    for (var i=1; i<6; i++) {

      var cardTitle = arr[i].title;
      $('#title' + i).text(cardTitle);

      var cardUrl = arr[i].url;
      $('#a' + i).attr('href', cardUrl);

      var text = arr[i].description;

      $('#text'+i).text(text);
    }
  }
});


$('.source').click(function () {

  var source = $(this).attr("data-source");
  var url = "https://newsapi.org/v2/top-headlines?"+ source + "&apiKey=b4e87c6a3e8148e985321f5a66fba03d";

  $.ajax(url, {
    crossDomain: true,
    method: 'get',
    header: {
      'Access-Control-Allow-Origin': '*'
    },
    dataType: 'JSON',
    success: function (data) {

      var arr = data.articles;

      var cardTitle = arr[0].title;
      $('#title0').text(cardTitle);

      var cardUrl = arr[0].url;
      $('#a0').attr('href', cardUrl);

      var image = arr[0].urlToImage;
      $('#newsImage').attr('src', image);

      for (var i=1; i<6; i++) {
        var cardTitle = arr[i].title;
        $('#title' + i).text(cardTitle);

        var cardUrl = arr[i].url;
        $('#a' + i).attr('href', cardUrl);

        var text = arr[i].description;
        $('#text'+i).text(text);
      }
    }
  });
});
