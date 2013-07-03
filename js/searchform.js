/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 12-12-26
 * Time: 下午5:50
 * To change this template use File | Settings | File Templates.
 */
(function(w, d){

seajs.use(['jquery/jqueryui/fg.menu'], function(jQuery) {
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
//		.append('<a tabindex="0" href="#search-engines" class="fg-button fg-button-icon-right ui-widget ui-state-default ui-corner-all" style="float:right;" id="flat"><span class="ui-icon ui-icon-triangle-1-s"></span><span id="category_text">'+itext+'</span></a>')
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
//		.next().addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only').removeClass('go')
//		.attr('value','搜索').css({float:'right','height':'31px'}).prependTo('#searchForm').next()
//		.next().addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only')
//		.css({padding:'0.4em 1em',display:'inline-block',float:'right'}).prependTo('#searchForm');
});
})(window,document);
