(function( $ ){
  
  var methods = {
    init : function(options) {
      var settings = $.extend({
        'border-outer': '1px solid black',
        'border-inner': '0',
        'font-color': 'black',
        'background-color': 'grey',
        'background-color-hover': 'blue',
        'header': '',
        'items': ''
      }, options);
      
      return this.each(function(){
        $(document).click(function(event) {
          $('.contextmenu').hide();
        });
        
        var $this = $(this);
        console.log('context menu initialising...');
        
        if(settings['items']) {
          var menu = '<ul class="contextmenu" style="';
          menu += 'border: '+settings['border-outer']+'; ';
          menu += 'color: '+settings['font-color']+'; ';
          menu += 'background-color: '+settings['background-color']+'; ';
          menu +='">';
          $.each(settings['items'], function(index, value) {
            console.log('item: '+value['name']+', action: '+value['action']);
            menu += "<li><a href='#' onclick='javascript:void(0); "+value['action']+";'>"+value['name']+"</a></li>";
          })
          menu += "</ul>";
          
          $this.append(menu);
          
          $this.bind('contextmenu', function(event) {
            event.preventDefault();
            event.stopPropagation();
            console.log('context menu opened');
            $this.find('.contextmenu')
              .show()
              .offset({top: event.pageY, left: event.pageX})
              .click(function(event) {
                event.stopPropagation();
                event.stopPropagation();
              })
              .find('li').mouseenter(function() { // Handlers for hover behavior
                $(this).closest('li').css('background-color', settings['background-color-hover']);
              }).mouseleave(function() {
                $(this).closest('li').css('background-color', '');
              }).click(function() {
                $(this).find('a').click();
              });
          });
          
          console.log('done');
        } else {
          console.log('no menu items');
        }
      });
    }
  };
  
  $.fn.contextmenu = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  
  };
  
})( jQuery );