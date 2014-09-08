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
      closeApprise();
      var id = index + 1;
      var voteBtn = $(this).find('.btn_vote');
      changeBtnStatus(voteBtn, checkVoted(id) ? 'voted' : 'default');
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

$(document).on('click', '.btn_vote', function(){
  var btnVoteSelector = this;
  apprise('投票しますか？', {'verify':true}, function(r) {
    if (r == true) executeVote(btnVoteSelector);
  });
  return false;
});

function changeBtnStatus(btnSelector)
{
  var btnStatus = (arguments.length > 1) ? arguments[1] : 'voted';
  var btnElems = getButtonElements(btnStatus);

  $(btnSelector).html(btnElems['html']);
  if (btnStatus == 'voted') {
    $(btnSelector).attr({class: btnElems['class'], disabled: 'disabled', 'data-voted': '1'});
  } else if (btnStatus == 'default') {
    $(btnSelector).attr({class: btnElems['class'], disabled: '', 'data-voted': '0'});
    $(btnSelector).removeAttr('disabled');
  }
}

function getButtonElements()
{
  var btnStatus = (arguments.length > 0) ? arguments[0] : 'voted';
  if (btnStatus == 'voted') {
    return {
      html: '<i class="glyphicon glyphicon-ok-circle"></i> 投票済み',
      class: 'btn btn-danger btn_vote'
    };
  } else if (btnStatus == 'default') {
    return {
      html: '<i class="glyphicon glyphicon-send"></i> 投票する',
      class: 'btn btn-primary btn_vote'
    };
  }
  return false;
}

function checkVoted(id)
{
  id = id.toString();
  var votedIdString = $('#voted_ids').val();
  if (!votedIdString) return false;
  return $.inArray(id, votedIdString.split(',')) !== -1;
}

function executeVote(selfSelector)
{
  var onslide = $(selfSelector).data('onslide') ? Boolean($(selfSelector).data('onslide')) : false;

  var entryId = $(selfSelector).data('entry_id') ? parseInt($(selfSelector).data('entry_id')) : 0;
  if (!entryId) entryId = $('#gallery_onslide').val();
  if (!entryId) return false;

  changeBtnStatus(selfSelector);
  if (onslide) changeBtnStatus('#btn_vote_' + entryId);

  var votedIds = $('#voted_ids').val();
  var addValue = '';
  if (votedIds) addValue = ',';
  addValue += entryId;
  $('#voted_ids').val(votedIds + addValue);

  showMessage('投票しました。');
}

function showMessage(msg)
{
  $.jGrowl(msg);
}

function closeApprise()
{
  $('.appriseOverlay').remove();
  $('.appriseOuter').remove();
}
