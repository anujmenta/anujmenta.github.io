// $(document).ready(function(){
//  	json_call_lunch(location_id);
//  	json_call_snacks(location_id);
// });

function json_call_lunch(location_id){
   $.ajax({
   	type:'GET',
    url: 'http://www.hungerbox.in/get_mobile.php',
    data: {'item':'get_lunch','location':location_id},
    dataType: 'json/application',
    success: function (json){
    	json1 = json;
    },
	});
}


function json_call_snacks(location_id){
   $.ajax({
   	type:'GET',
    url: 'http://www.hungerbox.in/get_mobile.php',
    data: {'item':'get_snacks','location':location_id},
    dataType: 'json/application',
    success: function (json){
    	json2 = json;
    },
	});
}

hp_current = 1;

order_cart = 0;

area = '';

order_cart_items = [];

var cart = {};
// order_quantity = 0;
var json2 = '';
var json1 = {"num":2,"menus":[{"name":"Veg Meal","id":731,"items":"Mixed vegetables in sweet and sour gravy and dry chilli mushroom served with schezwan noodles","price":90,"discount":0,"vendor":"Swaad","quantity":9,"is_veg":1,"is_premium":0},{"name":"Non Veg Meal","id":732,"items":"NA","price":100,"discount":0,"vendor":"Swaad","quantity":10,"is_veg":0,"is_premium":0}],"dt":"Friday, 03-07-2015"};
var json_locations = [{"drop_point":"Bellandur","location_id":63},{"drop_point":"BTM Layout","location_id":64},{"drop_point":"Domlur","location_id":59},{"drop_point":"HSR layout","location_id":62},{"drop_point":"Indiranagar","location_id":61},{"drop_point":"Koramangala","location_id":60}]
function menupopulater(json, type){
	if (type=='lunch'){
		$('#menu_lunch').css('background-color', 'white');
		$('#menu_lunch').css('color', 'black');
		$('#menu_snacks').css('background-color', '');
		$('#menu_snacks').css('color', 'white');	
	}
	else{
		$('#menu_snacks').css('background-color', 'white');
		$('#menu_snacks').css('color', 'black');
		$('#menu_lunch').css('background-color', '');
		$('#menu_lunch').css('color', 'white');	
	}
	$('#menu_list_wrapper').empty();
	var num = json.num;
	var menuitems = json.menus;
	var master = document.getElementById('menu_list_wrapper');
	for (var i=0; i<num; i++){
		cart[menuitems[i].id] = 0;
		var menucard = document.createElement('div');
		menucard.className = 'menu_item';
		var img = document.createElement('img');
		var img_lcl = menuitems[i].name.toLowerCase().replace(/ /g, '_');

		var div_img = document.createElement('div');
		div_img.className = ('menu_item_image');
		div_img.style.backgroundImage = 'url(http://www.hungerbox.in/img/'+img_lcl+'.jpg)';
		menucard.appendChild(div_img);
		// img.src = 'http://www.hungerbox.in/img/'+img_lcl+'.jpg';
		// img.className = 'menu_item_image';
		// menucard.appendChild(img);
		
		// var image_div = document.getElementsByClassName('menu_item_image');
		var vegtoggle = document.createElement('img');
		if (menuitems[i].is_veg==1){
			console.log('Veg');
			var vegtoggle_src = 'images/veg-icon.png';
		}
		else{
			var vegtoggle_src = 'images/non-veg-icon.png';
		}
		vegtoggle.src = vegtoggle_src;
		vegtoggle.className = 'menu_item_vegtoggle';
		div_img.appendChild(vegtoggle);


		var title = document.createElement('p');
		title.className = 'menu_item_title';
		title.innerHTML = menuitems[i].name+'<hr>';
		
		var price = document.createElement('p');
		price.innerHTML = 'Rs. ' + menuitems[i].price;
		price.className = 'menu_item_price';

		var vendor = document.createElement('p');
		vendor.className = 'menu_item_vendor'
		vendor.innerHTML = menuitems[i].vendor;

		var items = document.createElement('p');
		items.className = 'menu_item_desc';
		items.innerHTML = menuitems[i].items;

		var counter = document.createElement('div');
		counter.className = 'menu_item_counter';
		// var minus = document.createElement('div');
		// minus.setAttribute('id', 'menu_item_minus');
		// minus.style.backgroundImage = 'url(images/minus.png)';
		// // var min = document.createElement('p');
		// // min.innerHTML = '-';
		// // minus.appendChild(min);
		// counter.appendChild(minus);

		var minus = document.createElement('div');
		minus.setAttribute('id', 'menu_item_minus_'+menuitems[i].id);
		minus.style.display = 'inline-block';
		minus.style.border = '3px solid';
		minus.style.height = '100%';
		minus.style.width = '12.5%';
		minus.style.cursor = 'pointer';		
		// $('#menu_item_plus').data('mid', { foo: 'bar' });
		// minus.setAttribute('data-mid',menuitems[i].id);
		minus.setAttribute('onclick', 'counter_minus(this.id)');
		// plus.style.backgroundImage = 'url(images/plus.png)';
		minus.innerHTML = '-';
		counter.appendChild(minus);

		var count = document.createElement('div');
		count.setAttribute('id', 'menu_item_count_'+menuitems[i].id);
		count.style.display = 'inline-block';
		count.style.textAlign = 'center';
		count.style.height = '100%';
		count.style.width = '12.5%';
		minus.setAttribute('data-mid',menuitems[i].id);
		// var cnt = document.createElement('p');
		// cnt.innerHTML = order_quantity;
		// count.appendChild(cnt);
		count.innerHTML = 0;
		counter.appendChild(count);
		// var min = document.createElement('p');
		// min.innerHTML = '-';
		// count.appendChild(min);

		var plus = document.createElement('div');
		plus.style.display = 'inline-block';
		plus.style.border = '3px solid';
		plus.style.height = '100%';
		plus.style.width = '12.5%';
		plus.style.cursor = 'pointer';
		plus.setAttribute('id', 'menu_item_plus_'+menuitems[i].id);
		// minus.setAttribute('data-mid',menuitems[i].id);
		plus.setAttribute('onclick', 'counter_plus(this.id)');
		// plus.style.backgroundImage = 'url(images/plus.png)';
		plus.innerHTML = '+';
		counter.appendChild(plus);

		// var plus = document.createElement('p');
		// plus.innerHTML = '-<span>   '+order_cart+'   </span>+';
		// plus.className = 'menu_item_plus';

		// var minus = document.createElement('p');
		// minus.innerHTML = '-';
		// minus.className = 'menu_item_plus';
		

		div_img.appendChild(price);
		menucard.appendChild(title);
		div_img.appendChild(vendor);
		menucard.appendChild(items);
		menucard.appendChild(counter);
		// menucard.appendChild(plus);
		// menucard.appendChild(minus);
		master.appendChild(menucard);
		console.log('Completed');
	}

}

