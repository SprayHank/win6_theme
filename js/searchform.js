/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 12-12-26
 * Time: 下午5:50
 * To change this template use File | Settings | File Templates.
 */
(function(w, d){

seajs.use(['jquery/jqueryui/fg.menu'], function(jQuery) {
	/**/var $ = jQuery;
	var ruls = '';
	var mainColor = 'cd8101';
	var mainWidth = 160;
	var lightColor = 'F4FFBA';
	var sideWidth = 3;
	var radioPercent = 80;
	ruls += '.wrapper-dropdown-1 { /* Size and position */position: relative; /* Enable absolute positionning for children and pseudo elements */width: '+mainWidth+'px; padding: '+sideWidth+'px '+Math.ceil(sideWidth*1.8)+'px; margin: 0 auto; /* Styles */ background: #'+mainColor+'; color: #'+lightColor+'; outline: none; cursor: pointer; /* Font settings */ font-weight: bold; }'
		+'.wrapper-dropdown-1:after { content: ""; width: 0; height: 0; position: absolute; right: '+Math.ceil(sideWidth*2*1.8)+'px; top: 50%; margin-top: -6px; border-width: 6px 0 6px 6px; border-style: solid; border-color: transparent #'+lightColor+'; }'
		+'.dropdown-positionHelper { display: none; z-index:9999999999 }'
		+'.dropdown-positionHelper .dropdown { /* Size & position */ position: absolute; top: 100%; left: 0; right: 0; /* Styles */ background: #'+lightColor+'; list-style: none; font-weight: normal; /* Cancels previous font-weight: bold; *//* Hiding */ display: none; pointer-events: none; }'
		+'.dropdown-positionHelper .dropdown li a { display: block; text-decoration: none; color: #9E9E9E; padding: '+sideWidth+'px '+(sideWidth*2*1.8)+'px; }'
		+'.dropdown-positionHelper .dropdown li:hover a {/* Hover state */ background: #F3F8F8; }'
		+'.dropdown-positionHelper.active .dropdown {/* Active state */ display: block; pointer-events: auto; }'
		+'.dropdown-positionHelper.active { display: block; overflow: visible; }'
		+'.wrapper-dropdown-1.active:after { border-color: #'+mainColor+' transparent; border-width: 6px 6px 0 6px; margin-top: -3px; }'
		+'.wrapper-dropdown-1.active { background: #'+mainColor+'; background: -webkit-gradient(linear, left top, right top, color-stop(0%, #'+mainColor+'), color-stop('+radioPercent+'%, #'+mainColor+'), color-stop('+radioPercent+'%, #'+lightColor+'), color-stop(100%, #'+lightColor+')); background: -webkit-linear-gradient(left, #'+mainColor+' 0%, #'+mainColor+' '+radioPercent+'%, #'+lightColor+' '+radioPercent+'%, #'+lightColor+' 100%); background: -moz-linear-gradient(left, #'+mainColor+' 0%, #'+mainColor+' '+radioPercent+'%, #'+lightColor+' '+radioPercent+'%, #'+lightColor+' 100%); background: -ms-linear-gradient(left, #'+mainColor+' 0%, #'+mainColor+' '+radioPercent+'%, #'+lightColor+' '+radioPercent+'%, #'+lightColor+' 100%); background: -o-linear-gradient(left, #'+mainColor+' 0%, #'+mainColor+' '+radioPercent+'%, #'+lightColor+' '+radioPercent+'%, #'+lightColor+' 100%); background: linear-gradient(to right, #'+mainColor+' 0%, #'+mainColor+' '+radioPercent+'%, #'+lightColor+' '+radioPercent+'%, #'+lightColor+' 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#'+mainColor+'", endColorstr="#'+lightColor+'", GradientType=1); }';
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML=ruls;
	document.getElementsByTagName('HEAD').item(0).appendChild(style);
	$('#search').after('<div id="dropdown1" class="wrapper-dropdown-1" tabindex="1" style="float:left;">'+
		'<span>类别：所有分类</span>'+
		'<div style="display:none;">'+
		'<ul id="droplist1" class="dropdown" tabindex="1">'+
		'</ul>'+
		'</div>'+
		'</div>');
	var op = d.getElementById('category').getElementsByTagName('option');
	var itop;
	for(var i=0;itop = op[i];i++){
		$('#droplist1').append('<li value="'+itop.value+'"><a href="#">'+itop.innerHTML+'</a></li>');
	}
	document.getElementById('category').parentNode.replaceChild(document.getElementById('dropdown1'), document.getElementById('category'));
	function DropDown(el) {
		this.dropdown = el;
		this.placeholder = this.dropdown.children('span');
		this.val = '';
		this.index = -1;
		var obj = this;
		obj.wrapDropDown();
		this.opts = this.droplist.find('#droplist1 > li');
		obj.dropdown.on('click', function(event) {
			$(this).toggleClass('active');
			$(obj.droplist).toggleClass('active');
			return false;
		});
		obj.opts.on('click', function() {
			var opt = $(this);
			obj.val = opt.text();
			obj.value = opt.attr('value');
			obj.placeholder.text('类别: ' + obj.val);
			$('#category').attr('value', obj.value);
		});
		$(document).click(function() {
			// all dropdowns
			$(obj.dropdown).removeClass('active');
			$(obj.droplist).removeClass('active');
		});
	};
	DropDown.prototype = {
		getValue: function() {
			return this.value;
		},
		getIndex: function() {
			return this.index;
		}
	};
	DropDown.prototype.wrapDropDown = function(){
		//var el = widget;
		var referrer = $(this.dropdown);
		var dims = {
			refX: referrer.offset().left,
			refY: referrer.offset().top,
			refW: referrer.getTotalWidth(),
			refH: referrer.getTotalHeight()
		};
		var helper = $('<div class="dropdown-positionHelper"></div>');
		helper.css({ position: 'absolute', left: dims.refX, top: dims.refY, width: dims.refW, height: dims.refH }).appendTo('body');
		document.body.childNodes[document.body.childNodes.length-1].appendChild(document.getElementById('droplist1'));
		this.droplist = $(document.getElementById('droplist1').parentNode);
	}

	$(function() {
		var dd = new DropDown($('#dropdown1'));
	});

	$('#keyword').css({margin: '0px 10px', padding: 0, float: 'left', height: 22});
	$('#searchForm').css({height: 30}).append('<input type="hidden" name="category" id="category" value="0" />');
	$('.go').attr('value', '搜索').removeClass('go').css({
		cursor: 'pointer',
		color: '#cc8101',
		border: '1px solid #CC8101',
		'background-color': 'transparent',
		'font-family': '微软雅黑',
		'font-size': '12px',
		padding: '2px 16px 3px',
		float: 'left',
		margin: 0
	}).next().css({
			cursor: 'pointer',
			color: '#cc8101',
			border: '1px solid #CC8101',
			'background-color': 'transparent',
			'font-family': '微软雅黑',
			'font-size': '12px',
			height:20,
			paddingLeft: '16px',
			paddingRight:'16px',
			paddingTop:'2px',
			float: 'left',
			margin: '0 10px',
			display:'block'
		});


//	var $ = jQuery;
//	var locStr1 = w.libPath+'./jquery/jqueryui/fg.menu.css';
//	var cssLink1 = jQuery('<link href="'+locStr1+'" type="text/css" rel="Stylesheet" class="ui-theme" />');
//	var locStr2 = w.libPath+'./jquery/jqueryui/custom-theme/jquery-ui-1.9.2.custom.min.css';
//	var cssLink2 = jQuery('<link href="'+locStr2+'" type="text/css" rel="Stylesheet" class="ui-theme" />');
//	jQuery("head").append(cssLink1);
//	jQuery("head").append(cssLink2);
//	var ivalue = $('#category').attr('value');
//	var itext = $("#category").find('option:selected').text();
//	var temp2 = d.createElement('ul');
//	var op = d.getElementById('category').getElementsByTagName('option');
//	var itop;
//	for(var i=0;itop = op[i];i++){
//		$(temp2).append('<li value="'+itop.value+'"><a href="#">'+itop.innerHTML+'</a></li>');
//	}
//	$('#category').remove();
//	$('#search').after('<div id="replaceSearch" style="height:31px;margin-top:18px;float:right;"></div> ');
//	$('#searchForm').appendTo('#replaceSearch').css({width:'490px',top:0})
//		.append('<a tabindex="0" href="#search-engines" class="fg-button fg-button-icon-right ui-widget ui-state-default" style="float:right;" id="flat"><span class="ui-icon ui-icon-triangle-1-s"></span><span id="category_text">'+itext+'</span></a>')
//		.append('<input type="hidden" name="category" id="category" value="'+ivalue+'" />');
//	$('#flat')
//		.after('<span id="menuSelection"></span> ')
//		.after('<div class="hidden" style="display: none;" id="search-category"></div> ');
//	d.getElementById('search-category').appendChild(temp2);
//	$('.fg-button').hover(
//		function(){ $(this).removeClass('ui-state-default').addClass('ui-state-focus'); },
//		function(){ $(this).removeClass('ui-state-focus').addClass('ui-state-default'); }
//	);
//	$('#flat').menu({
//		content: $('#flat').next().html(), // grab content from this page
//		showSpeed: 400,
//		chooseItem:function(item){
//			$('#category_text').text($(item).text());
//			$('#category').attr('value', item.parentNode.value);
//		}
//	});
//
//	$('#keyword').addClass('ui-widget').removeClass('B_input').css({'height':'24px',width:'130px',float:'right'})
//		.next().addClass('ui-button ui-widget ui-state-default ui-button-text-only').removeClass('go')
//		.attr('value','搜索').css({float:'right','height':'31px'}).prependTo('#searchForm').next()
//		.next().addClass('ui-button ui-widget ui-state-default ui-button-text-only')
//		.css({padding:'0.4em 1em',display:'inline-block',float:'right'}).prependTo('#searchForm');
});
})(window,document);
