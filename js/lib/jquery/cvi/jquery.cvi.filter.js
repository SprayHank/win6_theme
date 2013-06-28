;define(function(require, exports, module) {
	
	

/**
 * cvi_filter_lib.js 2.0 (13-Jan-2011) (c) by Christian Effenberger 
 * All Rights Reserved. Source: filter.netzgesta.de
 * Library supports: booklet.js|
 * cvi_bevel.js|cvi_corner.js|cvi_curl.js|cvi_edge.js|cvi_strip.js|
 * cvi_glossy.js|cvi_instant.js|cvi_reflex.js|cvi_slide.js|cvi_sphere.js
 * Distributed under Netzgestade Non-commercial Software License Agreement.
 * This license permits free of charge use on non-commercial 
 * and private web sites only under special conditions. 
 * Read more at... http://www.netzgesta.de/cvi/LICENSE.html
**/

var matrix={ // External kernel matrix definitions
// REMEMBER: Used names should not match any of the filter names!!!
blur:[[ 1, 2, 1],[ 2, 4, 2],[ 1, 2, 1]], // blurs the image using the Gaussian method.
median:[[ 1, 1, 1],[ 1, 1, 1],[ 1, 1, 1]], // smoothes grainy images.
sharpen:[[ 0,-1, 0],[-1, 9,-1],[ 0,-1, 0]], // makes the image sharper.
sharper:[[-1,-1,-1],[-1,16,-1],[-1,-1,-1]], // makes the image even sharper.
sharp:[[-1,-1,-1],[-1, 9,-1],[-1,-1,-1]], // makes the image sharper.
sharpest:[[-1,-2,-1],[-2,13,-2],[-1,-2,-1]], // makes the image sharper.
bumplt:[[ 1, 1, 0],[ 1, 1,-1],[ 0,-1,-1]], // embosses the image. 
bumpbr:[[-1,-1, 0],[-1, 1, 1],[ 0, 1, 1]], // embosses the image. 
/*** add H E R E your personal convolution kernels  ***/
/*** additional edge detection convolution kernels  ***/
laplace1:[[-1, 0,-1],[ 0, 4, 0],[-1, 0,-1]], // embosses the image. 
laplace2:[[ 0, 1, 0],[ 1,-4, 1],[ 0, 1, 0]], // embosses the image. 
laplace3:[[ 1, 1, 1],[ 1,-8, 1],[ 1, 1, 1]], // embosses the image. 
laplace4:[[ 1, 2, 1],[ 2,-12,2],[ 1, 2, 1]], // embosses the image. 
embossbr:[[-1,-1, 0],[-1, 0, 1],[ 0, 1, 1]], // embosses the image. normalize with s=[1,0]
embosslt:[[ 1, 1, 0],[ 1, 0,-1],[ 0,-1,-1]], // embosses the image. normalize with s=[1,0]
edge1:[[-5, 0, 0],[ 0, 0, 0],[ 0, 0, 5]], // edge detection. use s=[0-255,0-255]
edge2:[[-5,-5,-5],[-5,39,-5],[-5,-5,-5]], // edge detection. use s=[0-255,0-255]
edge3:[[-1,-1,-1],[-1, 8,-1],[-1,-1,-1]], // edge detection. use s=[0-255,0-255]
edge4:[[-1,-1,-1],[ 0, 0, 0],[ 1, 1, 1]], // edge detection. use s=[0-255,0-255]
edge5:[[-1,-1,-1],[ 2, 2, 2],[-1,-1,-1]], // edge detection. use s=[0-255,0-255]
edge6:[[ 1, 1, 1],[ 1,-7, 1],[ 1, 1, 1]], // edge detection. use s=[0-255,0-255]
edge7:[[-1, 0, 1],[ 0, 0, 0],[ 1, 0,-1]] // edge detection. use s=[0-255,0-255]
};


//////////////////////////////stuff function>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function hsb2rgb(h, s, b){
	var c, f, u, p, q, t;
	c = Math.min(255, Math.max(0, Math.round(b / 100 * 255)));
	if (s == 0) {
		return [c, c, c]
	} else{
		u = h % 360;
		f = u % 60;
		p = Math.min(255, Math.max(0, Math.round((b * (100 - s)) / 10000 * 255)));
		q = Math.min(255, Math.max(0, Math.round((b * (6000 - s * f)) / 600000 * 255)));
		t = Math.min(255, Math.max(0, Math.round((b * (6000 - s * (60 - f))) / 600000 * 255)));
		switch (Math.floor(u / 60)){
			case 0:
				return [c, t, p];
			case 1:
				return [q, c, p];
			case 2:
				return [p, c, t];
			case 3:
				return [p, q, c];
			case 4:
				return [t, p, c];
			case 5:
				return [c, p, q];
		}
	}
	return [0, 0, 0];
};
function rgb2hsb(r, g, b){
	var rr, gr, br, h, a = Math.max(r, g, b), i = Math.min(r, g, b), d = a - i, n = a / 255, s = (a != 0) ? d / a : 0;
	if (s == 0) {
		h = 0
	} else{
		rr = (a - r) / d;
		gr = (a - g) / d;
		br = (a - b) / d;
		if (r == a) {
			h = br - gr
		} else if (g == a) {
			h = 2 + rr - br
		} else {
			h = 4 + gr - rr
		}
		h /= 6;
		if (h < 0) {
			h++
		}
	}
	return [Math.round(h * 360), Math.round(s * 100), Math.round(n * 100)];
};
function yuv2rgb(y, u, v){
	return [Math.min(255, Math.max(0, Math.round(y + v / 0.877))), Math.min(255, Math.max(0, Math.round(y - 0.39466 * u - 0.5806 * v))), 
	Math.min(255, Math.max(0, Math.round(y + u / 0.493)))]
};
function rgb2yuv(r, g, b){
	var y = 0.299 * r + 0.587 * g + 0.114 * b;
	return [y, (b - y) * 0.493, (r - y) * 0.877];
};
function log(v, e){
	if (window.console) {
		window.console.log(v + e)
	} else if (window.opera) {
		opera.postError(v + e)
	} else {
		window.document.title = v
	}
	return false;
};
function getArg(a, t){
	return (typeof opts[a] === t ? opts[a] : defopts[a]);
};
////////////////////////////////////stuff function/////////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



var cvi_filter={
	version : 2.0
	, released : '2011-01-13 12:00:00'
	, defaultF : null
	, defaultM : null
	, defaultS :- 1
	, CBunabled : navigator.userAgent.indexOf('WebKit') !=- 1 && !window.external && !document.defaultCharset ? 1 : 0
};

cvi_filter.add = function (obj, img, opts, w, h){
	if (obj && obj.tagName.toUpperCase() == "CANVAS"){
		if (obj.getContext){
			var s, a, d, r, g, b, p, c, f, i, j, k, l, m, n, o, q, t, u, v, x = 0, y = 0, z = 0, cb = false, 
			yuv, hsb, rgb, ctx, bcx, defopts, prepared, exception = false, sba = typeof (cvi_stackblur) === "function" ? true : false;
			ctx = obj.getContext('2d');
			if (ctx.getImageData) {
				prepared = true
			}
			defopts = {
				"f" : cvi_filter.defaultF
				, "m" : cvi_filter.defaultM
				, "s" : cvi_filter.defaultS
			};
			bcx = img.getContext('2d');
			if (opts) {
				for (i in defopts) {
					if (!opts[i]) {
						opts[i] = defopts[i];
					}
				}
			} else {
				opts = defopts
			}
			f = getArg('f', 'string');
			m = getArg('m', 'object');
			c = (typeof opts['s'] === 'object') ? opts['s'] ||- 1 : parseFloat(Math.max(0, Math.min(255, 
			getArg('s', 'number')))) ||- 1;
			if (bcx && prepared && f != null && w > 0 && h > 0 && !f.match(/(smooth|zoomblur|motionblur|spinblur|tiltshift)/i)){
				try{
					try {
						s = ctx.getImageData(0, 0, 1, 1)
					} catch (err){
						if (typeof (netscape) === "object") {
							netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead")
						}
						s = ctx.getImageData(0, 0, 1, 1);
					}
				} catch (err){
					exception = true;
					log(err.message, ". Explanations:\nhttp://en.wikipedia.org/wiki/Same_origin_policy\nhttp://www.w3.org/TR/XMLHttpRequest/#exceptions")
				}
			}
			if (bcx && f != null && w > 0 && h > 0){
				w += 4;
				h += 4;
				if (exception || !prepared || f.match(/(smooth|zoomblur|motionblur|spinblur|tiltshift)/i)){
					if (f == "tiltshift"){
						k = (c[0] > 0 ? Math.min(0.999, Math.max(0.001, c[0])) : 0.5);
						m = (c[1] >= 0 ? Math.min(1, Math.max(0, c[1])) : 0.4);
						l = (c[2] > 0 ? Boolean(c[2]) : 0);
						v = (c[3] > 0 ? Math.min(8, Math.max(1, c[3])) : 4);
						var bfa = document.createElement('canvas');
						bfa.height = h - 4;
						bfa.width = w - 4;
						var bfb = document.createElement('canvas');
						bfb.height = h - 4;
						bfb.width = w - 4;
						var bfc = document.createElement('canvas');
						bfc.height = h - 4;
						bfc.width = w - 4;
						var btx = bfa.getContext('2d'), atx = bfb.getContext('2d'), ftx = bfc.getContext('2d');
						btx.drawImage(img, 0, 0, w - 4, h - 4);
						if (sba) {
							cvi_stackblur(ctx, v, x, y, w, h)
						} else{
							t = Math.round(v * 5);
							b = Math.round(w * .75);
							q = Math.round(h * .75);
							for (i = 0; i < t; i++){
								r = Math.max(2, Math.round(b - (2 * i)));
								g = Math.max(2, Math.round(q - (2 * i)));
								bcx.clearRect(0, 0, w - 4, h - 4);
								bcx.drawImage(obj, 0, 0, w, h, 0, 0, r, g);
								ctx.clearRect(0, 0, w, h);
								ctx.drawImage(img, 0, 0, r, g, 0, 0, w, h)
							}
						}
						atx.drawImage(obj, 2, 2, w - 4, h - 4, 0, 0, w - 4, h - 4);
						ctx.drawImage(bfa, 0, 0, w - 4, h - 4, 2, 2, w - 4, h - 4);
						bcx.clearRect(0, 0, w - 4, h - 4);
						ftx.clearRect(0, 0, w - 4, h - 4);
						ftx.drawImage(bfa, 0, 0);
						ftx.globalCompositeOperation = "source-over";
						ftx.drawImage(bfb, 0, 0);
						ftx.globalCompositeOperation = "destination-out";
						var stl = ftx.createLinearGradient(0, 0, (l ? w - 4 : 0), (l ? 0 : h - 4));
						stl.addColorStop(0, "rgba(0,0,0,0)");
						if (k - (m / 2) - 0.05 >= 0.001) {
							stl.addColorStop(k - (m / 2) - 0.05, "rgba(0,0,0,0)")
						}
						if (k - (m / 2) >= 0.001) {
							stl.addColorStop(k - (m / 2), "rgba(0,0,0,1)")
						}
						stl.addColorStop(k, "rgba(0,0,0,1)");
						if (k + (m / 2) <= 0.999) {
							stl.addColorStop(k + (m / 2), "rgba(0,0,0,1)")
						}
						if (k + (m / 2) + 0.05 <= 0.999) {
							stl.addColorStop(k + (m / 2) + 0.05, "rgba(0,0,0,0)")
						}
						stl.addColorStop(1, "rgba(0,0,0,0)");
						ftx.fillStyle = stl;
						ftx.fillRect(0, 0, w - 4, h - 4);
						ctx.drawImage(bfc, 0, 0, w, h)
					} else if (f == "smooth"){
						v = (c > 0 ? Math.min(8, Math.max(1, c)) : 1);
						t = Math.round(v * 5);
						b = Math.round(w * .75);
						q = Math.round(h * .75);
						for (i = 0; i < t; i++){
							r = Math.max(2, Math.round(b - (2 * i)));
							g = Math.max(2, Math.round(q - (2 * i)));
							bcx.clearRect(0, 0, w - 4, h - 4);
							bcx.drawImage(obj, 0, 0, w, h, 0, 0, r, g);
							ctx.clearRect(0, 0, w, h);
							ctx.drawImage(img, 0, 0, r, g, 0, 0, w, h)
						}
						bcx.drawImage(obj, 0, 0, w, h, 0, 0, w - 4, h - 4)
					} else if (f == "zoomblur"){
						bcx.drawImage(obj, 0, 0, w, h, 0, 0, w - 4, h - 4);
						v = (c > 0 ? c : 1);
						p = ctx.globalAlpha;
						b = .25;
						m = b / v;
						for (i = 0; i < v; i++){
							ctx.globalAlpha = b - (m * i);
							ctx.drawImage(img, 0, 0, img.width, img.height, - i, - i, w + (2 * i), 
							h + (2 * i))
						}
						ctx.globalAlpha = p;
						bcx.drawImage(obj, 0, 0, w, h, 0, 0, w - 4, h - 4)
					} else if (f == "motionblur"){
						bcx.drawImage(obj, 0, 0, w, h, 0, 0, w - 4, h - 4);
						v = (c[0] > 0 ? c[0] : 1);
						r = (c[1] >= 0 ? Math.min(360, c[1]) : 0);
						p = ctx.globalAlpha;
						i = 0;
						b = .25;
						m = b / v;
						var xo, yo, dx, dy, sx = 1, sy = 1, xi = 0, yi = 0, frc;
						z = ((r - 90) * Math.PI) / 180;
						xo = Math.round(v * Math.cos(z)) + xi;
						yo = Math.round(v * Math.sin(z)) + yi;
						dx = xo - xi;
						dy = yo - yi;
						if (dx < 0) {
							sx =- 1;
							dx =- dx
						}
						if (dy < 0) {
							sy =- 1;
							dy =- dy
						}
						dx = dx << 1;
						dy = dy << 1;
						if (dy < dx){
							frc = dy - (dx >> 1);
							while (xi != xo){
								if (frc >= 0) {
									yi += sy;
									frc -= dx
								}
								frc += dy;
								xi += sx;
								i++;
								ctx.globalAlpha = b - (m * i);
								ctx.drawImage(img, 0, 0, img.width, img.height, xi, yi, w, h)
							}
						} else{
							frc = dx - (dy >> 1);
							while (yi != yo){
								if (frc >= 0) {
									xi += sx;
									frc -= dy
								}
								frc += dx;
								yi += sy;
								i++;
								ctx.globalAlpha = b - (m * i);
								ctx.drawImage(img, 0, 0, img.width, img.height, xi, yi, w, h)
							}
						}
						ctx.globalAlpha = p;
						bcx.drawImage(obj, 0, 0, w, h, 0, 0, w - 4, h - 4)
					} else if (f == "spinblur"){
						bcx.drawImage(obj, 0, 0, w, h, 0, 0, w - 4, h - 4);
						v = (c > 0 ? c : 1);
						b = .25;
						m = b / v;
						ctx.save();
						ctx.translate(w / 2, h / 2);
						for (i = 0; i < v; i++){
							ctx.globalAlpha = b - (m * i);
							ctx.save();
							ctx.rotate((Math.PI * i) / 180);
							ctx.drawImage(img, 0, 0, img.width, img.height, 0 - (w / 2), 0 - (h / 2), 
							w, h);
							ctx.restore();
							ctx.save();
							ctx.rotate((Math.PI *- i) / 180);
							ctx.drawImage(img, 0, 0, img.width, img.height, 0 - (w / 2), 0 - (h / 2), 
							w, h);
							ctx.restore()
						}
						ctx.restore();
						bcx.drawImage(obj, 0, 0, w, h, 0, 0, w - 4, h - 4)
					}
				} else{
					if (f == "convolve" && (typeof m === 'object') && m != null || (typeof matrix[f] === 'object')){
						s = ctx.getImageData(x, y, w, h);
						a = s.data;
						d = ctx.getImageData(x, y, w, h);
						j = h;
						i = w;
						n = w * 4;
						k = matrix[f] || m;
						t = (c[0] >= 0 ? c[0] : k[0][0] + k[0][1] + k[0][2] + k[1][0] + k[1][1] + k[1][2] + k[2][0] + k[2][1] + k[2][2]);
						m = (c[1] >= 0 ? Math.min(255, c[1]) : 0);
						for (j = h; j > 0; j--){
							q = [(j - 2) * n, (j - 1) * n, j * n];
							for (i = w; i > 0; i--){
								o = [q[0] + (i - 2) * 4, q[1] + (i - 1) * 4, q[2] + i * 4];
								r = (a[o[0] - 4] * k[0][0] + a[o[0]] * k[0][1] + a[o[0] + 4] * k[0][2] + a[o[1] - 4] * k[1][0] + a[o[1]] * k[1][1] + a[o[1] + 4] * k[1][2] + a[o[2] - 4] * k[2][0] + a[o[2]] * k[2][1] + a[o[2] + 4] * k[2][2]) / t;
								g = (a[o[0] - 3] * k[0][0] + a[o[0] + 1] * k[0][1] + a[o[0] + 5] * k[0][2] + a[o[1] - 3] * k[1][0] + a[o[1] + 1] * k[1][1] + a[o[1] + 5] * k[1][2] + a[o[2] - 3] * k[2][0] + a[o[2] + 1] * k[2][1] + a[o[2] + 5] * k[2][2]) / t;
								b = (a[o[0] - 2] * k[0][0] + a[o[0] + 2] * k[0][1] + a[o[0] + 6] * k[0][2] + a[o[1] - 2] * k[1][0] + a[o[1] + 2] * k[1][1] + a[o[1] + 6] * k[1][2] + a[o[2] - 2] * k[2][0] + a[o[2] + 2] * k[2][1] + a[o[2] + 6] * k[2][2]) / t;
								d.data[o[1]] = Math.min(255, Math.max(0, r + m));
								d.data[o[1] + 1] = Math.min(255, Math.max(0, g + m));
								d.data[o[1] + 2] = Math.min(255, Math.max(0, b + m));
							}
						}
						ctx.putImageData(d, x, y)
					} else if (f == "outline"){
						v = (c[0] >= 0 ? Math.min(255, c[0]) : 1);
						b = (c[1] >= 0 ? Math.min(255, c[1]) : 0);
						t = (c[2] != '' ? c[2].match(/sobel|scharr|prewitt|kirsh|roberts/i) ? c[2] : 'sobel' : 'sobel');
						s = ctx.getImageData(x, y, w, h);
						a = s.data;
						d = ctx.getImageData(x, y, w, h);
						u = new Object();
						u.sobel = new Object();
						u.sobel.y = [1, 2, 1, 0, 0, 0, - 1, - 2, - 1];
						u.sobel.x = [1, 0, - 1, 2, 0, - 2, 1, 0, - 1];
						u.scharr = new Object();
						u.scharr.y = [3, 10, 3, 0, 0, 0, - 3, - 10, - 3];
						u.scharr.x = [3, 0, - 3, 10, 0, - 10, 3, 0, - 3];
						u.prewitt = new Object();
						u.prewitt.y = [ - 1, - 1, - 1, 0, 0, 0, 1, 1, 1];
						u.prewitt.x = [1, 0, - 1, 1, 0, - 1, 1, 0, - 1];
						u.kirsh = new Object();
						u.kirsh.y = [5, 5, 5, - 3, 0, - 3, - 3, - 3, - 3];
						u.kirsh.x = [5, - 3, - 3, 5, 0, - 3, 5, - 3, - 3];
						u.roberts = new Object();
						u.roberts.y = [ - 1, 0, 0, 0, 1, 0, 0, 0, 0];
						u.roberts.x = [0, 0, - 1, 0, 1, 0, 0, 0, 0];
						g = u[t].y;
						r = u[t].x;
						for (i = 0, n = a.length; i < n; i += 4){
							o = [[i - (w + 1) * 4, i - w * 4, i - (w - 1) * 4], [i - 4, i, i + 4], 
							[i + (w - 1) * 4, i + w * 4, i + (w + 1) * 4]];
							l = g[0] * (a[o[0][0]] || 0) + g[1] * (a[o[0][1]] || 0) + g[2] * (a[o[0][2]] || 0) + g[3] * (a[o[1][0]] || 0) + g[4] * (a[o[1][1]] || 0) + g[5] * (a[o[1][2]] || 0) + g[6] * (a[o[2][0]] || 0) + g[7] * (a[o[2][1]] || 0) + g[8] * (a[o[2][2]] || 0);
							m = r[0] * (a[o[0][0]] || 0) + r[1] * (a[o[0][1]] || 0) + r[2] * (a[o[0][2]] || 0) + r[3] * (a[o[1][0]] || 0) + r[4] * (a[o[1][1]] || 0) + r[5] * (a[o[1][2]] || 0) + r[6] * (a[o[2][0]] || 0) + r[7] * (a[o[2][1]] || 0) + r[8] * (a[o[2][2]] || 0);
							q = Math.min(255, Math.max(0, (Math.sqrt((l * l) + (m * m)) / v) + b));
							d.data[i] = d.data[i + 1] = d.data[i + 2] = q
						}
						ctx.putImageData(d, x, y)
					} else if (sba && f == "stackblur") {
						cvi_stackblur(ctx, c, x, y, w, h)
					} else if (f == "anaglyph"){
						bcx.drawImage(obj, 2, 2, w - 4, h - 4, 0, 0, w - 4, h - 4);
						ctx.drawImage(img, 0, 0, w - 4, h - 4, 0, 0, w, h);
						s = ctx.getImageData(0, 2, w - 4, h - 4);
						a = s.data;
						d = ctx.getImageData(4, 2, w - 4, h - 4).data;
						for (i = 0, n = a.length; i < n; i += 4) {
							a[i] = d[i]
						}
						ctx.putImageData(s, 2, 2);
						bcx.drawImage(obj, 2, 2, w - 4, h - 4, 0, 0, w - 4, h - 4)
					} else{
						s = ctx.getImageData(x, y, w, h);
						a = s.data;
						if (f == "invertalpha") {
							for (i = 0, n = a.length; i < n; i += 4) {
								a[i + 3] = 255 - a[i + 3];
							}
						} else if (f == "invert") {
							for (i = 0, n = a.length; i < n; i += 4) {
								a[i] = 255 - a[i];
								a[i + 1] = 255 - a[i + 1];
								a[i + 2] = 255 - a[i + 2];
							}
						} else if (f == "grayscale"){
							for (i = 0, n = a.length; i < n; i += 4) {
								t = Math.round(a[i] * 0.299 + a[i + 1] * 0.587 + a[i + 2] * 0.114);
								a[i] = a[i + 1] = a[i + 2] = t;
							}
						} else if (f == "alphamask"){
							for (i = 0, n = a.length; i < n; i += 4){
								t = Math.round(a[i] * 0.299 + a[i + 1] * 0.587 + a[i + 2] * 0.114);
								a[i] = a[i + 1] = a[i + 2] = 0;
								a[i + 3] = 255 - t;
							}
						} else if (f == "multiplyalpha"){
							for (i = 0, n = a.length; i < n; i += 4){
								r = a[i];
								g = a[i + 1];
								b = a[i + 2];
								t = a[i + 3] / 255;
								a[i] = Math.min(255, Math.max(0, r * t));
								a[i + 1] = Math.min(255, Math.max(0, g * t));
								a[i + 2] = Math.min(255, Math.max(0, b * t));
							}
						} else if (f == "unmultiplyalpha"){
							for (i = 0, n = a.length; i < n; i += 4){
								r = a[i];
								g = a[i + 1];
								b = a[i + 2];
								t = 255 / a[i + 3];
								a[i] = Math.min(255, Math.max(0, r * t));
								a[i + 1] = Math.min(255, Math.max(0, g * t));
								a[i + 2] = Math.min(255, Math.max(0, b * t));
							}
						} else if (f == "solarize"){
							for (i = 0, n = a.length; i < n; i += 4){
								if (a[i] > 127) {
									a[i] = 255 - a[i]
								}
								if (a[i + 1] > 127) {
									a[i + 1] = 255 - a[i + 1]
								}
								if (a[i + 2] > 127) {
									a[i + 2] = 255 - a[i + 2];
								}
							}
						} else if (f == "threshold"){
							v = (c >= 0 ? Math.min(2, c) * 127 : 127);
							for (i = 0, n = a.length; i < n; i += 4){
								t = Math.round(a[i] * 0.299 + a[i + 1] * 0.587 + a[i + 2] * 0.114);
								t = t >= v ? 255 : 0;
								a[i] = t;
								a[i + 1] = t;
								a[i + 2] = t;
							}
						} else if (f == "gamma"){
							g = (c >= 0 ? c : 1);
							t = new Array();
							for (i = 0; i < 256; i++) {
								t[i] = Math.min(255, Math.max(0, (255 * Math.pow(i / 255, 1 / g)) + 0.5))
							}
							for (i = 0, n = a.length; i < n; i += 4) {
								r = a[i];
								g = a[i + 1];
								b = a[i + 2];
								a[i] = t[r];
								a[i + 1] = t[g];
								a[i + 2] = t[b];
							}
						} else if (f == "colorkey"){
							l = (typeof c[0] === 'object') ? c[0] : [0, 0, 0];
							k = (typeof c[1] === 'object') ? c[1] : [255, 255, 255];
							for (i = 0, n = a.length; i < n; i += 4){
								if ((a[i] >= l[0] && a[i] <= k[0]) && (a[i + 1] >= l[1] && a[i + 1] <= k[1]) && (a[i + 2] >= l[2] && a[i + 2] <= k[2])) {
									a[i + 3] = 0;
								}
							}
						} else if (f == "exposure"){
							v = (c > 0 ? Math.min(255, Math.max(0, c)) : 1);
							if (v != 1){
								t = new Array();
								for (i = 0; i < 256; i++) {
									t[i] = Math.min(255, Math.max(0, 255 * (1 - Math.exp(-(i / 255) * v))))
								}
								for (i = 0, n = a.length; i < n; i += 4) {
									r = a[i];
									g = a[i + 1];
									b = a[i + 2];
									a[i] = t[r];
									a[i + 1] = t[g];
									a[i + 2] = t[b];
								}
							}
						} else if (f == "brightness"){
							v = (c >= 0 ? c : 1);
							for (i = 0, n = a.length; i < n; i += 4){
								a[i] = Math.min(255, Math.max(0, a[i] * v));
								a[i + 1] = Math.min(255, Math.max(0, a[i + 1] * v));
								a[i + 2] = Math.min(255, Math.max(0, a[i + 2] * v));
							}
						} else if (f == "adjustyuva"){
							k = (c[0] >= 0 ? c[0] : 1);
							t = (c[1] >= 0 ? c[1] : 1);
							m = (c[2] >= 0 ? c[2] : 1);
							v = (c[3] >= 0 ? c[3] : 1);
							for (i = 0, n = a.length; i < n; i += 4){
								yuv = rgb2yuv(a[i], a[i + 1], a[i + 2]);
								rgb = yuv2rgb(yuv[0] * k, yuv[1] * t, yuv[2] * m);
								a[i] = rgb[0];
								a[i + 1] = rgb[1];
								a[i + 2] = rgb[2];
								a[i + 3] = Math.min(255, Math.max(0, a[i + 3] * v));
							}
						} else if (f == "chromakey"){
							k = (c[0] >= 0 ? Math.min(360, c[0]) : 127);
							t = (c[1] >= 0 ? Math.min(360, c[1] * 3.6) : 36);
							m = (c[2] >= 0 ? Math.min(100, c[2]) : 88);
							r = (c[3] >= 0 ? Math.min(100, c[3]) : 30);
							b = (c[4] >= 0 ? Math.min(100, Math.max(r, c[4])) : 82);
							for (i = 0, n = a.length; i < n; i += 4){
								v = rgb2hsb(a[i], a[i + 1], a[i + 2]);
								if (v[1] >= m && (v[2] >= r && v[2] <= b) && (v[0] - k < t) && (v[0] - k > (-t))) {
									a[i + 3] = Math.abs(v[0] - k) / t;
								}
							}
						} else if (f == "sepia"){
							for (i = 0, n = a.length; i < n; i += 4){
								r = a[i];
								g = a[i + 1];
								b = a[i + 2];
								a[i] = Math.min(255, Math.max(0, r * .393 + g * .769 + b * .189));
								a[i + 1] = Math.min(255, Math.max(0, r * .349 + g * .686 + b * .168));
								a[i + 2] = Math.min(255, Math.max(0, r * .272 + g * .534 + b * .131));
							}
						} else if (f == "mixrgb"){
							k = (typeof c[0] === 'object') ? c[0] : [0, 0, 0];
							l = (typeof c[1] === 'object') ? c[1] : [0, 0, 0];
							for (i = 0, n = a.length; i < n; i += 4){
								r = a[i];
								g = a[i + 1];
								b = a[i + 2];
								a[i] = Math.min(255, Math.max(0, (k[0] * (l[2] * g + (255 - l[2]) * b) / 255 + (255 - k[0]) * r) / 255));
								a[i + 1] = Math.min(255, Math.max(0, (k[1] * (l[0] * b + (255 - l[0]) * r) / 255 + (255 - k[1]) * g) / 255));
								a[i + 2] = Math.min(255, Math.max(0, (k[2] * (l[1] * r + (255 - l[1]) * g) / 255 + (255 - k[2]) * b) / 255));
							}
						} else if (f == "posterize"){
							v = (c > 0 ? Math.min(16, Math.max(1, c)) : 1);
							t = new Array();
							for (i = 0; i < 256; i++) {
								t[i] = 255 * (v * i / 256) / (v - 1)
							}
							for (i = 0, n = a.length; i < n; i += 4){
								r = a[i];
								g = a[i + 1];
								b = a[i + 2];
								a[i] = Math.min(255, Math.max(0, t[r]));
								a[i + 1] = Math.min(255, Math.max(0, t[g]));
								a[i + 2] = Math.min(255, Math.max(0, t[b]));
							}
						} else if (f == "adjustrgba"){
							r = (c[0] >= 0 ? c[0] : 1);
							g = (c[1] >= 0 ? c[1] : 1);
							b = (c[2] >= 0 ? c[2] : 1);
							v = (c[3] >= 0 ? c[3] : 1);
							for (i = 0, n = a.length; i < n; i += 4){
								a[i] = Math.min(255, Math.max(0, a[i] * r));
								a[i + 1] = Math.min(255, Math.max(0, a[i + 1] * g));
								a[i + 2] = Math.min(255, Math.max(0, a[i + 2] * b));
								a[i + 3] = Math.min(255, Math.max(0, a[i + 3] * v));
							}
						} else if (f == "contrast"){
							v = (c >= 0 ? c : 1);
							for (i = 0, n = a.length; i < n; i += 4){
								a[i] = Math.min(255, Math.max(0, ((((a[i] / 255) - 0.5) * v) + 0.5) * 255));
								a[i + 1] = Math.min(255, Math.max(0, ((((a[i + 1] / 255) - 0.5) * v) + 0.5) * 255));
								a[i + 2] = Math.min(255, Math.max(0, ((((a[i + 2] / 255) - 0.5) * v) + 0.5) * 255));
							}
						} else if (f == "adjusthsba"){
							k = (c[0] >= 0 ? c[0] : 1);
							t = (c[1] >= 0 ? c[1] : 1);
							m = (c[2] >= 0 ? c[2] : 1);
							v = (c[3] >= 0 ? c[3] : 1);
							for (i = 0, n = a.length; i < n; i += 4){
								hsb = rgb2hsb(a[i], a[i + 1], a[i + 2]);
								hsb[0] *= k;
								if (hsb[0] < 0) {
									hsb[0] = 0
								} else if (hsb[0] > 360) {
									hsb[0] = 360
								}
								hsb[1] *= t;
								if (hsb[1] < 0) {
									hsb[1] = 0
								} else if (hsb[1] > 100) {
									hsb[1] = 100
								}
								hsb[2] *= m;
								if (hsb[2] < 0) {
									hsb[2] = 0
								} else if (hsb[2] > 100) {
									hsb[2] = 100
								}
								rgb = hsb2rgb(hsb[0], hsb[1], hsb[2]);
								a[i] = rgb[0];
								a[i + 1] = rgb[1];
								a[i + 2] = rgb[2];
								a[i + 3] = Math.min(255, Math.max(0, a[i + 3] * v));
							}
						} else if (f == "tritone"){
							k = (typeof c[0] === 'object') ? c[0] : [255, 0, 0];
							l = (typeof c[1] === 'object') ? c[1] : [0, 255, 0];
							m = (typeof c[2] === 'object') ? c[2] : [0, 0, 255];
							t = new Array();
							for (i = 0; i < 128; i++) {
								q = i / 127;
								t[i] = [k[0] + q * (l[0] - k[0]), k[1] + q * (l[1] - k[1]), k[2] + q * (l[2] - k[2])]
							}
							for (i = 128; i < 256; i++) {
								q = (i - 127) / 128;
								t[i] = [l[0] + q * (m[0] - l[0]), l[1] + q * (m[1] - l[1]), l[2] + q * (m[2] - l[2])]
							}
							for (i = 0, n = a.length; i < n; i += 4){
								v = Math.min(255, Math.max(0, Math.round(a[i] * 0.299 + a[i + 1] * 0.587 + a[i + 2] * 0.114)));
								a[i] = t[v][0];
								a[i + 1] = t[v][1];
								a[i + 2] = t[v][2];
							}
						}
						ctx.putImageData(s, x, y)
					}
				}
			}
		}
	}
	return false;
}

return cvi_filter;
	
	
});