// menupopulater(json1);

function counter_plus(event1){
	$('#checkout_button').fadeIn(500);
	$('#menu_lunch').css('margin-left', '27%');
	console.log(event1);
	// $('#checkout_button').fadeIn(500);
	var id = event1.substr(event1.length - 3);
	var order_quantity = document.querySelector('#menu_item_count_'+id).innerHTML;
	order_quantity++;
	console.log(order_quantity);
	document.querySelector('#menu_item_count_'+id).innerHTML = order_quantity;
	order_cart_items.push(id);
	cart[id] +=1;
	document.querySelector('#carttext').innerHTML = 'Selected: '+cart_length()+' Items';
	// $('#menu_item_count').
}

function cart_length(){
	num = json1.menus.length;
	var menuitems = json1.menus;
	var numitems = 0;
	for (var i=0; i<num; i++){
		numitems += cart[menuitems[i].id];
	}
	return numitems
}
function counter_minus(event1){
	console.log(event1);
	var id = event1.substr(event1.length - 3);
	var order_quantity = document.querySelector('#menu_item_count_'+id).innerHTML;
	if (order_quantity!=0){
		order_quantity--;
		console.log(order_quantity);
		document.querySelector('#menu_item_count_'+id).innerHTML = order_quantity;
		console.log(id);
		var indexremove = order_cart_items.indexOf(id)
		order_cart_items.splice(indexremove, 1);
		cart[id] -=1;
	document.querySelector('#carttext').innerHTML = 'Selected: '+order_cart_items.length+' Items';
	}
}
function teampageswitcher(indiv){
	$('#'+hp_current).removeClass('test');
	$('#'+indiv).addClass('test');
	// if (hp_current==indiv){
	// 	hp_current=0;
	// 	indiv=0;
	// }
	// $('#teampage_right_center').fadeOut(700);
	$('#homepage_right').css('background-image', 'url(images/background'+indiv+'.jpg)');
	if (indiv==2){
		$('#hp_right_1_mask').css('background-color', 'rgba(31, 129, 189, 0.85)');
	}
	if (indiv==1){
		$('#hp_right_1_mask').css('background-color', 'rgba(237, 42, 38, 0.85)');
	}
	if (indiv==3){
		$('#hp_right_1_mask').css('background-color', 'rgba(38, 237, 146, 0.85)');
	}
	if (indiv==1 || indiv==2 || indiv==3){
		$('#homepage_left').css('background-color', '#F2F9BD');
		$('#hp_right_1_mask').css('color', '#fff');
		$('.codrops-top a').css('color', '#fff');
	}
	if (indiv==4){
		$('#hp_right_1_mask').css('background-color', '#FFF');
		$('#homepage_left').css('background-color', '#FFF');
		$('#hp_right_1_mask').css('color', 'rgba(237, 42, 38, 0.85)');
		$('.codrops-top a').css('color', 'rgba(237, 42, 38, 0.85)');
	}
	$('#hp_right_'+hp_current).fadeOut(50);
	$('#hp_right_'+indiv).fadeIn(700);
	hp_current = indiv;
}

