// JavaScript Document

(function($){
	
	

$.fn.extend({
	cvi:{//////////////////////////////////$.fn.cvi>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		SUPPORT_CANVAS:$.cvi.SUPPORT_CANVAS//Boolean
		,__cvi__:cvi_
		
		

		
		

		
		

	}//////////////////////////////////////$.fn.cvi<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
});




var cvi_ = {
	add : function (image,options,floatDisplay,defopts,modify){
		if (image.tagName.toUpperCase() !== "IMG") {return false;}
		options = options || defopts;
		for (var i in defopts) {
			if (!options[i]) {
				options[i] = defopts[i];
			}
		};
		var imageWidth = ('iwidth' in options) ? parseInt(options.iwidth) : image.width;
		var imageHeight = ('iheight' in options) ? parseInt(options.iheight) : image.height;
		try {
			var object = image.parentNode;
			if (!SUPPORT_CANVAS) {
				$.cvi.VML_NAMESPACES();
				var display = (image.currentStyle.display.toLowerCase() == 'block') ? 'block' : 'inline-block';
				var canvas = document.createElement(['<var style="zoom:1;overflow:hidden;display:' + display + ';width:' + imageWidth + 'px;height:' + imageHeight + 'px;padding:0;">'].join(''));
				var flt = image.currentStyle.styleFloat.toLowerCase();
				display = (flt == 'left' || flt == 'right') ? floatDisplay : display;
				canvas.dpl = display;
				canvas.style.cssText = image.style.cssText;
			}
			else {
				var canvas = document.createElement('canvas');
				canvas.style.cssText = image.style.cssText;
				canvas.style.height = imageHeight + 'px';
				canvas.style.width = imageWidth + 'px';
			}
			$(canvas).attr({
				options : options, id : image.id, alt : image.alt, title : image.title, source : image.src, 
				className : image.className, height : imageHeight, width : imageWidth 
			});
			object.replaceChild(canvas, image);
			modify(canvas, options);
		}catch (e) {
			try {
				console.log(e);
			}catch (e) {}
		}
	},
	
	
	
	replace : function (canvas) {
		var object = canvas.parentNode;
		var img = document.createElement('img');
		img.style.cssText = canvas.style.cssText;
		$(img).attr({
			id : canvas.id, alt : canvas.alt, title : canvas.title, src : canvas.source, className : canvas.className, 
			height : canvas.height, width : canvas.width 
		}).css({
			height : canvas.height + 'px', width : canvas.width + 'px' 
		});
		object.replaceChild(img, canvas);
	},
	
	
	
	remove : function (canvas) {
		if (canvas.tagName.toUpperCase() == ((!SUPPORT_CANVAS) ? "VAR" : "CANVAS")) {
			cvi_.replace(canvas);
		}
	}
};
	
	
})(jQuery);