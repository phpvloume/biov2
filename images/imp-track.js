try {
  var SITE_URL      = window.location.origin+'/';
  var arg_1         = getUrlVars()['f'];
  var arg_2         = getUrlVars()['u'];
  var url           = window.location.href;
  var locationUrl   = url.split('/');
  var locationUrl   = locationUrl.filter(function(v){return v!==''});
  var page_last_url   = locationUrl[locationUrl.length-1];
  var page_data_Val = null;
  var document_id   = documentId;
  var counterDnsell_popup = 0;

  function send_message(type, message){
    
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    toastr[type](message);
  }

  function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }

  var getCookies = function(){
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair[1]);
    }
    return cookies;
  }

  function add_hit_stats(){
    $.getJSON( 'https://geoip-db.com/json/', function( location ) {
      var country_name = location.country_name;
      var state        = location.state;
      var city         = location.city;
      var lat          = location.latitude;
      var long         = location.longitude;
      var ip           = location.IPv4;
      /*var tz        = jstz.determine().name(); */
      var platform  = navigator.platform;
      var useragent = navigator.userAgent;
      var version   = navigator.appVersion;
      var online    = navigator.onLine;
      var cookies   = navigator.cookieEnabled;
      var java      = navigator.javaEnabled();
      var language  = navigator.language;
      var cookiesD  = JSON.stringify(getCookies());
      var browsername = navigator.sayswho= (function(){
       var ua = navigator.userAgent, tem,
       M      = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
       if(/trident/i.test(M[1])) {
        tem  =  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
      }
      if(M[1]=== 'Chrome') {
       tem   = ua.match(/\b(OPR|Edge)\/(\d+)/);
       if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
     }
     M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
     if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
     return M.join(' ');
   })();

   var userData  = {
     "platform": platform,
     "useragent": useragent,
     "version": version,
     "online": online,
     "java": java,
     "cookies": cookies,
     "language": language,
     "browsername":browsername,
     "latitude" : lat,
     "longitude" : long,
     "country_name" : country_name,
     "state" : state,
     "city" : city,
     "ip" : ip,
     "cookies_data":cookiesD
   };
   var formData = new FormData();
   formData.append('user_data', JSON.stringify(userData));
   formData.append('id', document_id);
   $.ajax({
     type: "POST",
     url: SITE_URL+"funnels/analytics/p_save",
     data: formData,
     cache: false,
     contentType: false,
     processData : false,
     success: function(response) {
     }
   });
 });
  }

  function get_track_status(){
    $.ajax({
      url: SITE_URL+"funnels/analytics/get_voice_data",
      type: 'POST',
      data: {document_id: document_id},
    }).done(function(response) {
     var jsonData     =   $.parseJSON(response);
     var pageData     =   JSON.parse(jsonData.page_data);
     page_data_Val    =   jsonData.voice_data;
     if (pageData.is_trigger_commands == 1 || pageData.is_trigger_commands == '1') {
      var htmlAA = `<script src="https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"></script>
      <script src="https://code.responsivevoice.org/responsivevoice.js"></script>`;
      var htmlScript_voice = `<link rel="stylesheet" href="`+SITE_URL+`assets/builder-assets/voice-cmd/xbuilder_voice.css"></link>
      <script src="`+SITE_URL+`assets/builder-assets/voice-cmd/xbuilder_voice_2.js"></script>
      <script src="`+SITE_URL+`assets/builder-assets/voice-cmd/xbuilder_voice_1.js"></script>`;
      var htmlDiv  = `<svg class="hidden"> <defs> <symbol id="icon-info" viewBox="0 0 512 512"><title>Info</title> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve" width="512px" height="512px"> <g> <g> <path d="M412.113,170.747c-6.637,0-12.02,5.381-12.02,12.02v75.104c0,79.452-64.639,144.09-144.092,144.09 S111.91,337.321,111.91,257.87v-75.104c0-6.639-5.383-12.02-12.02-12.02c-6.639,0-12.02,5.381-12.02,12.02v75.104 c0,88.666,68.993,161.512,156.111,167.696v62.395h-62.174c-6.637,0-12.02,5.381-12.02,12.02c0,6.639,5.382,12.02,12.02,12.02 h148.386c6.637,0,12.02-5.381,12.02-12.02c0-6.639-5.382-12.02-12.02-12.02H268.02v-62.395 c87.119-6.184,156.111-79.031,156.111-167.696v-75.104C424.133,176.128,418.75,170.747,412.113,170.747z" fill="#FFFFFF" /> </g> </g> <g> <g> <path d="M264.011,0h-16.02c-54.949,0-99.653,44.704-99.653,99.653V265.88c0,54.949,44.704,99.653,99.653,99.653h16.02 c54.949,0,99.653-44.704,99.653-99.653V99.653C363.664,44.704,318.96,0,264.011,0z M339.625,130.853h-43.572 c-6.639,0-12.02,5.381-12.02,12.02c0,6.639,5.381,12.02,12.02,12.02h43.572v33.458h-43.572c-6.639,0-12.02,5.381-12.02,12.02 s5.381,12.02,12.02,12.02h43.572v33.46h-43.572c-6.639,0-12.02,5.381-12.02,12.02s5.381,12.02,12.02,12.02h43.464 c-2.091,39.836-35.157,71.603-75.505,71.603h-16.02c-40.348,0-73.414-31.767-75.505-71.603h43.464 c6.639,0,12.02-5.381,12.02-12.02s-5.381-12.02-12.02-12.02h-43.572v-33.46h43.572c6.639,0,12.02-5.381,12.02-12.02 s-5.381-12.02-12.02-12.02h-43.572v-33.458h43.572c6.639,0,12.02-5.381,12.02-12.02c0-6.639-5.381-12.02-12.02-12.02h-43.572 v-31.2c0-29.964,17.52-55.914,42.854-68.143v33.983c0,6.639,5.382,12.02,12.02,12.02s12.02-5.381,12.02-12.02V24.558 c2.863-0.331,30.595-0.331,33.458,0v40.935c0,6.639,5.381,12.02,12.02,12.02c6.637,0,12.02-5.381,12.02-12.02V31.51 c25.334,12.229,42.854,38.177,42.854,68.142V130.853z" fill="#FFFFFF" /> </g> </g> </svg> </symbol> <symbol id="icon-close" viewBox="0 0 32 32"><title>Close</title> <svg version="1.1" id="close_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 339.75 339.75" style="enable-background:new 0 0 339.75 339.75;" xml:space="preserve"> <g> <g> <path d="M215.875,169.75l114,114c13,13,13,33,0,46c-6,6-15,10-23,10s-17-4-23-10l-114-114l-114,114 c-6,6-15,10-23,10s-17-4-23-10c-13-13-13-33,0-46l114-114l-114-114c-13-13-13-33,0-46s33-13,46,0l114,114l114-114 c13-13,33-13,46,0s13,33,0,46L215.875,169.75z" /> </g> </g> </svg> </symbol> </defs> </svg><div class='main'><div class="info_panel"><div class="overlay"></div><div class="overlay-content"><div class="triangle-wrap top"><div class="triangle-hover"> <svg class="icon icon--logo icon--info"> <use xlink:href="#icon-info"></use> </svg></div><div class="triangle"></div></div><h1>What are you looking for?</h1><h2> Use these voice commands!</h2><div class="list-of-commands"></div></div><div class="triangle-wrap bottom"><div class="triangle-hover"> <svg class="icon icon--logo icon--info"> <use xlink:href="#icon-info"></use> </svg></div><div class="triangle"></div></div></div></div>`;
      $('body').append(htmlAA);
      setTimeout(function() {
        $('body').append(htmlDiv);
        $('body').append(htmlScript_voice);
        $('.main').attr({'style':'width:100px;bottom:0;height:100px;right:0;left:auto;top:auto;'});
      },2000);
    }
  });

if(page_last_url != 'preview'){
  add_hit_stats();
}
}