function ordernow(){
	// num = json1.menus.length;
	// var menuitems = json1.menus;
	// for (var i=0; i<num; i++){
	// 	cart[menuitems[i].id] = 0;
	// }
	$('#locations_list').empty();
	var locationlist = document.getElementById('locations_list');
	var heading = document.createElement('h2');
	heading.innerHTML = ' Select Location :';
	locationlist.appendChild(heading);
	for (var i=0; i<json_locations.length; i++){
		var locationp = document.createElement('p');
		locationp.className = 'locations-list';
		locationp.setAttribute('id', 'location_'+json_locations[i].location_id)
		locationp.innerHTML = json_locations[i].drop_point;
		locationp.setAttribute('onclick', 'ordernext(this.id)');
		locationlist.appendChild(locationp);
	}
	$main = $( '#pt-main' );
	$pages = $main.children( 'div.pt-page' );
	$currPage = $pages.eq(1);
	$currPage.addClass('pt-page-current pt-page-moveFromBottom');
	learnmore_open=true;
	$('#header').hide();
}

function jsongen(){
	cart_json=[]
	for (var index in cart){
		cart_json.push({"item_id":index, "quantity": cart[index], "item_name":returnname(index), "price":returnprice(index)})
	}
	return cart_json
}

function ordernow_back(){
	$pages.eq(1).removeClass('pt-page-moveFromBottom');
	$pages.eq(1).addClass('pt-page-moveToBottom');
	$('#header').show();
}

function ordernext(areaid){
	area = document.getElementById(areaid).innerHTML;
	location_id = area;
	$main = $( '#pt-main' );
	$pages = $main.children( 'div.pt-page' );
	$currPage = $pages.eq(1);
	$nextPage = $pages.eq(2);
	$nextPage.addClass('pt-page-current');
	// $currPage.removeclass('pt-page-current pt-page-moveFromBottom');
	$nextPage.addClass('pt-page-moveFromRight');
	// $('#checkout_button').delay(1000).css('animation', 'moveFromTop .6s ease both');
}

function ordernext_back(){
	$pages.eq(2).removeClass('pt-page-moveFromRight');
	$pages.eq(2).addClass('pt-page-moveToRight');
	// $currPage.removeClass('pt-page-moveFromRight');
	// $currPage.addClass('pt-page-moveToRight');
}


function ordernext_close(){
	ordernext_back();	
	ordernow_back();

}

function ordersummary(){
	$main = $( '#pt-main' );
	$pages = $main.children( 'div.pt-page' );
	$currPage = $pages.eq(2);
	$nextPage = $pages.eq(3);
	$nextPage.addClass('pt-page-current');
	document.getElementById('Area').placeholder = area;
	// $currPage.removeclass('pt-page-current pt-page-moveFromBottom');
	$nextPage.addClass('pt-page-moveFromRight');
	ordersummary_tablepopulate();
}

function ordersummary_back(){
	$pages.eq(3).removeClass('pt-page-moveFromRight');
	$pages.eq(3).addClass('pt-page-moveToRight');
}

function thankyouscreen_back(){
	$pages.eq(4).removeClass('pt-page-moveFromRight');
	$pages.eq(4).addClass('pt-page-moveToRight');
}

function closeall(){
	thankyouscreen_back();
	ordersummary_back();
	ordernext_close();
}

function thankyouscreen(){
	$main = $( '#pt-main' );
	$pages = $main.children( 'div.pt-page' );
	$currPage = $pages.eq(3);
	$nextPage = $pages.eq(4);
	$nextPage.addClass('pt-page-current');
	// $currPage.removeclass('pt-page-current pt-page-moveFromBottom');
	$nextPage.addClass('pt-page-moveFromRight');
}
function returnname(id_use){
	for(var i = 0; i < json1.menus.length; i++)
	{
	  if(json1.menus[i].id == id_use)
	  {
	    return json1.menus[i].name;
	  }
	}
}

