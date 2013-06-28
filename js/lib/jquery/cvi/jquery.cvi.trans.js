;define("jquery/cvi/jquery.cvi.trans", ["./jquery.cvi.tfx","./jquery.cvi.tween","./jquery.cvi.rfx",'./jquery.cvi'],function(require, exports, module) {
	




/**
 * cvi_trans_lib.js 1.3 (12-Jan-2011) (c) by Christian Effenberger 
 * All Rights Reserved. Source: transm.netzgesta.de
 * This library is part of and supports only: TransM.js
 * Distributed under Netzgestade Software License Agreement.
 * This license permits free of charge use on non-commercial 
 * and private web sites only under special conditions. 
 * Read more at... http://www.netzgesta.de/cvi/LICENSE.html	
 * Commercial licenses available via... cvi[at]netzgesta[dot]de	
**/

/////////////////////////stuff function>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function shuffle(){
	var t, r, i;
	for (i = 0; i != this.length; i++) {
		r = Math.floor(Math.random() * this.length);
		t = this [i];
		this [i] = this [r];
		this [r] = t;
	}
};
function log(v, e){
	if (window.console) {
		window.console.log(v + e)
	} else if (window.opera) {
		opera.postError(v + e)
	} else {
		window.document.title = v + e
	}
	return false;
};
function getInt(o, v, t){
	return (Math.min(Math.max(o || v, cvi_tfx[t].min), cvi_tfx[t].max) || cvi_tfx[t].val);
};
function getRGB(v){
	function hex2dec(h){
		return (Math.max(0, Math.min(parseInt(h, 16), 255)))
	}
	var r = 0, g = 0, b = 0;
	v = v || '#fff';
	if (v.match(/^#[0-9a-f]{3}$/i)){
		r = hex2dec(v.substr(1, 1) + v.substr(1, 1)), g = hex2dec(v.substr(2, 1) + v.substr(2, 
		1)), b = hex2dec(v.substr(3, 1) + v.substr(3, 1))
	} else if (v.match(/^#[0-9a-f]{6}$/i)) {
		r = hex2dec(v.substr(1, 2)), g = hex2dec(v.substr(3, 2)), b = hex2dec(v.substr(5, 2))
	}
	return r + ',' + g + ',' + b
};
////////////////////////////stuff function<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



var cvi_tfx = require("./jquery.cvi.tfx"), cvi_tween  = require("./jquery.cvi.tween"), cvi_rfx  = require("./jquery.cvi.rfx");

var cvi_trans = {};
cvi_trans.version =1.3;
cvi_trans.released ='2011-01-15 12:00:00';
cvi_trans.duration = 2.0;
cvi_trans.fps = 30;
cvi_trans.vml = !require('./jquery.cvi').SUPPORT_CANVAS;
cvi_trans.play = function (callback, canvas, img_a, img_b, alpha, layer, opt1, opt2, trans, tween, cpa, dur, 
fps){
	Array.prototype.shuffle = shuffle;
	if (canvas && !canvas.TLbusy){
		if (trans === 'random') {
			trans = cvi_rfx[Math.floor(Math.random() * cvi_rfx.length)]
		}
		trans = (typeof cvi_tfx[trans] === 'object' ? trans : 'fade');
		if (cvi_trans.vml && cvi_tfx[trans].fail) {
			trans = cvi_tfx[trans].fail
		}
		dur = Math.min(Math.max(parseFloat(dur) || cvi_trans.duration, 0.5), 5.0) || cvi_trans.duration;
		var efx = trans.split("_") || ['fade'];
		var timer = {
			d : null, t : null,
			start : function (){
				timer.d = new Date();
				timer.t = timer.d.getTime();
			},
			stop : function (){
				timer.d = new Date();
				return (timer.d.getTime() - timer.t);
			}
		};
		if (cvi_trans.vml){
			var filter = null, ftrans = null, DXIT = "DXImageTransform.Microsoft.", w = parseInt(canvas.style.width), 
			h = parseInt(canvas.style.height);
			try{
				canvas.TLbusy = true;
				canvas.TLerror = null;
				if (efx[0] == "barn"){
					var pos = efx[1] || "horizontal", dir = efx[2] || "out";
					canvas.TLfilter = filter = DXIT + "Barn";
					ftrans = "progid:" + filter + "(duration=" + dur + ",motion=" + dir + ",orientation=" + pos + ")"
				} else if (efx[0] == "blinds"){
					var dir = efx[1] || "down", o = parseInt(getInt(opt1, 8, trans), 10);
					canvas.TLfilter = filter = DXIT + "Blinds";
					ftrans = "progid:" + filter + "(duration=" + dur + ",direction=" + dir + ",bands=" + o + ")"
				} else if (efx[0] == "checkerboard"){
					var dir = efx[1] || "right", x = parseInt(getInt(opt1, 8, trans), 10), y = parseInt(getInt(opt2, 
					x, trans), 10);
					canvas.TLfilter = filter = DXIT + "CheckerBoard";
					ftrans = "progid:" + filter + "(duration=" + dur + ",squaresX=" + x + ",squaresY=" + y + ",Direction=" + dir + ")"
				} else if (efx[0] == "cut"){
					canvas.TLfilter = filter = DXIT + "Fade";
					ftrans = "progid:" + filter + "(duration=0.01,overlap=1.0)"
				} else if (efx[0] == "fade"){
					var o = parseFloat(getInt(opt1, 100, trans) / 100);
					canvas.TLfilter = filter = DXIT + "Fade";
					ftrans = "progid:" + filter + "(duration=" + dur + ",overlap=" + o + ")"
				} else if (efx[0] == "gradientwipe"){
					var dir = efx[1] || "right", o = parseFloat(getInt(opt1, 25, trans) / 100), v = (dir == 'left' || dir == 'right' ? 0 : 1), 
					r = (dir == 'left' || dir == 'up' ? 'reverse' : 'forward');
					canvas.TLfilter = filter = DXIT + "GradientWipe";
					ftrans = "progid:" + filter + "(duration=" + dur + ",gradientSize=" + o + ",motion=" + r + ",WipeStyle=" + v + ")"
				} else if (efx[0] == "inset") {
					canvas.TLfilter = filter = DXIT + "Inset";
					ftrans = "progid:" + filter + "(duration=" + dur + ")"
				} else if (efx[0] == "iris"){
					var typ = efx[1].toUpperCase() || "PLUS", dir = efx[2] || "out";
					canvas.TLfilter = filter = DXIT + "Iris";
					ftrans = "progid:" + filter + "(duration=" + dur + ",irisStyle=" + typ + ",motion=" + dir + ")"
				} else if (efx[0] == "pixelate"){
					var o = parseInt(getInt(opt1, 40, trans), 10);
					canvas.TLfilter = filter = DXIT + "Pixelate";
					ftrans = "progid:" + filter + "(duration=" + dur + ",maxSquare=" + o + ")"
				} else if (efx[0] == "radialwipe"){
					var typ = efx[1].toUpperCase() || "CLOCK";
					canvas.TLfilter = filter = DXIT + "RadialWipe";
					ftrans = "progid:" + filter + "(duration=" + dur + ",wipeStyle=" + typ + ")"
				} else if (efx[0] == "randombars"){
					var typ = efx[1] || "horizontal";
					canvas.TLfilter = filter = DXIT + "RandomBars";
					ftrans = "progid:" + filter + "(duration=" + dur + ",orientation=" + typ + ")"
				} else if (efx[0] == "randomdissolve"){
					canvas.TLfilter = filter = DXIT + "RandomDissolve";
					ftrans = "progid:" + filter + "(duration=" + dur + ")"
				} else if (efx[0] == "slide"){
					var typ = efx[1].toUpperCase() || "HIDE", o = parseInt(getInt(opt1, 1, trans), 
					10);
					canvas.TLfilter = filter = DXIT + "Slide";
					ftrans = "progid:" + filter + "(duration=" + dur + ",slideStyle=" + typ + ",bands=" + o + ")"
				} else if (efx[0] == "spiral"){
					var x = parseInt(getInt(opt1, 8, trans), 10), y = parseInt(getInt(opt2, x, trans), 
					10);
					canvas.TLfilter = filter = DXIT + "Spiral";
					ftrans = "progid:" + filter + "(duration=" + dur + ",gridsizex=" + x + ",gridsizey=" + y + ")"
				} else if (efx[0] == "stretch"){
					var typ = efx[1].toUpperCase() || "HIDE";
					typ = typ == 'VERTICAL' || typ == 'HORIZONTAL' ? 'SPIN' : typ;
					canvas.TLfilter = filter = DXIT + "Stretch";
					ftrans = "progid:" + filter + "(duration=" + dur + ",stretchStyle=" + typ + ")"
				} else if (efx[0] == "strips"){
					var typ = efx[1] || "leftdown";
					canvas.TLfilter = filter = DXIT + "Strips";
					ftrans = "progid:" + filter + "(duration=" + dur + ",motion=" + typ + ")"
				} else if (efx[0] == "wheel"){
					var o = parseInt(getInt(opt1, 4, trans), 10);
					canvas.TLfilter = filter = DXIT + "Wheel";
					ftrans = "progid:" + filter + "(duration=" + dur + ",spokes=" + o + ")"
				} else if (efx[0] == "zigzag"){
					var x = parseInt(getInt(opt1, 8, trans), 10), y = parseInt(getInt(opt2, x, trans), 
					10);
					canvas.TLfilter = filter = DXIT + "Zigzag";
					ftrans = "progid:" + filter + "(duration=" + dur + ",gridsizex=" + x + ",gridsizey=" + y + ")"
				}
				if (efx[0] != "" && filter != null && img_b.nw >= 8 && img_b.nh >= 8){
					canvas.style.filter = ftrans;
					canvas.filters.item(filter).apply();
					if (canvas.filters.item(filter).status == 1){
						var b, a = canvas.firstChild, pw = img_b.wm || w, ph = img_b.hm || h, xo = img_b.ox || 0, 
						yo = img_b.oy || 0;
						if (a){
							b = document.createElement(['<v:fill src="' + img_b.source + '" size="' + pw + 'pt,' + ph + 'pt" origin="' + xo + ',' + yo + '" position="0,0" aspect="ignore" type="frame" />'].join(''));
							canvas.replaceChild(b, a)
						}
						timer.start();
						canvas.filters.item(filter).play();
						if (canvas.filters.item(filter).status == 2){
							canvas.onfilterchange = function (){
								if (canvas.filters.item(filter).status == 0){
									var t = timer.stop();
									canvas.TLfilter = null;
									cvi_trans._clr(callback, trans, t, 30 * ((dur * 1000) / t), canvas)
								}
							}
						}
					}
				}
			} catch (err){
				canvas.TLerror = err.message;
				log('Error: ', err.message + ' - trans "' + trans + '" has failed!');
				cvi_trans._clr(callback, trans, 0, 0, canvas)
			}
		} else if (canvas.tagName.toUpperCase() == "CANVAS"){
			if (canvas.timer) {


				window.clearInterval(canvas.timer)
			}
			if (canvas.getContext){
				var ctx = canvas.getContext('2d'), w = parseInt(canvas.width), h = parseInt(canvas.height), 
				sba = typeof (cvi_stackblur) === "function" ? true : false, ids = false;
				try {
					var t = ctx.getImageData(0, 0, 1, 1);
					ids = true
				} catch (e) {
					ids = false
				}
				if ((!ids || !sba) && cvi_tfx[trans].noids) {
					trans = cvi_tfx[trans].noids;
					efx[0] = trans
				}
				tween = (typeof (cvi_tween[tween]) === 'function' ? tween : cvi_tfx[trans].tween && typeof (cvi_tween[cvi_tfx[trans].tween]) === 'function' ? cvi_tfx[trans].tween : 'linear');
				cpa = (cpa == null || typeof cpa !== 'object' ? [0.25, 0.1, 0.25, 1.0] : cpa);
				fps = Math.min(Math.max(parseInt(fps, 10) || cvi_trans.fps, 15), 100) || cvi_trans.fps;
				function fill(c, x, y, w, h, wc){
					if (wc) {
						c.beginPath();
						c.rect(x, y, w, h);
						c.closePath();
						c.fill()
					} else {
						c.fillRect(x, y, w, h)
					}
				};
				cvi_trans.isWC = navigator.userAgent.indexOf('WebKit') !=- 1 && !window.external && !document.defaultCharset ? 1 : 0;
				if (cvi_tfx[trans].buffer){
					var buffer = document.createElement('canvas');
					if (cvi_trans.isWC){
						with (buffer) {
							id = 'cvi_trans_buffer';
							height = h;
							width = w
						}
						with (buffer.style) {
							position = 'fixed';
							left = '-9999px';
							top = '0px';
							height = h + 'px';
							width = w + 'px'
						}
						document.body.appendChild(buffer)
					} else {
						buffer.width = w;
						buffer.height = h
					}
					var cbx = buffer.getContext('2d')
				}
				if (cvi_tfx[trans].mask){
					var mask = document.createElement('canvas');
					if (cvi_trans.isWC){
						with (mask) {
							id = 'cvi_trans_mask';
							height = h;
							width = w
						}
						with (mask.style) {
							position = 'fixed';
							left = '-9999px';
							top = '0px';
							height = h + 'px';
							width = w + 'px'
						}
						document.body.appendChild(mask)
					} else {
						mask.width = w;
						mask.height = h
					}
					var cmx = mask.getContext('2d')
				}
				if (cvi_tfx[trans].alpha){
					if (!cbx || !cmx || !alpha || alpha.width < 8 || alpha.height < 8) {
						efx[0] = "fade";
						trans = 'fade';
						opt1 = 100;
					}
				}
				var stl = '', val = 0, cnt = 0, ival = Math.round(1000 / fps), steps = Math.round((dur * 1000) / ival);
				ctx.save();
				try{
					canvas.TLbusy = true;
					canvas.TLerror = null;
					if (efx[0] == "alpha"){
						var o = parseInt(getInt(opt1, 0, trans), 10), x = o == 1 || o == 3 ? 1 : 0, 
						y = o == 2 || o == 3 ? 1 : 0, c = Math.round(steps * .5), a = 1 / c;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(img_a, 0, 0, w, h);
							cmx.clearRect(0, 0, w, h);
							if (cnt <= c){
								cmx.globalCompositeOperation = "source-over";
								if (x || y){
									cmx.save();
									cmx.translate(x ? w : 0, y ? h : 0);
									cmx.scale(x ?- 1 : 1, y ?- 1 : 1);
									cmx.drawImage(alpha, 0, 0, w, h);
									cmx.restore()
								} else {
									cmx.drawImage(alpha, 0, 0, w, h)
								}
								cmx.globalCompositeOperation = "darker";
								cmx.fillStyle = "rgba(0,0,0," + (1 - (val * a)) + ")";
								cmx.fillRect(0, 0, w, h)
							} else{
								cmx.globalAlpha = 1 - ((val - c) * a);
								cmx.globalCompositeOperation = "source-over";
								if (x || y){
									cmx.save();
									cmx.translate(x ? w : 0, y ? h : 0);
									cmx.scale(x ?- 1 : 1, y ?- 1 : 1);
									cmx.drawImage(alpha, 0, 0, w, h);
									cmx.restore()
								} else {
									cmx.drawImage(alpha, 0, 0, w, h)
								}
							}
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							cbx.drawImage(mask, 0, 0, w, h);
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "barn"){
						var pos = efx[1] || "horizontal", dir = efx[2] || "out", v = pos == "vertical" ? 1 : 0, 
						m = dir == "in" ? 1 : 0, ow = w, oh = h, ww = v ? Math.round(w / 2) : w, hh = v ? h : Math.round(h / 2), 
						s = ((v ? w : h) / (steps * 2));
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							cbx.fillStyle = "rgba(0,0,0,1.0)";
							if (m){
								ow = v ? (val * s) : 0;
								oh = v ? 0 : (val * s);
								cbx.fillRect(ow, oh, Math.max(w - (2 * ow), 1), Math.max(h - (2 * oh), 
								1))
							} else{
								ow = v ? ww - (val * s) : w;
								oh = v ? h : hh - (val * s);
								cbx.fillRect(0, 0, Math.max(ow, 1), Math.max(oh, 1));
								cbx.fillRect(w - ow, h - oh, w, h)
							}
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "blinds"){
						var q = parseInt(getInt(opt1, 8, trans), 10), dir = efx[1] || "right", hz = dir == "right" || dir == "left" ? 1 : 0, 
						r = (dir == "right" ? 1 : 0), d = (dir == "down" ? 1 : 0), ww = hz ? (w / q) : w, 
						hh = hz ? h : (h / q), sx = (ww / steps), sy = (hh / steps), s = 0;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							cbx.fillStyle = "rgba(0,0,0,1.0)";
							if (hz) {
								s = val * sx;
								for (var i = 0; i < q; i++) {
									cbx.fillRect((i * ww) + (r ? s : 0), 0, Math.max(ww - s, 1), hh)
								}
							} else {
								s = val * sy;
								for (var i = 0; i < q; i++) {
									cbx.fillRect(0, (i * hh) + (d ? s : 0), ww, Math.max(hh - s, 1))
								}
							}
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "checkerboard"){
						var gx = parseInt(getInt(opt1, 8, trans), 10), gy = parseInt(getInt(opt2, 
						gx, trans), 10), dir = efx[1] || "right", hz = (dir == 'left' || dir == 'right' ? 1 : 0), 
						r = (dir == 'right' ? 1 : 0), d = (dir == 'down' ? 1 : 0), ww = (w / gx) * (hz ? 2 : 1), 
						hh = (h / gy) * (hz ? 1 : 2), sx = (ww / steps), sy = (hh / steps), w5 = hz ? ww / 2 : 0, 
						h5 = hz ? 0 : hh / 2, s = 0, p = 0, k = 0, q = 0;
						if (hz) {
							gx = Math.ceil(gx / 2) + 1
						} else {
							gy = Math.ceil(gy / 2) + 1
						}
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							cbx.fillStyle = "rgba(0,0,0,1.0)";
							for (var y = 0; y < gy; y++){
								p = y % 2;
								for (var x = 0; x < gx; x++){
									k = x % 2;
									if (hz){
										s = val * sx;
										q = Math.max(ww - s, 1);
										if (p) {
											cbx.fillRect(((x * ww) + (r ? s : 0)) - w5, y * hh, q, 
											hh)
										} else {
											cbx.fillRect((x * ww) + (r ? s : 0), y * hh, q, hh)
										}
									} else{
										s = val * sy;
										q = Math.max(hh - s, 1);
										if (k) {
											cbx.fillRect(x * ww, ((y * hh) + (d ? s : 0)) - h5, ww, 
											q)
										} else {
											cbx.fillRect(x * ww, (y * hh) + (d ? s : 0), ww, q)
										}
									}
								}
							}
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "circles"){
						var gx = parseInt(getInt(opt1, 8, trans), 10), gy = parseInt(getInt(opt2, 
						gx, trans), 10), dir = efx[1] || "out", m = dir == "in" ? 1 : 0, ww = (w / gx), 
						hh = (h / gy), w5 = ww / 2, h5 = hh / 2, r = Math.sqrt(Math.pow(ww, 2) + Math.pow(hh, 
						2)) / 2, s = (r / steps), z = 0;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(m ? img_b : img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(m ? img_a : img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							cbx.fillStyle = "rgba(0,0,0,1.0)";
							z = Math.max(m ? val * s : r - (val * s), 1);
							for (var x = 0; x < gx; x++){
								for (var y = 0; y < gy; y++){
									cbx.beginPath();
									cbx.moveTo((x * ww) + w5, (y * hh) + h5);
									cbx.arc((x * ww) + w5, (y * hh) + h5, z, 0, Math.PI * 2, true);
									cbx.closePath();
									cbx.fill()
								}
							}
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "color"){
						var g = getRGB(opt1), c = Math.round(steps * .5), q = 1 / c, v = 0;
						s = 0;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							s = cnt <= c ? 1 : 0;
							cbx.clearRect(0, 0, w, h);
							if (s) {
								v = parseFloat(val * q);
								cbx.drawImage(img_a, 0, 0, w, h)
							} else {
								v = parseFloat((steps - val) * q);
								cbx.drawImage(img_b, 0, 0, w, h)
							}
							cbx.fillStyle = "rgba(" + g + "," + v + ")";
							cbx.fillRect(0, 0, w, h);
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "corner"){
						var pos = efx[1] || "lefttop", dir = efx[2] || "in", d90 = Math.PI / 2, angle = d90 / steps, 
						d = dir == "in" ? 1 : 0, p = pos == "righttop" ? 1 : pos == "leftbottom" ? 2 : pos == "rightbottom" ? 3 : 0, 
						z = 0;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							z = (angle * val);
							ctx.drawImage(d ? img_a : img_b, 0, 0, w, h);
							ctx.save();
							if (p == 3) {
								ctx.translate(w, h);
								ctx.rotate((d ? d90 : 0) - z);
								ctx.drawImage(d ? img_b : img_a, - w, - h, w, h)
							} else if (p == 2){
								ctx.translate(0, h);
								ctx.rotate((d ? 0 - d90 : 0) + z);
								ctx.drawImage(d ? img_b : img_a, 0, - h, w, h)
							} else if (p == 1) {
								ctx.translate(w, 0);
								ctx.rotate((d ? d90 : 0) - z);
								ctx.drawImage(d ? img_b : img_a, - w, 0, w, h)
							} else {
								ctx.translate(0, 0);
								ctx.rotate((d ? 0 - d90 : 0) + z);
								ctx.drawImage(d ? img_b : img_a, 0, 0, w, h)
							}
							ctx.restore();
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "curl"){
						var d = parseInt(getInt(opt1, 6, trans), 10), dir = efx[1] || "horizontal", 
						v = dir == "vertical" ? 1 : 0, ss = ((v ? h : w) / steps), c = Math.round((v ? h : w) / d), 
						o = .5, p = 0, s = 0, sx = 0, sy = 0, dx = 0, dy = 0, ww = 0, hh = 0, wc = cvi_trans.isWC;
						cbx.clearRect(0, 0, w, h);
						cbx.save();
						cbx.translate(v ? 0 : w, v ? h : 0);
						cbx.scale(v ? 1 :- 1, v ?- 1 : 1);
						cbx.drawImage(img_a, 0, 0, w, h);
						cbx.restore();
						timer.start();
						function shade(c, x, y, w, h, o){
							var s = c.createLinearGradient(x, y, w, h);
							s.addColorStop(0.0, 'rgba(0,0,0,' + o + ')');
							s.addColorStop(0.2, 'rgba(0,0,0,0)');
							s.addColorStop(0.3, 'rgba(254,254,254,0)');
							s.addColorStop(0.45, 'rgba(254,254,254,' + o + ')');
							s.addColorStop(0.6, 'rgba(254,254,254,0)');
							s.addColorStop(0.66, 'rgba(0,0,0,0)');
							s.addColorStop(1.0, 'rgba(0,0,0,' + o + ')');
							return s;
						};
						function shadow(c, x, y, w, h, o){
							var s = c.createLinearGradient(x, y, w, h);
							s.addColorStop(0.0, 'rgba(0,0,0,' + o + ')');
							s.addColorStop(1.0, 'rgba(0,0,0,0)');
							return s;
						};
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							s = Math.max(val * ss, 1);
							ctx.drawImage(img_b, 0, 0, w, h);
							if (v){
								hh = Math.min(s, c);
								ww = w;
								p = Math.max(h - s - hh, 1);
								sx = 0;
								sy = Math.min(h - hh, s);
								dx = 0;
								dy = h - s - hh - hh
							} else{
								ww = Math.min(s, c);
								hh = h;
								p = Math.max(w - s - ww, 1);
								sy = 0;
								sx = Math.min(w - ww, s);
								dy = 0;
								dx = w - s - ww - ww
							}
							ctx.drawImage(img_a, 0, 0, v ? w : p, v ? p : h, 0, 0, v ? w : p, v ? p : h);
							ctx.drawImage(buffer, sx, sy, ww, hh, dx, dy, ww, hh);
							ctx.fillStyle = shade(ctx, dx, dy, v ? 0 : dx + ww, v ? dy + hh : 0, o);
							fill(ctx, dx, dy, ww, hh, wc);
							ctx.fillStyle = shadow(ctx, v ? 0 : dx + ww, v ? dy + hh : 0, v ? 0 : dx + ww + c, 
							v ? dy + hh + c : 0, o);
							fill(ctx, v ? 0 : dx + ww, v ? dy + hh : 0, v ? w : c, v ? c : h, wc);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "cut"){
						var t = ival;
						ctx.drawImage(img_b, 0, 0, w, h);
						if (layer) {
							ctx.drawImage(layer, 0, 0, w, h)
						}
						ctx.restore();
						cvi_trans._clr(callback, trans, t, fps, canvas)
					} else if (efx[0] == "fade"){
						var o = parseFloat(getInt(opt1, 100, trans) / 100), fa = o + ((1 - o) / 2), 
						fb = 1 - fa, ap = Math.round(steps * fa), bp = Math.round(steps * fb), oa = 1, 
						ob = 0, a = 1 / (steps * fa);
						ctx.globalAlpha = 1;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							oa = (val > ap ? 0 : a * (ap - val));
							ob = (val < bp ? 0 : a * (val - bp));
							ctx.clearRect(0, 0, w, h);
							ctx.globalAlpha = (o == 1 ? 1 : oa);
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalAlpha = ob;
							cbx.drawImage(img_b, 0, 0, w, h);
							ctx.globalAlpha = 1;
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "flash"){
						var r = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2, a = Math.max(Math.min(Math.round(steps * 0.1), 
						3), 1), b = 2 * a, c = Math.max(steps - b, 1), s = (r / a), q = (1 / c), x = w / 2, 
						y = h / 2, z = 0, v = 0, wc = cvi_trans.isWC;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							if (cnt <= b){
								z = cnt <= a ? 1 : 0;
								v = Math.max(s * (val - (z ? 0 : a)), 1);
								ctx.drawImage(img_a, 0, 0, w, h);
								stl = ctx.createRadialGradient(x, y, z ? 0 : v, x, y, z ? v : r);
								stl.addColorStop(0, "rgba(255,255,255,1.0)");
								stl.addColorStop(1, "rgba(255,255,255,0.0)");
								ctx.fillStyle = stl;
								fill(ctx, 0, 0, w, h, wc)
							} else{
								v = Math.max(1 - (q * (val - b)), 0);
								ctx.drawImage(img_b, 0, 0, w, h);
								ctx.fillStyle = "rgba(255,255,255," + v + ")";
								ctx.fillRect(0, 0, w, h)
							}
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "gradientwipe" || efx[0] == "copy"){
						var cp = efx[0] == "copy" ? 1 : 0, g = cp ? 0.3 : parseFloat(getInt(opt1, 
						25, trans) / 100), dir = efx[1] || "right", xo = 0, yo = 0, xp = 0, yp = 0, 
						v = (dir == 'left' || dir == 'right' ? 0 : 1), r = (dir == 'left' || dir == 'up' ? 1 : 0), 
						gw = Math.round(v ? w : w * g), gh = Math.round(v ? h * g : h), sa = (v ? h + gh : w + gw), 
						ss = (sa / steps), wc = cvi_trans.isWC;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							xo = Math.round(v ? 0 : r ? sa - (val * ss) : val * ss);
							yo = Math.round(v ? r ? sa - (val * ss) : val * ss : 0);
							xp = v ? 0 : xo - gw;
							yp = v ? yo - gh : 0;
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							cbx.fillStyle = "rgba(0,0,0,1.0)";
							if (r){
								if (wc || window.opera){
									if (v) {
										if (yp < 0) {
											cbx.fillRect(0, yp, w, Math.abs(yp))
										} else {
											cbx.fillRect(0, 0, w, yp)
										}
									} else {
										if (xp < 0) {
											cbx.fillRect(xp, 0, Math.abs(xp), h)
										} else {
											cbx.fillRect(0, 0, xp, h)
										}
									}
								} else {
									cbx.fillRect(0, 0, v ? w : xp, v ? yp : h)
								}
							} else {
								cbx.fillRect(xo, yo, w, h)
							}
							stl = cbx.createLinearGradient(xp, yp, xo, yo);
							stl.addColorStop((r ? 1 : 0), "rgba(0,0,0,0.0)");
							stl.addColorStop((r ? 0 : 1), "rgba(0,0,0,1.0)");
							cbx.fillStyle = stl;
							fill(cbx, xp, yp, gw, gh, wc);
							ctx.drawImage(buffer, 0, 0, w, h);
							if (cp){
								stl = ctx.createLinearGradient(xp, yp, xo, yo);
								stl.addColorStop((r ? 1 : 0), "rgba(0,255,0,0.0)");
								stl.addColorStop((r ? .6 : .4), "rgba(128,255,160,0.6)");
								stl.addColorStop((r ? .3 : .7), "rgba(255,255,255,0.9)");
								stl.addColorStop((r ? .25 : .75), "rgba(255,255,255,1.0)");
								stl.addColorStop((r ? .2 : .8), "rgba(255,255,255,0.9)");
								stl.addColorStop((r ? 0 : 1), "rgba(128,255,160,0.0)");
								ctx.fillStyle = stl;
								fill(ctx, xp, yp, gw, gh, wc)
							}
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)

								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "inset"){
						var dir = efx[1] || "rightdown", sw = (w / steps), sh = (h / steps), ww = 0, 
						hh = 0;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(img_a, 0, 0, w, h);
							ww = Math.min(Math.max(val * sw, 1), w);
							hh = Math.min(Math.max(val * sh, 1), h);
							if (dir == 'rightup') {
								ctx.drawImage(img_b, 0, h - hh, ww, hh, 0, h - hh, ww, hh)
							} else if (dir == 'leftdown') {
								ctx.drawImage(img_b, w - ww, 0, ww, hh, w - ww, 0, ww, hh)
							} else if (dir == 'leftup') {
								ctx.drawImage(img_b, w - ww, h - hh, ww, hh, w - ww, h - hh, ww, hh)
							} else {
								ctx.drawImage(img_b, 0, 0, ww, hh, 0, 0, ww, hh)
							}
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "iris"){
						var typ = efx[1] || "plus", dir = efx[2] || "out", o = dir == "in" ? 0 : 1, 
						x = w / 2, y = h / 2, m = Math.max(w, h), n = m / 2, k = 0;
						if (typ == 'diamond' || typ == 'cross' || typ == 'star') {
							var d = Math.sqrt(Math.pow(m, 2) + Math.pow(m, 2)), ss = (m / steps), 
							sr = (d / steps)
						} else if (typ == 'square' || typ == 'plus') {
							var d = Math.sqrt(Math.pow(m, 2) + Math.pow(m, 2)), ss = (m / steps)
						} else if (typ == 'circle'){
							var d = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)), f = (Math.PI / 4) *- 3, 
							g = (Math.PI * 2), n = Math.ceil(d / 2), ss = (d / steps)
						}
						var os = (ss / 2), xo = n - x, yo = n - y;
						timer.start();
						function fillStar(c, x, y, n, r, p){
							var r1 = r, r2 = r * .4;
							c.translate(x, y);
							c.rotate(p);
							c.beginPath();
							c.moveTo(0, r1);
							for (var i = 0; i <= n; i++){
								c.save();
								c.rotate(2 * i * Math.PI / n);
								c.lineTo(0, r1);
								c.restore();
								c.save();
								c.rotate(2 * i * Math.PI / n + (2 * Math.PI / n) / 2);
								c.lineTo(0, r2);
								c.restore()
							}
							c.closePath();
							c.fill();
							c.rotate(-p);
							c.translate(-x, - y)
						};
						function drawStar(c, x, y, n, r, p){
							var r1 = r, r2 = r * .4;
							c.translate(x, y);
							c.rotate(p);
							c.lineTo(0, r1);
							for (var i = 0; i <= n; i++){
								c.save();
								c.rotate(2 * i * Math.PI / n);
								c.lineTo(0, r1);
								c.restore();
								c.save();
								c.rotate(2 * i * Math.PI / n + (2 * Math.PI / n) / 2);
								c.lineTo(0, r2);
								c.restore()
							}
							c.rotate(-p);
							c.translate(-x, - y)
						};
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							cbx.fillStyle = "rgba(0,0,0,1.0)";
							if (typ == 'diamond'){
								k = (val * ss);
								cbx.beginPath();
								if (o){
									cbx.moveTo((0 - xo - n) + k, h / 2);
									cbx.lineTo(0 - xo + n, (0 - yo - n) + k);
									cbx.lineTo((0 - xo + m + n) - k, h / 2);
									cbx.lineTo(0 - xo + n, (h + yo + n) - k)
								} else{
									cbx.moveTo(0 - xo, 0 - yo);
									cbx.lineTo(x, y - k);

									cbx.lineTo(x + k, y);
									cbx.lineTo(x, y + k);
									cbx.lineTo(x - k, y);
									cbx.lineTo(x, y - k);
									cbx.lineTo(0 - xo, 0 - yo);
									cbx.lineTo(0 - xo, h + yo);
									cbx.lineTo(w + xo, h + yo);
									cbx.lineTo(w + xo, 0 - yo)
								}
								cbx.closePath();
								cbx.fill()
							} else if (typ == 'cross'){
								k = (val * os);
								cbx.beginPath();
								if (o){
									cbx.moveTo(x, 0 - yo + k);
									cbx.lineTo(0 - xo - k, 0 - yo - n);
									cbx.lineTo(0 - xo - n, 0 - yo - k);
									cbx.lineTo(0 - xo + k, y);
									cbx.lineTo(0 - xo - n, h + yo + k);
									cbx.lineTo(0 - xo - k, h + yo + n);
									cbx.lineTo(x, h + yo - k);
									cbx.lineTo(w + xo + k, h + yo + n);
									cbx.lineTo(w + xo + n, h + yo + k);
									cbx.lineTo(w + xo - k, y);
									cbx.lineTo(w + xo + n, 0 - yo - k);
									cbx.lineTo(w + xo + k, 0 - yo - n)
								} else{
									cbx.moveTo(0 - xo - n, 0 - yo - n);
									cbx.lineTo(x, 0 - yo - n);
									cbx.lineTo(x, y - k);
									cbx.lineTo(0 - xo - n + k, 0 - yo - n);
									cbx.lineTo(0 - xo - n, 0 - yo - n + k);
									cbx.lineTo(x - k, y);
									cbx.lineTo(0 - xo - n, h + yo + n - k);
									cbx.lineTo(0 - xo - n + k, h + yo + n);
									cbx.lineTo(x, y + k);
									cbx.lineTo(w + xo + n - k, h + yo + n);
									cbx.lineTo(w + xo + n, h + yo + n - k);
									cbx.lineTo(x + k, y);
									cbx.lineTo(w + xo + n, 0 - yo - n + k);
									cbx.lineTo(w + xo + n - k, 0 - yo - n);
									cbx.lineTo(x, y - k);
									cbx.lineTo(x, 0 - yo - n);
									cbx.lineTo(w + xo + n, 0 - yo - n);
									cbx.lineTo(w + xo + n, h + yo + n);
									cbx.lineTo(0 - xo - n, h + yo + n)
								}
								cbx.closePath();
								cbx.fill()
							} else if (typ == 'circle'){
								k = (val * os);
								cbx.beginPath();
								if (o) {
									cbx.moveTo(x, y);
									cbx.arc(x, y, Math.max(n - k, 1), 0, g, false)
								} else{
									cbx.moveTo(0 - xo, 0 - yo);
									cbx.lineTo(x, y);
									cbx.arc(x, y, Math.max(k, 1), f, g + f, false);
									cbx.lineTo(0 - xo, 0 - yo);
									cbx.lineTo(0 - xo, h + yo);
									cbx.lineTo(w + xo, h + yo);
									cbx.lineTo(w + xo, 0 - yo)
								}
								cbx.closePath();
								cbx.fill()
							} else if (typ == 'square'){
								k = (val * os);
								if (o) {
									cbx.fillRect(x - n + k, y - n + k, Math.max(m - (k + k), 1), Math.max(m - (k + k), 
									1))
								} else{
									cbx.beginPath();
									cbx.moveTo(0 - xo, 0 - yo);
									cbx.lineTo(x - k, y - k);
									cbx.lineTo(x + k, y - k);
									cbx.lineTo(x + k, y + k);
									cbx.lineTo(x - k, y + k);
									cbx.lineTo(x - k, y - k);
									cbx.lineTo(0 - xo, 0 - yo);
									cbx.lineTo(0 - xo, h + yo);
									cbx.lineTo(w + xo, h + yo);
									cbx.lineTo(w + xo, 0 - yo);
									cbx.closePath();
									cbx.fill()
								}
							} else if (typ == 'plus'){
								k = (val * os);
								if (o){
									cbx.fillRect(0, y - n + k, w, Math.max(m - (k + k), 1));
									cbx.fillRect(x - n + k, 0, Math.max(m - (k + k), 1), h)
								} else{
									cbx.beginPath();
									cbx.moveTo(0 - xo, 0 - yo);
									cbx.lineTo(x - k, y - k);
									cbx.lineTo(x - k, y - n);
									cbx.lineTo(x + k, y - n);
									cbx.lineTo(x + k, y - k);
									cbx.lineTo(x + n, y - k);
									cbx.lineTo(x + n, y + k);
									cbx.lineTo(x + k, y + k);
									cbx.lineTo(x + k, y + n);
									cbx.lineTo(x - k, y + n);
									cbx.lineTo(x - k, y + k);
									cbx.lineTo(x - n, y + k);
									cbx.lineTo(x - n, y - k);
									cbx.lineTo(x - k, y - k);
									cbx.lineTo(0 - xo, 0 - yo);
									cbx.lineTo(0 - xo, h + yo);
									cbx.lineTo(w + xo, h + yo);
									cbx.lineTo(w + xo, 0 - yo);
									cbx.closePath();
									cbx.fill()
								}
							} else{
								if (o) {
									fillStar(cbx, x, y, 5, d - (val * sr), - (Math.PI / 5))
								} else{
									cbx.beginPath();
									cbx.moveTo(0 - xo - n, 0 - yo - n);
									cbx.lineTo(0 - xo - n, h + yo + n);
									cbx.lineTo(x, h + yo + n);
									drawStar(cbx, x, y, 5, (val * sr), - (Math.PI / 5));
									cbx.lineTo(x, h + yo + n);
									cbx.lineTo(w + xo + n, h + yo + n);
									cbx.lineTo(w + xo + n, 0 - yo - n);
									cbx.closePath();
									cbx.fill()
								}
							}
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "pixelate"){
						var q = parseInt(getInt(opt1, 40, trans), 10), c = Math.round(steps * .5), 
						a = 1 / c, ow = 0, oh = 0, mw = w / q, mh = h / q, d = q / c, s = 0;
						ctx.mozImageSmoothingEnabled = false;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							s = cnt <= c ? 1 : 0;
							cbx.clearRect(0, 0, w, h);
							if (s){
								ow = Math.round(Math.min(Math.max(w / ((val * d) + 1), mw), w));
								oh = Math.round(Math.min(Math.max(h / ((val * d) + 1), mh), h))
							} else{
								ow = Math.round(Math.max(Math.min(w / ((steps - val) * d), w), mw));
								oh = Math.round(Math.max(Math.min(h / ((steps - val) * d), h), mh));
								cbx.globalAlpha = a * (val - c)
							}
							cbx.drawImage(s ? img_a : img_b, 0, 0, w, h, 0, 0, ow, oh);
							ctx.drawImage(buffer, 0, 0, ow, oh, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.mozImageSmoothingEnabled = true;
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "pull" || efx[0] == "reveal"){
						var dir = efx[1] || "right", r = efx[0] == "reveal" ? 1 : 0, hz = dir == "right" || dir == "left" ? 1 : 0, 
						sc = ((hz ? w : h) / steps), s = 0;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(r ? img_b : img_a, 0, 0, w, h, 0, 0, w, h);
							s = val * sc;
							if (dir == "left") {
								ctx.drawImage(r ? img_a : img_b, 0, 0, w, h, r ? 0 - s : w - s, 0, 
								w, h)
							} else if (dir == "down") {
								ctx.drawImage(r ? img_a : img_b, 0, 0, w, h, 0, r ? s : s - h, w, 
								h)
							} else if (dir == "up") {
								ctx.drawImage(r ? img_a : img_b, 0, 0, w, h, 0, r ? 0 - s : h - s, 
								w, h)
							} else {
								ctx.drawImage(r ? img_a : img_b, 0, 0, w, h, r ? s : s - w, 0, w, 
								h)
							}
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "push"){
						var dir = efx[1] || "right", hz = dir == "right" || dir == "left" ? 1 : 0, 
						sc = ((hz ? w : h) / steps), s = 0;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(img_a, 0, 0, w, h, 0, 0, w, h);
							s = val * sc;
							if (dir == "right") {
								ctx.drawImage(img_a, 0, 0, w, h, s, 0, w, h);
								ctx.drawImage(img_b, 0, 0, w, h, - w + s, 0, w, h)
							} else if (dir == "left") {
								ctx.drawImage(img_a, 0, 0, w, h, 0 - s, 0, w, h);
								ctx.drawImage(img_b, 0, 0, w, h, w - s, 0, w, h)
							} else if (dir == "down") {
								ctx.drawImage(img_a, 0, 0, w, h, 0, s, w, h);
								ctx.drawImage(img_b, 0, 0, w, h, 0, - h + s, w, h)
							} else if (dir == "up") {
								ctx.drawImage(img_a, 0, 0, w, h, 0, 0 - s, w, h);
								ctx.drawImage(img_b, 0, 0, w, h, 0, h - s, w, h)
							}
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "radialgradient"){
						var r = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2, c = Math.round(steps * 0.5), 
						s = (r / c), x = w / 2, y = h / 2, v = 0, z = 0, wc = cvi_trans.isWC;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							z = cnt <= c ? 0 : c;
							v = Math.max(s * (val - z), 1);
							stl = cbx.createRadialGradient(x, y, z == 0 ? 0 : v, x, y, z == 0 ? v : r);
							stl.addColorStop(0, "rgba(0,0,0,0.0)");
							stl.addColorStop(1, "rgba(0,0,0,1.0)");
							cbx.fillStyle = stl;
							fill(cbx, 0, 0, w, h, wc);
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "radialwipe"){
						var typ = efx[1] || "clock", s = 0, x = w / 2, y = h / 2, a = (Math.PI / 2) *- 1, 
						d = Math.PI * 2, r = Math.ceil(Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2);
						if (typ == "radial") {
							r = r * 2;
							d = Math.PI / 2
						}
						s = (d / (steps * (typ == "wedge" ? 2 : 1)));
						cnt = 1;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							cbx.fillStyle = "rgba(0,0,0,1.0)";
							cbx.beginPath();
							if (typ == "wedge") {
								cbx.moveTo(x, y);
								cbx.arc(x, y, r, a - (val * s), a + (val * s), true)
							} else if (typ == "radial") {
								cbx.moveTo(0, 0);
								cbx.arc(0, 0, r, 0, val * s, true)
							} else {
								cbx.moveTo(x, y);
								cbx.arc(x, y, r, a, a + (val * s), true)
							}
							cbx.closePath();
							cbx.fill();
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "randombars"){
						var typ = efx[1] || "horizontal", v = typ == "vertical" ? 1 : 0, a = v ? w : h, 
						z = 0, ss, cs, l = new Array();
						for (var i = 0; i < a; i++) {
							l[i] = i
						}
						l.shuffle();
						ss = Math.ceil(a / steps), cs = l.length - ss;
						cmx.clearRect(0, 0, w, h);
						cmx.fillStyle = "rgba(0,0,0,1.0)";
						cmx.fillRect(0, 0, w, h);
						timer.start();
						canvas.timer = window.setInterval(function (){
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							z = Math.min(ss * cnt, cs);
							if (v) {
								for (var i = z; i < (z + ss); i++) {
									cmx.clearRect(l[i], 0, 1, h)
								}
							} else {
								for (var i = z; i < (z + ss); i++) {
									cmx.clearRect(0, l[i], w, 1)
								}
							}
							cbx.drawImage(mask, 0, 0, w, h);
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "rotate"){
						var dir = efx[1] || "out", m = dir == "in" ? 1 : 0, z = 0, ww = 0, hh = 0, 
						d = 1 / steps, a = (Math.PI * 2) / steps;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							z = m ? 1 - (val * d) : val * d;
							ww = Math.max(w * z, 1);
							hh = Math.max(h * z, 1);
							cbx.clearRect(0, 0, w, h);
							cbx.save();
							cbx.translate(w / 2, h / 2);
							cbx.rotate(a * val);
							cbx.drawImage(m ? img_a : img_b, 0, 0, w, h, 0 - (ww / 2), 0 - (hh / 2), 

							ww, hh);
							cbx.restore();
							ctx.drawImage(m ? img_b : img_a, 0, 0, w, h);
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "scale"){
						var dir = efx[1] || "out", m = dir == "in" ? 1 : 0, z = 0, x = 0, y = 0, ww = 0, 
						hh = 0, d = 1 / steps;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							z = m ? 1 - (val * d) : val * d;
							ww = Math.max(w * z, 1);
							hh = Math.max(h * z, 1);
							x = (w - ww) / 2;
							y = (h - hh) / 2;
							cbx.clearRect(0, 0, w, h);
							cbx.drawImage(m ? img_a : img_b, 0, 0, w, h, x, y, ww, hh);
							ctx.drawImage(m ? img_b : img_a, 0, 0, w, h);
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "slide"){
						var q = parseInt(getInt(opt1, 1, trans), 10), typ = efx[1] || "hide", s = (w / steps), 
						hw = (w / 2), c = 0, o = 0, yo = 0, ww = 0, hh = h / q;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							if (typ == "push"){
								ww = val * s;
								for (var i = 0; i < q; i++){
									o = i % 2;
									yo = i * hh;
									ctx.drawImage(img_a, 0, yo, w, hh, (o ? ww : 0 - ww), yo, w, hh);
									ctx.drawImage(img_b, 0, yo, w, hh, (o ? ww - w : w - ww), yo, 
									w, hh)
								}
							} else if (typ == "swap"){
								if (c){
									ww = hw + (hw - (val * s));
									for (var i = 0; i < q; i++){
										o = i % 2;
										yo = i * hh;
										ctx.drawImage(img_a, 0, yo, w, hh, (o ? ww : 0 - ww), yo, 
										w, hh);
										ctx.drawImage(img_b, 0, yo, w, hh, (o ? 0 - ww : ww), yo, 
										w, hh)
									}
								} else{
									ww = Math.min(val * s, hw);
									c = ww == hw ? true : false;
									for (var i = 0; i < q; i++){
										o = i % 2;
										yo = i * hh;
										ctx.drawImage(img_b, 0, yo, w, hh, (o ? 0 - ww : ww), yo, 
										w, hh);
										ctx.drawImage(img_a, 0, yo, w, hh, (o ? ww : 0 - ww), yo, 
										w, hh)
									}
								}
							} else{
								ww = val * s;
								ctx.drawImage(img_b, 0, 0, w, h, 0, 0, w, h);
								for (var i = 0; i < q; i++) {
									o = i % 2;
									yo = i * hh;
									ctx.drawImage(img_a, 0, yo, w, hh, (o ? ww : 0 - ww), yo, w, hh)
								}
							}
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "smudge"){
						var tr = Math.round(steps * 0.8), qr = steps - tr, ss = h / tr, k = 1 / tr, 
						p = 1 / qr, yo = 0, hh = 0, e = 0, s = 0, o = 0, wc = cvi_trans.isWC;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							if (val <= tr){
								s = Math.max(val * ss, 1);
								o = Math.min(Math.max(val * k, 0), 1);
								e = Math.max(s - ss, 0);
								yo = Math.min(s, h - 1);
								hh = Math.max(h - s, 1)
							} else {
								o = Math.min(Math.max((val - tr) * p, 0), 1)
							}
							ctx.drawImage(img_b, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_a, 0, yo, w, hh, 0, yo, w, hh);
							cbx.drawImage(img_a, 0, Math.max(s - ss, 0), w, ss, 0, 0, w, s);
							cbx.globalCompositeOperation = "destination-out";
							stl = cbx.createLinearGradient(0, 0, 0, h);
							stl.addColorStop(0.0, 'rgba(0,0,0,1)');
							stl.addColorStop(o, 'rgba(0,0,0,' + (val <= tr ? 0 : 1) + ')');
							stl.addColorStop(1.0, 'rgba(0,0,0,0)');
							cbx.fillStyle = stl;
							fill(cbx, 0, 0, w, h, wc);
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "spiral"){
						var gx = parseInt(getInt(opt1, 8, trans), 10), gy = parseInt(getInt(opt2, 
						gx, trans), 10), m = gx * gy, ww = (w / gx), bw = Math.ceil(ww), hh = (h / gy), 
						bh = Math.ceil(hh), lf = (m / steps), tt = Math.round(steps / m), ct = 0, 
						yo = 0, xo =- 1, dir = 0, xc = gx, yc = gy - 1;
						cmx.clearRect(0, 0, w, h);
						cmx.fillStyle = "rgba(0,0,0,1.0)";
						cmx.fillRect(0, 0, w, h);
						timer.start();
						canvas.timer = window.setInterval(function (){
							function spiral(){
								if (dir == 0 && ct == xc) {
									xc--;
									dir++;
									ct = 0
								} else if (dir == 1 && ct == yc) {
									yc--;
									dir++;
									ct = 0
								} else if (dir == 2 && ct == xc) {
									xc--;
									dir++;
									ct = 0
								} else if (dir == 3 && ct == yc) {
									yc--;
									dir = 0;
									ct = 0
								}
								switch (dir) {
									case 0:
										xo++;
										break;
									case 1:
										yo++;
										break;
									case 2:
										xo--;
										break;
									case 3:
										yo--;
										break
								}
								ct++;
								cmx.clearRect(Math.round(xo * ww), Math.round(yo * hh), bw, bh)
							};
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							if (lf < 1) {
								if (cnt != 0 && cnt % tt == 0) {
									spiral()
								}
							} else {
								for (var i = cnt; i < (cnt + lf); i++) {
									spiral()
								}
							}
							cbx.drawImage(mask, 0, 0, w, h);
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "split"){
						var pos = efx[1] || "horizontal", dir = efx[2] || "out", v = pos == "vertical" ? 1 : 0, 
						m = dir == "in" ? 1 : 0, h5 = h / 2, w5 = w / 2, sc = (v ? h5 : w5) / steps, 
						s = 0;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							s = Math.min(Math.max(val * sc, 1), v ? m ? h : h5 : m ? w : w5);
							ctx.drawImage(m ? img_a : img_b, 0, 0, w, h);
							if (v){
								ctx.drawImage(m ? img_b : img_a, 0, 0, w, h5, 0, 0, w, m ? s : h5 - s);
								ctx.drawImage(m ? img_b : img_a, 0, h5, w, h5, 0, m ? h - s : h5 + s, 
								w, m ? s : h5 - s)
							} else{
								ctx.drawImage(m ? img_b : img_a, 0, 0, w5, h, 0, 0, m ? s : w5 - s, 
								h);
								ctx.drawImage(m ? img_b : img_a, w5, 0, w5, h, m ? w - s : w5 + s, 
								0, m ? s : w5 - s, h)
							}
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "squares"){
						var gx = parseInt(getInt(opt1, 8, trans), 10), gy = parseInt(getInt(opt2, 
						gx, trans), 10), dir = efx[1] || "out", m = dir == "in" ? 1 : 0, ww = (w / gx), 
						hh = (h / gy), w5 = ww / 2, h5 = hh / 2, sx = (ww / steps), sy = (hh / steps), 
						xo = 0, yo = 0, z = 0;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(m ? img_b : img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(m ? img_a : img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							cbx.fillStyle = "rgba(0,0,0,1.0)";
							for (var x = 0; x < gx; x++){
								xo = (val * sx) / 2;
								for (var y = 0; y < gy; y++){
									yo = (val * sy) / 2;
									if (m) {
										cbx.fillRect((x * ww) + w5 - xo, (y * hh) + h5 - yo, Math.max(2 * xo, 
										1), Math.max(2 * yo, 1))
									} else {
										cbx.fillRect((x * ww) + xo, (y * hh) + yo, Math.max(ww - (2 * xo), 
										1), Math.max(hh - (2 * yo), 1))
									}
								}
							}
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "stretch"){
						var typ = efx[1] || "horizontal", dir = efx[2] || "in", m = dir == "in" ? 1 : 0, 
						hz = dir == "right" || dir == "left" || typ == "horizontal" ? 1 : 0, s = ((hz ? w : h) / steps), 
						hw = (w / 2), fh = (h / 2), xo = 0, yo = 0, ww = 0, hh = 0;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ww = hz ? Math.min(Math.max(val * s, 1), w) : w;
							hh = hz ? h : Math.min(Math.max(val * s, 1), h);
							if (typ == "push"){
								if (dir == "right") {
									ctx.drawImage(img_a, 0, 0, w, h, ww, 0, w - ww, hh);
									ctx.drawImage(img_b, 0, 0, w, h, 0, 0, ww, hh)
								} else if (dir == "left"){
									ctx.drawImage(img_a, 0, 0, w, h, 0, 0, w - ww, hh);
									ctx.drawImage(img_b, 0, 0, w, h, w - ww, 0, ww, hh)
								} else if (dir == "up"){
									ctx.drawImage(img_a, 0, 0, w, h, 0, 0, ww, h - hh);
									ctx.drawImage(img_b, 0, 0, w, h, 0, h - hh, ww, hh)
								} else if (dir == "down") {
									ctx.drawImage(img_a, 0, 0, w, h, 0, hh, ww, h - hh);
									ctx.drawImage(img_b, 0, 0, w, h, 0, 0, ww, hh)
								}
							} else if (typ == "hide"){
								ctx.drawImage(img_a, 0, 0, w, h);
								if (dir == "left") {
									ctx.drawImage(img_b, 0, 0, w, h, w - ww, 0, ww, hh)
								} else if (dir == "down") {
									ctx.drawImage(img_b, 0, 0, w, h, 0, 0, ww, hh)
								} else if (dir == "up") {
									ctx.drawImage(img_b, 0, 0, w, h, 0, h - hh, ww, hh)
								} else {
									ctx.drawImage(img_b, 0, 0, w, h, 0, 0, ww, hh)
								}
							} else{
								ctx.drawImage(m ? img_a : img_b, 0, 0, w, h);
								xo = hz ? m ? hw - (ww / 2) : ww * .5 : 0;
								yo = hz ? 0 : m ? fh - (hh / 2) : hh * .5;
								ctx.drawImage(m ? img_b : img_a, 0, 0, w, h, xo, yo, hz ? m ? ww : w - ww : ww, 
								hz ? hh : m ? hh : h - hh)
							}
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "strips"){
						var dir = efx[1] || "rightdown", m = (w + h), x = 0, y = 0, s = (m / steps);
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							cbx.fillStyle = "rgba(0,0,0,1.0)";
							if (dir == 'rightdown'){
								x = (w - m) + (val * s);
								y = (h - m) + (val * s);
								cbx.beginPath();
								cbx.moveTo(w, h);
								cbx.lineTo(w, y);
								cbx.lineTo(x, h);
								cbx.closePath();
								cbx.fill()
							} else if (dir == 'rightup'){
								x = (w - m) + (val * s);
								y = m - (val * s);
								cbx.beginPath();
								cbx.moveTo(w, 0);
								cbx.lineTo(w, y);
								cbx.lineTo(x, 0);
								cbx.closePath();
								cbx.fill()
							} else if (dir == 'leftdown'){
								x = m - (val * s);
								y = (h - m) + (val * s);
								cbx.beginPath();
								cbx.moveTo(0, h);
								cbx.lineTo(0, y);
								cbx.lineTo(x, h);
								cbx.closePath();
								cbx.fill()
							} else if (dir == 'leftup'){
								x = m - (val * s);
								y = m - (val * s);
								cbx.beginPath();
								cbx.moveTo(0, 0);
								cbx.lineTo(0, y);
								cbx.lineTo(x, 0);
								cbx.closePath();
								cbx.fill()
							}
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "turn"){
						var q = parseInt(getInt(opt1, 5, trans), 10), pos = efx[1] || "vertical", 
						dir = efx[2] || "right", v = pos == "vertical" ? 1 : 0, r = dir == "left" || dir == "up" ? 1 : 0, 
						ww = v ? (w / q) : w, hh = v ? h : (h / q), sx = (ww / steps), sy = (hh / steps), 
						s = 0;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							if (v){
								s = val * sx;
								for (var i = 0; i < q; i++){
									ctx.drawImage(img_a, (i * ww), 0, ww, h, (i * ww) + (r ? 0 : s), 
									0, Math.max(ww - s, 1), h);
									ctx.drawImage(img_b, (i * ww), 0, ww, h, (i * ww) + (r ? ww - s : 0), 
									0, Math.max(s, 1), h)
								}
							} else{
								s = val * sy;
								for (var i = 0; i < q; i++){
									ctx.drawImage(img_a, 0, (i * hh), w, hh, 0, (i * hh) + (r ? 0 : s), 
									w, Math.max(hh - s, 1));
									ctx.drawImage(img_b, 0, (i * hh), w, hh, 0, (i * hh) + (r ? hh - s : 0), 
									w, Math.max(s, 1))
								}
							}
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "wheel"){
						var q = parseInt(getInt(opt1, 4, trans), 10), x = w / 2, y = h / 2, d = (Math.PI * 2) / q, 
						r = Math.ceil(Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2), s = (d / steps);
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							cbx.fillStyle = "rgba(0,0,0,1.0)";
							for (var i = 0; i < q; i++){
								cbx.beginPath();
								cbx.moveTo(x, y);
								cbx.arc(x, y, r, (i * d) + (val * s), (i * d) + (steps * s), false);
								cbx.closePath();
								cbx.fill()
							}
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "wrench"){
						var pos = efx[1] || "vertical", v = pos == "vertical" ? 1 : 0, c = Math.round(steps * .5), 
						a = 1 / c, xo = 0, yo = 0, ow = 0, oh = 0, s = 0;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							s = cnt <= c ? 1 : 0;
							cbx.clearRect(0, 0, w, h);
							if (s){
								ow = Math.round(Math.min(Math.max(w * (1 - (val * a)), 1), w));
								xo = ((w - ow) / 2);
								oh = Math.round(Math.min(Math.max(h * (1 - (val * a)), 1), h));
								yo = ((h - oh) / 2)
							} else{
								ow = Math.round(Math.min(Math.max(w * ((val - c) * a), 1), w));
								xo = ((w - ow) / 2);
								oh = Math.round(Math.min(Math.max(h * ((val - c) * a), 1), h));
								yo = ((h - oh) / 2);
								cbx.globalAlpha = a * (val - c)
							}
							cbx.drawImage(s ? img_a : img_b, v ? 0 : xo, v ? yo : 0, v ? w : ow, v ? oh : h, 
							0, 0, w, h);
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "zigzag"){
						var gx = parseInt(getInt(opt1, 8, trans), 10), gy = parseInt(getInt(opt2, 
						gx, trans), 10), m = gx * gy, ww = (w / gx), bw = Math.ceil(ww), hh = (h / gy), 
						bh = Math.ceil(hh), lf = (m / steps), tt = Math.round(steps / m), ct = 0, 
						yo = 0, xo =- 1, dir = 0, xc = gx;
						cmx.clearRect(0, 0, w, h);
						cmx.fillStyle = "rgba(0,0,0,1.0)";
						cmx.fillRect(0, 0, w, h);
						timer.start();
						canvas.timer = window.setInterval(function (){
							function zigzag(){
								if (dir == 0 && ct == xc) {
									dir++;
									ct = 0;
									xo++;
									yo++
								} else if (dir == 1 && ct == (xc + 1)) {
									dir = 0;
									ct = 0;
									yo++
								}
								if (dir == 0) {
									xo++
								} else {
									xo--
								}
								ct++;
								cmx.clearRect(Math.round(xo * ww), Math.round(yo * hh), bw, bh)
							};
							ctx.drawImage(img_a, 0, 0, w, h);
							cbx.clearRect(0, 0, w, h);
							cbx.globalCompositeOperation = "source-over";
							cbx.drawImage(img_b, 0, 0, w, h);
							cbx.globalCompositeOperation = "destination-out";
							if (lf < 1) {
								if (cnt != 0 && cnt % tt == 0) {
									zigzag()
								}
							} else {
								for (var i = cnt; i < (cnt + lf); i++) {
									zigzag()
								}
							}
							cbx.drawImage(mask, 0, 0, w, h);
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					} else if (efx[0] == "zoom"){
						var dir = efx[1] || "out", m = dir == "in" ? 1 : 0, z = 0, f = 0, x = 0, y = 0, 
						ww = 0, hh = 0, a = 1 / steps, d = a;
						timer.start();
						canvas.timer = window.setInterval(function (){
							val = cvi_tween[tween](steps, cnt, cpa) * steps;
							z = m ? val * d : 1 - (val * d);
							f = m ? a * val : 1 - (a * val);
							ww = Math.min(Math.max(w * z, 1), w);
							hh = Math.min(Math.max(h * z, 1), h);
							x = (w - ww) / 2;
							y = (h - hh) / 2;
							cbx.clearRect(0, 0, w, h);
							cbx.globalAlpha = f;
							cbx.drawImage(m ? img_b : img_a, x, y, ww, hh, 0, 0, w, h);
							ctx.drawImage(m ? img_a : img_b, 0, 0, w, h);
							ctx.drawImage(buffer, 0, 0, w, h);
							if (layer) {
								ctx.drawImage(layer, 0, 0, w, h)
							}
							cnt++;
							if (cnt > steps){
								var t = timer.stop() - ival;
								window.clearInterval(canvas.timer);
								ctx.drawImage(img_b, 0, 0, w, h);
								if (layer) {
									ctx.drawImage(layer, 0, 0, w, h)
								}
								ctx.restore();
								cvi_trans._clr(callback, trans, t, fps * ((dur * 1000) / t), canvas)
							}
						}, ival)
					}
				} catch (err){
					canvas.TLerror = err.message;
					ctx.drawImage(img_b, 0, 0, w, h);
					if (layer) {
						ctx.drawImage(layer, 0, 0, w, h)
					}
					ctx.restore();
					log('Error: ', err.message + ' - trans "' + trans + '" has failed!');
					cvi_trans._clr(callback, trans, 0, 0, canvas)
				}
			}
		}
	}
	return false;
};
cvi_trans.stop = function (canvas, img){
	if (cvi_trans.vml && canvas.TLfilter){
		var filter = canvas.TLfilter;
		if (canvas.filters.item(filter).status == 2) {
			canvas.filters.item(filter).stop()
		}
	} else if (canvas.timer && canvas.getContext){
		window.clearInterval(canvas.timer);
		canvas.timer = 0;
		var ctx = canvas.getContext('2d'), w = parseInt(canvas.width), h = parseInt(canvas.height);
		ctx.drawImage(img, 0, 0, w, h);
		ctx.restore()
	}
	cvi_trans._clr('', '', 0, 0, canvas);
	return false;
};
cvi_trans._clr = function (callback, trans, time, fps, obj){
	if (cvi_trans.isWC){
		var ele = document.getElementById('cvi_trans_buffer');
		if (ele) {
			document.body.removeChild(ele)
		}
		ele = document.getElementById('cvi_trans_mask');
		if (ele) {
			document.body.removeChild(ele)
		}
	}
	obj.TLfilter = null;
	obj.TLbusy = false;
	if (callback){
		if (typeof window[callback] === 'function'){
			window[callback](trans || "", time || 0, fps || 0, obj.id)
		}
	}
	return false;
};


return cvi_trans;
	
	
});