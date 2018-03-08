var url = "https://newsapi.org/v2/sources?apiKey=b4e87c6a3e8148e985321f5a66fba03d"
$.ajax(url, {
  crossDomain: true,
  method: 'get',
  dataType: 'JSON',
  success: function (data) {

    $('<h2>Select up to 5 news sources</h2>').appendTo('#iconContainer');

    for (var i=0; i<data.sources.length; i++) {
      var input = $('<input>');
      input.attr('type', 'checkbox');
      input.attr('id', 'myCheckbox'+i);
      input.attr('data-source', data.sources[i].id);
      input.attr('data-name', data.sources[i].name);

      $('#iconContainer').append(input);

      var label = $('<label>');
      label.attr('for', 'myCheckbox'+i);
      label.attr('id', 'checkboxLabel'+i);

      var image = $('<img>');
      image.attr('src', "https://besticon-demo.herokuapp.com/icon?url="+data.sources[i].url+"&size=80..120..200");
      image.attr('class', 'chooseSourceIcon');

      label.append(image);
      $('#iconContainer').append(label);
    }
  }
});

var buttonCreateFeed = $('<button>');
buttonCreateFeed.attr('class', 'btn');
buttonCreateFeed.attr('id', 'buttonCreateFeed')
buttonCreateFeed.text('Create my feed!');
$('footer').append(buttonCreateFeed);

var dataSources = [];
var names = [];

$('#buttonCreateFeed').click(function () {

  dataSources = [];
  names = [];
  var checked = $(":checked");

  if (checked.length > 5) {
    alert("Please select no more than 5 sources");
  } else {
    for (var i=0; i<checked.length; i++) {
      var source = $(checked[i]).attr('data-source');
      dataSources.push(source);
      var name = $(checked[i]).attr('data-name');
      names.push(name);
    }
  }

  $('#iconContainer').css({
    display: 'none'
  });
  $('#mainContainer').css({
    display: 'block'
  });

  $('#buttonCreateFeed').css({
    display: 'none'
  });

  $('#buttonGoBack').css({
    display: 'inline-block'
  });

  generateNavBar(dataSources);
  generateFeed(dataSources);

  $('*:checked').prop('checked', false);

});

function generateNavBar (dataSources) {

  $('.source').empty();

  for (var i=0; i<dataSources.length; i++) {
    var source = $('#source'+i);
    source.attr('data-source', dataSources[i]);
    source.text(names[i]);
  }
}

function generateFeed (dataSources) {

  setTimeout(function(){ $('#source0').click(); }, 50);

  $('.source').click(function () {
    var source = $(this).attr('data-source');
    var url = "https://newsapi.org/v2/top-headlines?sources="+ source + "&apiKey=b4e87c6a3e8148e985321f5a66fba03d";

    $.ajax(url, {
      crossDomain: true,
      header: {
        'Access-Control-Allow-Origin': '*'
      },
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
  });
}

var buttonGoBack = $('<button>');
buttonGoBack.attr('class', 'btn');
buttonGoBack.attr('id', 'buttonGoBack');
buttonGoBack.text('Return');
$('footer').append(buttonGoBack);

$('#buttonGoBack').click(function () {

  $('#iconContainer').css({
    display: 'block'
  });

  $('#mainContainer').css({
    display: 'none'
  });

  $('#buttonGoBack').css({
    display: 'none'
  });

  $('#buttonCreateFeed').css({
    display: 'inline-block'
  });

});
