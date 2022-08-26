
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;

//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init () {
  var myMapTemp = new ymaps.Map("map-yandex", {
    center: [55.749781,37.537899], // координаты центра на карте
    zoom: 16, // коэффициент приближения карты
    controls: ['zoomControl', 'fullscreenControl', 'geolocationControl', 'routeButtonControl', 'typeSelector'] // выбираем только те функции, которые необходимы при использовании
  });

  /*if ($(window).width() >= 768) {
    var position = myMapTemp.getGlobalPixelCenter();
    myMapTemp.setGlobalPixelCenter([position[0] + 200, position[1]]);
  }*/

  var myPlacemarkTemp = new ymaps.Placemark([55.749781,37.537899], {
    balloonContent: "Здесь может быть ваш адрес",
  }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#imageWithContent',
      // Своё изображение иконки метки.
      iconImageHref: '/img/icons/map-marker.png',
      // Размеры метки.
      iconImageSize: [56,83],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-40, -60]
    });
  myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

  // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);

  var searchControl = new ymaps.control.SearchControl({
    options: {
    // Будет производиться поиск по топонимам и организациям.
    provider: 'yandex#search'
  }
});
  myMapTemp.controls.add(searchControl);

  var trafficControl = new ymaps.control.TrafficControl({ state: {
            // Отображаются пробки "Сейчас".
            providerKey: 'traffic#actual',
            // Начинаем сразу показывать пробки на карте.            
          }});
    // Добавим контрол на карту.
    myMapTemp.controls.add(trafficControl);
    // Получим ссылку на провайдер пробок "Сейчас" и включим показ инфоточек.
    trafficControl.getProvider('traffic#actual').state.set('infoLayerShown', true);    
  }

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}

function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
        ) {
        return layer[k];
    }
  }
}
return null;
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  var script = document.createElement("script");

  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
        script.readyState == "complete"){
        script.onreadystatechange = null;
      callback();
    }
  };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

var pageContacts = $('.page-contacts');
var windowWidth = $(window).width();

if (pageContacts.length > 0 && windowWidth < 768) {
  var ymap = function() {
    $('#view-map').on('click', function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

      // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
      check_if_load = true; 

    // Загружаем API Яндекс.Карт
    loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
           ymaps.load(init);
         });                
  }
}
);  
  }

  $(function() {

  //Запускаем основную функцию
  ymap();

});
} else {

// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function() {
  $('.contacts__map').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

	  	// Чтобы не было повторной загрузки карты, мы изменяем значение переменной
      check_if_load = true; 

		// Загружаем API Яндекс.Карт
    loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
           ymaps.load(init);
         });                
  }
}
);  
}

$(function() {

  //Запускаем основную функцию
  ymap();

});
}