// JavaScript Document
(function($){
	
		

/**
 * cvi_corner_lib.js 2.1 (22-Apr-2011) (c) by Christian Effenberger 
 * All Rights Reserved. Source: corner.netzgesta.de
 * Distributed under Netzgestade Non-commercial Software License Agreement.
 * This license permits free of charge use on non-commercial 
 * and private web sites only under special conditions. 
 * Read more at... http://www.netzgesta.de/cvi/LICENSE.html

 * syntax:
	cvi_corner.defaultRadius = 0;		//INT 0-100 (px)
	cvi_corner.defaultShadow = 0;		//INT 0-100 (% opacity)
	cvi_corner.defaultShade = 0;		//INT 0-100 (% opacity)
	cvi_corner.defaultInverse = false;	//BOOLEAN
	
	depends on: cvi_filter_lib.js
		cvi_corner.defaultFilter = null;//OBJ [{f='grayscale'},{f='emboss', s:1}...]
		
	cvi_corner.remove( image );
	cvi_corner.add( image, options );
	cvi_corner.modify( image, options );
	cvi_corner.add( image, { radius: value, shadow: value, shade: value, inverse: value } );
	cvi_corner.modify( image, { radius: value, shadow: value, shade: value, inverse: value } );
 *
**/
var cvi_ = $.fn.cvi.__cvi__;
$.fn.cvi.Corner={
			add:function(options){
				return this.each(function(){
					var image = this;
					cvi_.add(image, options, 'inline-block', cvi_corner.defopts, cvi_corner.modify);
				});
			}
			,
			modify:function(options){
				return this.each(function(){
					var image = this;
					cvi_corner.modify(image, options);
				});
				
			}
			,
			remove:function(){
				return this.each(function(){
					cvi_.remove(this);
				});
			}

		}	




function getRadius(radius,width,height){
	var part = (Math.min(width,height)/100);
	radius = Math.max(Math.min(100,radius/part),0);
	return radius+'%';
}


function addRadialStyle(ctx,x1,y1,r1,x2,y2,r2,opacity) {
	var tmp = ctx.createRadialGradient(x1,y1,r1,x2,y2,r2);
	var opt = Math.min(parseFloat(opacity+0.1),1.0);
	tmp.addColorStop(0,'rgba(0,0,0,'+opt+')');
	tmp.addColorStop(0.25,'rgba(0,0,0,'+opacity+')');
	tmp.addColorStop(1,'rgba(0,0,0,0)');
	return tmp;
}
function roundedRect(ctx,x,y,width,height,radius,nopath){
	if (!nopath) ctx.beginPath();
	ctx.moveTo(x,y+radius);
	ctx.lineTo(x,y+height-radius);
	ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
	ctx.lineTo(x+width-radius,y+height);
	ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
	ctx.lineTo(x+width,y+radius);
	ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
	ctx.lineTo(x+radius,y);
	ctx.quadraticCurveTo(x,y,x,y+radius);
	if (!nopath) ctx.closePath();
}
function addLinearStyle(ctx,x,y,w,h,opacity) {
	var tmp = ctx.createLinearGradient(x,y,w,h);
	var opt = Math.min(parseFloat(opacity+0.1),1.0);
	tmp.addColorStop(0,'rgba(0,0,0,'+opt+')');
	tmp.addColorStop(0.25,'rgba(0,0,0,'+opacity+')');
	tmp.addColorStop(1,'rgba(0,0,0,0)');
	return tmp;
}
function roundedShadow(ctx,x,y,width,height,radius,opacity){
	function roundedShadowPath(rectX,rectY,rectWidth,rectHeight){
		ctx.beginPath();
		ctx.rect(rectX,rectY,rectWidth,rectHeight);
		ctx.closePath();
	}
	function fillTheStyle(style){
		ctx.fillStyle = style;
		ctx.fill();
	}
	var style;
	roundedShadowPath(x,y+height-radius,radius,radius);
	fillTheStyle(addRadialStyle(ctx,x+radius,y+height-radius,radius-x,x+radius,y+height-radius,radius,opacity));
	
	roundedShadowPath(x+radius,y+height-y,width-x-(radius*2),y);
	fillTheStyle(addLinearStyle(ctx,x+radius,y+height-y,x+radius,y+height,opacity));
	
	roundedShadowPath(width-radius,height-radius,radius+x,radius+y);
	fillTheStyle(addRadialStyle(ctx,width-radius,height-radius,radius,width-radius,height-radius,radius+x,opacity));
	
	roundedShadowPath(x+width-x,y+radius,x,height-y-(radius*2));
	fillTheStyle(addLinearStyle(ctx,x+width-x,y+radius,x+width,y+radius,opacity));
	
	roundedShadowPath(x+width-radius,y,radius,radius);
	fillTheStyle(addRadialStyle(ctx,x+width-radius,y+radius,radius-x,x+width-radius,y+radius,radius,opacity));
}


function addShade(ctx, width, height, radius, opacity) {
	var style;
	style = addGradient(ctx, width, radius, width - radius, radius, 0, opacity);
	ctx.beginPath();
	ctx.moveTo(width, 0);
	ctx.lineTo(width, height);
	ctx.lineTo(width - radius, height - radius);
	ctx.lineTo(width - radius, 0);
	ctx.closePath();
	ctx.fillStyle = style;
	ctx.fill();
	style = addGradient(ctx, radius, height, radius, height - radius, 0, opacity);
	ctx.beginPath();
	ctx.moveTo(width, height);
	ctx.lineTo(0, height);
	ctx.lineTo(0, height - radius);
	ctx.lineTo(width - radius, height - radius);
	ctx.closePath();
	ctx.fillStyle = style;
	ctx.fill();
}
function addGradient(ctx,x,y,w,h,color,opacity) {
	var tmp = ctx.createLinearGradient(x,y,w,h);
	var val = (color>0?0.25:0.2);
	tmp.addColorStop(0,'rgba('+color+','+color+','+color+',0.9)');
	tmp.addColorStop(val,'rgba('+color+','+color+','+color+','+opacity+')');
	tmp.addColorStop(0.75,'rgba('+color+','+color+','+color+',0)');
	tmp.addColorStop(1,'rgba('+color+','+color+','+color+',0)');
	return tmp;
}
function addShine(ctx, width, height, radius, opacity, extra) {
	var style;
	var color = (extra != 1 ? 254 : 0);
	style = addGradient(ctx, 0, radius, radius, radius, color, opacity);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, height);
	ctx.lineTo(radius, height);
	ctx.lineTo(radius, radius);
	ctx.closePath();
	ctx.fillStyle = style;
	ctx.fill();
	style = addGradient(ctx, radius, 0, radius, radius, color, opacity);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(width, 0);
	ctx.lineTo(width, radius);
	ctx.lineTo(radius, radius);
	ctx.closePath();
	ctx.fillStyle = style;
	ctx.fill();
}
var cvi_corner = {
	
	
	
	defopts :{
		"radius" : 0, "shadow" : 0, "shade" : 0,
		"inverse" : false, "filter" : null, "callback" :null
	},

	
	modify: function(canvas, options) {
		try {			
			var iradius = (typeof options['radius']=='number'?options['radius']:canvas.options['radius']); canvas.options['radius'] = iradius;
			var ishadow = (typeof options['shadow']=='number'?options['shadow']:canvas.options['shadow']); canvas.options['shadow'] = ishadow;
			var ishade = (typeof options['shade']=='number'?options['shade']:canvas.options['shade']); canvas.options['shade'] = ishade;
			var inverse = (typeof options['inverse']=='boolean'?options['inverse']:canvas.options['inverse']); canvas.options['inverse']=inverse;
			var filter = (typeof options['filter']=='object'?options['filter']:canvas.options['filter']); canvas.options['filter']=filter;
			var callback = (typeof options['callback']=='string'?options['callback']:canvas.options['callback']); canvas.options['callback']=callback;
			var iw = canvas.width; var ih = canvas.height; var os = 4; var is = 0;
			var ir = Math.min(Math.min(iw,ih)/3,iradius); canvas.options['radius'] = ir; var r = getRadius(ir,iw,ih); 
			os = (ishadow>0?(inverse!=false?0:Math.min(Math.max(os,ir/2),16)):0);
			if(!SUPPORT_CANVAS) {
				if(canvas.tagName.toUpperCase() == "VAR") {
					var start = '<v:group'+
							' style="zoom:1;display:'+canvas.dpl+';margin:0;padding:0;position:relative;width:'+iw+'px;height:'+ih+'px;"'+
							' coordsize="'+iw+','+ih+'">';
					var fill = '<v:fill'+
							' src="'+canvas.source+'"'+
							' type="frame" />';
					var foot = (ir>0?'</v:roundrect>':'</v:rect>'); var end = '</v:group>';
					var pos = 0, linear = 'linear', soft = '', head = '', shado = '', lt = '', left = '', top = '', bottom = '', right = '';
					if(ir<=0) {
						if(ishadow>0) {
							if(inverse<=0) { ishadow = ishadow/50; os = 8; is = 4;
								soft = '<v:rect'+
										' strokeweight="0"'+
										' filled="t"'+
										' stroked="f"'+
										' fillcolor="#ffffff"'+
										' style="position:absolute;margin:0;padding:0;width:'+iw+'px;height:'+ih+'px;">'+
											'<v:fill'+
											' color="#ffffff"'+
											' opacity="0" />'+
										'</v:rect>'+
										'<v:rect'+
										'<v: strokeweight="0"'+
										'<v: stroked="f"'+
										'<v: fillcolor="#000000"'+
										' style="'+
											'filter:Alpha(opacity='+(ishadow*64)+'), progid:dxImageTransform.Microsoft.Blur(PixelRadius='+is+', MakeShadow=false);'+
											' zoom:1;margin:-1px 0 0 -1px;padding: 0;display:block;position:absolute;top:'+is+'px;left:'+is+'px;width:'+(iw-(3*is))+'px;height:'+(ih-(3*is))+'px;">'+
												'<v:fill color="#000000" opacity="1" />'+
										'</v:rect>';
								head = '<v:rect'+
										' strokeweight="0"'+
										' filled="t"'+
										' stroked="f"'+
										' fillcolor="#ffffff"'+
										' style="position:absolute;margin:0;padding:0;width:'+(iw-os)+'px;height:'+(ih-os)+'px;">';
							}else if(inverse>0) { ishadow = ishadow/50; ir = 12; linear = "linear";
								head = '<v:rect'+
										' filled="t"'+
										' stroked="t"'+
										' fillcolor="#ffffff"'+
										' style="position:absolute;margin:0;padding:0;width:'+iw+'px;height:'+ih+'px;">';
								shado = '<v:stroke'+
									' weight="0.5"'+
									' opacity="'+(ishadow/2)+'"'+
									' color="#000000" />';
								top = '<v:shape'+
										' strokeweight="0"'+
										' filled="t"'+
										' stroked="f"'+
										' fillcolor="#000000"'+
										' coordorigin="0,0"'+
										' coordsize="'+iw+','+ir+'"'+
										' path="m 0,0 l '+iw+',0,'+iw+','+ir+','+ir+','+ir+' x e"'+
										' style="position:absolute;margin:0;top:0px;left:0px;width:'+iw+'px;height:'+ir+'px;">'+
											'<v:fill'+
											' method="'+linear+'"'+
											' type="gradient"'+
											' angle="0"'+
											' color="#000000"'+
											' opacity="0"'+
											' color2="#000000" o:opacity2="'+ishadow+'" /></v:shape>'; 
								left = '<v:shape'+
										' strokeweight="0"'+
										' filled="t"'+
										' stroked="f"'+
										' fillcolor="#000000"'+
										' coordorigin="0,0"'+
										' coordsize="'+ir+','+ih+'"'+
										' path="m 0,0 l 0,'+ih+','+ir+','+ih+','+ir+','+ir+' x e"'+
										' style="position:absolute; margin:0;top:0px;left:0px;width:'+ir+'px;height:'+ih+'px;">'+
											'<v:fill'+
											' method="'+linear+'"'+
											' type="gradient"'+
											' angle="90"'+
											' color="#000000"'+
											' opacity="0"'+
											' color2="#000000" o:opacity2="'+ishadow+'" /></v:shape>';
							}
						} else {
							head = '<v:rect'+
									' strokeweight="0"'+
									' filled="t"'+
									' stroked="f"'+
									' fillcolor="#ffffff"'+
									' style="margin:0;padding:0;display:'+canvas.dpl+';width:'+iw+'px;height:'+ih+'px;">';
						}
						if(ishade>0) { ishade = ishade/50; ir = 12;
							top = '<v:shape'+
									' strokeweight="0"'+
									' filled="t"'+
									' stroked="f"'+
									' fillcolor="#ffffff"'+
									' coordorigin="0,0"'+
									' coordsize="'+(iw-os)+','+ir+'"'+
									' path="m 0,0 l '+(iw-os)+',0,'+(iw-os)+','+ir+','+ir+','+ir+' x e"'+
									' style="position:absolute;margin:0;top:0px;left:0px;width:'+(iw-os)+'px;height:'+ir+'px;">'+
										'<v:fill'+
										' method="linear"'+
										' type="gradient"'+
										' angle="0"'+
										' color="#ffffff"'+
										' opacity="0"'+
										' color2="#ffffff" o:opacity2="'+ishade+'" /></v:shape>'; 
							left = '<v:shape'+
									' strokeweight="0"'+
									' filled="t"'+
									' stroked="f"'+
									' fillcolor="#ffffff"'+
									' coordorigin="0,0"'+
									' coordsize="'+ir+','+(ih-os)+'"'+
									' path="m 0,0 l 0,'+(ih-os)+','+ir+','+(ih-os)+','+ir+','+ir+' x e"'+
									' style="position:absolute;margin:0;top:0px;left:0px;width:'+ir+'px;height:'+(ih-os)+'px;">'+
										'<v:fill'+
										' method="linear"'+
										' type="gradient"'+
										' angle="90"'+
										' color="#ffffff"'+
										' opacity="0"'+
										' color2="#ffffff" o:opacity2="'+ishade+'" /></v:shape>';
							bottom = '<v:shape'+
									' strokeweight="0"'+
									' filled="t"'+
									' stroked="f"'+
									' fillcolor="#000000"'+
									' coordorigin="0,0"'+
									' coordsize="'+(iw-os)+','+ir+'"'+
									' path="m 0,'+ir+' l '+(iw-os)+','+ir+','+(iw-os-ir)+',0,'+ir+',0 x e"'+
									' style="position:absolute;margin:0;top:'+(ih-os-ir)+'px;left:0px;width:'+(iw-os)+'px;height:'+ir+'px;">'+
										'<v:fill'+
										' method="linear"'+
										' type="gradient"'+
										' angle="180"'+
										' color="#000000"'+
										' opacity="0"'+
										' color2="#000000" o:opacity2="'+ishade+'" /></v:shape>';
							right = '<v:shape'+
									' strokeweight="0"'+
									' filled="t"'+
									' stroked="f"'+
									' fillcolor="#000000"'+
									' coordorigin="0,0"'+
									' coordsize="'+ir+','+(ih-os)+'"'+
									' path="m '+ir+',0 l '+ir+','+(ih-os)+',0,'+(ih-os-ir)+',0,'+ir+' x e"'+
									' style="position:absolute;margin:0;top:0px;left:'+(iw-os-ir)+'px;width:'+ir+'px;height:'+(ih-os)+'px;">'+
										'<v:fill'+
										' method="linear"'+
										' type="gradient"'+
										' angle="270"'+
										' color="#000000"'+
										' opacity="0"'+
										' color2="#000000" o:opacity2="'+ishade+'" /></v:shape>';
						}
					}else{
						if(ishadow>0) {
							linear = "linear sigma"; pos = 2;
							if(inverse==false) { ishadow = ishadow/50; is = Math.round(os*0.5);
								soft = '<v:rect'+
										' strokeweight="0"'+
										' filled="t"'+
										' stroked="f"'+
										' fillcolor="#ffffff"'+
										' style="position:absolute;margin:0;padding:0;width:'+iw+'px;height:'+ih+'px;">'+
											'<v:fill'+
											' color="#ffffff"'+
											' opacity="0" />'+
											'</v:rect>'+
										'<v:roundrect'+
										' arcsize="'+(r+is)+'"'+
										' strokeweight="0"'+
										' filled="t"'+
										' stroked="f"'+
										' fillcolor="#000000"'+
										' style="'+
											'filter:Alpha(opacity='+(ishadow*64)+'), progid:dxImageTransform.Microsoft.Blur(PixelRadius='+is+', MakeShadow=false);'+
											'zoom:1;margin:0;padding:0;display:block;position:absolute;top:'+is+'px;left:'+is+'px;width:'+(iw-(3*is))+'px;height:'+(ih-(3*is))+'px;'+
										'">'+
										'<v:fill'+
										' color="#000000" /></v:roundrect>';
								head = '<v:roundrect'+
										' arcsize="'+r+'"'+
										' strokeweight="0"'+
										' filled="t"'+
										' stroked="f"'+
										' fillcolor="#ffffff"'+
										' style="position:absolute;margin:0;padding:0;width:'+(iw-os)+'px;height:'+(ih-os)+'px;">';
							} else if(inverse==true) { ishadow = ishadow/50;
								head = '<v:roundrect'+
										' arcsize="'+r+'"'+
										' filled="t"'+
										' stroked="t"'+
										' fillcolor="#ffffff"'+
										' style="position:absolute;margin:0;padding:0;width:'+iw+'px;height:'+ih+'px;">';
								shado = '<v:stroke'+
									' weight="0.5"'+
									' opacity="'+(ishadow/2)+'"'+
									' color="#000000" />';
								top = '<v:shape'+
										' strokeweight="0"'+
										' filled="t"'+
										' stroked="f"'+
										' fillcolor="#000000"'+
										' coordorigin="0,0"'+
										' coordsize="'+iw+','+ir+'"'+
										' path="m '+ir+','+ir+' l '+iw+','+ir+' qy '+(iw-ir)+',0 l '+ir+',0 x e"'+
										' style="position:absolute;margin:0;top:0px;left:-1px;width:'+(iw+1)+'px;height:'+ir+'px;">'+
											'<v:fill'+
											' method="'+linear+'"'+
											' type="gradient"'+
											' angle="0"'+
											' color="#000000"'+
											' opacity="0"'+
											' color2="#000000" o:opacity2="'+ishadow+'" /></v:shape>'; 
								left = '<v:shape'+
										' strokeweight="0"'+
										' filled="t"'+
										' stroked="f"'+
										' fillcolor="#000000"'+
										' coordorigin="0,0"'+
										' coordsize="'+ir+','+ih+'"'+
										' path="m 0,'+ir+' l 0,'+(ih-ir)+' qy '+ir+','+ih+' l '+ir+','+ir+' x e"'+
										' style="position:absolute;margin:0;top:-1px;left:0px;width:'+ir+'px;height:'+(ih+1)+'px;">'+
											'<v:fill'+
											' method="'+linear+'"'+
											' type="gradient"'+
											' angle="90"'+
											' color="#000000"'+
											' opacity="0"'+
											' color2="#000000" o:opacity2="'+ishadow+'" /></v:shape>';
								lt = '<v:shape'+
										' strokeweight="0"'+
										' filled="t"'+
										' stroked="f"'+
										' fillcolor="#000000"'+
										' coordorigin="0,0"'+
										' coordsize="'+ir+','+ir+'"'+
										' path="m '+ir+','+ir+' l 0,'+ir+' qy '+ir+',0 l '+ir+','+ir+' x e"'+
										' style="position:absolute;margin:0;top:0px;left:0px;width:'+ir+'px;height:'+ir+'px;">'+
											'<v:fill'+
											' method="'+linear+'"'+
											' focus="1"'+
											' focusposition="1,1"'+
											' focussize="0.5,0.5"'+
											' type="gradientradial"'+
											' color="#000000"'+
											' opacity="0"'+
											' color2="#000000" o:opacity2="'+ishadow+'" /></v:shape>';
							}
						} else { pos = 1; os = 0;
							head = '<v:roundrect'+
									' arcsize="'+r+'"'+
									' strokeweight="0"'+
									' filled="t"'+
									' stroked="f"'+
									' fillcolor="#ffffff"'+
									' style="position:absolute;margin:0;padding:0;width:'+iw+'px;height:'+ih+'px;">';
						}
						if(ishade>0 && inverse==false) { ishade = ishade/50; linear = "linear";
							top = '<v:shape'+
									' strokeweight="0"'+
									' filled="t"'+
									' stroked="f"'+
									' fillcolor="#ffffff"'+
									' coordorigin="0,0"'+
									' coordsize="'+(iw-os)+','+ir+'"'+
									' path="m '+ir+','+ir+' l '+(iw-os)+','+ir+' qy '+(iw-os-ir)+',0 l '+ir+',0 x e"'+
									' style="position:absolute;margin:0;top:0px;left:-1px;width:'+(iw-os+pos)+'px;height:'+ir+'px;">'+
										'<v:fill'+
										' method="'+linear+'"'+
										' type="gradient"'+
										' angle="0"'+
										' color="#ffffff"'+
										' opacity="0"'+
										' color2="#ffffff" o:opacity2="'+ishade+'" /></v:shape>'; 
							left = '<v:shape'+
									' strokeweight="0"'+
									' filled="t"'+
									' stroked="f"'+
									' fillcolor="#ffffff"'+
									' coordorigin="0,0"'+
									' coordsize="'+ir+','+(ih-os)+'"'+
									' path="m 0,'+ir+' l 0,'+(ih-ir-os)+' qy '+ir+','+(ih-os)+' l '+ir+','+ir+' x e"'+
									' style="position:absolute;margin:0;top:-1px;left:0px;width:'+ir+'px;height:'+(ih-os+pos)+'px;">'+
										'<v:fill'+
										' method="'+linear+'"'+
										' type="gradient"'+
										' angle="90"'+
										' color="#ffffff"'+
										' opacity="0"'+
										' color2="#ffffff" o:opacity2="'+ishade+'" /></v:shape>';
							lt = '<v:shape'+
									' strokeweight="0"'+
									' filled="t"'+
									' stroked="f"'+
									' fillcolor="#ffffff"'+
									' coordorigin="0,0"'+
									' coordsize="'+ir+','+ir+'"'+
									' path="m '+ir+','+ir+' l 0,'+ir+' qy '+ir+',0 l '+ir+','+ir+' x e"'+
									' style="position:absolute;margin:0;top:0px;left:0px;width:'+ir+'px;height:'+ir+'px;">'+
										'<v:fill'+
										' method="'+linear+'"'+
										' focus="1"'+
										' focusposition="1,1"'+
										' focussize="0.5,0.5"'+
										' type="gradientradial"'+
										' color="#ffffff"'+
										' opacity="0"'+
										' color2="#ffffff" o:opacity2="'+ishade+'" /></v:shape>';
						}
					}
					canvas.innerHTML = start+soft+head+fill+shado+foot+right+bottom+top+left+lt+end;
					if(typeof window[callback]==='function') {window[callback](canvas.id,'cvi_corner');}
				}
			} else {
			
				var context = canvas.getContext("2d"), prepared=(context.getImageData?true:false), alternate=false;
				var img = new Image();
				img.onload = function() {
					if(prepared&&(typeof $.cvi.filter!='undefined')&&filter!=null&&filter.length>0) {iw=Math.round(iw); ih=Math.round(ih);
						var source=document.createElement('canvas'); source.height=ih+4; source.width=iw+4; var src=source.getContext("2d");
						var buffer=document.createElement('canvas'); buffer.height=ih; buffer.width=iw; var ctx=buffer.getContext("2d");
						if(src&&ctx) {alternate=true; ctx.clearRect(0,0,iw,ih); ctx.drawImage(img,0,0,iw,ih); 
							src.clearRect(0,0,iw+4,ih+4); src.drawImage(img,0,0,iw+4,ih+4); src.drawImage(img,2,2,iw,ih); 
							for(var i in filter) {$.cvi.filter.add(source,buffer,filter[i],iw,ih);}
						}
					}
					context.clearRect(0,0,iw,ih);
					context.save();
					if(ishadow>0 && inverse==false) {
						ishadow = ishadow/100;
						if(ir>0) {
							roundedShadow(context,os,os,iw-os,ih-os,ir,ishadow);								
						}else {
							os = 8; 
							roundedShadow(context,os,os,iw-os,ih-os,os,ishadow);
						}
					}
					if(ir<=0) {
						context.beginPath(); context.rect(0,0,iw-os,ih-os); context.closePath();
					}else {
						roundedRect(context,0,0,iw-os,ih-os,ir);
					}
					context.clip();
					context.fillStyle = 'rgba(0,0,0,0)';
					context.fillRect(0,0,iw,ih);
					if(alternate) {
						context.drawImage(source,2,2,iw,ih,0,0,iw-os,ih-os);
					}else {
						context.drawImage(img,0,0,iw-os,ih-os);
					}
					if(ishadow>0 && inverse==true) {
						ishadow = ishadow/100;
						if(ir>0) {
							addShine(context,iw,ih,ir,ishadow,1);
							roundedRect(context,0,0,iw,ih,ir);
						}else { ir = 16; 
							addShine(context,iw,ih,ir,ishadow,1);
							context.beginPath();
							context.rect(0,0,iw,ih);
							context.closePath();
						}
						context.strokeStyle = 'rgba(0,0,0,'+ishadow+')';
						context.lineWidth = 2;
						context.stroke();
					}			
					if(ishade>0 && inverse==false) {
						ishade = ishade/100; if(ir<=0) ir = 16; 
						addShade(context,iw-os,ih-os,ir,ishade);
						addShine(context,iw-os,ih-os,ir,ishade);
					}
					context.restore();
					if(typeof window[callback]==='function') {window[callback](canvas.id,'cvi_corner');}
				}
				img.src = canvas.source;
			}
		} catch (e) {
		}
	}

};





})(jQuery);