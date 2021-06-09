$(document).ready(function(e){

  $('[contenteditable="true"]').removeAttr('contenteditable');

  if($('.canvas-element #navbar_section').length > 0) {
    var stl =  $('.canvas-element #navbar_section').attr('style');
    $('.canvas-element #navbar_section').attr('style',stl+'top:0px !important;width:100%;');
  }

  if($('.mdl_1').length > 0) {
    $('.mdl_1').find('.modal').removeAttr('data-backdrop data-keyboard style');
    $('.full-width-modal').css('width','100%;');
  }

  $('.component').css({'outline':'none','border':'none'});

    // some attributes removed at run time from objects
    $('.menu-overlay-for-builder').removeClass('menu-overlay-for-builder');
    $('.block-id-text, .custom-html-icon, .object-index, .grammarly-btn, .ruler').remove();
    $('.compoent').find('.ui-resizable-handle').remove();
    $('.component,.component-content').css({'cursor':'default','outline':'none'});
    $('.pointer-evnt-object-no').removeClass('pointer-evnt-object-no');
    $('.show-lbl-frm').parent().remove();
    $('.obj-custom-html').show();
    $('.obj-custom-html iframe, .obj-custom-html div:eq(0)').css({'width':'100%','height':'100%'});
    $('.canvas-background').find('video').attr('autoplay','true');
    $('#navbar_section').css('top','0px');
    $('.progress-bar-mobile-view').css('padding','');
    $('.overlay-menu').removeAttr('style');
    $('.component').find('div:eq(0)').css('outline','none');
    // ----- end 

    $('.grouped-object').css('border','none');
    $('.grouped-object-main').css('border','none');
    $('.grouped-object').removeClass('grouped-object');
    $('.grouped-object-main').removeClass('grouped-object-main');
    $('.component-content iframe').css('width','100%');
    $('.component_fontawesome').find('*').css('pointer-events','unset');

    $('.component').find('.custom-html-icon').remove();
    $('video').removeAttr('muted');

    $('.obj-custom-html').each(function(index, el){
      try{
        var console_1 = $('<div />').html($(this).html()).text();
        var counterForm = 0;
        var valhtml    =   console_1;
        valhtml        =   $(valhtml);
        if (valhtml.length > 0){
          $.each(valhtml, function(index, val) {
            if ($(this).prop("tagName") == 'FORM' || $(this).prop("tagName") == 'SCRIPT') {
              counterForm   = 1;
            }
          });
        }else{
          var console_1 = $('<div />').html($(this).html()).text();
          console.log(console_1);
        }

        if($(console_1).find('form').length > 0 || counterForm == 1) {
          $(this).html(console_1);
        }
      }catch(e){}
    });
    

    /********************************************************/
    /*************** start code for countdown ***************/
    /********************************************************/

    function set_counter_1($this, diffDays){

     try{
       var timeR       = 0;
       var firstDate   = null;
       var s           = $this.find('span');
       var oneDay      = 24 * 60 * 60 * 1000;
       
       if ($this.attr('type') == 'evergreen') {
        var arrTime = diffDays.split(':');
        firstDate   = new Date();
        firstDate.setHours(arrTime[0]);
        firstDate.setMinutes(arrTime[1]);
      } else if($this.attr('type') == 'wait time') {

        var time_slotTyep  =  $this.attr('time-slot-type');
        var time           =  $this.attr('time');

        var url            =  window.location.href;
        url                =  url.split('/');
        url                =  url[url.length - 1];

        if (url == 'preview' || url == 'ab-preview') {
         firstDate  =  new Date();
       }else{
         if (Cookies.get(documentId+'-open-time') == undefined || Cookies.get(documentId+'-open-time') == '') {
          firstDate  =  new Date();
          Cookies.set(documentId+'-open-time',firstDate);
        } else {
          firstDate  =  new Date(Cookies.get(documentId+'-open-time'));
        }
      }

      if(time_slotTyep == 'Minutes') {
       firstDate.setMinutes(firstDate.getMinutes()+parseInt(time));
       firstDate.setHours(firstDate.getHours());
     }else{
       firstDate.setHours(firstDate.getHours() + parseInt(time));
       firstDate.setMinutes(firstDate.getMinutes());
     }

   }else{
    firstDate  = new Date(diffDays.replace(/-/g, "/"));
  }

  var secondDate = new Date();
  var days       = (firstDate.getTime() - secondDate.getTime()) / (oneDay);
  var hrs        = (days - Math.floor(days)) * 24;
  var min        = (hrs - Math.floor(hrs)) * 60;
  s[0].innerHTML = Math.floor(days);
  s[1].innerHTML = Math.floor(hrs);
  s[2].innerHTML = Math.floor(min);
  s[3].innerHTML = Math.floor((min - Math.floor(min)) * 60);
  if (s[0].innerHTML < 0 || s[1].innerHTML < 0 || s[2].innerHTML < 0 || s[3].innerHTML < 0) {
    $this.find('span').text('00');
  }
  var i = setInterval(function() {
    n()
  }, 1000)
  function f(d, x) {
    s[d].innerHTML = x;s[d - 1].innerHTML = Number(s[d - 1].innerHTML) - 1;
  }
  function n() {
    s[3].innerHTML = Number(s[3].innerHTML) - 1;
    if (s[3].innerHTML == -1) {
     f(3, 59)
     if (s[2].innerHTML == -1) {
      f(2, 59)
      if (s[1].innerHTML == -1) {
       f(1, 23)
     }
   }
 }

 if(s[0].innerHTML <= -1) { 

   clearInterval(i);
   $this.find('span').text('00');
   var expire_type   = $this.attr('expire-type');
   var redirect_url  = $this.attr('redirect-url');
   if (expire_type == 'show-timer') {

   }else if(expire_type == 'hide-timer') {
    $this.parent().parent().parent().remove();
  }else if(expire_type == 'redirect') {
    if (redirect_url == undefined || redirect_url == 'undefined') {
     redirect_url       = site_url+'funnel/view/error';
   }
   window.location.href = redirect_url;
 }

}}}catch(e){ console.log(e) }}


function set_counter_1_v3($thisElm, timeStr){

  var timeString    =   new Date(timeStr); 

  if ($thisElm.attr('type') == 'evergreen') {
    var arrTime  = timeStr.split(':');
    timeString   = new Date();
    timeString.setHours(arrTime[0]);
    timeString.setMinutes(arrTime[1]);

  }else if($thisElm.attr('type') == 'wait time'){

    var time_slotTyep  =  $thisElm.attr('time-slot-type');
    var time           =  $thisElm.attr('time');

    var url            =  window.location.href;
    url                =  url.split('/');
    url                =  url[url.length - 1];

    if (url == 'preview' || url == 'ab-preview') {
     timeString  =  new Date();
   }else{
     if (Cookies.get(documentId+'-open-time') == undefined || Cookies.get(documentId+'-open-time') == '') {
      timeString  =  new Date();
      Cookies.set(documentId+'-open-time',timeString);
    } else {
      timeString  =  new Date(Cookies.get(documentId+'-open-time'));
    }
  }

  if (time_slotTyep == 'Minutes') {
   timeString.setMinutes(timeString.getMinutes()+parseInt(time));
   timeString.setHours(timeString.getHours());
 }else{
   timeString.setHours(timeString.getHours() + parseInt(time));
   timeString.setMinutes(timeString.getMinutes());
 }

}else{

 try{
   timeString  = new Date(timeStr.replace(/-/g, "/"));
 }catch(e){}
 
}

// console.log('Mon Jul 22 2019 13:25:00');
// timeString    = new Date('Mon Jul 22 2019 13:28:00');

var countdownClass   =   $thisElm.attr('cnt-class');
var countdownTheme   =   $thisElm.attr('ctn-theme');
var countdownLang    =   $thisElm.attr('ctn-language');

try{

  if(countdownClass != undefined){
   $thisElm.find('.'+countdownClass).timeTo({
    timeTo: timeString,
    displayDays: 2,
    theme: countdownTheme,
    displayCaptions: true,
    fontSize: 48,
    captionSize: 14,
    lang: countdownLang,
  },function(e){ 
   var expire_type   = $thisElm.attr('expire-type');
   var redirect_url  = $thisElm.attr('redirect-url');
   if (expire_type == 'show-timer') {
   }else if(expire_type == 'hide-timer') {
    // $thisElm.closest('.component').remove();
  }else if(expire_type == 'redirect') {
    if (redirect_url == undefined || redirect_url == 'undefined') {
      // redirect_url       = site_url+'funnel/view/error';
    }
    window.location.href = redirect_url;
  }
});
 }
}catch(e){
  console.log('----- timer issue -----');
  console.log(e);
}

}

function set_counter_pluggin(){

  if($('.obj-countdown').length > 0){
   $('.obj-countdown').each(function() {
    var time          = $(this).attr('time');
    var typeC         = $(this).attr('type');
    var counterTheme  = $(this).attr('counter-theme');
    var d           = new Date(time);
    var nowD        = new Date();
    var diffDays    = null;
    if (time == undefined) {
     diffDays  =   5000;
   } else {
     diffDays  =   d.getTime() - nowD.getTime();
     diffDays  =   diffDays / 1000;
   } 
   if (counterTheme == 'normal' || counterTheme == 'Simple' || counterTheme == undefined) {
     set_counter_1($(this), time);
   }else{
   // set_counter_2($(this), diffDays);
 }
});

 }


 if($('.obj-countdown-v3').length >0){
   $('.obj-countdown-v3').each(function() {
    var time          = $(this).attr('time');
    var typeC         = $(this).attr('type');
    var counterTheme  = $(this).attr('counter-theme');
    var d           = new Date(time);
    var nowD        = new Date();
    var diffDays    = null;
    if (time == undefined) {
     diffDays  =   5000;
   } else {
     diffDays  =   d.getTime() - nowD.getTime();
     diffDays  =   diffDays / 1000;
   } 
   if (counterTheme == 'normal' || counterTheme == 'Simple' || counterTheme == undefined) {
     set_counter_1_v3($(this), time);
   }
 });
 }

}

if ($('.obj-countdown').length > 0 || $('.obj-countdown-v3').length > 0) {
 set_counter_pluggin();
}


function set_social_share_pluggin(type){

 if(type == 'desktop') {

  $(".social-share").jsSocials({
   shares: ["twitter", "facebook", "googleplus", "linkedin", "pinterest"],
   url:  cuurenPage_url,
   text: document_name,
   showLabel: true,
   shareIn: 'popup',
   showCount: true,
   smallScreenWidth: 640,
   largeScreenWidth: 1024,
   resizeTimeout: 200,
 });

}else{

  $(".social-share").jsSocials({
   shares: ["twitter", "facebook", "googleplus", "linkedin", "pinterest"],
   url:  cuurenPage_url,
   text: document_name,
   showLabel: true,
   showCount: true,
   smallScreenWidth: 640,
   largeScreenWidth: 1024,
   resizeTimeout: 200,
 });

}

}

if($(".social-share").length > 0) {
 if ($(window).width()  <= 992) {
  set_social_share_pluggin('mobile');
}else{
  set_social_share_pluggin('desktop');
}
}

/********************************************************/
/*************** start code for countdown ***************/
/********************************************************/


/*********************************************************/
/**************** code for modal popup  ******************/
/*********************************************************/

function show__hide_modal(modal_id, triggerType){
  if(triggerType == 'show') {
    $(modal_id).fadeIn(0);
    $(modal_id+' .xf-modal-window__overlay').fadeIn('slow');
    $(modal_id+' .xf-modal-window__content').addClass('is-active');
  }else{
    $(modal_id+' .xf-modal-window__content').removeClass('is-active');
    $(modal_id+' .xf-modal-window__overlay').fadeOut();
    $(modal_id).fadeOut();
  }
}

$(document).on('click', '.xf-modal-window__close, .xf-modal-window__overlay', function(event) {
  show__hide_modal('#'+$(this).closest('.mdl_1').attr('id'), 'hide');
});

$(document).on('click','.btn-modal-show',function(e) {
  var item_id     =     $(this).attr('modal-trigger');
  show__hide_modal(item_id, 'show');
});


$('.mdl_1[trigger-type]').each(function(index, el){
  try{
    var $thisMdl_Obj     =     $(this);
    /*----------- on landing -----------*/
    if($thisMdl_Obj.attr('trigger-type') == 'on-landing'){
      $(window).on('load', function(event){
        if($thisMdl_Obj.attr('trigger-type-time') == 'delay'){
          var timeout_val   =   $thisMdl_Obj.attr('delay-time');
          timeout_val       =   parseInt(timeout_val) * 1000;   
          setTimeout(function(){
              // $thisMdl_Obj.find('.modal').modal('show');
              show__hide_modal('#'+$thisMdl_Obj.attr('id'), 'show');
            },timeout_val);
        }else{
            // $thisMdl_Obj.find('.modal').modal('show');
            show__hide_modal('#'+$thisMdl_Obj.attr('id'), 'show');
          }
        });
    }
    /*----------- on landing -----------*/
    /*----------- on exit -----------*/
    if($thisMdl_Obj.attr('trigger-type') == 'on-exit'){
      mouseOutVar_dsk[$thisMdl_Obj.attr('modal-id')]       =  0;
      $(document).on('mouseleave', 'body', function(event) {
        if($thisMdl_Obj.attr('trigger-type-time') == 'delay'){
          var timeout_val   =   $thisMdl_Obj.attr('delay-time'); 
          timeout_val       =   parseInt(timeout_val) * 1000;    
          if(mouseOutVar_dsk[$thisMdl_Obj.attr('modal-id')] == 0) {
            setTimeout(function(){
                // $thisMdl_Obj.find('.modal').modal('show');
                show__hide_modal('#'+$thisMdl_Obj.attr('id'), 'show');
                mouseOutVar_dsk[$thisMdl_Obj.attr('modal-id')]    = 1;
              },timeout_val);
          }
        }else{
          if(mouseOutVar_dsk[$thisMdl_Obj.attr('modal-id')] == 0) {
              // $thisMdl_Obj.find('.modal').modal('show');
              show__hide_modal('#'+$thisMdl_Obj.attr('id'), 'show');
              mouseOutVar_dsk[$thisMdl_Obj.attr('modal-id')]    = 1;
            }
          }
        });
    }
    /*----------- on exit -----------*/
    /*----------- on scroll -----------*/
    if($thisMdl_Obj.attr('trigger-type') == 'on-scroll'){
      var didScroll    =   false;
      $(document).on('scroll', function(e){
        if(didScroll == false){
          didScroll    =   true;
          if($thisMdl_Obj.attr('trigger-type-time') == 'delay'){
            var timeout_val   =   $thisMdl_Obj.attr('delay-time');   
            timeout_val       =   parseInt(timeout_val) * 1000;  
            setTimeout(function(){
                // $thisMdl_Obj.find('.modal').modal('show');
                show__hide_modal('#'+$thisMdl_Obj.attr('id'), 'show');
              },timeout_val);
          }else{
              // $thisMdl_Obj.find('.modal').modal('show');
              show__hide_modal('#'+$thisMdl_Obj.attr('id'), 'show');
            }
          }
        });
    }
    /*----------- end on scroll -----------*/
  }catch(e){
    console.log(e);
  }
});

/*********************************************************/
/**************** end code for modal popup  **************/
/*********************************************************/


$videoAll_obj  =  $('.canvas-section');
$videoAll_obj.find('[data-module="video"]').each(function(index, el) {
  if($(this).find('iframe').length > 0){
  }else if($(this).find('video').length > 0){
    $(this).find('video').addClass('plyr__video_video');
  }
});

try{
  $videoAll_obj.find('.plyr__video_video').each(function(index, el){
    try{
      const player_v = new Plyr($(this)); 
      if ($(this).attr('vid_autoplay') == 'true'){
        player_v.play();
      }
    }catch(e){}
  });
  checkVideoSetting();
}catch(e){}

function toTitleCase(str){
  return str.replace(/(?:^|\s)\w/g, function(match){
    return match.toUpperCase();
  });
}

function check_audio_setting(typedevice, elmDiv){

  var $elmAudio   =   $('.canvas-section').find('#'+elmDiv).find('audio');

  if($elmAudio.attr('vid_autoplay') == 'true'){
    $elmAudio.attr('autoplay','true');
  }else{
    $elmAudio.removeAttr('autoplay');
  }
  
  if($elmAudio.attr('vid_controls') == 'true'){
    $elmAudio.attr('controls','true');
  }else{
    $elmAudio.removeAttr('controls');
  }

  if($elmAudio.attr('vid_loop') == 'true'){
    $elmAudio.attr('loop','true');
  }else{
    $elmAudio.removeAttr('loop');
  }

  if($elmAudio.attr('vid_mute') == 'true'){
    $elmAudio.attr('mute','true');
  }else{
    $elmAudio.removeAttr('mute');
  }

}

function set_audio_player_in_builder(){
  var player    =   [];
  $('.component[data-module-sub="audio"]').each(function(index, el){
    var outerHtml   =   $(this).find('audio')[0].outerHTML;
    $(this).find('.audio-tag').html(outerHtml);
    check_audio_setting('desktop', $(this).attr('id'));
    player[index]   =   new Plyr($(this).find('audio'));
    var bgColor     =   $(this).find('.audio-tag').attr('background-color');
    if(bgColor != '' && bgColor != undefined && bgColor != null){
      $(this).find('.plyr__controls').css('background-color',bgColor);
    }
  });
}

$(window).on('load',function(event) {
  if($('.canvas-section').find('.component').find('audio').length > 0){
    set_audio_player_in_builder();
  }

  $('body').find('*').each(function(index, el) {
    if ($(this).css('font-family') == 'AvenirNextLTPro-Medium' || $(this).css('font-family') == 'AvenirNextLTPro-Light' || $(this).css('font-family') == 'AvenirNextLTPro-Bold' || $(this).css('font-family') == 'AvenirNextLTPro-Regular' || $(this).css('font-family') == 'Courgette-Regular' || $(this).css('font-family') == 'inherit' || $(this).css('font-family') == 'Arial, sans-serif') {
      $(this).css({'font-family':'sans-serif'});
    }
  });
  

});

/**** page loader *****/
$('.bg-preloader,.loader-container-live').delay(50).fadeOut('fast');
$('.bg-preloader,.loader-container-live').delay(50).fadeOut();
/**** end page loader *****/

});