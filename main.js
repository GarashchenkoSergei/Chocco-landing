// menu popup function
const navMenuPopup = document.querySelector('.menu__popup');
const navMenu = document.querySelector('.nav');
const wrapper = document.querySelector('.wrapper')

function trigerNavMenuPopup() {
  navMenuPopup.classList.toggle('active');
  navMenu.classList.toggle('active');
  wrapper.classList.toggle('active');
}

navMenuPopup.addEventListener('click', function () {
  trigerNavMenuPopup();
});

navMenu.addEventListener('click', function () {
  trigerNavMenuPopup();
});

// accordeon staff

const workersTeam = document.querySelector('.team__workers');
const workersDescription = document.querySelectorAll('.worker-desc__title');

workersTeam.addEventListener('click', function (e) {

  if (e.target.classList.contains('worker-desc__title_active')) {
    e.target.classList.remove('worker-desc__title_active');
  } else
    if (e.target.classList.contains('worker-desc__title')) {
      for (let i = 0; i < workersDescription.length; i++) {
        workersDescription[i].classList.remove('worker-desc__title_active');
      }
      e.target.classList.toggle('worker-desc__title_active');
    }

});

// accordeon menu

const menu = document.querySelector('.menu__list');
const menuItem = document.querySelectorAll('.menu__subtitle');
const menuItemName = document.querySelectorAll('.menu__subtitle-name');

menu.addEventListener('click', function (e) {

  if (e.target.parentNode.classList.contains('menu__subtitle_active')) {
    e.target.parentNode.classList.remove('menu__subtitle_active');
  }
  else
    if (e.target.classList.contains('menu__subtitle-name')) {
      for (let i = 0; i < menuItem.length; i++) {
        menuItem[i].classList.remove('menu__subtitle_active');
      }
      e.target.parentNode.classList.toggle('menu__subtitle_active');
    }
});

//slider owl-carousel

const owl = $('.owl-carousel');
owl.owlCarousel({
  items: 1,
  loop: true,
  smartSpeed: 700
});
// Go to the next item
$('.slider-button_next').click(function () {
  owl.trigger('next.owl.carousel');
});
// Go to the previous item
$('.slider-button_prev').click(function () {
  // With optional speed parameter
  // Parameters has to be in square bracket '[]'
  owl.trigger('prev.owl.carousel');
});

// отправка данных с формы

const form = document.querySelector('.delivery-content__form');
const formPopup = document.querySelector('.formSend-popup');
const formPopupClose = document.querySelector('.formSend-popup__button');

form.onsubmit = function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  formData.append('to', 'garashchenkosergei@gmail.com');
  const request = new XMLHttpRequest();
  request.open('POST', 'https://webdev-api.loftschool.com/sendmail');
  request.send(formData);
  request.addEventListener('load', function () {
    const response = JSON.parse(request.response);
    if (response.status) {
      formPopup.classList.add('formSend-popup_active');
    }
  });
};

formPopupClose.addEventListener('click', function () {
  formPopup.classList.remove('formSend-popup_active');
});

//feedback
const buttons = document.querySelectorAll(".clients__item");
const reviews = document.querySelectorAll(".feedback-content__review");

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active");
    }
    button.classList.add("active");

    const curr = button.getAttribute("data-number");

    reviews.forEach(function (review) {
      review.style.display = "none";
      if (review.classList.contains('feedback-content__review_' + curr)) {
        review.style.display = "flex";
      }
    });
  })
});

// GoogleMap API
var map;

function initMap() {

  map = new google.maps.Map(document.getElementById('map__content'), {
    center: { lat: 55.757, lng: 37.58 },
    zoom: 14,
    gestureHandling: 'cooperative',
    // disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
  });

  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: './img/map/map_marker.png',
    });

    if (props.content) {
      var infowindow = new google.maps.InfoWindow({
        content: props.content,
      });

      marker.addListener('click', function () {
        infowindow.open(map, marker);
      });
    }
  }

  addMarker({
    coords: { lat: 55.757, lng: 37.58 },
    content: "ТДЦ 'Новинский'"
  });
  addMarker({
    coords: { lat: 55.743, lng: 37.58 },
    content: "Ружейный переулок 3"
  });
  addMarker({
    coords: { lat: 55.749, lng: 37.604 },
    content: "Большой Знаменский переулок 8/12 стр7"
  });
  addMarker({
    coords: { lat: 55.757, lng: 37.62 },
    content: "Театральная площадь 5"
  });
}