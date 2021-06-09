var cuurenPage_url = window.location.origin + window.location.pathname;
var counterTime_dsk   = new Array();
var timeInterval_dsk  = new Array();
var mouseOutVar_dsk   = new Array();
var counterTime_mbl   = new Array();
var timeInterval_mbl  = new Array();
var mouseOutVar_mbl   = new Array();
var internal_error    = 'Oops! Internal server error.';

/** code for modal **/

function send_message(type, message){

  if(type == '' || type == undefined){type = 'error';}

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

if($('[data-aos]').length > 0) {
  AOS.init();
}

$(document).on('click','a[href^="#"]', function(event) {
  try {
    var href = $(this).attr('href');
    var minus = $('.canvas-navbar').length > 0 ? 60 : 0;
    if ($(window).width() >= 992) {
     $('html, body').animate({scrollTop:$($('body').find(href)).offset().top - minus}, 400);
   }else{
     $('html, body').animate({scrollTop:$($('body').find(href)).offset().top - minus}, 400);
   }
   $('.menuIcon').removeClass('toggle');
   $('.overlay-menu').css('transform','translateX(-100%)');
 }catch(e){}
});

$(document).on('mouseover', '.component_text a', function(event) {
  $(this).attr('style','color:'+$(this).find('h1,h2,h3,h4,h5,h6,font,span').css('color')+'!important;');
});

/* code for testimonial */
function set_flickity() {
  try {
    if ($('.main-gallery').length > 0) {
      /* code for set carosoul */
      $('.main-gallery').each(function(index, el) {
        var carousel_main  =   $(this).attr('style');
        var image_style    =   $(this).find('.testimonial .testimonial-avatar').attr('style'); 
        var quotes_style   =   $(this).find('.testimonial .testimonial-quote').attr('style'); 
        var auther_style   =   $(this).find('.testimonial .testimonial-author').attr('style'); 
        image_style        =   image_style == undefined ? '' : 'style="'+image_style+'"';
        quotes_style       =   quotes_style == undefined ? '' : 'style="'+quotes_style+'"';
        auther_style       =   auther_style == undefined ? '' : 'style="'+auther_style+'"';
        carousel_main      =   carousel_main == undefined ? '' : 'style="'+carousel_main+'"';
        var htmlCarosoul   =   '';
        $(this).find('.gallery-cell').each(function(index, el) {
         htmlCarosoul +=  `<div class="gallery-cell">
         <div class="testimonial">
         <img `+image_style+` class="testimonial-avatar" src="`+$(this).find('.testimonial-avatar').attr('src')+`">
         <q `+quotes_style+` class="testimonial-quote">`+$(this).find('.testimonial-quote').html()+`</q>
         <span `+auther_style+` class="testimonial-author">`+$(this).find('.testimonial-author').html()+`</span>
         </div>
         </div>`;
       });
        var $currCaros =  $(this).closest('.canvas-element');
        htmlCarosoul = '<div class="main-gallery" '+carousel_main+'>'+htmlCarosoul+'</div>';
        $currCaros.html(htmlCarosoul);
      });
      /* end code for set carosoul */
      $('.main-gallery').each(function(index, el) {
        var flkty = new Flickity($(this)[0], {
          cellAlign: 'left',
          contain: true,
          wrapAround: true,
          draggable: true,
          prevNextButtons: false,
          autoPlay: true
        });
      });
      setTimeout(function(){
        window.dispatchEvent(new Event('resize'));
        if ($(window).width()  <= 992) {
          // $('.canvas-carousel .flickity-viewport').attr('style','height:auto!important;touch-action:pan-y;');
        }
      },2000);
    }
  }catch(e){}
}

if($('.canvas-carousel').length > 0) { 
  set_flickity(); 
}

/* end code for testimonial */

/**** code for navbar  ****/
if($('.canvas-navbar').length > 0) {
  try{
        // Responsive Toggle Navigation =============================================
        var menuIcon = document.querySelector('.menuIcon');
        var nav      = document.querySelector('.overlay-menu');
        menuIcon.addEventListener('click', function() {
          if (nav.style.transform != 'translateX(0%)') {
            nav.style.transform   = 'translateX(0%)';
            nav.style.transition  = 'transform 0.2s ease-out';
          } else { 
            nav.style.transform   = 'translateX(-100%)';
            nav.style.transition  = 'transform 0.2s ease-out';
          }
          $('.overlay-menu').find('ul').show();
        });
        // Toggle Menu Icon ========================================

        $(document).on('click', '.menuIcon', function(event){
          if($(this).hasClass('toggle') == true) {
            $(this).removeClass('toggle');
          }else{
            $(this).addClass('toggle');
          }
          var scroll   =  $(window).scrollTop();
          $('.overlay-menu').css('top',scroll+'px');
        });

      }catch(e){}

    }
    /**** code for navbar  ****/
    function getTimeZone() {
      var offset = new Date().getTimezoneOffset(),
      o = Math.abs(offset);
      return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
    }
    function validateEmail(sEmail) {
      var filter = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (filter.test(sEmail)) {
        return true;
      }
      else {
        return false;
      }
    }


    /*#########  start code for add registrant #######*/
    $(document).on('click','.add-to-list-btn',function(e){
      e.preventDefault();
      var $formj  =  $(this).closest(".canvas-element");
      var j       =  $formj.attr("k");
      var email   = $formj.find('input[name="email"]').val();
      var name    =  '';
      if ($formj.find('input[name="full-name"]').length > 0) {
        name      =  $formj.find('input[name="full-name"]').val();
      }else{
        name      =  $formj.find('input[name="first-name"]').val();
      }
      //  var name    = $formj.find('input[name="full-name"]').val();
      var phoneNo = $formj.find('input[name="phone"]').val();
      if (email == '' || email == undefined || email == null) {
        $formj.find('input[name="email"]').focus();
        return false;
      }
      if (!validateEmail(email)) {
        send_message('error','Oops! Invalid Email.');
        $formj.find('input[name="email"]').focus();
        return false;
      }
      email   = email.toLowerCase();
      var otherJson = "";
      $formj.find('input').each(function(index, valueI){
        var rName = $(this).attr('name');
        if(rName != undefined && rName != ''){
          otherJson += '{"'+rName.replace('reg-','')+'":"'+$(this).val()+'"},';
        }
      });
      if(otherJson != "") {
        otherJson = otherJson.substring(0,(otherJson.length-1));
        otherJson = JSON.stringify(otherJson);
      }
      if (name == undefined) {name  = '';}
      if (phoneNo == undefined) {phoneNo   = '';}
      var json_data     = '{"name":"'+name+'","email":"'+email+'","phone":"'+phoneNo+'","other":'+otherJson+',"j":"'+j+'"}';
      sv(json_data,$formj);

    });


    $(document).on('click','.get-custom-leads',function(e){
      e.preventDefault();
      var $formj  =  $(this).closest(".canvas-element");
      var j       =  $formj.attr("k");
      var email   =  $formj.find('input[name="email"]').val();
      var name    =  '';
      
      var phoneNo = $formj.find('input[name="phone"]').val();
      if(email == '' || email == undefined || email == null) {
        send_message('error','Oops! Invalid Email.');
        $formj.find('input[name="email"]').focus();return false;
      }

      if ($.trim($formj.find('input[name="full-name"]').val()) == '') {
        if($formj.find('input[name="full-name"]').attr('required') == 'required'){
          send_message('error','Oops! Name fileld is required.');
          $formj.find('input[name="full-name"]').focus();return false;
        }
      }

      if ($.trim($formj.find('input[name="first-name"]').val()) == '') {
        if($formj.find('input[name="first-name"]').attr('required') == 'required'){
          send_message('error','Oops! Name fileld is required');
          $formj.find('input[name="first-name"]').focus();return false;
        }
      }

      if ($.trim($formj.find('input[name="phone"]').val()) == '') {
        if($formj.find('input[name="phone"]').attr('required') == 'required'){
          send_message('error','Oops! Phone No. fileld is required');
          $formj.find('input[name="phone"]').focus();return false;
        }
      }

      if($formj.find('input[name="full-name"]').length > 0) {
        name      =  $formj.find('input[name="full-name"]').val();
      }else{
        name      =  $formj.find('input[name="first-name"]').val();
      }
      //  var name    = $formj.find('input[name="full-name"]').val();
      var phoneNo = $formj.find('input[name="phone"]').val();
      if (email == '' || email == undefined || email == null) {
        send_message('error','Oops! Invalid Email.');
        $formj.find('input[name="email"]').focus();return false;
      }

      if (!validateEmail(email)) {
        send_message('error','Oops! Invalid Email.');
        $formj.find('input[name="email"]').focus();return false;
      }

      email   = email.toLowerCase();
      var otherJson = "";
      $formj.find('input').each(function(index, valueI){
        var rName = $(this).attr('name');
        if (rName != '' && rName!= null && rName!= undefined) {
          otherJson += '{"'+rName.replace('reg-','')+'":"'+$(this).val()+'"},';
        }
      });
      if(otherJson != "") {
        otherJson = otherJson.substring(0,(otherJson.length-1));
        otherJson = JSON.stringify(otherJson);
      }
      if (name == undefined) {name  = '';}
      if (phoneNo == undefined){phoneNo   = '';}
      var json_data     = '{"name":"'+name+'","email":"'+email+'","phone":"'+phoneNo+'","other":'+otherJson+',"j":"'+j+'"}';
      sv_xfunnels(json_data,$formj);
    });





    /*** ------- document code for ------***/

    $(document).on('click','.get-leads-by-optin',function(e){
      e.preventDefault();

      var $formj  =  $(this).closest(".optin-from-div-xfunnels");
      var j       =  $formj.attr("k");
      var cmp_id =  $formj.attr("component-id");
      var email   =  $formj.find('input[name="email"]').val();
      var name    =  '';
      
      var phoneNo = $formj.find('input[name="phone"]').val();
      if(email == '' || email == undefined || email == null) {
        send_message('error','Oops! Invalid Email.');
        $formj.find('input[name="email"]').focus();return false;
      }

      if ($.trim($formj.find('input[name="full-name"]').val()) == '') {
        if($formj.find('input[name="full-name"]').attr('required') == 'required'){
          send_message('error','Oops! Name fileld is required.');
          $formj.find('input[name="full-name"]').focus();return false;
        }
      }

      if ($.trim($formj.find('input[name="first-name"]').val()) == '') {
        if($formj.find('input[name="first-name"]').attr('required') == 'required'){
          send_message('error','Oops! Name fileld is required');
          $formj.find('input[name="first-name"]').focus();return false;
        }
      }

      if ($.trim($formj.find('input[name="phone"]').val()) == '') {
        if($formj.find('input[name="phone"]').attr('required') == 'required'){
          send_message('error','Oops! Phone No. fileld is required');
          $formj.find('input[name="phone"]').focus();return false;
        }
      }

      if($formj.find('input[name="full-name"]').length > 0) {
        name      =  $formj.find('input[name="full-name"]').val();
      }else{
        name      =  $formj.find('input[name="first-name"]').val();
      }

      var phoneNo = $formj.find('input[name="phone"]').val();
      if(email == '' || email == undefined || email == null) {
        send_message('error','Oops! Invalid Email.');
        $formj.find('input[name="email"]').focus();return false;
      }

      if(!validateEmail(email)) {
        send_message('error','Oops! Invalid Email.');
        $formj.find('input[name="email"]').focus();return false;
      }

      email         = email.toLowerCase();
      var otherJson = "";
      $formj.find('input').each(function(index, valueI){
        var rName = $(this).attr('name');
        if (rName != '' && rName!= null && rName!= undefined) {
          otherJson += '{"'+rName.replace('reg-','')+'":"'+$(this).val()+'"},';
        }
      });
      if(otherJson != "") {
        otherJson = otherJson.substring(0,(otherJson.length-1));
        otherJson = JSON.stringify(otherJson);
      }
      if (name == undefined) {name  = '';}
      if (phoneNo == undefined){phoneNo   = '';}
      var json_data     = '{"name":"'+name+'","email":"'+email+'","phone":"'+phoneNo+'","component_id":"'+cmp_id+'","other":'+otherJson+',"j":"'+j+'"}';
      sv_xfunnels_import(json_data,$formj);
    });


    function sv_xfunnels_import(json_data,$formj){

      $('.get-leads-by-optin').addClass('is-disabled');
      $.ajax({
        url: site_url + 'funnels/optinsData/addleads',
        type: 'POST',
        data: {data : json_data,p:p_page},
      }).done(function(response) {
        var jsonData = $.parseJSON(response);
        if (jsonData.status == 'true' || jsonData.status == true) {
          try {
            var response = $.parseJSON(response);
            if (response.status == 'false') {
              send_message('error',response.message);
              return false;
            }
          }catch(e){}
          send_message('success', 'Submitted!');
          $formj.find('input').val('');
          if ($formj.attr('r-t') == undefined || $formj.attr('r-t') == '' || $formj.attr('r-t') == null) {
            return true;
          }else if(atob($formj.attr('r-t')) == 'none'){
            return true;
          }else if($.trim(atob($formj.attr('r-t'))) == 'url') {
            setTimeout(function(){
              window.location.href = atob($formj.attr('r-u'));
            },1500);
          }else if($.trim(atob($formj.attr('r-t'))) == 'next-funnel-page')  {
            redirect_next_page();
          }
        }else{
         send_message('error',jsonData.message);
       }
     }).fail(function() {
      $('.get-leads-by-optin').removeClass('is-disabled');
      send_message('success', internal_error);
    });
   }

   /*** ------- // end code for  -------***/


   /*end code for settings*/
   function redirect_next_page() {
    $.ajax({
      url: site_url+'funnels/analytics/next_page',
      type: 'POST',
      data: {n: btoa(p_page)},
    }).done(function(response) {
      var jsonData  =   $.parseJSON(response);
      if (jsonData.status == 'true') {
        window.location.href = jsonData.url;
      }
    });
  }

  function sv(json_data,$formj){

    $('.add-to-list-btn').addClass('is-disabled');
    $.ajax({
      url: site_url+'funnels/optinsData/add',
      type: 'POST',
      data: {data : json_data,p:p_page},
    }).done(function(response){
      $('.add-to-list-btn').removeClass('is-disabled');
      try{
        var response = $.parseJSON(response);
        if (response.status == 'false') {
          send_message('error',response.message);
          return false;
        }
      }catch(e){}
      send_message('success', 'Submitted!');
      $formj.find('input').val('');
      if($formj.attr('r-t') == undefined || $formj.attr('r-t') == '' || $formj.attr('r-t') == null) {
        return true;
      }else if(atob($formj.attr('r-t')) == 'none'){
        return true;
      }else if($.trim(atob($formj.attr('r-t'))) == 'url'){
        setTimeout(function(){
          window.location.href = atob($formj.attr('r-u'));
        },1500);
      }else if($.trim(atob($formj.attr('r-t'))) == 'next-funnel-page'){
        redirect_next_page();
      }
    }).fail(function(){
      $('.add-to-list-btn').removeClass('is-disabled');
      send_message('success', internal_error);
    });

  }


  function sv_xfunnels(json_data,$formj){

    $('.get-custom-leads').addClass('is-disabled');
    $.ajax({
      url: site_url + 'funnels/optinsData/addxfunnels',
      type: 'POST',
      data: {data : json_data,p:p_page},
    }).done(function(response) {
      var jsonData = $.parseJSON(response);
      if (jsonData.status == 'true' || jsonData.status == true) {
        $('.get-custom-leads').removeClass('is-disabled');
        try {
          var response = $.parseJSON(response);
          if (response.status == 'false') {
            send_message('error',response.message);
            return false;
          }
        }catch(e){}
        send_message('success', 'Submitted!');
        $formj.find('input').val('');
        if ($formj.attr('r-t') == undefined || $formj.attr('r-t') == '' || $formj.attr('r-t') == null) {
          return true;
        }else if(atob($formj.attr('r-t')) == 'none'){
          return true;
        }else if($.trim(atob($formj.attr('r-t'))) == 'url') {
          setTimeout(function(){
            window.location.href = atob($formj.attr('r-u'));
          },1500);
        } else if($.trim(atob($formj.attr('r-t'))) == 'next-funnel-page')  {
          redirect_next_page();
        }
      }else{
       send_message('error',jsonData.message);
     }
   }).fail(function() {
    $('.get-custom-leads').removeClass('is-disabled');
    send_message('success', internal_error);
  });
 }
 /*######### end code for add registrant ###########*/


 setTimeout(function() {
  if ($('.component_video').length > 0) { 
    $('.component_video').each(function(index, el) {  
      var urlSrc = '';
      var urlProp = $(this).find('iframe').attr('attr-prop');
      var src =  $(this).find('iframe').attr('src');
      if(urlProp!=undefined && urlProp!='' && urlProp!=null){
        urlSrc = src+urlProp;
      }else{
        urlSrc = src;
      }
      $(this).find('iframe').attr('src', urlSrc); 
    });
  }
},1000);

 /** code for downsell**/
  /* $(document).on('mouseleave', 'body', function(event) {
    if(dn_sell_data != '') {
     var htmlBtn    =   `<a href="`+site_url+`funnel/view/`+dn_sell_data+`">Click here for downsell</a>`;
     $('#myModal_downsell').find('.modal-body center').html(htmlBtn);
     try{
       $('#myModal_downsell').modal('show');
     }catch(e){
      console.log(e);
     }
    }
  }); */

  /** end code for downsell **/
      // new code for checkout page 
      $(document).on('click', '.checkout', function(event) {
        var $thisBtn      =     $(this);
        var i = $(this).attr('ckt');
        if (i == '' || i == undefined || i == null) {
          return false;
        }
        $thisBtn.addClass('is-disabled');
        setTimeout(function(){
          $thisBtn.removeClass('is-disabled');
          window.location.href = site_url+'checkoutnew/p/'+i;
        },1000);
      });
      $(document).on('click', '.membership-btn', function(event) {
        var $thisBtn       =     $(this);
        var member_url_red =     '';
        var i              =     $thisBtn.attr('mbr');
        var itp            =     $thisBtn.attr('mbr-tp');
        var strp           =     $thisBtn.attr('mbr-tp-s');
        var ppl            =     $thisBtn.attr('mbr-tp-p'); 
        if(strp == undefined  &&  ppl == undefined) {
         if($thisBtn.attr('mbr-tp') == '' || $thisBtn.attr('mbr-tp') == undefined) {
           return false;
         }
         member_url_red  =     site_url+'checkoutnew/member/'+i+'/'+itp;
       }else{

        if(strp == '' && ppl == ''){return false;}
        if(strp == undefined && ppl == undefined){return false;}
        var member_url_red = '';
        if($.trim(strp) !=''  &&  $.trim(ppl) != ''){
          member_url_red = site_url+'checkoutnew/member/'+i+'/'+ppl+'/'+strp;
        }else if($.trim(strp) != '') {
          member_url_red = site_url+'checkoutnew/member/'+i+'/'+strp+'/membercheckout';
        }else if($.trim(ppl) != '') {
          member_url_red = site_url+'checkoutnew/member/'+i+'/'+ppl+'/membercheckout';
        }
        if (($(this).attr('mbr-lp') != '' && $(this).attr('mbr-lp') != undefined) && ($(this).attr('mbr-lpt') != '' && $(this).attr('mbr-lpt') != undefined)) {
          member_url_red  =  member_url_red+'?mbrlp='+$(this).attr('mbr-lp')+'&mbrlpt='+$(this).attr('mbr-lpt');
        }else if($(this).attr('mbr-lp') != '' && $(this).attr('mbr-lp') != undefined) {
          member_url_red  =  member_url_red+'?mbrlp='+$(this).attr('mbr-lp');
        }else if($(this).attr('mbr-lpt') != '' && $(this).attr('mbr-lpt') != undefined) {
          member_url_red  =  member_url_red+'?mbrlpt='+$(this).attr('mbr-lpt');
        }
      }
      if (i == ''  || i == undefined || i == null || itp == '') {return false;}
      $thisBtn.addClass('is-disabled');
      setTimeout(function(){
        $thisBtn.removeClass('is-disabled');
        window.location.href = member_url_red;
      },1000);
    });
      if ($('.obj-fb-comments').length > 0) {
        $('.obj-fb-comments').show();
        $('.obj-fb-comments').prev().remove();
        $('.obj-fb-comments').find('iframe, span, .fb_iframe_widget').css({'width':'100%','height':'100vh','left':0,'overflow':'visible'});
        $('.obj-fb-comments').find('._4k-6').css({'overflow':'auto','height':'100vh'});
      }
      
    

     // code for  cnt us
      if($('.btn-contact-us-sub').length > 0){  
        $(document).on('click', '.btn-contact-us-sub', function(event){
         var $formj      =  $(this).closest(".contact-us-xfunnels");
         var emSub       =  $(this).attr('es');
         var emToo       =  $(this).attr('et');
         var emDesc      =  $(this).attr('ed');
         var userEmail   =  $formj.find('input[name="email"]').val();
         var $nameElm    =  '';
         if($formj.find('input[name="full-name"]').length > 0) {
          $nameElm      =   $formj.find('input[name="full-name"]');
        }else{
          $nameElm      =   $formj.find('input[name="first-name"]');
        }
        var username    =   $nameElm.val();
        var phoneNo     =   $formj.find('input[name="phone"]').val();
        var txtMsg      =   $formj.find('textarea[name="text-message"]').val();
        
        if($nameElm.attr('required') == 'required'){
          if(username == '' || username == undefined || username == null) {
            send_message('error','Name field is required.');
            $nameElm.focus();
            return false;
          }
        }
        
        if ($formj.find('input[name="email"]').length > 0) {
          if ($formj.find('input[name="email"]').val() == '') {
            $formj.find('input[name="email"]').focus();
            send_message('error','Email field is required.');
            return false;
          }
        }

        if(userEmail != '' && userEmail != undefined && userEmail != null) {
          if (!validateEmail(userEmail)) {
            send_message('error','Oops! Invalid Email.');
            $formj.find('input[name="email"]').focus();
            return false;
          }
          userEmail         =   userEmail.toLowerCase();
        }else{
          userEmail =  '';
        }

        
        if($formj.find('input[name="phone"]').attr('required') == 'required'){
          if(phoneNo == '' || phoneNo == undefined || phoneNo == null) {
            $formj.find('input[name="phone"]').focus();
            send_message('error','Phone No. field is required.');
            return false;
          }
        }

        if($formj.find('input[name="text-message"]').length > 0){
          if (txtMsg == '' || txtMsg == undefined || txtMsg == '') {
          if ($formj.find('textarea[name="text-message"]').attr('required') == 'required') {
              $formj.find('textarea[name="text-message"]').focus();
              send_message('error','Text Message field is required.');
              return false;
            }
          }
        }

        if(txtMsg == undefined || txtMsg == '') {
          txtMsg  = '';
        }

        var otherJson     =   "";
        $formj.find('input').each(function(index, valueI){
          var rName = $(this).attr('name');
          if (rName != '' && rName!= null && rName!= undefined) {
            otherJson += '{"'+rName.replace('reg-','')+'":"'+$(this).val()+'"},';
          }
        });

        if(otherJson != ""){
          otherJson = otherJson.substring(0,(otherJson.length-1));
          otherJson = JSON.stringify(otherJson);
        }

        if(username == undefined){username  = '';}
        if(phoneNo == undefined){phoneNo = '';}
        var json_data     = '{"name":"'+username+'","email":"'+userEmail+'","phone":"'+phoneNo+'","text_message":"'+txtMsg+'","other":'+otherJson+'}';
        $(this).addClass('is-disabled');
        $.ajax({
          url: site_url+'funnel/cntus',
          type: 'POST',
          data: {param1:json_data,page_id:p_page,doc_id:documentId,emSub:emSub,emToo:emToo,emDesc:emDesc},
          context: this,
        }).done(function(response){
          $(this).removeClass('is-disabled');
          var jsonData    =   $.parseJSON(response);
          if(jsonData.status == 'true'){
            $formj[0].reset();
            send_message('success',jsonData.message);
          }else{
            send_message('error',jsonData.message);
          }
        });
      });
      }
  //  end code for cnt us