function returnprice(id_use){
	for(var i = 0; i < json1.menus.length; i++)
	{
	  if(json1.menus[i].id == id_use)
	  {
	    return json1.menus[i].price;
	  }
	}
}

function returntotalamount(){
	var total = 0;
	for (var index in cart){
		total+= cart[index]*returnprice(index);
	}
	return total;
}

function ordersummary_tablepopulate(){
	$('#ordersummary_right_wrapper').empty();
	len = order_cart_items.length;
	var table = document.getElementById('ordersummary_right_wrapper');
	for (var index in cart){
		if (cart[index]!=0){
			var p_left = document.createElement('p');
			p_left.innerHTML = returnname(index)+' X '+cart[index]+'<br>';
			p_left.className = 'ordersummary_table_left';
			table.appendChild(p_left);

			var p_right = document.createElement('p');
			p_right.innerHTML = 'Rs. ' + cart[index]*returnprice(index);
			p_right.className = 'ordersummary_table_right';
			table.appendChild(p_right);
			var br = document.createElement('br');
			table.appendChild(br);
		}
	}
	var total = document.createElement('h2');
	total.innerHTML = 'Total Amount:  Rs'+returntotalamount();
	total.className = 'ordersummary_table_total';
	table.appendChild(total);
}

var PageTransitions = (function() {

	var $main = $( '#pt-main' ),
		$pages = $main.children( 'div.pt-page' ),
		$iterate = $( '#iterateEffects' ),
		animcursor = 1,
		pagesCount = $pages.length,
		current = 0,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;
	
	function init() {

		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$pages.eq( current ).addClass( 'pt-page-current' );

		$( '#dl-menu' ).dlmenu( {
			animationClasses : { in : 'dl-animate-in-2', out : 'dl-animate-out-2' },
			onLinkClick : function( el, ev ) {
				ev.preventDefault();
				nextPage( el.data( 'animation' ) );
			}
		} );

		$iterate.on( 'click', function() {
			if( isAnimating ) {
				return false;
			}
			if( animcursor > 67 ) {
				animcursor = 1;
			}
			nextPage( animcursor );
			++animcursor;
		} );

	}

	function nextPage( animation ) {

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		
		var $currPage = $pages.eq( current );

		if( current < pagesCount - 1 ) {
			++current;
		}
		else {
			current = 0;
		}

		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
			outClass = '', inClass = '';

		switch( animation ) {

			case 1:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 2:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 3:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 4:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 5:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 6:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 7:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 8:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 9:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 10:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 11:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 12:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 13:
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case 14:
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 15:
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 16:
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			case 17:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 18:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 19:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 20:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 21:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case 22:
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case 23:
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 24:
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 25:
				outClass = 'pt-page-moveToTop pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 26:
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 27:
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case 28:
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case 29:
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case 30:
				outClass = 'pt-page-rotateTopSideFirst';
				inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
				break;
			case 31:
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case 32:
				outClass = 'pt-page-flipOutRight';
				inClass = 'pt-page-flipInLeft pt-page-delay500';
				break;
			case 33:
				outClass = 'pt-page-flipOutLeft';
				inClass = 'pt-page-flipInRight pt-page-delay500';
				break;
			case 34:
				outClass = 'pt-page-flipOutTop';
				inClass = 'pt-page-flipInBottom pt-page-delay500';
				break;
			case 35:
				outClass = 'pt-page-flipOutBottom';
				inClass = 'pt-page-flipInTop pt-page-delay500';
				break;
			case 36:
				outClass = 'pt-page-rotateFall pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 37:
				outClass = 'pt-page-rotateOutNewspaper';
				inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
				break;
			case 38:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 39:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 40:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 41:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 42:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-rotatePullRight pt-page-delay180';
				break;
			case 43:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-rotatePullLeft pt-page-delay180';
				break;
			case 44:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-rotatePullBottom pt-page-delay180';
				break;
			case 45:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-rotatePullTop pt-page-delay180';
				break;
			case 46:
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 47:
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 48:
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 49:
				outClass = 'pt-page-rotateFoldBottom';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 50:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 51:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 52:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 53:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
			case 54:
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case 55:
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case 56:
				outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomTopIn';
				break;
			case 57:
				outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomBottomIn';
				break;
			case 58:
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case 59:
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case 60:
				outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeTopIn';
				break;
			case 61:
				outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeBottomIn';
				break;
			case 62:
				outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselLeftIn';
				break;
			case 63:
				outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselRightIn';
				break;
			case 64:
				outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselTopIn';
				break;
			case 65:
				outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselBottomIn';
				break;
			case 66:
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case 67:
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;

		}

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}

	init();

	return { init : init };

})();