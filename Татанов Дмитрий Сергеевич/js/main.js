$('.form-validate .button_submit').on('click', function () {
    var form = $('.form-validate');
    var field = [];
    form.find('input[data-validate]').each(function () {
      field.push('input[data-validate]');
      var value = $(this).val(),
          line = $(this).closest('.form__line');
      for(var i=0;i<field.length;i++) {
        if( !value ) {
          line.addClass('form__line-required');
          setTimeout(function() {
            line.removeClass('form__line-required')
          }.bind(this),2000);
          event.preventDefault();
        }
        else{
          $('.form-validate').css('display', 'none');
          $('#map').css('display', 'block');
        }
      }
    });
    $city = $('#city').val();
    $street = $('#street').val();
    $house = $('#house').val();
    $adress_res = $city+' '+$street+' '+$house;
    ymaps.ready(init);
    function init(){
      var myMap;
      var coord = $adress_res, // задаем все переменные иполучаем адрес 
          adress,
          myPlacemark;
          ymaps.geocode(coord).then(function (res) { // кодируем полученный из coords адрес в коордитаны 
            adress = res.geoObjects.get(0).geometry.getCoordinates();
            myMap = new ymaps.Map("map", { // создаем новую карту с центром записанным в переменныу адрес 
              center: adress,
              zoom: 14
            });
            // проводим обратное геокодирование и ищем 3 ближайшие станции метро 
            ymaps.geocode(myMap.getCenter(), {
             kind: 'district',
             results: 1
            }).then(function (met) {
                    met.geoObjects.options.set('preset', 'islands#redCircleIcon');
                    var metro = met.geoObjects;
                          var res = '';
                          met.geoObjects.each(function (obj) {
                            res += obj.properties.get('name');
                          });
                          alert(res);
                      });

            // ставим балун который обозначает точку нашего адреса на карте 
            myPlacemark = new ymaps.Placemark(adress);
            myMap.geoObjects.add(myPlacemark);
          },
          function (err) {});
    }
});