if(documentId != '' && documentId != undefined && documentId != null){
  get_track_status();
  function set_down_Sell(jsonData, page_data, downsell_url){
    var deskTop_mdl  =  `<div class="mdl_1 thisis-for-downlsell canvas-element-wrapper canvas-block ui-resizable active" id="canvas-1" modal-id="modal-xCMGHqZe" data-src="https://s3-us-west-2.amazonaws.com/xfunnelsbuilder-uploads/presets/modal_popup/5d53987772415a472111f5b4/5d53987772415a472111f5b4.png">
    <div class="modal fade modal-xCMGHqZe" mdl-id="modal-xCMGHqZe" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog canvas-area" role="document" style="height: 388px;">
    <div class="canvas-background" style="background-repeat: no-repeat; opacity: 1; overflow: hidden; width: 100%; height: 100%; display: block; z-index: 0; background-size: cover; position: absolute; top: 0px; left: 0px; background-color:white;"></div>
    <div class="canvas-overlay-block" style="width:100%;height:100%;position:absolute;top:0;left:0;opacity:0;"></div>
    <div class="modal-content">
    <div class="modal-body">
    <div class="close_pop" data-dismiss="modal"><span aria-hidden="true"><img src="https://xfunnels.mintware.io/assets/v3-builder/builder-assets/img/close.svg" alt="" width="15" height="15"></span></div>
    <form class="canvas-element ui-selectable ui-droppable modal-normal-pos active" style="width: 1200px;">
    <div id="object-hwk3xwp5" style="z-index: 1; top: 197px; position: absolute; cursor: move; width: 310px; height: 50px; text-align: left; left: 38px;" class="component_element input component input-mobile-view ui-draggable ui-draggable-handle ui-selectee ui-resizable" data-module="input" data-module-type="submit-btn" data-index="1">
    <div class="form-group-pagemakerr fields" style="width:100%;height:100%;">
    <button type="button" class="c-btn form-control-pagemakerr btn-next-step" style="font-family:Roboto;font-size:15px;background-color:#1a91eb;background:#1a91eb;" action-type="downsell-step">Get Instant Access</button>
    </div>
    </div>
    <div id="object-LpIEBBXi" style="z-index: 1; position: absolute; padding: 12px; cursor: move; width: 346px; opacity: 1; right: auto; height: auto; bottom: auto; left: 18px; top: 124px; overflow-wrap: break-word;" class="component_text heading h-mobile-view component 12345678 ui-draggable ui-draggable-handle ui-selectee ui-resizable" data-module="text" data-index="1">
    <div class="component-content" style="text-align: center; outline: none;">
    <p style="font-family: Federant; font-weight: bold;"></p>
    <h3 style="font-size: 35px; font-family: Federant; color: rgb(158, 158, 158); font-weight: bold; line-height: 1;">Get Instant Access</h3>
    <p style="font-family: Federant; font-weight: bold;"></p>
    </div>
    </div>
    <div id="object-QPmVqxNv" style="z-index: 1; top: -7px; position: absolute; cursor: move; text-align: center; width: 549.786px; left: 398.641px; height: 409px;" class="image-mobile-view component_img component 12345678 ui-draggable ui-draggable-handle ui-selectee ui-resizable" data-module="image" data-index="0">
    <div class="" style="height:100%;"><img style="padding:0;width:100%;height:auto;" class="" src="https://xfunnelsbuilder-uploads.s3.us-west-2.amazonaws.com/user-images/5b63d30d510ddb69a0df97b0/1565352620_img_uri.jpg" id="map"></div>
    </div></form></div></div></div></div></div>`;

    var mobilePopup  =  `<div class="mdl_1 thisis-for-downlsell canvas-element-wrapper canvas-block ui-resizable active" id="canvas-1" modal-id="modal-xCMGHqZe" data-src="https://s3-us-west-2.amazonaws.com/xfunnelsbuilder-uploads/presets/modal_popup/5d53987772415a472111f5b4/5d53987772415a472111f5b4.png" style="padding-left: 0px; padding-right: 0px;">
    <div class="modal fade modal-xCMGHqZe in" mdl-id="modal-xCMGHqZe" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog canvas-area" role="document" style="width:410px;">
    <div class="canvas-background" style="background-repeat: no-repeat; opacity: 1; overflow: hidden; width: 100%; height: 100%; display: block; z-index: 0; background-size: cover; position: absolute; top: 0px; left: 0px; background-color:white;"></div>
    <div class="canvas-overlay-block" style="width:100%;height:100%;position:absolute;top:0;left:0;opacity:0;"></div>
    <div class="modal-content active">
    <div class="modal-body">
    <div class="close_pop" data-dismiss="modal"><span aria-hidden="true"><img src="https://xfunnels.mintware.io/assets/v3-builder/builder-assets/img/close.svg" alt="" width="15" height="15"></span></div>
    <form class="canvas-element ui-selectable ui-droppable active" style="width: 410px;">
    <div id="object-hwk3xwp5" style="z-index: 1; top: -3px; position: absolute; cursor: move; text-align: center; width: 170px; left: 0px; height: auto; display: none; max-width: 400px;" class="image-mobile-view component_img component 12345678 ui-draggable ui-draggable-handle ui-selectee ui-resizable" data-module="image" data-index="0">
    <div class="" style="height:100%;"><img style="padding:0;width:100%;height:auto;" class="" src="https://xfunnelsbuilder-uploads.s3.us-west-2.amazonaws.com/user-images/5b63d30d510ddb69a0df97b0/1565352620_img_uri.jpg" id="map"></div>
    </div>
    <div id="object-LpIEBBXi" style="z-index: 1; top: 211px; position: absolute; cursor: move; width: 373px; height: 50px; text-align: left; left: 18px;" class="component_element input component input-mobile-view 12345678 ui-draggable ui-draggable-handle ui-selectee ui-resizable" data-module="input" data-module-type="submit-btn" data-index="1">
    <div class="form-group-pagemakerr fields" style="width:100%;height:100%;">
    <button type="button" class="c-btn form-control-pagemakerr btn-next-step" style="font-family:Roboto;font-size:15px;background-color:#1a91eb;background:#1a91eb;" action-type="downsell-step">Get Instant Access</button>
    </div>
    </div>
    <div id="object-QPmVqxNv" style="z-index: 1; position: absolute; padding: 12px; cursor: move; width: 382px; opacity: 1; right: auto; height: auto; bottom: auto; left: 14px; top: 149px; overflow-wrap: break-word;" class="component_text heading h-mobile-view component 12345678 ui-draggable ui-draggable-handle ui-selectee ui-resizable" data-module="text" data-index="1">
    <div class="component-content" style="text-align: center; outline: none;">
    <p style="font-family: Federant; font-weight: bold;"></p>
    <h3 style="font-size: 35px; font-family: Federant; color: rgb(158, 158, 158); font-weight: bold; line-height: 1;">Get Instant Access</h3>
    <p style="font-family: Federant; font-weight: bold;"></p>
    </div></div></form></div></div></div></div></div>`;

    $('.canvas-section.desktop').find('.canvas-container').append(deskTop_mdl);
    $('.canvas-section.mobile').find('.canvas-container').append(mobilePopup);
    $('.canvas-section.table').find('.canvas-container').append(deskTop_mdl);
  }

  $(document).on('click', '.close_pop', function(event) {
    setTimeout(function(){
      $('.modal-backdrop.fade.in').remove();
    },500);
  });

  $(document).on('mouseleave', 'body', function(event){
    if(counterDnsell_popup == 0){
      counterDnsell_popup = 1;        
      try{
        $('.thisis-for-downlsell').find('.modal').modal('show');
      }catch(e){}
    }
  });

  $(document).on('click', '.btn-next-step', function(event){
    if($(this).attr('action-type') != '' && $(this).attr('action-type') != undefined) {
      $(this).addClass('is-disabled');
      $.ajax({
        url: site_url+'funnels/analytics/getaction',
        type: 'POST',
        data: {param1:p_page, param2:$(this).attr('action-type')},
        context: this,
      }).done(function(response){
        $(this).removeClass('is-disabled');
        var jsonData  =  $.parseJSON(response);
        if(jsonData.status == 'true' && jsonData.redirectUrl != 'none'){
          window.location.href  =  jsonData.redirectUrl;
        }
      });
    }
  });

  if($('.thisis-for-downlsell').length == 0){
    $.ajax({
      url: SITE_URL+'funnels/analytics/get_downsell',
      type: 'POST',
      data: {document_id: document_id},
    }).done(function(response){
      var jsonData = JSON.parse(response);
      if(jsonData.status == true || jsonData.status == 'true') {
        var page_data = JSON.parse(jsonData.pages_data);
        set_down_Sell(jsonData, page_data, jsonData.downsell_url);
      }
    }).fail(function(){});
    }
  }

    $('.btn-chekout').attr('href','javascript:void(0);');
    var tmp_json_chk = null;
    $(document).on('click','.btn-chekout', function(event){
      var $thisBtn   =     $(this);
      $thisBtn.addClass('is-disabled');
      $.ajax({
        url: site_url+'checkoutnew/setdata',
        type: 'POST',
        data: {doc_id:$(this).attr('page_id'),product_id:$(this).attr('product_id')},
      }).done(function(response) {
        var jsonData = $.parseJSON(response);
        if (jsonData.status == true || jsonData.status == 'true') {
          window.location.href = site_url+'checkoutnew/p/'+jsonData.redirect;
        }else{
          send_message('error',jsonData.message);
        }
      });
    });
  }catch(e){}