function initPageView()
{
  var votedIds = getVotedIds();
  if (checkEnableToVote(votedIds)) {
    $('.vote_limit').html(getConf('voteLimit'));
    setVotedCount(votedIds.length);
  } else {
    changeVoteCompleteView();
  }

  $.each(votedIds, function() {
    changeBtnStatus('#btn_vote_' + this);
  });
}

function checkEnableToVote()
{
  var votedIds = (arguments.length > 0) ? arguments[0] : getVotedIds();
  return !votedIds || votedIds.length < getConf('voteLimit');
}

function setVotedCount(count)
{
  $('.voted_count').html(count);
}

function changeBtnStatus(btnSelector)
{
  var btnStatus = (arguments.length > 1) ? arguments[1] : 'voted';
  var isVoteComplete = (arguments.length > 2) ? arguments[2] : false;
  var btnElems = getButtonElements(btnStatus);

  $(btnSelector).html(btnElems['html']);
  if (btnStatus == 'voted') {
    $(btnSelector).attr({class: btnElems['class'], disabled: 'disabled', 'data-voted': '1'});
  } else if (btnStatus == 'default') {
    $(btnSelector).attr({class: btnElems['class'], 'data-voted': '0'});
    if (!isVoteComplete) $(btnSelector).removeAttr('disabled');
  }
}

function changeVoteCompleteView()
{
  var alertObj = $('#header_alert');
  alertObj.attr('class', 'alert alert-danger');
  alertObj.html('投票が完了しました。ありがとうございました。');

  $('.btn_vote').each(function(){
    $(this).attr({disabled: 'disabled'});
  });
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
  var votedIds = getVotedIds();
  if (!votedIds) return false;
  return $.inArray(id.toString(), votedIds) !== -1;
}

function executeVote(selfSelector)
{
  var onslide = $(selfSelector).data('onslide') ? Boolean($(selfSelector).data('onslide')) : false;

  var entryId = $(selfSelector).data('entry_id') ? parseInt($(selfSelector).data('entry_id')) : 0;
  if (!entryId) entryId = $('#gallery_onslide').val();
  if (!entryId) return false;

  var votedIds = getVotedIds();
  if (!checkEnableToVote(votedIds)) {
    showMessage(getConf('voteLimit') + '件以上は投票できません。', 'error');
    return false;
  }
  if ($.inArray(entryId, votedIds) !== -1) {
    showMessage('既に投票済みです。', 'error');
    return false;
  }

  votedIds = addCookie(entryId);
  if (!votedIds) return;

  changeBtnStatus(selfSelector);
  setVotedCount(votedIds.length);
  if (onslide) changeBtnStatus('#btn_vote_' + entryId);
  if (!checkEnableToVote(votedIds)) changeVoteCompleteView();

  showMessage('投票しました。');
}

function getVotedIds()
{
  var cookieConfs = getConf('cookie');
  var votedIdString = $.cookie(cookieConfs.name);
  return votedIdString ? votedIdString.split(',') : [];
}

function addCookie(id)
{
  var votedIds = getVotedIds();
  if (!checkEnableToVote(votedIds)) return false;
  votedIds.push(id);

  var cookieConfs = getConf('cookie');
  $.cookie(cookieConfs.name, votedIds.join(), {
    expires: cookieConfs.expires,
    path: cookieConfs.path
  });
  return votedIds;
}

function closeApprise()
{
  $('.appriseOverlay').remove();
  $('.appriseOuter').remove();
}

function showMessage(msg)
{
  var viewType = (arguments.length > 1) ? arguments[1] : 'success';
  notif({
    msg: msg,
    type: viewType,
    position: 'center'
  });
}

function getConf(key) {
  return  GL.configs[key];
}
