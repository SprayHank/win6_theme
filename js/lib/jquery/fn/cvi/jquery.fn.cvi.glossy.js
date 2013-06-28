// JavaScript Document
(function($){
	

/**
 * cvi_glossy_lib.js 1.8 (10-Aug-2010)
 * (c) by Christian Effenberger 
 * All Rights Reserved
 * Source: corner.netzgesta.de
 * Distributed under Netzgestade Software License Agreement
 * http://www.netzgesta.de/cvi/LICENSE.txt
 * License permits free of charge
 * use on non-commercial and 
 * private web sites only 
 * syntax:
	cvi_glossy.defaultRadius = 25;		//INT 10-50 (%)
	cvi_glossy.defaultColor = 0;		//STR '#000000'-'#ffffff' or 0
	cvi_glossy.defaultColor2 = 0;		//STR '#000000'-'#ffffff' or 0
	cvi_glossy.defaultGradient = 'v';	//STR  'd|h|v'-'diagonally|horizontal|vertical'
	cvi_glossy.defaultShade = 50;		//INT 0-100 (% opacity)
	cvi_glossy.defaultShadow = 40;		//INT 0-100 (% opacity)
	cvi_glossy.defaultAngle = 0;		//INT -100 - +100 (% angle)
	cvi_glossy.defaultNoshadow = false;	//BOOLEAN
	cvi_glossy.defaultNoradius = false;	//BOOLEAN
	cvi_glossy.defaultNogradient =false;//BOOLEAN
	
	depends on: cvi_filter_lib.js
		cvi_glossy.defaultFilter = null;//OBJ [{f='grayscale'},{f='emboss', s:1}...]
	
	cvi_glossy.remove( image );
	cvi_glossy.add( image, options );
	cvi_glossy.modify( image, options );
	cvi_glossy.add( image, { radius: value, color: value, color2: value, gradient: value, shadow: value, shade: value, noshadow: value, noradius: value } );
	cvi_glossy.modify( image, { radius: value, color: value, color2: value, gradient: value, shadow: value, shade: value, noshadow: value, noradius: value } );
 *
**/		
		
		
var cvi_ = $.fn.cvi.__cvi__;	
		
$.fn.cvi.Glossy={
			add:function(options){
				return this.each(function(){
					var image = this;
					cvi_.add(image, options,'inline',cvi_glossy.defopts,cvi_glossy.modify);
				});
			}
			,
			modify:function(options){
				return this.each(function(){
					var image = this;
					cvi_glossy.modify(image, options);
				});
				
			}
			,
			remove:function(){
				return this.each(function(){
					cvi_.remove(this);
				});
			}
		}





function addFrame(ctx,x,y,width,height,radius,opacity) {
	roundedRect(ctx,x,y,width,height,radius);
	var style = ctx.createLinearGradient(0,0,0,height);
	style.addColorStop(0,'rgba(254,254,254,'+opacity+')');
	style.addColorStop(1,'rgba(0,0,0,'+opacity+')');
	ctx.lineWidth = (radius+x)/2;
	ctx.strokeStyle = style;
	ctx.stroke();
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

function addRadialStyle(ctx,x1,y1,r1,x2,y2,r2,opacity) {
	var tmp = ctx.createRadialGradient(x1,y1,r1,x2,y2,r2);
	var opt = Math.min(parseFloat(opacity+0.1),1.0);
	tmp.addColorStop(0,'rgba(0,0,0,'+opt+')');
	tmp.addColorStop(0.25,'rgba(0,0,0,'+opacity+')');
	tmp.addColorStop(1,'rgba(0,0,0,0)');
	return tmp;
}
function addLinearStyle(ctx,x,y,w,h,opacity) {
	var tmp = ctx.createLinearGradient(x,y,w,h);
	var opt = Math.min(parseFloat(opacity+0.1),1.0);
	tmp.addColorStop(0,'rgba(0,0,0,'+opt+')');
	tmp.addColorStop(0.25,'rgba(0,0,0,'+opacity+')');
	tmp.addColorStop(1,'rgba(0,0,0,0)');
	return tmp;
}
function glossyShadow(ctx,x,y,width,height,radius,opacity){
	function glossyShadowPath(rectX,rectY,rectWidth,rectHeight){
		ctx.beginPath();
		ctx.rect(rectX,rectY,rectWidth,rectHeight);
		ctx.closePath();
	}
	function fillTheStyle(style){
		ctx.fillStyle = style;
		ctx.fill();
	}
	var os = radius/2;
	glossyShadowPath(x+radius,y,width-(radius*2),y+os);
	fillTheStyle(addLinearStyle(ctx,x+radius,y+os,x+radius,y,opacity));
	
	glossyShadowPath(x,y,radius,radius);
	fillTheStyle(addRadialStyle(ctx,x+radius,y+radius,radius-os,x+radius,y+radius,radius,opacity));
	
	glossyShadowPath(x,y+radius,os,height-(radius*2));
	fillTheStyle(addLinearStyle(ctx,x+os,y+radius,x,y+radius,opacity));
	
	glossyShadowPath(x,y+height-radius,radius,radius);
	fillTheStyle(addRadialStyle(ctx,x+radius,y+height-radius,radius-os,x+radius,y+height-radius,radius,opacity));
	
	glossyShadowPath(x+radius,y+height-os,width-(radius*2),os);
	fillTheStyle(addLinearStyle(ctx,x+radius,y+height-os,x+radius,y+height,opacity));
	
	glossyShadowPath(x+width-radius,y+height-radius,radius,radius);
	fillTheStyle(addRadialStyle(ctx,x+width-radius,y+height-radius,radius-os,x+width-radius,y+height-radius,radius,opacity));
	
	glossyShadowPath(x+width-os,y+radius,os,height-(radius*2));
	fillTheStyle(addLinearStyle(ctx,x+width-os,y+radius,x+width,y+radius,opacity));
	
	glossyShadowPath(x+width-radius,y,radius,radius);
	fillTheStyle(addRadialStyle(ctx,x+width-radius,y+radius,radius-os,x+width-radius,y+radius,radius,opacity));
}

function addDark(ctx,x,y,width,height,radius,opacity) {
	var style = ctx.createLinearGradient(0,y,0,y+height);
	style.addColorStop(0,'rgba(0,0,0,0)');
	style.addColorStop(1,'rgba(0,0,0,'+opacity+')');
	ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y+height-radius);
	ctx.quadraticCurveTo(x,y+height,x+radius,y+height); ctx.lineTo(x+width-radius,y+height);
	ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
	ctx.lineTo(x+width,y); ctx.lineTo(x,y); ctx.closePath();
	ctx.fillStyle = style; ctx.fill();
}

function addBright(ctx,x,y,width,height,radius,opacity) {
	var style = ctx.createLinearGradient(0,y,0,y+height);
	style.addColorStop(0,'rgba(254,254,254,'+opacity+')');
	style.addColorStop(1,'rgba(254,254,254,0.1)');
	ctx.beginPath(); ctx.moveTo(x,y+radius); ctx.lineTo(x,y+height-radius);
	ctx.quadraticCurveTo(x,y+height,x+radius,y+height); ctx.lineTo(x+width-radius,y+height);
	ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
	ctx.lineTo(x+width,y+radius); ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
	ctx.lineTo(x+radius,y); ctx.quadraticCurveTo(x,y,x,y+radius); ctx.closePath();
	ctx.fillStyle = style; ctx.fill();
}

					
function addPlain(ctx,x,y,width,height,radius,opacity,grade) {
	var hh=height-radius,hr=hh+(grade*hh),hl=hh-(grade*hh);
	ctx.beginPath(); ctx.moveTo(x,y+radius); ctx.lineTo(x,y+radius+hl);
	ctx.quadraticCurveTo(x+(0.5*width),y+height-radius,x+width,y+radius+hr);
	ctx.lineTo(x+width,y+radius); ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
	ctx.lineTo(x+radius,y); ctx.quadraticCurveTo(x,y,x,y+radius); ctx.closePath();
	ctx.fillStyle = 'rgba(254,254,254,'+opacity+')'; ctx.fill();
}
function setPath(x,y,width,height,radius,grade) {var hh=height-radius,hr=hh+(grade*hh),hl=hh-(grade*hh);
	return "m "+x+","+parseInt(y+radius,10)+" l "+x+","+parseInt(y+radius+hl,10)+" l "+parseInt(x+width,10)+","+parseInt(y+radius+hr,10)+
	/* " qb "+parseInt(x+(width/2),10)+","+parseInt(y+(height/2)+radius,10)+","+parseInt(x+width,10)+","+parseInt(y+radius+hr,10)+ */
	" l "+parseInt(x+width,10)+","+parseInt(y+radius,10)+" qy "+parseInt(x+width-radius,10)+","+y+" l "+parseInt(x+radius,10)+","+y+" qx "+x+","+parseInt(y+radius,10)+" x e"; 
}	

var cvi_glossy = {
	defopts :{
		radius : 25,
		color : 0,
		color2 : 0,
		gradient : 'v',
		shade : 50,
		shadow : 40,
		angle : 0,
		noshadow : false,
		noradius : false,
		nogradient : false,
		filter : null,
		callback : null
	},
	
	modify: function(canvas, options) {
		try {			
			var iradius = (typeof options['radius']=='number'?options['radius']:canvas.options['radius']); canvas.options['radius'] = iradius;
			var color = (typeof options['color']=='string'?options['color']:canvas.options['color']); canvas.options['color']=color;
			var color2 = (typeof options['color2']=='string'?options['color2']:canvas.options['color2']); canvas.options['color2']=color2;
			var gradient = (typeof options['gradient']=='string'?options['gradient']:canvas.options['gradient']); canvas.options['gradient']=gradient;
			var shadow = (typeof options['shadow']=='number'?options['shadow']:canvas.options['shadow']); canvas.options['shadow'] = shadow;
			var shade = (typeof options['shade']=='number'?options['shade']:canvas.options['shade']); canvas.options['shade'] = shade;
			var iangle = (typeof options['angle']=='number'?options['angle']:canvas.options['angle']); canvas.options['angle'] = iangle;
			var noshadow = (typeof options['noshadow']=='boolean'?options['noshadow']:canvas.options['noshadow']); canvas.options['noshadow']=noshadow;
			var noradius = (typeof options['noradius']=='boolean'?options['noradius']:canvas.options['noradius']); canvas.options['noradius']=noradius;
			var nogradient = (typeof options['nogradient']=='boolean'?options['nogradient']:canvas.options['nogradient']); canvas.options['nogradient']=nogradient;
			var filter = (typeof options['filter']=='object'?options['filter']:canvas.options['filter']); canvas.options['filter']=filter;
			var callback = (typeof options['callback']=='string'?options['callback']:canvas.options['callback']); canvas.options['callback']=callback;
			var icolor = 0; if(isNaN(color)) var icolor = (color.match(/^#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]$/i)?color:0);
			var icolor2 = 0; if(isNaN(color2)) var icolor2 = (color2.match(/^#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]$/i)?color2:0);
			var igradient = (gradient.match(/^[dhv]/i)?gradient.substr(0,1):'v');
			var iw = canvas.width; var ih = canvas.height; var f = 0.25; var ishadow = shadow==0?0.0:shadow/100;
			var ishade = shade<0.01?0.0:Math.max(Math.min(shade,100),1)/100;
			var grade = parseFloat(iangle==0?0.0:Math.max(Math.min(iangle,100),-100)/100);
			var angle = 0, xr = 0, zr, sr, r, os, is, style, head, foot, fill = '', shine = '', path = '', tmp = '';
			var IE = (document.all&&document.namespaces&&!window.opera&&(!document.documentMode||document.documentMode<9)?true:false);
			f = iradius>0?Math.min(Math.max(iradius,1),50)/100:f;
			if(IE) {
				iradius = Math.round(45*f);
				zr = Math.max(Math.round((Math.min(iw,ih)/2)*f),4)*.75;
				xr = Math.round(Math.max(Math.round((Math.min(iw,ih)/2)*f),4)/4)*4;
			}else {
				iradius = Math.max(Math.round((Math.min(iw,ih)/2)*f),4);
			}
			if(!noshadow) {
				iradius = (IE?iradius:Math.round(iradius/4)*4);
				os = (IE?xr:iradius)/4;
				sr = iradius*0.75;
				is = os;
				r = sr;
				sr = r*0.75;
				shine = '<v:roundrect arcsize="'+r+'%" strokeweight="0" filled="t" stroked="f" fillcolor="#000000" style="filter:Alpha(opacity='+(ishadow*100)+'), progid:dxImageTransform.Microsoft.Blur(PixelRadius='+is+', MakeShadow=false); zoom:1;margin:0;padding:0;display:block;position:absolute;top:'+is+'px;left:0px;width:'+(iw-(2*is))+'px;height:'+(ih-(3*is))+'px;"><v:fill color="#000000" opacity="1" /></v:roundrect>';
				tmp = '<v:rect strokeweight="0" filled="t" stroked="f" fillcolor="#ffffff" style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:0px;left:0px;width:'+iw+'px;height:'+ih+'px;"><v:fill color="#ffffff" opacity="0" /></v:rect>';
			}else {
				os = (IE?xr:iradius)/4; r = iradius; is = 0; sr = iradius*0.75;
			}
			if(!!noradius) {r = 0; zr = 0; sr = 0; os = 0; is = 0; shine = ''; tmp = '';}
			if(!SUPPORT_CANVAS) {
				if(canvas.tagName.toUpperCase() == "VAR") {
					if(isNaN(icolor)) {
						fill = '<v:roundrect arcsize="'+r+'%" strokeweight="0" filled="t" stroked="f" fillcolor="#ffffff" style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:0px;left:'+is+'px;width:'+(iw-(2*is))+'px;height:'+(ih-(2*is))+'px;">';
						if(isNaN(icolor2)) {
							if(igradient=='h') {angle = 90;}else if(igradient=='d') {angle = 45;}
							fill = fill + '<v:fill method="sigma" type="gradient" angle="'+angle+'" color="'+icolor2+'" color2="'+icolor+'" /></v:roundrect>';
						}else {
							fill = fill + '<v:fill color="'+icolor+'" /></v:roundrect>';
						}
					}
					head = '<v:group style="zoom:1;display:'+canvas.dpl+';margin:0;padding:0;position:relative;width:'+iw+'px;height:'+ih+'px;" coordsize="'+iw+','+ih+'">' + tmp;
					if(nogradient) {
						path = setPath(0,0,iw-(2*(os+is)),(ih/2)-os-is,noshadow?zr:r,grade);
						foot = '<v:roundrect'+
						' arcsize="'+r+'%"'+
						' strokeweight="0"'+
						' filled="t"'+
						' stroked="f"'+
						' fillcolor="#ffffff"'+
						' style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:0px;left:'+is+'px;width:'+(iw-(2*is))+'px;height:'+(ih-(2*is))+'px;">'+
							'<v:fill src="'+canvas.source+'" type="frame" />'+
						'</v:roundrect>'
						+'<v:shape'+
						' strokeweight="0"'+
						' stroked="f"'+
						' filled="t"'+
						' fillcolor="#ffffff"'+
						' coordorigin="0,0"'+
						' coordsize="'+(iw-(2*os)-(2*is))+','+(ih-(2*os)-is)+'"'+
						' path="'+path+'"'+
						' style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:'+os+'px;left:'+(os+is)+'px;width:'+(iw-(2*os)-(2*is))+'px;height:'+(ih-(2*os)-is)+'px;">'+
							'<v:fill color="#ffffff" opacity="'+(ishade*0.9)+'" />'+
						'</v:shape></v:group>';
					}else {
						foot = '<v:roundrect'+
						' arcsize="'+r+'%"'+
						' strokeweight="0"'+
						' filled="t"'+
						' stroked="f"'+
						' fillcolor="#ffffff"'+
						' style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:0px;left:'+is+'px;width:'+(iw-(2*is))+'px;height:'+(ih-(2*is))+'px;">'+
							'<v:fill src="'+canvas.source+'" type="frame" />'+
						'</v:roundrect>'
						+'<v:roundrect'+
						' arcsize="'+(sr*2)+'%"'+
						' strokeweight="0"'+
						' filled="t"'+
						' stroked="f"'+
						' fillcolor="#ffffff"'+
						' style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:'+os+'px;left:'+(os+is)+'px;width:'+(iw-(2*os)-(2*is))+'px;height:'+((ih/2)-os-is)+'px;">'+
							'<v:fill'+
							' method="linear"'+
							' type="gradient"'+
							' angle="0"'+
							' color="#ffffff"'+
							' opacity="'+(ishade*0.25)+'"'+
							' color2="#ffffff"'+
							' o:opacity2="'+(ishade*1.5)+'" />'+
						'</v:roundrect>'+
						'<v:roundrect'+
						' arcsize="'+(r*2)+'%"'+
						' strokeweight="0"'+
						' filled="t"'+
						' stroked="f"'+
						' fillcolor="#000000"'+
						' style="zoom:1;'+
							'margin:0;'+
							'padding:0;'+
							'display:block;'+
							'position:absolute;'+
							'top:'+((ih/2)-is)+'px;'+
							'left:'+is+'px;'+
							'width:'+(iw-(2*is))+'px;'+
							'height:'+((ih/2)-is)+'px;">'+
								'<v:fill method="sigma" type="gradient" angle="180" color="#000000" opacity="0" color2="#000000" o:opacity2="'+ishade+'" />'+
						'</v:roundrect></v:group>';
					}
					canvas.innerHTML = head+shine+fill+foot;
					if(typeof window[callback]==='function') {window[callback](canvas.id,'cvi_glossy');}
				}
			}else {
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
					if(!noshadow) {glossyShadow(context,0,0,iw,ih,iradius,ishadow);}
					context.save();
					if(!isNaN(icolor)&&window.opera) {
						context.globalCompositeOperation = "destination-out";
						context.save();
						roundedRect(context,is,0,iw-(is*2),ih-(is*2),r);
						context.fillStyle='rgba(0,0,0,1)'; context.fill(); context.clip(); 
						context.clearRect(0,0,iw,ih);
						context.restore();
						roundedRect(context,is,0,iw-(is*2),ih-(is*2),r);
						context.clip(); context.globalCompositeOperation = "source-over";
					}else {
						roundedRect(context,is,0,iw-(is*2),ih-(is*2),r);
						context.clip();
					}
					if(isNaN(icolor)) {
						if(isNaN(icolor2)) {
							if(igradient=='h') {
								style = context.createLinearGradient(0,0,iw,0);
							}else if(igradient=='d') {
								style = context.createLinearGradient(0,0,iw-(is*2),ih-(is*2));
							}else {
								style = context.createLinearGradient(0,0,0,ih-(is*2));
							}
							style.addColorStop(0,icolor); 
							style.addColorStop(1,icolor2);
							context.beginPath();
							context.rect(0,0,iw,ih-(is*2));
							context.closePath();
							context.fillStyle = style;
							context.fill();
						}else {
							context.fillStyle = icolor;
							context.fillRect(0,0,iw,ih-(is*2));
						}
					}else {
						context.clearRect(0,0,iw,ih);
					}
					if(alternate) {
						context.drawImage(source,2,2,iw,ih,is,0,iw-(is*2),ih-(is*2));
					}else {
						context.drawImage(img,is,0,iw-(is*2),ih-(is*2));
					}
					if(nogradient) {
						addPlain(context,os+is,os,iw-(2*(os+is)),(ih/2)-os-is,sr,ishade*0.9,grade);
					}else {
						addBright(context,os+is,os,iw-(2*(os+is)),(ih/2)-os,sr,ishade*1.5);
						addDark(context,is,(ih/2)-is,iw-(2*is),(ih/2)-is,sr,ishade);
					}
					if(!noradius) {addFrame(context,is,0,iw-(is*2),ih-(is*2),r,ishade*0.5);}
					context.restore();
					if(typeof window[callback]==='function') {window[callback](canvas.id,'cvi_glossy');}
				}
				img.src = canvas.source;
			}
		} catch (e) {
		}
	}

};


	
	
})(jQuery);