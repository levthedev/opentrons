$(document).ready(function() {
  var otVid = document.getElementById('ot-vid')
  if ($(window).width() > 1200) {
    var webm = document.createElement('source');
    webm.src = './img/opentrons.webmsd.webm';
    webm.type = 'video/webm';

    var mp4 = document.createElement('source');
    mp4.src = './img/opentrons.mp4';
    mp4.type = 'video/mp4';

    otVid.appendChild(webm);
    otVid.appendChild(mp4);
    otVid.play();
  }

  $('#form-contact').on('submit', function (e) {
    e.preventDefault();
    var $form   = $(this)
      , $button = $form.find('input[type="submit"]')
      , old_val = $button.val()
      , data    = $form.serialize();

    $button.val('submitting...');
    $button.prop("disabled",true);
    setTimeout(function () {
      $.ajax({
        url: './process.php',
        type: "GET",
        data: data,
        cache: false,
        success: function () {
          $button.val(old_val);
          $button.prop("disabled",false);
          $('.msg-prompt').hide();
          $('.msg-success').removeClass('hide');
          $('.form-fields').hide();
        },
        error: function () {
          $button.val(old_val);
          $button.prop("disabled",false);
        }
      });
    }, 2000);
  });
});
