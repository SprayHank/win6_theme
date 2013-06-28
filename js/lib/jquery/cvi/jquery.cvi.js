;define("jquery/cvi/jquery.cvi", [],function(require, exports, module) {

(function(){
var div = document.createElement("DIV");
if(typeof (div.style.borderRadius) === "undefined"){
	if (typeof (div.style.MozBorderRadius) !== "undefined"){
		CSSStyleDeclaration.prototype.__defineGetter__("borderRadius",function(){return this.MozBorderRadius});
		CSSStyleDeclaration.prototype.__defineSetter__("borderRadius",function(v){this.MozBorderRadius=v});
		CSSStyleDeclaration.prototype.__defineGetter__("borderTopLeftRadius",function(){return this.MozBorderRadiusTopleft});
		CSSStyleDeclaration.prototype.__defineSetter__("borderTopLeftRadius",function(v){this.MozBorderRadiusTopleft=v});
		CSSStyleDeclaration.prototype.__defineGetter__("borderTopRightRadius",function(){return this.MozBorderRadiusTopright});
		CSSStyleDeclaration.prototype.__defineSetter__("borderTopRightRadius",function(v){this.MozBorderRadiusTopright=v});
		CSSStyleDeclaration.prototype.__defineGetter__("borderBottomLeftRadius",function(){return this.MozBorderRadiusBottomleft});
		CSSStyleDeclaration.prototype.__defineSetter__("borderBottomLeftRadius",function(v){this.MozBorderRadiusBottomleft=v});
		CSSStyleDeclaration.prototype.__defineGetter__("borderBottomRightRadius",function(){return this.MozBorderRadiusBottomright});
		CSSStyleDeclaration.prototype.__defineSetter__("borderBottomRightRadius",function(v){this.MozBorderRadiusBottomright=v});
	}else if(typeof (div.style.WebkitBorderRadius) !== "undefined"){
		CSSStyleDeclaration.prototype.__defineGetter__("borderRadius",function(){return this.WebkitBorderRadius});
		CSSStyleDeclaration.prototype.__defineSetter__("borderRadius",function(v){this.WebkitBorderRadius=v});
		CSSStyleDeclaration.prototype.__defineGetter__("borderTopLeftRadius",function(){return this.WebkitBorderTopLeftRadius});
		CSSStyleDeclaration.prototype.__defineSetter__("borderTopLeftRadius",function(v){this.WebkitBorderTopLeftRadius=v});
		CSSStyleDeclaration.prototype.__defineGetter__("borderTopRightRadius",function(){return this.WebkitBorderTopRightRadius});
		CSSStyleDeclaration.prototype.__defineSetter__("borderTopRightRadius",function(v){this.WebkitBorderTopRightRadius=v});
		CSSStyleDeclaration.prototype.__defineGetter__("borderBottomLeftRadius",function(){return this.WebkitBorderBottomLeftRadius});
		CSSStyleDeclaration.prototype.__defineSetter__("borderBottomLeftRadius",function(v){this.WebkitBorderBottomLeftRadius=v});
		CSSStyleDeclaration.prototype.__defineGetter__("borderBottomRightRadius",function(){return this.WebkitBorderBottomRightRadius});
		CSSStyleDeclaration.prototype.__defineSetter__("borderBottomRightRadius",function(v){this.WebkitBorderBottomRightRadius=v});
	}
}
})();

var SUPPORT_CANVAS ;//代替     document.all && !window.opera && !window.XMLHttpRequest && (!document.documentMode || document.documentMode < 9)
(function(){
	try{
		var canvas = document.createElement('canvas');
		if(canvas.getContext("2d")) {
			SUPPORT_CANVAS = true;
		}
	} catch (e){
		SUPPORT_CANVAS = false;
	}
})();

var cvi={};
cvi.SUPPORT_CANVAS=SUPPORT_CANVAS;
cvi.version=1.6;
cvi.VML_NAMESPACES=function(){
	//return function(){
		if (document.namespaces["v"] == null) {
			var e = ["shape", "shapetype", "group", "background", "path", "formulas", "handles", 
			"fill", "stroke", "shadow", "textbox", "textpath", "imagedata", "line", "polyline", 
			"curve", "roundrect", "oval", "rect", "arc", "image"], s = document.createStyleSheet();
			for (var i = 0; i < e.length; i++) {
				s.addRule("v\\:" + e[i], "behavior: url(#default#VML);");
			}
			document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
		}
	//}
};

cvi.ease={
	linear:[0.0,0.0,1.0,1.0],
	wkitDef:[0.25,0.1,0.25,1.0],
	wkitIn:[0.42,0.0,1.0,1.0],
	wkitOut:[0.0,0.58,1.0,1.0],
	wkitInOut:[0.42,0.58,1.0,1.0],
	wkitOutIn:[0.0,0.42,1.0,0.58],
	sineIn:[0.25,0.0,1.0,1.0],
	sineOut:[0.0,0.25,1.0,1.0],
	sineInOut:[0.25,0.0,0.75,1.0],
	sineOutIn:[0.0,0.25,1.0,0.75],
	medIn:[0.5,0.0,1.0,1.0],
	medOut:[0.0,0.5,1.0,1.0],
	medInOut:[0.5,0.0,0.5,1.0],
	medOutIn:[0.0,0.5,1.0,0.5],
	maxIn:[1.0,0.0,1.0,1.0],
	maxOut:[0.0,1.0,1.0,1.0],
	maxInOut:[1.0,0.0,0.0,1.0],
	maxOutIn:[0.0,1.0,1.0,0.0]
};

module.exports = cvi;
});