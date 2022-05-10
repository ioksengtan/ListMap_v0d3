function zoomto(loc = {'lat': -34.003646,'lng': 18.469909}, zoom = 16){
  //var loc = {'lat': -34.003646,'lng': 18.469909};
  console.log('zoomto');
  mymap.flyTo(loc, 16, {
      animate: true,
      duration: 0.3
  })
}
function zoom_test(){
  zoomto(loc = {'lat': 22.623925,'lng': 120.3547222}, zoom = 16);
  map2.flyTo({'lat': 1886.2225782104404,'lng': 1847.8586685085809}, -1, {
      animate: true,
      duration: 0.3
  });
}
StoriesDict = {}
$(document).ready(

    function() {

        const i18n = new VueI18n({
            locale: 'en',
            messages,
        })
        new Vue({
            i18n
        }).$mount('#dropdown')


    });
