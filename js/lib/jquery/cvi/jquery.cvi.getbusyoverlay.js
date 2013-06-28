(function($){
	


function onIEWinResize(event) {
	function parseWidth(val) {return (isNaN(parseInt(val,10))?0:parseInt(val,10));}
	if(!event) {event=window.event;} var i,cs,parent=this, div=parent.getElementsByTagName("div");
	if(div.length>0) {if(parent.currentStyle){cs=parent.currentStyle;}else if(document.defaultView&&document.defaultView.getComputedStyle){cs=document.defaultView.getComputedStyle(parent,"");}else{cs=parent.style;}
		for(i=0; i<div.length; i++) {if(div[i].className=='buzy_ele') {
				div[i].style.height=(parent.offsetHeight-parseWidth(cs.borderBottomWidth)-parseWidth(cs.borderTopWidth));
				div[i].style.width=(parent.offsetWidth-parseWidth(cs.borderLeftWidth)-parseWidth(cs.borderRightWidth)); 
				div[i].firstChild.style.height=div[i].style.height; div[i].firstChild.style.width=div[i].style.width; 
				break;
			}
		}
	}
}
function onIEVPResize(event) {
	if(!event) {event=window.event;} var vp=document.getElementById('viewport'); if(vp) {
		if(typeof document.documentElement!='undefined') {vp.style.width=document.documentElement.clientWidth+'px'; vp.style.height=document.documentElement.clientHeight+'px';}
		else {vp.style.width=document.getElementsByTagName('body')[0].clientWidth+'px'; vp.style.height=document.getElementsByTagName('body')[0].clientHeight+'px';}
	}
}
function onIEVPScroll(event) {
	if(!event) {event=window.event;} var vp=document.getElementById('viewport'); if(vp) {
		if(typeof document.documentElement!='undefined') {vp.style.left=document.documentElement.scrollLeft+'px'; vp.style.top=document.documentElement.scrollTop+'px';}
		else {vp.style.left=document.getElementsByTagName('body')[0].scrollLeft+'px'; vp.style.top=document.getElementsByTagName('body')[0].scrollTop+'px';}
	}
}
















function getBusyVL(obj, cl, sz, tp, ir, w, ct, sp, mo) {
	function getHEX(v) {
		var col = v || '#000000';
		if (!col.match(/^#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]$/i)) {
			if (v.match(/^#[0-9a-f][0-9a-f][0-9a-f]$/i)) {
				col = '#' + v.substr(1, 1) + v.substr(1, 1) + v.substr(2, 1) + v.substr(2, 
				1) + v.substr(3, 1) + v.substr(3, 1);
			}
		}
		return col;
	}
	var running = false, os = 0, al = 0, f = 100, c, i, h, p, t, x, y, hs, qs, hw, qw, rp, 
	sh, fl, ele = new Array();
	c = getHEX(cl);
	tp = tp || "t";
	t = (tp.match(/^[coprt]/i) ? tp.substr(0, 1).toLowerCase() : 't');
	ct = Math.max(5, Math.min(36, ct || 12));
	sp = Math.max(30, Math.min(1000, sp || 96));
	sz = Math.max(16, Math.min(512, sz || 32));
	ir = Math.max(1, Math.min((sz  / 2) - 2, ir || sz  / 4));
	w = Math.max(1, Math.min((sz  / 2) - ir, w || sz  / 10));
	mo = Math.max(0, Math.min(0.5, mo || 0.25));
	h = (sz  / 2) - ir;
	x = sz  / 2;
	y = x;
	al = 360  / ct;
	hs = parseInt((sz  / 2) * f);
	qs = parseInt(hs  / 2);
	hw = parseInt((w  / 2) * f);
	qw = parseInt(hw  / 2);
	rp = hs - parseInt(ir * f);
	switch (t) {
		case "c":
			p = 'm ' + hs + ',' + (rp - hw) + ' ar ' + (hs - hw) + ',' + (rp - hw - hw) + ',' + (hs + hw) + ',' + rp + ',' + (hs - hw) + ',' + (rp - hw - hw) + ',' + (hs - hw) + ',' + (rp - hw - hw) + ' e';
			break;
		case "p":
			p = 'm ' + (hs - qw) + ',0 l ' + (hs - hw) + ',' + rp + ',' + (hs + hw) + ',' + rp + ',' + (hs + qw) + ',0 x e';
			break;
		case "o":
			p = 'm ' + hs + ',' + (rp - qs) + ' ar ' + (hs - hw) + ',0,' + (hs + hw) + ',' + rp + ',' + (hs - hw) + ',0,' + (hs - hw) + ',0 e';
			break;
		case "t":
			p = 'm ' + (hs - hw) + ',' + rp + ' l ' + (hs - hw) + ',' + hw + ' qy ' + hs + ',0 qx ' + (hs + hw) + ',' + hw + ' l ' + (hs + hw) + ',' + rp + ' x e';
			break;
		default:
			p = 'm ' + (hs - hw) + ',0 l ' + (hs - hw) + ',' + rp + ',' + (hs + hw) + ',' + rp + ',' + (hs + hw) + ',0 x e';
			break;
	}
	for (i = 0; i < ct; i++) {
		sh = document.createElement('v:shape');
		sh.setAttribute('filled', 't');
		sh.setAttribute('stroked', 'f');
		sh.setAttribute('coordorigin', '0,0');
		sh.setAttribute('coordsize', (sz * f) + ',' + (sz * f));
		sh.setAttribute('path', p);
		$(sh).css({
			rotation : (i * al), position : 'absolute', margin : '0px', width : sz + 'px', 
			height : sz + 'px', top : '-1px', left : '-1px' 
		});
		obj.appendChild(sh);
		fl = document.createElement('v:fill');
		fl.setAttribute('opacity', Math.min(1, Math.max(mo, 1 - ((ct + 1 - i)  / (ct + 1)))));
		fl.setAttribute('color', c);
		sh.appendChild(fl);
		ele[i] = fl;
	}
	function nextLoop(){
		if (!running) {
			return;
		}
		os = (os + 1) % ct;
		if (document.documentMode == 8) {
			for (i = 0; i < ct; i++) {
				al = ((os + i) % ct);
				ele[al].opacity = Math.min(1, Math.max(mo, 1 - ((ct + 1 - i)  / (ct + 1))));
			}
		} else {
			for (i = 0; i < ct; i++) {
				al = ((os + i) % ct);
				ele[al].setAttribute('opacity', Math.min(1, Math.max(mo, 1 - ((ct + 1 - i)  / (ct + 1)))));
			}
		}
		setTimeout(nextLoop, sp);
	}
	nextLoop(0);
	return {
		start : function (){
			if (!running) {
				running = true;
				nextLoop(0);
			}
		},
		stop : function (){
			running = false;
			for (i = 0; i < ct; i++) {
				ele[i].setAttribute('opacity', 0);
			}
		},
		pause : function (){
			running = false;
		}
	};
};
function getBusyCV(obj, cl, sz, tp, ir, w, ct, sp, mo) {
	var ctx = obj.getContext("2d");
	function getRGB(v){
		function hex2dec(h){
			return (Math.max(0, Math.min(parseInt(h, 16), 255)));
		}
		var r = 0, g = 0, b = 0;
		v = v || '#000';
		if (v.match(/^#[0-9a-f][0-9a-f][0-9a-f]$/i)) {
			r = hex2dec(v.substr(1, 1) + v.substr(1, 1)), g = hex2dec(v.substr(2, 1) + v.substr(2, 
			1)), b = hex2dec(v.substr(3, 1) + v.substr(3, 1));
		} else if (v.match(/^#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]$/i)) {
			r = hex2dec(v.substr(1, 2)), g = hex2dec(v.substr(3, 2)), b = hex2dec(v.substr(5, 
			2));
		}
		return r + ',' + g + ',' + b;
	}
	function drawOval(ctx, w, h){
		ctx.beginPath();
		ctx.moveTo(-w  / 2, h  / 2);
		ctx.quadraticCurveTo(-w  / 2, 0, 0, 0);
		ctx.quadraticCurveTo(w  / 2, 0, w  / 2, h  / 2);
		ctx.quadraticCurveTo(w  / 2, h, 0, h);
		ctx.quadraticCurveTo(-w  / 2, h, - w  / 2, h  / 2);
		ctx.fill();
	}
	function drawTube(ctx, w, h){
		ctx.beginPath();
		ctx.moveTo(w  / 2, 0);
		ctx.lineTo(-w  / 2, 0);
		ctx.lineTo(-w  / 2, h - (w  / 2));
		ctx.quadraticCurveTo(-w  / 2, h, 0, h);
		ctx.quadraticCurveTo(w  / 2, h, w  / 2, h - (w  / 2));
		ctx.fill();
	}
	function drawPoly(ctx, w, h){
		ctx.beginPath();
		ctx.moveTo(w  / 2, 0);
		ctx.lineTo(-w  / 2, 0);
		ctx.lineTo(-w  / 4, h);
		ctx.lineTo(w  / 4, h);
		ctx.fill();
	}
	function drawCirc(ctx, w, z){
		var r = w/2;
		ctx.beginPath();
		ctx.arc(r, r, r, 0, Math.PI * 2, false);
		ctx.fill();
	}
	var running = false, os = 0, al = 0, c, i, h, t, x, y;
	c = getRGB(cl);
	tp = tp || "t";
	t = (tp.match(/^[coprt]/i) ? tp.substr(0, 1).toLowerCase() : 't');
	ct = Math.max(5, Math.min(36, ct || 12));
	sp = Math.max(30, Math.min(1000, sp || 96));
	sz = Math.max(16, Math.min(512, sz || 32));
	ir = Math.max(1, Math.min((sz  / 2) - 2, ir || sz  / 4));
	w = Math.max(1, Math.min((sz  / 2) - ir, w || sz  / 10));
	mo = Math.max(0, Math.min(0.5, mo || 0.25));
	h = (sz  / 2) - ir;
	x = sz  / 2;
	y = x;
	function nextLoop(){
		if (!running) {
			return;
		}
		os = (os + 1) % ct;
		ctx.clearRect(0, 0, sz, sz);
		ctx.save();
		ctx.translate(x, y);
		for (i = 0; i < ct; i++) {
			al = 2 * ((os + i) % ct) * Math.PI  / ct;
			ctx.save();
			ctx.translate(ir * Math.sin(-al), ir * Math.cos(-al));
			ctx.rotate(al);
			ctx.fillStyle = 'rgba(' + c + ',' + Math.min(1, Math.max(mo, 1 - ((ct + 1 - i)  / (ct + 1)))) + ')';
			switch (t) {
				case "c":
					drawCirc(ctx, w, h);
					break;
				case "o":
					drawOval(ctx, w, h);
					break;
				case "p":
					drawPoly(ctx, w, h);
					break;
				case "t":
					drawTube(ctx, w, h);
					break;
				default:

					ctx.fillRect(-w  / 2, 0, w, h);
					break;
			}
			ctx.restore();
		}
		ctx.restore();
		setTimeout(nextLoop, sp);
	}
	nextLoop(0);
	return {
		start : function (){
			if (!running) {
				running = true;
				nextLoop(0);
			}
		},
		stop : function (){
			running = false;
			ctx.clearRect(0, 0, sz, sz);
		},
		pause : function (){
			running = false;
		}
	};
};
function getBusy(obj, cl, sz, tp, ir, w, ct, sp, mo) {
	function getHEX(v) {
		var col = v || '#000000';
		if (!col.match(/^#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]$/i)) {
			if (v.match(/^#[0-9a-f][0-9a-f][0-9a-f]$/i)) {
				col = '#' + v.substr(1, 1) + v.substr(1, 1) + v.substr(2, 1) + v.substr(2, 
				1) + v.substr(3, 1) + v.substr(3, 1);
			}
		}
		return col;
	}
	var running = false, i = 0, os = 0, al = 0, f = 100, c, h, p, t, x, y, v, hp, ph, sh, 
	ele = new Array();
	c = getHEX(cl);
	tp = tp || "t";
	t = (tp.match(/^[coprt]/i) ? tp.substr(0, 1).toLowerCase() : 't');
	ct = Math.max(5, Math.min(36, ct || 12));
	sp = Math.max(30, Math.min(1000, sp || 96));
	sz = Math.max(16, Math.min(512, sz || 32));
	ir = Math.max(1, Math.min((sz  / 2) - 2, ir || sz  / 4));
	w = Math.max(1, Math.min((sz  / 2) - ir, w || sz  / 10));
	mo = Math.max(0, Math.min(0.5, mo || 0.25));
	al = 360  / ct;
	hp = (Math.PI  / 2) *- 1;
	ph = Math.PI  / 180;
	w = (t != 'c' ? parseInt((w  / 2) * 3) : w);
	v = parseInt((sz  / 2) - (w  / 2));
	for (i = 0; i < ct; i++) {
		sh = document.createElement('div');
		x = Math.round(v + v * Math.cos(hp + (i + 1) * al * ph));
		y = Math.round(v + v * Math.sin(hp + (i + 1) * al * ph));
		$(sh).css({
			position : 'absolute', margin : '0px', width : w + 'px', height : w + 'px', lineHeight : '1px', 
			fontSize : '0px', top : y + 'px', left : x + 'px', backgroundColor : c, opacity : Math.min(1, 
			Math.max(mo, 1 - ((ct + 1 - i)  / (ct + 1)))) 
		});
		obj.appendChild(sh);
		ele[i] = sh;
	}
	function nextLoop(){
		if (!running) {
			return;
		}
		os = (os + 1) % ct;
		for (i = 0; i < ct; i++){
			al = ((os + i) % ct);
			$(ele[al]).css({
				opacity : Math.min(1, Math.max(mo, 1 - ((ct + 1 - i)  / (ct + 1))))
			});
		}
		setTimeout(nextLoop, sp);
	}
	nextLoop(0);
	return {
		start : function (){
			if (!running) {
				running = true;
				nextLoop(0);
			}
		},
		stop : function (){
			running = false;
			for (i = 0; i < ct; i++) {
				$(ele[i]).css({
					opacity : 0
				});
			}
		},
		pause : function (){
			running = false;
		}
	};
};
/**
 * cvi_busy_lib.js 1.3 (14-Aug-2010) (c) by Christian Effenberger 
 * All Rights Reserved. Source: busy.netzgesta.de
 * Distributed under Netzgestade Software License Agreement.
 * This license permits free of charge use on non-commercial 
 * and private web sites only under special conditions. 
 * Read more at... http://www.netzgesta.de/cvi/LICENSE.txt
 * syntax:
 
 Add:
	OBJECT = getBusyOverlay(parent[,overlay[,busy]]);

	parent		== element to add the overlay (e.g. document.getElementById(id) or 'viewport')

	overlay 	== OBJECT e.g. {color: 'black', opacity: 0.5, ...}
		color	== STR 'black' or '#000000' or 'rgb(0,0,0)' Default: 'white'
		opacity	== FLOAT 0.0 - 1.0  Default: 0.0
		text	== STR e.g. "loading" Default: ''
		style	== STR e.g. "color: black;" or "my_text_class" Default: ''

	busy		== OBJECT e.g. {color: '#fff', size: 48, ...}
		color	== STR '#000000' - '#ffffff' or '#000' - '#fff' Default: '#000'
		size	== INT 16 - 512 (pixel) Default: 32
		type	== STR 'circle|oval|polygon|rectangle|tube' or 'c|o|p|r|t' Default: 'tube'
		iradius	== INT 6 - 254 (pixel) Default: 8
		weight	== INT 1 - 254 (pixel) Default: 3
		count	== INT 5 - 36 (rays) Default: 12
		speed	== INT 30 - 1000 (millisec) Default: 96
		minopac	== FLOAT 0.0 - 0.5  Default: 0.25

 Remove:
	OBJECT.remove();
	
 Set Overlay text:
	OBJECT.settext(string);

 *
**/
$.cvi.getBusyOverlay=function (parent,overlay,busy) {
		
		try{
////////////////////getBusyOverlay>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
if ((typeof (parent) === 'object' || parent == 'viewport') && document.getElementsByTagName) {
	function parseWidth(val) {
		return (isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10));
	}
	var isIE, isVL, isCV, isWK, isGE, i, b, o, lt, rt, lb, rb, cz, cs, size, viewport, inner, outer, string, 
	canvas, context, ctrl, opacity, color, text, styles, waiting = true;
	if (parent == 'viewport') {
		viewport = document.getElementById('viewport');
		if (!viewport) {
			viewport = document.createElement('div');
			viewport.id = 'viewport';
			cz = viewport.style;
			$(viewport).css({
				backgroundColor : 'transparent', position : 'fixed', overflow : 'hidden', display : 'block', 
				zIndex : 999999, left : '0px', top : '0px', zoom : 1, width : '100%', height : '100%', 
				margin : '0px', padding : '0px' 
			});
			if (!SUPPORT_CANVAS) {
				cz.position = 'absolute';
				cz.width = (document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth) + 'px';
				cz.height = (document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight) + 'px';
			}
			document.getElementsByTagName("body")[0].appendChild(viewport);
		} else {
			viewport.style.display = 'block';
			if (!SUPPORT_CANVAS) {
				viewport.style.width = (document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth) + 'px';
				viewport.style.height = (document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight) + 'px';
			}
		}
		parent = viewport;
	}
	cs = parent.currentStyle || document.defaultView.getComputedStyle(parent, "") || parent.style;
	while (cs.display.search(/block|inline-block|table|inline-table|list-item/i) < 0) {
		parent = parent.parentNode;
		/*if (parent.currentStyle) {
			cs = parent.currentStyle;
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			cs = document.defaultView.getComputedStyle(parent, "");
		} else {
			cs = parent.style;
		}*/
		cs = parent.currentStyle || document.defaultView.getComputedStyle(parent, "") || parent.style;
		if (parent.tagName.toUpperCase() == 'BODY') {
			parent = "";
		}
	}
	if (typeof (parent) === 'object') {
		if (!overlay) {
			overlay = new Object();
			overlay['opacity'] = 0;
			overlay['color'] = 'white';
			overlay['text'] = '';
			overlay['style'] = '';
		}
		if (!busy) {
			busy = new Object();
			busy['size'] = 32;
			busy['color'] = '#000';
			busy['type'] = 'tube';
			busy['iradius'] = 8;
			busy['weight'] = 3;
			busy['count'] = 12;
			busy['speed'] = 96;
			busy['minopac'] = .25;
		}
		opacity = Math.max(0.0, Math.min(1.0, (typeof overlay['opacity'] === 'number' ? overlay['opacity'] : 0) || 0));
		color = (typeof overlay['color'] === 'string' ? overlay['color'] : 'white');
		text = (typeof overlay['text'] === 'string' ? overlay['text'] : '');
		styles = (typeof overlay['style'] === 'string' ? overlay['style'] : '');
		canvas = document.createElement("canvas");
		isCV = canvas.getContext ? 1 : 0;
		isWK = navigator.userAgent.indexOf('WebKit') > - 1 ? 1 : 0;
		isGE = navigator.userAgent.indexOf('Gecko') > - 1 && window.updateCommands ? 1 : 0;
		isIE = navigator.appName == 'Microsoft Internet Explorer' && window.navigator.systemLanguage && !window.opera && (!document.documentMode || document.documentMode < 9) ? 1 : 0;
		isVL = document.all && document.namespaces && (!document.documentMode || document.documentMode < 9) ? 1 : 0;
		outer = document.createElement('div');
		parent.style.position = (cs.position == 'static' ? 'relative' : cs.position);
		cz = parent.style.zIndex >= 0 ? (parent.style.zIndex - 0 + 2) : 2;
		if (isIE && !cs.hasLayout) {
			parent.style.zoom = 1;
		}
		$(outer).css({
			position : 'absolute', overflow : 'hidden', display : 'block', zIndex : cz, left : 0 + 'px', 
			top : 0 + 'px', width : '100%', height : '100%' 
		});
		//alert('here')
		if (isIE) {
			outer.className = 'buzy_ele';
			$(outer).css({
				zoom:1,
				margin:'0px',
				padding:'0px',
				height:(parent.offsetHeight - parseWidth(cs.borderBottomWidth) - parseWidth(cs.borderTopWidth)),
				width:(parent.offsetWidth - parseWidth(cs.borderLeftWidth) - parseWidth(cs.borderRightWidth))
			});
		}
		lt = parseFloat(cs.borderTopLeftRadius) - Math.min(parseFloat(cs.borderLeftWidth), parseFloat(cs.borderTopWidth));
		rt = parseFloat(cs.borderTopRightRadius) - Math.min(parseFloat(cs.borderRightWidth), parseFloat(cs.borderTopWidth));
		lb = parseFloat(cs.borderBottomLeftRadius) - Math.min(parseFloat(cs.borderLeftWidth), parseFloat(cs.borderBottomWidth));
		rb = parseFloat(cs.borderBottomRightRadius) - Math.min(parseFloat(cs.borderRightWidth), parseFloat(cs.borderBottomWidth));
		$(outer).css({
			borderTopLeftRadius : lt + "px", borderTopRightRadius : rt + "px", borderBottomLeftRadius : lb + "px", 
			borderBottomRightRadius : rb + "px" 
		});
		parent.appendChild(outer);
		inner = document.createElement('div');
		$(inner).css({
			position : 'absolute', cursor : 'progress', display : 'block', zIndex : (cz - 1), left : 0 + 'px', 
			top : 0 + 'px', width : 100 + '%', height : 100 + '%', backgroundColor : color 
		});
		if (isIE) {
			$(inner).css({
				zoom:1,
				margin:'0px',
				padding:'0px',
				height:outer.style.height,
				width:outer.style.width
			});
		}
		$(inner).css({
			borderTopLeftRadius:lt + "px",
			borderTopRightRadius:rt + "px",
			borderBottomLeftRadius:lb + "px",
			borderBottomRightRadius:rb + "px",
			opacity:opacity
		});
		outer.appendChild(inner);
		size = Math.max(16, Math.min(512, (typeof busy['size'] === 'number' ? (busy['size'] == 0 ? 32 : busy['size']) : 32)));
		if (isVL){
			$.cvi.VML_NAMESPACES();
		}
		if (!isCV) {
			canvas = document.createElement("div");
		}
		$(canvas).css({
			position : 'absolute', cursor : 'progress', zIndex : (cz - 0 + 1), top : '50%', left : '50%', 
			marginTop : '-' + (size  / 2) + 'px', marginLeft : '-' + (size  / 2) + 'px' 
		});
		canvas.width = size;
		canvas.height = size;
		canvas.style.width = size + "px";
		canvas.style.height = size + "px";
		outer.appendChild(canvas);
		if (text != ""){
			string = document.createElement('div');
			$(string).css({
				position : 'absolute', overflow : 'hidden', cursor : 'progress', zIndex : (cz - 0 + 1), 
				top : '50%', left : '0px', marginTop : 2 + (size  / 2) + 'px', textAlign : 'center', width : 100 + '%', 
				height : 'auto' 
			});
			string.innerHTML = '<span'+((styles != "")?(' ' + (styles.match(/:/i) ? 'style' : 'class') + '="' + styles + '"'):'')+'>' + text + '</span>';
			outer.appendChild(string);
		}
		if (isGE){
			outer.style.MozUserSelect = "none";
			inner.style.MozUserSelect = "none";
			canvas.style.MozUserSelect = "none";
		} else if (isWK){
			outer.style.KhtmlUserSelect = "none";
			inner.style.KhtmlUserSelect = "none";
			canvas.style.KhtmlUserSelect = "none";
		} else if (isIE) {
			outer.unselectable = "on";
			inner.unselectable = "on";
			canvas.unselectable = "on";
		}
		var getTheBusy = null;
		if (isVL){
			getTheBusy = getBusyVL;
		} else if (isCV){
			getTheBusy = getBusyCV;
		} else {
			getTheBusy = getBusy;
		}
		ctrl = getTheBusy(canvas, busy['color'], busy['size'], busy['type'], busy['iradius'], busy['weight'], busy['count'], busy['speed'], busy['minopac']);
		ctrl.start();
		if (isIE) {
			parent.onresize = onIEWinResize;
			if (parent.id == 'viewport' && !window.XMLHttpRequest) {
				window.onresize = onIEVPResize;
				window.onscroll = onIEVPScroll;
			}
		}
		return {
			remove : function (){
				if (waiting){
					waiting = false;
					ctrl.stop();
					delete ctrl;
					parent.removeChild(outer);
					if (parent.id == 'viewport') {
						parent.style.display = 'none';
					}
				}
			},
			settext : function (v){
				if (string && typeof (v) == 'string') {
					string.firstChild.innerHTML = v;
					return false;
				}
			}
		};
	}
}


		
///////////////////////////////////getBusyOverlay<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<		
		
		}catch(e){
			try{
				console.log(e.message);
			}catch(e){}
		}
	};







	
	
})(jQuery);