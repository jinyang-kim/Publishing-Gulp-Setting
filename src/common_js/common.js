
// Accordion
const accordion = () => {
  $('.accordion .accordion-lists .accordion-list .accordion-tit').click(function () {
    $(this).closest('.accordion-list').toggleClass('on').siblings().removeClass('on')
    $(this).closest('.accordion-list').find('.accordion-content').slideToggle(300).parents('.accordion-list').siblings().find('.accordion-content').slideUp(300);
  
    return false;
  });
}

// LayerPopUp
const layerPopup = () => {
  // 레이어 팝업 변수
  const $body = document.querySelector('body');
  const $layerPopup = document.querySelector('.layer');
  const $btnLayerPopupClose = document.querySelector('.layer .close-popup');
  const $btnLayerPopupTodayHide = document.querySelector('.layer .close-oneday');

  const nowDate = new Date();

  // 지정한 날짜만큼 팝업 띄우기
  popupViewDate();

  function popupViewDate() {
    // var d = popupEndDate.getAttribute('data-expired').split(/[\s,\-:]+/);
    const d = $('[data-expired]').attr('data-expired').split(/[\s,\-:]+/);
    const expired_date = new Date(d[0], d[1] - 1, d[2], d[3] || 24, d[4] || 0);

    // 오늘이 설정한 expired date 전이면 팝업창 보여지게
    if(nowDate < expired_date) {
      // 레이어팝업 노출
      layerPopupShow();
    }
    else {
      return false;
    }
  }

  // 24시간 기준 쿠키 설정
  function setCookie(cname, cvalue, exdays) {
    const todayDate = new Date();
    todayDate.setTime(todayDate.getTime() + (exdays * 24 * 60 * 60 * 1000));    
    
    // UTC기준의 시간에 exdays인자로 받은 값에 의해서 cookie 설정
    var expires = "expires=" + todayDate.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  // 레이업팝업 닫기 클릭 시 class 및 마크업 제거 처리
  function layerClose() {
    $layerPopup.style.display = 'none';
    $layerPopup.classList.remove('in');
    $body.classList.remove('popup-open');
    $('body .popup-backdrop').remove();
  }

  // 레이어팝업 닫기 버튼 클릭
  $btnLayerPopupClose.addEventListener('click', function(){
    layerPopupHide(0);
  });

  // 레이어팝업 오늘 하루 보지 않기 버튼 클릭
  $btnLayerPopupTodayHide.addEventListener('click', function(){
    layerPopupHide(1);
  });

  // 레이어팝업 노출
  function layerPopupShow(){
    const cookiedata = document.cookie;

    if(cookiedata.indexOf("close=Y") < 0) {
      $layerPopup.style.display = 'block';
      $layerPopup.classList.add('in');
      $body.classList.add('popup-open');
      $('body').append('<div class="popup-backdrop"></div>');
    } else {
      return false;
    }
  }

  // 레이어팝업 비노출
  function layerPopupHide(state) {
    layerClose();

    //오늘하루보지않기 버튼을 누른 경우
    if(state === 1) {
      setCookie("close","Y", 1);
    }
  }
}

// Tabs
const tabs = () => {
  //$('.tab-content').hide(); // tab 전체 콘텐츠 숨김처리 (초기화)
  $('.tab-content').each(function(i, e){
    $(this).hide();
  });
  $('.tab-menu ul li').removeClass('acitve'); // tab 메뉴 active class 초기화 처리
  $('.tab-menu ul li:first-child').addClass('active').show(); // 첫 번째 탭 활성화 처리
  $('.tab-content:first-child').show();

  $(document).on('click', '.tab-menu ul li', function(){
    $('.tab-menu ul li').removeClass('acitve'); // tab 메뉴 active class 전체 제거 처리
    $(this).addClass('active'); // tab 메뉴 클릭한 menu active 처리
    $('.tab-content').hide(); // tab 전체 콘텐츠 숨김처리

    const activeTab = $(this).find('a').attr('data-tabs'); // 활성화할 tab contents id 정보 확인
    $(activeTab).fadeIn();

    return false;
  });
}