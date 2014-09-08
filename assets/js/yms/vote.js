$(function () {
  $('#blueimp-gallery')
    .on('open', function (event) {
        // Gallery open event handler
    })
    .on('opened', function (event) {
        // Gallery opened event handler
    })
    .on('slide', function (event, index, slide) {
      // Gallery slide event handler
      var id = index + 1;
      console.log(id);
      $('#gallery_onslide').val(id);
    })
    .on('slideend', function (event, index, slide) {
        // Gallery slideend event handler
    })
    .on('slidecomplete', function (event, index, slide) {
        // Gallery slidecomplete event handler
    })
    .on('close', function (event) {
        // Gallery close event handler
    })
    .on('closed', function (event) {
        // Gallery closed event handler
    });
});

$(document).on('click', '.vote', function(){
  var entryId = $(this).data('entry_id') ? parseInt($(this).data('entry_id')) : 0;
  if (!entryId) entryId = $('#gallery_onslide').val();
  if (!entryId) return false;

  var btnElems = getVotedButtonElements();
  $(this).html(btnElems['html']);
  $(this).attr({class: btnElems['class'], disabled: 'disabled'});
  return false;
});

function getVotedButtonElements()
{
  return {
    html: '<i class="glyphicon glyphicon-ok-circle"></i> 投票済み',
    class: 'btn btn-danger vote'
  };
}
