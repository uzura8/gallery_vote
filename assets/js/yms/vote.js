$(function () {
  initPageView();

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
      changeBtnStatus(voteBtn, checkVoted(id) ? 'voted' : 'default', checkEnableToVote() === false);
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

