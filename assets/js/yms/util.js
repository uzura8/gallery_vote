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

function getConf(key) {
  return  GL.configs[key];
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
