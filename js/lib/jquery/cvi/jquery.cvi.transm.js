;define("jquery/cvi/jquery.cvi.transm", ["./jquery.cvi.tfx", "./jquery.cvi.trans", "./jquery.cvi.tween"],function(require, exports, module) {
	
/**
 * transm.js 1.2 (10-Aug-2010) (c) by Christian Effenberger 
 * All Rights Reserved. Source: transm.netzgesta.de
 * Distributed under Netzgestade Software License Agreement.
 * This license permits free of charge use on non-commercial 
 * and private web sites only under special conditions. 
 * Read more at... http://www.netzgesta.de/cvi/LICENSE.html	
 * Commercial licenses available via... cvi[at]netzgesta[dot]de	

 syntax:
 	transm.defaultWidth			= 320;  	//INT  64-1024 (pixel)
	transm.defaultHeight		= 180;		//INT  64-1024 (pixel)
	transm.defaultRadius		= 0;		//INT|OBJ [0,0,0,0]  (pixel)
	transm.defaultName			= null;		//STR  (canvas name|id)
	transm.defaultLayer			= null;		//STR  (overlay image path & file)
	transm.defaultData			= null;		//OBJ  (image array)
	transm.defaultCallback		= null;		//STR  (simple function)
	
	data = [{
		source: 'image.jpg',
		imgshift : 0.5,		//FLT optional image shift value (0==top|left, 0.5==center, 1==bottom|right)
		callbefore : null, 	//STR optional simple callback function name (executes on start of transition)
		argbefore : null,	//STR|INT optional callback argument (string or number only)
		callafter : null, 	//STR optional simple callback function name (executes on end of transition)
		argafter : null,	//STR|INT optional callback argument (string or number only)
		transition : null,	//STR optional transition name
		alphaimg: null,		//STR optional image path & file (if transition=='alpha')
		option1 : null,		//INT optional transition argument #1 (number only)
		option2 : null,		//INT optional transition argument #2 (number only)
		tweening : null,	//STR optional tweening name
		cparray : null,		//STR optional control points array (if tweening=='cubicBezierCurve')
		duration : 2,		//FLT optional duration value (seconds)
		delay : 10,			//FLT optional delay value (seconds)
		fps : 30,			//INT optional frames per second
		title: '',			//STR optional tooltip
		onclick: '',		//STR optional js-function
		href: '',			//STR optional URL
		target: '_self',	//STR optional target
	}]
	
	transm.defaultFadein		= false;	//BOL  (true | false) 
	transm.defaultAutoplay		= false;	//BOL  (true | false)
	transm.defaultPingpong		= false;	//BOL  (true | false) 
	transm.defaultVerbose		= false;	//BOL  (true | false)
	transm.defaultClearbg		= false;	//BOL  (true | false)
	transm.defaultNocache		= false;	//BOL  (true | false)
	transm.defaultNopreload		= false;	//BOL  (true | false)
	transm.defaultTimeout		= 6;		//FLT  1-60 (seconds)
	transm.defaultTransition	= 'random',	//STR  (transition name)
	transm.defaultTweening		= 'default',//STR  (tweening name)
	transm.defaultCparray		= null;		//OBJ  (control points array)
	transm.defaultDuration 		= 2.0;		//FLT  0.5-5.0 (seconds)
	transm.defaultFps 			= 30;  		//INT  15-100 (frames per sec.)
	transm.defaultDelay			= 5;		//FLT  0.0-600.0 (seconds)
	transm.defaultMeter			= false;	//BOL  (true | false)
	transm.defaultMfgcolor		= '#ff0000';//STR  '#000000'-'#ffffff'
	transm.defaultMbgcolor		= '#ffffff';//STR  '#000000'-'#ffffff'
	transm.defaultMopacity		= 0.75;		//FLT  0.1-1.0 (opacity)
	transm.defaultMsize			= 32;		//INT  24-min(width,height)
	transm.defaultMposx			= 0;		//INT  0-(width-msize)
	transm.defaultMposy			= 0;		//INT  0-(height-msize)
	
STR=trans.add( object, options ); //RETURNS canvas name|id
STR=trans.add( object, {
						width: INT
						, height: INT
						, radius: INT|OBJ
						, data: OBJ
						, layer: STR
						, name: STR
						, fadein: BOL
						, autoplay: BOL
						, pingpong: BOL
						, verbose: BOL
						, clearbg: BOL
						, timeout: FLT
						, transition: STR
						, tweening: STR
						, cparray: OBJ
						, duration: FLT
						, delay: FLT
						, fps: INT
						, meter: BOL
						, mfgcolor: STR
						, mbgcolor: STR
						, mopacity: FLT
						, msize: INT
						, mposx: INT
						, mposy: INT
					} );
 	
	trans.remove( canvas );
		
	transm.play( canvas );
	transm.stop( canvas );
		
	transm.first( canvas );
	transm.prev( canvas );
	transm.show( canvas, image_number );
	transm.next( canvas );
	transm.last( canvas );
	
OBJ=transm.info( canvas );
	OBJ.transition 	== used transition 		//STR
	OBJ.tweening 	== used tweening		//STR



	OBJ.duration 	== real duration value 	//FLT
	OBJ.fps		 	== real fps value 		//FLT
	
VAL=transm.get( canvas, ['busy'|'playing'|'current'|'total'|'transition'|'tweening'|'duration'|'fps'] );
	busy 		== transition in action //BOL
	playing 	== autoplay in action 	//BOL
	current		== current image number //INT (starting with zero)
	total		== no. of all images  	//INT
	transition 	== used transition 		//STR
	tweening 	== used tweening		//STR
	duration 	== real duration value 	//FLT
	fps		 	== real fps value 		//FLT
	
FLT=transm.version;
STR=transm.released;
	
 *
**/



/////////////////////////stuff function>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


var cvi_tfx = require("./jquery.cvi.tfx")|| null
,cvi_trans = require("./jquery.cvi.trans")||null
,cvi_tween  = require("./jquery.cvi.tween")||null;

var transm = {
	version : 1.2
	, released : '2010-08-10 12:00:00'
	, defaultWidth : 320
	, defaultHeight : 180
	, defaultRadius : 0
	, defaultName : null
	, defaultData : null
	, defaultCallback : null
	, defaultLayer : null
	, defaultAutoplay : 0
	, defaultPingpong : 0
	, defaultVerbose : 0
	, defaultNocache : 0
	, defaultNopreload : 0
	, defaultFadein : 0
	, defaultClearbg : 0
	, defaultTimeout : 6
	, defaultTransition : 'random'
	, defaultTweening : 'default'
	, defaultCparray : null
	, defaultDuration : 2
	, defaultDelay : 5
	, defaultFps : 30
	, defaultMeter : false
	, defaultMfgcolor : '#ff0000'
	, defaultMbgcolor : '#ffffff'
	, defaultMopacity : 0.75
	, defaultMsize : 32
	, defaultMposx : 280
	, defaultMposy : 140 , 
	engine : (window.opera ? 
						"O" : document.all && !window.opera ? 
														"Ms" : navigator.userAgent.indexOf('WebKit') > - 1 ? 
																						"Webkit" : navigator.userAgent.indexOf('KHTML') > - 1 && navigator.userAgent.indexOf('WebKit') ==- 1 ? 
																																												"Khtml" : navigator.userAgent.indexOf('Gecko') > - 1 && window.updateCommands ? 
																																																														"Moz" : "")
};
	
	
transm.css = function (v) {
	var i, t, d = new Object(), s = new Array("O", "Ms", "Khtml", "Webkit", "Moz");
	d["o"] = d["ms"] = d["khtml"] = d["webkit"] = d["moz"] = d["css"] = false;
	if (v && (typeof v === 'string')) {
		t = v.substr(0, 1).toUpperCase() + v.substring(1);
		for (i = 0; i < s.length; i++) {
			try {
				d[s[i].toLowerCase()] = (document.body.style[s[i] + t] !== undefined);
			} catch (e) {}
		}
	}
	try {
		d["css"] = (document.body.style[v] !== undefined);
	} catch (e) {}
	d["any"] = (d["css"] || d["moz"] || d["khtml"] || d["webkit"] || d["ms"] || d["o"] ? true : false);
	return d;
};
transm.style = function (v) {
	if (v && (typeof v === 'string')) {
		var d = this.css(v), t = v.substr(0, 1).toUpperCase() + v.substring(1);
		return this.engine != "" && d.any ? d.css ? v : d[this.engine.toLowerCase()] ? this.engine + t : false : false;
	}
	return false;
};
transm.canvas = function (v) {
	var t = document.createElement('canvas'), c = false;
	if (t.tagName.toUpperCase() == "CANVAS") {
		try {
			c = t.getContext("2d");
		} catch (e) {}
	}
	if (c && v && (typeof v === 'string')) {
		if (c[v]) {
			return true;
		} else if (t[v]) {
			return true;
		} else {
			return false;
		}
	} else {
		return Boolean(c);
	}
};
transm.current = function (o) {
	var s;
	if (o.currentStyle) {
		s = o.currentStyle;
	} else if (document.defaultView && document.defaultView.getComputedStyle) {
		s = document.defaultView.getComputedStyle(o, "");
	} else {
		s = o.style;
	}
	return s;
};
transm.color = function (v) {
	if (v.toLowerCase().match(/^#[0-9a-f]{6}$/i)) {
		return v;
	} else if (v.toLowerCase().match(/^#[0-9a-f]{3}$/i)) {
		return '#' + v.substr(1, 1) + v.substr(1, 1) + v.substr(2, 1) + v.substr(2, 1) + v.substr(3, 1) + v.substr(3, 
		1);
	} else {
		return '#000000';
	}
};
transm.rgb = function (v) {
	function h2d(h){
		return (Math.max(0, Math.min(parseInt(h, 16), 254)));
	};
	return h2d(v.substr(1, 2)) + ',' + h2d(v.substr(3, 2)) + ',' + h2d(v.substr(5, 2));
};
transm.vml = function () {
	return require.async('./jquery.cvi',function(cvi){return !cvi.SUPPORT_CANVAS;});
};
transm.log = function (s, v) {
	s = s.toUpperCase() || 'LOG';
	if (window.console) {
		if (!window.console.warn) {
			window.console.log(s + ': ' + v);
		} else {
			window.console[s.toLowerCase() || 'log'](v);
		}
	} else if (window.opera) {
		opera.postError(s + ': ' + v);
	} else {
		window.document.title = s + ': ' + v;
	}
	return false;
};
transm.G = function (v) {
	return (document.getElementById(v));
};
transm.R = function (v) {
	return (document.body.removeChild(v));
};
transm.A = function (v) {
	return (document.body.appendChild(v));
};
transm.C = function (v) {
	return (document.createElement(v));
};
transm.add = function (object, options) {
	try{//
		//alert('in')
		function uniqueID() {
			var v = Date.parse(new Date()) + Math.floor(Math.random() * 100000000000);
			return v.toString(16);
		}
		function getFName(v, s) {
			var fn = v.replace(/^.*[\/\\]/g, ''), t = fn.lastIndexOf(".");
			if (s && t > 0) {
				fn = fn.substring(0, t);
			}
			return fn;
		};
		function getArg(a, t) {
			return (typeof options[a.toLowerCase()] === t ? options[a.toLowerCase()] : transm["default" + a]);
		};
		function getNum(a, n, m) {
			return Math.max(n, Math.min(m, (typeof options[a.toLowerCase()] === 'number' ? options[a.toLowerCase()] : transm["default" + a])));
		};
		function finalize() {
			tmp = transm.C('a');
			tmp.style.height = height + 'px';
			tmp.style.width = width + 'px';
			with (tmp.style) {
				display = 'block';
				position = 'absolute';
				background = 'transparent';
				zIndex = 11;
				left = '0px';
				top = '0px';
				padding = '0px';
				margin = '0px';
				outline = '0px none';
				border = '0px none';
			}
			object.appendChild(tmp);
			tmp.unselectable = true;
			if (nsa) {
				tmp.style[nsa] = 'none';
			}
			if (nda) {
				tmp.style[nda] = 'none';
			}
			tmp.id = self.id + "_link";
			tmp.title = null;
			tmp.href = null;
			tmp.target = null;
			if (self.meter) {
				if (self.w3c) {
					var meter = transm.C('canvas');
					meter.id = self.id + "_meter";
					meter.width = self.msize;
					meter.height = self.msize;
					meter.style.height = self.msize + 'px';
					meter.style.width = self.msize + 'px';
					meter.style.position = 'absolute';
					meter.style.left = self.mposx + 'px';
					meter.style.top = self.mposy + 'px';
					if (nsa) {
						meter.style[nsa] = 'none';
					}
					if (nda) {
						meter.style[nda] = 'none';
					}
					tmp.appendChild(meter);
				} else if (self.vml) {
					var meter = transm.C('div');
					meter.id = self.id + "_meter";
					meter.style.height = self.msize + 'px';
					meter.style.width = self.msize + 'px';
					meter.style.display = 'block';
					meter.style.position = 'absolute';
					meter.style.left = self.mposx + 'px';
					meter.style.top = self.mposy + 'px';
					meter.style.visibility = 'visible';
					tmp.appendChild(meter);
					meter.unselectable = true;
					meter.innerHTML = '<v:oval' + ' strokeweight="0"' + ' stroked="f"' + ' filled="t"' + ' fillcolor="#808080"' + ' style="zoom:1;display:block;position:absolute;left:0px;top:0px;margin:0px;padding:0px;width:' + self.msize + 'px;height:' + self.msize + 'px;">' + '<v:fill' + ' color="' + self.mbgcolor + '"' + ' opacity="' + self.mopacity + '" />' + '</v:oval>' + '<v:shape' + ' path="m 500,500 ae 500,500,500,500,5898150,23592960 x e"' + ' coordorigin="0,0"' + ' coordsize="1000,1000"' + ' strokeweight="0"' + ' stroked="f"' + ' filled="t"' + ' fillcolor="#808080"' + ' style="zoom:1;display:block;position:absolute;left:0px;top:0px;margin:0px;padding:0px;width:' + self.msize + 'px;height:' + self.msize + 'px;">' + '<v:fill color="' + self.mfgcolor + '" opacity="' + self.mopacity + '" /></v:shape>';
					meter.style.visibility = 'hidden';
				} else {
					var meter = transm.C('div');
					meter.id = self.id + "_meter";
					meter.style.width = (self.cw - 4) + 'px';
					with (meter.style) {
						fontSize = '4px';
						lineHeight = '4px';
						height = '4px';
						position = 'absolute';
						display = 'block';
						background = self.mfgcolor;
						right = '2px';
						bottom = '2px';
						visibility = 'hidden';
					}
					meter.style[self.opa] = self.mopacity;
					meter.style.filter = "alpha(opacity=" + (self.mopacity * 100) + ")";
					tmp.appendChild(meter);
					meter.unselectable = true;
					if (nsa) {
						meter.style[nsa] = 'none';
					}
					if (nda) {
						meter.style[nda] = 'none';
					}
				}
			}
			var cover = transm.C('div');
			cover.id = self.id + "_cover";
			cover.style.width = parseInt(self.cw  / 2, 10) + 'px';
			with (cover.style) {
				height = '16px';
				fontSize = '12px';
				lineHeight = '12px';
				position = 'absolute';
				display = 'block';
				background = self.mbgcolor;
			}
			cover.style.left = parseInt((self.cw  / 4), 10) + 'px';
			cover.style.top = parseInt((self.ch  / 2) - 7, 10) + 'px';
			if (nbr) {
				cover.style[nbr] = '8px';
			}
			tmp.appendChild(cover);
			cover.unselectable = true;
			if (nsa) {
				cover.style[nsa] = 'none';
			}
			if (nda) {
				cover.style[nda] = 'none';
			}
			cover.style[self.opa] = self.mopacity;
			cover.style.filter = "alpha(opacity=" + (self.mopacity * 100) + ")";
			var pro = transm.C('div');
			pro.id = self.id + "_progress";
			if (nbr) {
				pro.style[nbr] = '8px';
			}
			with (pro.style) {
				width = '0px';
				fontSize = '12px';
				lineHeight = '12px';
				height = '16px';
				margin = '0px';
				position = 'absolute';
				display = 'block';
				background = self.mfgcolor;
				left = '0px';
				top = '0px';
			}
			cover.appendChild(pro);
			pro.unselectable = true;
			if (self.vml && document.documentMode) {
				pro.style.filter = "alpha(opacity=" + (self.mopacity * 100) + ")";
			}
			if (self.nopreload) {
				cover.style.visibility = 'hidden';
			}
			if (self.vml && !self.nocache) {
				tmp = transm.C('v:image');
				tmp.id = self.id + "_vml_preloader";
				tmp.src = "";
				tmp.strokeweight = "0";
				tmp.stroked = "f";
				tmp.style.display = 'block';
				tmp.style.visibility = 'visible';
				tmp.style.cssText = 'zoom:1;position:absolute;left:-9999px;top:0px;margin:0px;padding:0px;width:' + self.cw + 'px;height:' + self.ch + 'px;';
				transm.A(tmp);
			}
			transm._preload(self, 0);
			return self.id;
		};
		var width, height, cw, ch, tmp, data, img, id, vml, w3c, opa, nbr, nsa, nda, i, ctx, radius = 0, 
		radii, verbose, defopts = {
			"width" : this.defaultWidth, "height" : this.defaultHeight, "radius" : this.defaultRadius, 
			"name" : this.defaultName, "data" : this.defaultData, "layer" : this.defaultLayer, "autoplay" : this.defaultAutoplay, 
			"pingpong" : this.defaultPingpong, "verbose" : this.defaultVerbose, "fadein" : this.defaultFadein, 
			"callback" : this.defaultCallback, "clearbg" : this.defaultClearbg, "timeout" : this.defaultTimeout, 
			"transition" : this.defaultTransition, "tweening" : this.defaultTweening, "cparray" : this.defaultCparray, 
			"duration" : this.defaultDuration, "delay" : this.defaultDelay, "fps" : this.defaultFps, "meter" : this.defaultMeter, 
			"mfgcolor" : this.defaultMfgcolor, "mbgcolor" : this.defaultMbgcolor, "mopacity" : this.defaultMopacity, 
			"msize" : this.defaultMsize, "mposx" : this.defaultMposx, "mposy" : this.defaultMposy 
		};
		if (options) {
			for (i in defopts) {
				if (!options[i]) {
					options[i] = defopts[i];
				}
			}
		} else {
			options = defopts;
		}
		verbose = getArg('Verbose', 'boolean');
		vml = transm.vml();
		if (!vml) {
			w3c = transm.canvas();
		}
		nbr = transm.style('BorderRadius');
		nsa = transm.style('UserSelect');
		nda = transm.style('UserDrag');
		opa = transm.style('Opacity');
		//alert(typeof $.cvi.tfx == 'object' && typeof $.cvi.trans == 'object')
		if (typeof cvi_tfx == 'object' && typeof cvi_trans == 'object') {
			width = cw = parseInt(getNum('Width', 64, 1920), 10);
			height = ch = parseInt(getNum('Height', 64, 1024), 10);
			if (typeof options['radius'] === 'number') {
				radius = parseInt(getNum('Radius', 0, Math.min(width  / 2, height  / 2)), 10);
			}
			radii = (typeof options['radius'] === 'object' ? options['radius'] : new Array());
			for (i = 0; i < 4; i++) {
				radii[i] = parseInt(Math.min(width  / 2, height  / 2, Math.max(radii[i] || 0, 0)), 10);
			}
			object.id = (object.id != 'undefined' ? object.id : uniqueID());
			id = getArg('Name', 'string');
			tmp = (id == '' || id == null ? object.id + '_transm' : id);
			data = (typeof options['data'] === 'object' ? options['data'] : new Array());
			if (!transm.G(tmp) && data != null && data.length && data.length > 1) {
				tmp = transm.current(object);
				if (tmp.display.match(/^none|inline|run-in|compact|marker$/i)) {
					object.style.display = 'block';
				}
				if (tmp.position.match(/^none|static$/i)) {
					object.style.position = 'relative';
				}
				object.innerHTML = '';
				with (object.style) {
					overflow = 'hidden';
					padding = '0px';
					outline = '0px none';
					border = '0px none';
					cursor = 'progress';
				}
				object.unselectable = true;
				object.style.height = height + 'px';
				object.style.width = width + 'px';
				if (nsa) {
					object.style[nsa] = 'none';
				}
				if (nda) {
					object.style[nda] = 'none';
				}//
				try {
					if (vml) {
						require.async('./jquery.cvi',function(cvi){
							cvi.VML_NAMESPACES();
						});
						//alert(ddd)
						if (radius) {
							var self = transm.C('v:roundrect');
							self.vml = true;
							self.radius = Math.max(Math.min(100, radius  / (Math.min(width, height)  / 100)), 
							0) + '%';
							self.arcsize = self.radius;
						} else {
							var self = transm.C('v:shape');
							self.vml = true;
							self.coordsize = width + ',' + height;
							var r = radii, w = width, h = height, p = "m 0," + r[0];
							if (r[3] > 0) {
								p += " l 0," + (h - r[3]) + " qy " + r[3] + "," + h;
							} else {
								p += " l 0," + h;
							}
							if (r[2] > 0) {
								p += " l " + (w - r[2]) + "," + h + " qx " + w + "," + (h - r[2]);
							} else {
								p += " l " + w + "," + h;
							}
							if (r[1] > 0) {
								p += " l " + w + "," + r[1] + " qy " + (w - r[1]) + ",0";
							} else {
								p += " l " + w + ",0";
							}
							if (r[0] > 0) {
								p += " l " + r[0] + ",0 qx 0," + r[0];
							} else {
								p += " l 0,0";
							}
							p += " x e";
							self.fillpath = p;
							self.path = self.fillpath;
						}
						self.strokeweight = "0";
						self.filled = "t";
						self.stroked = "f";
						self.fillcolor = "#808080";
						self.style.display = 'block';
						self.style.visibility = 'visible';
						self.style.cssText = 'zoom:1;position:absolute;left:0px;top:0px;margin:0px;padding:0px;width:' + width + 'px;height:' + height + 'px;';
						self.style.visibility = 'hidden';
					} else if (w3c) {
						var self = transm.C('canvas');
						self.w3c = true;
						self.csp = transm.canvas('getImageData');
						self.wcs = navigator.userAgent.indexOf('WebKit') !=- 1 && !window.external && !document.defaultCharset ? 1 : 0;
						self.wcf = navigator.userAgent.indexOf('Gecko') > - 1 && window.updateCommands && !window.external ? 1 : 0;
					} else {
						if (document.images && document.getElementById && document.createElement && document.appendChild && document.removeChild && document.childNodes) {
							var self = transm.C('img');
							self.old = true;
							self.style.position = 'absolute';
							self.style.left = '0px';
							self.style.top = '0px';
							self.tri = document.all && !window.opera && (!document.documentMode || document.documentMode < 9) ? 1 : 0;
						}
					}
					if (self) {
						self.data = data;
						self.nsa = nsa;
						self.nda = nda;
						self.opa = opa ? opa : 'opacity';
						if (typeof cvi_tween['sineEaseInOut'] != 'function') {
							self.nolib = true;
							if (verbose) {
								transm.log('warn', 'transm: missing "cvi_tween_lib"');
							}
						}
						for (i = 0; i < self.data.length; i++) {
							if (self.data[i].source.match(/\.(gif|png|jpg|jpeg)(?:\?([^#]*))?(?:#(\.*))?$/i)) {
								self.data[i].n = getFName(self.data[i].source, true);
							}
						}
						for (i = 0; i < self.data.length; i++) {
							if (!self.data[i].n) {
								self.data.splice(i, 1);
								i--;
							}
						}
						if (self.data.length > 1) {
							self.verbose = verbose;
							self.autoplay = getArg('Autoplay', 'boolean');
							self.pingpong = getArg('Pingpong', 'boolean');
							self.clearbg = getArg('Clearbg', 'boolean');
							self.fadein = getArg('Fadein', 'boolean');
							self.nocache = getArg('Nocache', 'boolean');
							self.nopreload = getArg('Nopreload', 'boolean');
							self.timeout = parseInt(getNum('Timeout', 1, 60), 10) * 1000;
							self.transition = getArg('Transition', 'string');
							self.tweening = getArg('Tweening', 'string');
							self.cparray = getArg('Cparray', 'object');
							self.duration = parseFloat(getNum('Duration', 0.5, 5));
							self.delay = parseFloat(getNum('Delay', 0, 600));
							self.fps = parseInt(getNum('Fps', 15, 100), 10);
							self.layer = getArg('Layer', 'string');
							self.back = getArg('Callback', 'string');
							self.meter = getArg('Meter', 'boolean');
							self.mfgcolor = transm.color(getArg('Mfgcolor', 'string'));
							self.mbgcolor = transm.color(getArg('Mbgcolor', 'string'));
							self.mfgc = transm.rgb(self.mfgcolor);
							self.mbgc = transm.rgb(self.mbgcolor);
							self.mopacity = parseFloat(getNum('Mopacity', 0.1, 1.0));
							self.msize = parseInt(getNum('Msize', 24, Math.min(width, height)), 10);
							self.mposx = parseInt(getNum('Mposx', 0, width - self.msize), 10);
							self.mposy = parseInt(getNum('Mposy', 0, height - self.msize), 10);
							self.xfac = width > height ? 1 : height > width ? width  / height : 1;

							self.yfac = height > width ? 1 : width > height ? height  / width : 1;
							self.ifac = self.xfac == 1 ? (width  / height) : (height  / width);
							self.noiL = 0;
							self.curI = 0;
							self.preI = 0;
							self.curD = 1;
							self.fromB = 'a';
							self.pbgcolor = tmp.backgroundColor;
							self.pbgimage = tmp.backgroundImage;
							self.options = options;
							self.id = id != null ? id : object.id + '_transm';
							if (w3c) {
								self.radius = radius;
								self.radii = radii;
								self.height = height;
								self.width = width;
							}
							self.ch = height;
							self.cw = width;
							with (self.style) {
								padding = '0px';
								margin = '0px';
								outline = '0px none';
								border = '0px none';
							}
							self.style.height = height + 'px';
							self.style.width = width + 'px';
							self.unselectable = true;
							if (nsa) {
								self.style[nsa] = 'none';
							}
							if (nda) {
								self.style[nda] = 'none';
							}
							self.style[self.opa] = 1;
							self.TLtrans = null;
							self.TLtween = null;
							self.TLerror = null;
							self.TLfilter = null;
							self.TLacall = null;
							self.TLaarg = null;
							self.TLbcall = null;
							self.TLbarg = null;
							self.TLbusy = false;
							self.TLdur = 0;
							self.TLfps = 0;
							object.appendChild(self);
							if (self.w3c) {
								var buff_a = transm.C('canvas'), buff_b = transm.C('canvas');
								if (self.wcs) {
									buff_a.id = self.id + '_img_a';
									buff_a.height = ch;
									buff_a.width = cw;
									with (buff_a.style) {
										position = 'fixed';
										left = '-9999px';
										top = '0px';
									}
									buff_a.style.height = ch + 'px';
									buff_a.style.width = cw + 'px';
									transm.A(buff_a);
									buff_b.id = self.id + '_img_b';
									buff_b.height = ch;
									buff_b.width = cw;
									with (buff_b.style) {
										position = 'fixed';
										left = '-9999px';
										top = '0px';
									}
									buff_b.style.height = ch + 'px';
									buff_b.style.width = cw + 'px';
									transm.A(buff_b);
								} else {
									buff_a.width = buff_b.width = width;
									buff_a.height = buff_b.height = height;
								}
								self.a = buff_a;
								self.b = buff_b;
								self.ctx = self.getContext("2d");
							}
							if (self.old) {
								tmp = transm.C('img');
								tmp.height = height;
								tmp.width = width;
								with (tmp.style) {
									position = 'absolute';
									left = '0px';
									top = '0px';
									padding = '0px';
									margin = '0px';
									outline = '0px none';
									border = '0px none';
								}
								object.appendChild(tmp);
								tmp.unselectable = true;
								if (nsa) {
									tmp.style[nsa] = 'none';
								}
								if (nda) {
									tmp.style[nda] = 'none';
								}
								tmp.id = self.id + "_buffer";
							}
							if (self.layer) {
								img = new Image();
								img.onerror = function () {
									self.layer = null;
									finalize();
								};
								img.onload = function () {
									if (img.width && img.height && img.width >= 64 && img.height >= 64) {
										if (self.w3c) {
											var buff_c = transm.C('canvas');
											if (self.wcs) {
												buff_c.id = self.id + '_img_c';
												buff_c.height = ch;
												buff_c.width = cw;
												with (buff_c.style) {
													position = 'fixed';
													left = '-9999px';
													top = '0px';
												}
												buff_c.style.height = ch + 'px';
												buff_c.style.width = cw + 'px';
												transm.A(buff_c);
											} else {
												buff_c.width = width;
												buff_c.height = height;
											}
											self.c = buff_c;
											ctx = self.c.getContext("2d");
											ctx.clearRect(0, 0, self.width, self.height);
											ctx.drawImage(img, 0, 0, self.width, self.height);
										} else if (self.vml) {
											if (radius) {
												tmp = transm.C('v:roundrect');
												tmp.arcsize = self.radius;
											} else {
												tmp = transm.C('v:shape');
												tmp.coordsize = width + ',' + height;
												tmp.path = self.fillpath;
											}
											tmp.strokeweight = "0";
											tmp.filled = "t";
											tmp.stroked = "f";
											tmp.fillcolor = "#808080";
											tmp.style.visibility = 'visible';
											tmp.style.cssText = 'zoom:1;display:block;position:absolute;left:0px;top:0px;margin:0px;padding:0px;width:' + width + 'px;height:' + height + 'px;visibility:hidden;';
											object.appendChild(tmp);
											tmp.id = self.id + "_layer";
										} else if (self.old) {
											if (self.tri) {
												tmp = transm.C('div');
												tmp.style.display = 'block';
												tmp.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + self.layer + '", sizingMethod="scale")';
											} else {
												tmp = transm.C('img');
												tmp.src = self.layer;
												tmp.height = height;
												tmp.width = width;
											}
											tmp.style.height = height + 'px';
											tmp.style.width = width + 'px';
											with (tmp.style) {
												position = 'absolute';
												zIndex = 10;
												left = '0px';
												top = '0px';
												padding = '0px';
												margin = '0px';
												outline = '0px none';
												border = '0px none';
											}
											object.appendChild(tmp);
											tmp.unselectable = true;
											if (nsa) {
												tmp.style[nsa] = 'none';
											}
											if (nda) {
												tmp.style[nda] = 'none';
											}
											tmp.id = self.id + "_layer";
										}
										finalize();
									} else {
										self.layer = null;
										finalize();
									}
								};
								img.src = self.layer;
							} else {
								finalize();
							}
						} else {
							if (verbose) {
								transm.log('warn', 'transm: insufficient images [exit]');
							}
						}
					} else {
						if (verbose) {
							transm.log('error', 'transm: unsupported browser [exit]');
						}
					}
				} catch (err) {
					if (verbose) {
						transm.log('error', 'transm: has failed ' + err.message + ' [exit]');
					}
				}/**/
			}
		} else {
			if (verbose) {
				transm.log('warn', 'transm: missing "cvi_trans_lib" [exit]');
			}
		}
		return false;
	} catch (err) {
		if (verbose) {
			transm.log('error', 'transm: has failed ' + err.message + ' [exit]') 
		}
	}/**/
};
transm.play = function (self) {
	if (self && self.TLready) {
		self.autoplay = true;
		if (self.parentNode.timer) {
			window.clearInterval(self.parentNode.timer);
		}
		var delay = Math.max(0, Math.min((self.data[self.curI].delay || self.delay), 600)) * 1000;
		if (self.meter) {
			var meter = transm.G(self.id + "_meter");
			if (meter.timer) {
				window.clearInterval(meter.timer);
			}
			if (self.w3c) {
				var ctx = meter.getContext("2d"), t = Math.round(delay  / 40), d = Math.PI * 2, s = d  / t, 
				c = 0, w = meter.width, h = meter.height, x = w  / 2, y = h  / 2, a = (Math.PI  / 2) *- 1, 
				r = x;
				meter.timer = window.setInterval(function () {
					ctx.clearRect(0, 0, w, h);
					ctx.save();
					ctx.arc(x, y, r, 0, d, true);
					ctx.fillStyle = "rgba(" + self.mbgc + "," + self.mopacity + ")";
					ctx.fill();
					ctx.fillStyle = "rgba(" + self.mfgc + "," + self.mopacity + ")";
					ctx.beginPath();
					ctx.moveTo(x, y);
					ctx.arc(x, y, r, a, a + (c * s), true);
					ctx.closePath();
					ctx.fill();
					ctx.restore();
					c++;
					if (c > t) {
						window.clearInterval(meter.timer);
						ctx.clearRect(0, 0, w, h);
						transm.next(self, true);
					}
				}, 40);
			} else if (self.vml) {
				var angle = meter.lastChild, t = Math.round(delay  / 40), m = 0, s = 360  / t, c = 0, 
				a = "m 500,500 ae 500,500,500,500,5898150,", z = " x e", p = "";
				m = Math.round(360 * 65536);
				p = a + m + z;
				angle.path = p;
				meter.style.visibility = 'visible';
				meter.timer = window.setInterval(function () {
					m = Math.round((360 - (c * s)) * 65536);
					p = a + m + z;
					angle.path = p;
					c++;
					if (c > t) {
						window.clearInterval(meter.timer);
						meter.style.visibility = 'hidden';
						transm.next(self, true);
					}
				}, 40);
			} else {
				meter.style.visibility = 'visible';
				var t = Math.round(delay  / 40), cw = self.cw - 4, s = cw  / t, c = 0;
				meter.timer = window.setInterval(function () {
					meter.style.width = (cw - (c * s)) + 'px';
					c++;
					if (c > t) {
						window.clearInterval(meter.timer);
						meter.style.visibility = 'hidden';
						transm.next(self, true);
					}
				}, 40);
			}
		} else {
			self.parentNode.timer = window.setInterval(function () {
				transm.next(self, true);
				if (!self.autoplay) {
					window.clearInterval(self.parentNode.timer);
				}
			}, delay);
		}
	}
	return false;
};
transm.stop = function (self) {
	if (self && self.TLready) {
		self.autoplay = false;
		if (self.parentNode.timer) {
			window.clearInterval(self.parentNode.timer);
		}
		if (self.meter) {
			var meter = transm.G(self.id + "_meter");
			if (meter.timer) {
				window.clearInterval(meter.timer);
			}
			if (self.w3c) {
				var ctx = meter.getContext("2d");
				ctx.clearRect(0, 0, meter.width, meter.height);
			} else {
				meter.style.visibility = 'hidden';
			}
		}
	}
	return false;
};
transm.first = function (self) {
	if (self && !self.autoplay && !self.TLbusy && self.curI != 0) {
		self.preI = self.curI;
		self.curI = 0;
		transm._wipe(self);
	}
	return false;
};
transm.prev = function (self) {
	if (self && !self.autoplay && !self.TLbusy) {
		self.preI = self.curI;
		if (self.curI > 0) {
			self.curI--;
		} else {
			self.curI = self.noi;
		}
		transm._wipe(self);
	}
	return false;
};
transm.show = function (self, v) {
	if (self && !self.autoplay && !self.TLbusy) {
		self.preI = self.curI;
		self.curI = Math.min(Math.max(v || 0, 0), self.noi);
		transm._wipe(self);
	}
	return false;
};
transm.next = function (self, v) {
	///alert(self)
	if (self && !self.TLbusy && (!v && !self.autoplay) || (v && self.autoplay)) {
		if (self.pingpong && self.autoplay) {
			self.preI = self.curI;
			if (self.curI >= self.noi) {
				self.curD = 0;
			} else if (self.curI <= 0 && !self.curD) {
				self.curD = 1;
				self.curI = 0;
			}
			if (self.curD) {
				self.curI++;
			} else {
				self.curI--;
			}
		} else {
			if (self.curI < self.noi) {
				self.curI++;
			} else {
				self.curI = 0;
			}
		}
		transm._wipe(self);
	}
	return false;
};
transm.last = function (self) {
	if (self && !self.autoplay && !self.TLbusy && self.curI != self.noi) {
		self.preI = self.curI;
		self.curI = self.noi;
		transm._wipe(self);
	}
	return false;
};
transm.get = function (self, v) {
	if (self) {
		var info = null;
		switch (v.toLowerCase()) {
			case "busy":
				info = self.TLbusy;
				break;
			case "playing":
				info = self.autoplay;
				break;
			case "current":
				info = self.curI;
				break;
			case "total":
				info = self.data.length;
				break;
			case "transition":
				info = self.TLtrans;
				break;
			case "tweening":
				info = self.TLtween;
				break;
			case "duration":
				info = self.TLdur;
				break;
			case "fps":
				info = self.TLfps;
				break;
		}
		return info;
	}
	return false;
};
transm.info = function (self) {
	if (self) {
		return {
			transition : self.TLtrans , tweening : self.TLtween , duration : self.TLdur , fps : self.TLfps 
		};
	}
	return false;
};
transm.remove = function (self) {
	if (self) {
		var par = self.parentNode;
		if (self.timer) {
			window.clearInterval(self.timer);
		}
		if (par.timer) {
			window.clearInterval(par.timer);
		}
		if (self.wcs) {
			var ele = transm.G(self.id + '_img_a');
			if (ele) {
				transm.R(ele);
			}
			ele = transm.G(self.id + '_img_b');
			if (ele) {
				transm.R(ele);
			}
			ele = transm.G(self.id + '_img_c');
			if (ele) {
				transm.R(ele);
			}
		}
		if (self.clearbg) {
			par.style.backgroundImage = self.pbgimage;
			par.style.backgroundColor = self.pbgcolor;
		}
		par.innerHTML = '';
	}
	return false;
};
transm._preload = function (self, cnt) {
	if (self) {
		var noi = self.nopreload ? 2 : self.data.length, img = null;
		if (self.timer) {
			window.clearTimeout(self.timer);
		}
		if ((!self.nopreload && cnt < self.data.length) || (self.nopreload && self.noiL < noi && cnt < self.data.length)) {
			var cw = parseInt((self.cw  / 2) - 2, 10), ow = cw  / (self.data.length - 1);
			transm.G(self.id + "_progress").style.width = (cnt * ow) + 'px';
			self.timer = window.setTimeout("if(" + self.verbose + "){transm.log('warn','transm: [" + self.timeout + "ms] timeout image > " + self.data[cnt].source + "');}transm._preload(transm.G('" + self.id + "')," + (cnt + 1) + ");", 
			self.timeout);
			if (self.vml && !self.nocache) {
				var pre = transm.G(self.id + "_vml_preloader");
				if (pre) {
					pre.src = self.data[cnt].source;
				}
			}
			img = new Image();
			img.onabort = function () {
				if (self.verbose) {
					transm.log('warn', 'transm: onabort image > ' + self.data[cnt].source);
				}
				if (self.timer) {
					window.clearTimeout(self.timer);
				}
				transm._setup(self);
			};
			img.onerror = function () {
				if (self.verbose) {
					transm.log('warn', 'transm: onerror image > ' + self.data[cnt].source);
				}
				cnt++;
				if (self.vml && !self.nocache) {
					if (self.timer) {
						window.clearTimeout(self.timer);
					}
					window.setTimeout(function () {
						transm._preload(self, cnt);
					}, 0);
				} else {
					transm._preload(self, cnt);
				}
			};
			img.onload = function () {
				if (img.width && img.height && img.width >= 64 && img.height >= 64) {
					var pos = 0, tmp = 0;
					self.noiL++;
					self.data[cnt].l = true;
					self.data[cnt].nw = nw = img.naturalWidth || img.width;
					self.data[cnt].nh = nh = img.naturalHeight || img.height;
					tmp = self.data[cnt].imgshift;
					tmp = tmp > 0 && tmp <= 0.001 ? 0 : tmp;
					pos = Math.max(Math.min(self.data[cnt].imgshift || 0.5, 1.0), 0.0);
					var nw = self.data[cnt].nw, nh = self.data[cnt].nh, ix = 0, iy = 0, iw = nw, ih = nh, 
					xf = iw > ih ? 1 : ih > iw ? iw  / ih : 1, yf = ih > iw ? 1 : iw > ih ? ih  / iw : 1;
					if (self.xfac == 1 && self.yfac == 1 && xf == 1 && yf == 1) {} else if (self.xfac == 1 && self.yfac == 1 && xf == 1) {
						iw = ih;
						ix = (nw - iw) * pos;
					} else if (self.xfac == 1 && self.yfac == 1 && yf == 1) {
						ih = iw;
						iy = (nh - ih) * pos;
					} else if (self.xfac == 1) {
						if (yf < self.yfac) {
							iw = nh * self.ifac;
							ix = (nw - iw) * pos;
						} else {
							ih = nw * self.yfac;
							iy = (nh - ih) * pos;
						}
					} else if (self.yfac == 1) {
						if (xf < self.xfac) {
							ih = nw * self.ifac;
							iy = (nh - ih) * pos;
						} else {
							iw = nh * self.xfac;
							ix = (nw - iw) * pos;
						}
					}
					self.data[cnt].mw = Math.round(iw);
					self.data[cnt].mh = Math.round(ih);
					self.data[cnt].ix = Math.round(ix);
					self.data[cnt].iy = Math.round(iy);
					var xf = (self.cw  / iw), ff = xf, yf = (self.ch  / ih), ww = (nw * xf), hh = (nh * yf);
					self.data[cnt].wm = (ww * .75);
					self.data[cnt].hm = (hh * .75);
					pos = 0.5 - pos;
					self.data[cnt].ox = ((self.cw  / ww) - 1) * pos;
					self.data[cnt].oy = ((self.ch  / hh) - 1) * pos;
					self.data[cnt].ww = Math.round(ww);
					self.data[cnt].hh = Math.round(hh);
					self.data[cnt].xx = Math.round(ff *- ix);
					self.data[cnt].yy = Math.round(ff *- iy);
					if (!self.vml) {
						self.data[cnt].img = img;
					}
					if (transm.engine == "Ms" || self.tri && (!document.documentMode || document.documentMode < 9)) {
						img.onload = '';
						img = null;
					}
					if (self.verbose) {
						transm.log('log', 'transm: ' + self.data[cnt].nw + 'x' + self.data[cnt].nh + ' > ' + self.data[cnt].source);
					}
					cnt++;
					if (self.vml && !self.nocache) {
						if (self.timer) {
							window.clearTimeout(self.timer);
						}
						window.setTimeout(function () {
							transm._preload(self, cnt);
						}, 0);
					} else {
						transm._preload(self, cnt);
					}
				} else {
					if (self.verbose) {
						transm.log('warn', 'transm: failed image > ' + self.data[cnt].source);
					}
					cnt++;
					if (self.vml && !self.nocache) {
						if (self.timer) {
							window.clearTimeout(self.timer);
						}
						window.setTimeout(function () {
							transm._preload(self, cnt);
						}, 0);
					} else {
						transm._preload(self, cnt);
					}
				}
			};
			img.src = self.data[cnt].source;
		} else {
			transm._setup(self);
		}
	}
	return false;
};
transm._return = function (self, trans, time, fps) {
	if (self) {
		if (trans) {
			if (self.w3c) {
				var tween = self.data[self.curI].tweening || self.tweening;
				tween = (typeof cvi_tween[tween] === 'function' ? tween : self.nolib ? 'linear' : cvi_tfx[trans].tween || 'linear');
			}
			self.TLtrans = trans;
			self.TLtween = tween || 'linear';
			self.TLdur = time;
			self.TLfps = fps || 30;
		} else {
			var caf = self.data[0].callafter || null, caa = self.data[0].argafter || null, cbf = self.data[0].callbefore || null, 
			cba = self.data[0].argbefore || null;
			self.TLacall = caf;
			self.TLaarg = caa;
			self.TLbcall = cbf;
			self.TLbarg = cba;
		}
		transm._prepare(self);
		if (!trans || trans == '') {
			if (self.back) {
				if (typeof window[self.back] === 'function') {
					try {
						window[self.back]();
					} catch (err) {
						if (self.verbose) {
							//alert('inhere')
							transm.log('error', 'transm: has failed ' + err.message);
						}
					}
				}
			}
		}
		if (self.TLacall) {
			if (typeof window[self.TLacall] === 'function') {
				try {
					window[self.TLacall](self.TLaarg);
				} catch (err) {
					if (self.verbose) {
						transm.log('error', 'transm: has failed ' + err.message + ' (callafter)');
					}
				}
			}
		}
		self.TLready = true;
		if (self.autoplay) {
			transm.play(self);
		}
	}
	return false;
};
transm._prepare = function (self) {
	if (self) {
		var i = self.curI, link = transm.G(self.id + "_link");
		if (link) {
			link.title = self.data[i].title || '';
			link.target = self.data[i].target || '_self';
			if (self.data[i].onclick) {
				link.setAttribute("onclick", self.data[i].onclick || '');
				if (self.tri || self.vml) {
					link.onclick = new Function(self.data[i].onclick || '');
				}
				link.style.cursor = 'pointer';
			} else {
				link.removeAttribute("onclick");
				link.style.cursor = 'auto';
			}
			if (self.data[i].href) {
				link.setAttribute("href", self.data[i].href || null);
				link.style.cursor = 'pointer';
			} else {
				link.removeAttribute("href");
			}
		}
	}
	return false;
};
transm._setup = function (self) {
	if (self) {
		if (self.timer) {
			window.clearInterval(self.timer);
		}
		if (!self.nopreload) {
			for (var i = 0; i < self.data.length; i++) {
				if (!self.data[i].l) {
					self.data.splice(i, 1);
					i--;
				}
			}
		} else {
			for (var i = 0, t = 0; i < self.data.length; i++) {
				if (!self.data[i].l) {
					self.data.splice(i, 1);
					i--;
				} else {
					t++;
					if (t >= 2) {
						break;
					}
				}
			}
		}
		transm.G(self.id + "_cover").style.visibility = 'hidden';
		if (self.vml && !self.nocache) {
			var pre = transm.G(self.id + "_vml_preloader");
			if (pre) {
				transm.R(pre);
			}
		}
		if (self.data.length > 1) {
			self.noi = self.data.length - 1;
			var caf = self.data[0].callafter || null, caa = self.data[0].argafter || null, cbf = self.data[0].callbefore || null, 
			cba = self.data[0].argbefore || null;
			self.TLacall = caf;
			self.TLaarg = caa;
			self.TLbcall = cbf;
			self.TLbarg = cba;
			if (self.clearbg) {
				var par = self.parentNode;
				par.style.backgroundColor = 'transparent';
				par.style.backgroundImage = 'none';
			}
			if (self.w3c) {
				transm._buffer(self, self.a, 0);
				transm._display(self);
			} else {
				transm._display(self);
			}
		} else {
			if (self.verbose) {
				transm.log('warn', 'transm: insufficient images [exit]');
			}
			transm.remove(self);
		}
	}
	return false;
};
transm._buffer = function (self, buffer, i) {
	if (self && self.w3c) {
		if (buffer) {
			var ctx = buffer.getContext("2d");
			ctx.clearRect(0, 0, self.width, self.height);
			ctx.drawImage(self.data[i].img, self.data[i].ix, self.data[i].iy, self.data[i].mw, self.data[i].mh, 
			0, 0, self.width, self.height);
		}
	}
	return false;
};
transm._clear = function (self) {
	if (self) {
		var link = transm.G(self.id + "_link");
		if (link) {
			link.title = '';
			link.target = '_self';
			link.onclick = '';
			link.removeAttribute("onclick");
			link.removeAttribute("href");
			link.style.cursor = 'auto';
		}
	}
	return false;
};
transm._display = function (self) {
	function clip(c, x, y, w, h, r1, r2, r3, r4) {
		c.beginPath();
		if (r1 > 0) {
			c.arc(x + r1, y + r1, r1, Math.PI, Math.PI * (3  / 2), false);
		} else {
			c.moveTo(x, y);
		}
		if (r2 > 0) {
			c.arc(x + w - r2, y + r2, r2, Math.PI * (3  / 2), 0, false);
		} else {
			c.lineTo(x + w, y);
		}
		if (r3 > 0) {
			c.arc(x + w - r3, y + h - r3, r3, 0, Math.PI * (1  / 2), false);
		} else {
			c.lineTo(x + w, y + h);
		}
		if (r4 > 0) {
			c.arc(x + r4, y + h - r4, r4, Math.PI * (1  / 2), Math.PI, false);
		} else {
			c.lineTo(x, y + h);
		}
		c.closePath();
	};
	if (self) {
		self.parentNode.style.cursor = 'auto';
		if (self.w3c) {
			if (self.fadein) {
				self.style.opacity = 0;
			}
			self.ctx.clearRect(0, 0, self.width, self.height);
			if (self.radius || self.radii) {
				clip(self.ctx, 0, 0, self.width, self.height, self.radii[0] || self.radius || 0, self.radii[1] || self.radius || 0, 
				self.radii[2] || self.radius || 0, self.radii[3] || self.radius || 0);
				self.ctx.clip();
			}
			self.ctx.save();
			self.ctx.drawImage(self.fromB == 'a' ? self.a : self.b, 0, 0, self.width, self.height);
			if (self.layer) {
				self.ctx.drawImage(self.c, 0, 0, self.width, self.height);
			}
			self.ctx.restore();
			if (self.fadein) {
				if (self.timer) {
					window.clearInterval(self.timer);
				}
				var c = 0, t = 25, o = 0, p = 1  / t;
				self.timer = window.setInterval(function () {
					o = p * c;
					self.style.opacity = o;
					c++;
					if (c > t) {
						window.clearInterval(self.timer);
						self.style.opacity = 1;
						transm._return(self, false);
					}
				}, 40);
			} else {
				transm._return(self, false);
			}
		} else if (self.vml) {
			var fill = document.createElement(['<v:fill src="' + self.data[0].source + '" size="' + self.data[0].wm + 'pt,' + self.data[0].hm + 'pt" origin="' + self.data[0].ox + ',' + self.data[0].oy + '" position="0,0" aspect="ignore" type="frame" />'].join(''));
			self.appendChild(fill);
			self.style.visibility = 'visible';
			if (self.layer) {
				var tmp = transm.G(self.id + "_layer");
				if (tmp) {
					fill = document.createElement(['<v:fill src="' + self.layer + '" type="frame" />'].join(''));
					tmp.appendChild(fill);
					tmp.style.visibility = 'visible';
				}
			}
			transm._return(self, false);
		} else {
			self.src = self.data[0].source;
			self.style.zIndex = 2;
			self.style.width = self.data[0].ww + 'px';
			self.style.height = self.data[0].hh + 'px';
			self.style.left = Math.round(-self.data[0].ix) + 'px';
			self.style.top = Math.round(-self.data[0].iy) + 'px';
			if (self.fadein) {
				self.style[self.opa] = 0;
				self.style.filter = "alpha(opacity=0)";
				if (self.timer) {
					window.clearInterval(self.timer);
				}
				var c = 0, t = 25, o = 0, p = 1  / t;
				self.timer = window.setInterval(function () {
					o = p * c;
					self.style[self.opa] = o;
					self.style.filter = "alpha(opacity=" + (o * 100) + ")";
					c++;
					if (c > t) {
						window.clearInterval(self.timer);
						self.style[self.opa] = 1;
						self.style.filter = "alpha(opacity=100)";
						transm._return(self, false);
					}
				}, 40);
			} else {
				transm._return(self, false);
			}
		}
	}
	return false;
};
transm._wipe = function (self) {
	if (self && self.nopreload && !self.data[self.curI].l) {
		var pre = null, cnt = self.curI, img = null;
		if (self.vml && !self.nocache) {
			pre = transm.G(self.id + "_vml_preloader");
			if (pre) {
				pre.src = self.data[cnt].source;
			}
		}
		img = new Image();
		img.onerror = function () {
			if (self.verbose) {
				transm.log('warn', 'transm: onerror image > ' + self.data[cnt].source);
			}
			transm.next(self, true);
		};
		img.onload = function () {
			if (img.width && img.height && img.width >= 64 && img.height >= 64) {
				var pos = 0, tmp = 0;
				self.data[cnt].l = true;
				self.data[cnt].nw = nw = img.naturalWidth || img.width;
				self.data[cnt].nh = nh = img.naturalHeight || img.height;
				tmp = self.data[cnt].imgshift;
				tmp = tmp > 0 && tmp <= 0.001 ? 0 : tmp;
				pos = Math.max(Math.min(self.data[cnt].imgshift || 0.5, 1.0), 0.0);
				var nw = self.data[cnt].nw, nh = self.data[cnt].nh, ix = 0, iy = 0, iw = nw, ih = nh, 
				xf = iw > ih ? 1 : ih > iw ? iw  / ih : 1, yf = ih > iw ? 1 : iw > ih ? ih  / iw : 1;
				if (self.xfac == 1 && self.yfac == 1 && xf == 1 && yf == 1) {} else if (self.xfac == 1 && self.yfac == 1 && xf == 1) {
					iw = ih;
					ix = (nw - iw) * pos;
				} else if (self.xfac == 1 && self.yfac == 1 && yf == 1) {
					ih = iw;
					iy = (nh - ih) * pos;
				} else if (self.xfac == 1) {
					if (yf < self.yfac) {
						iw = nh * self.ifac;
						ix = (nw - iw) * pos;
					} else {
						ih = nw * self.yfac;
						iy = (nh - ih) * pos;
					}
				} else if (self.yfac == 1) {
					if (xf < self.xfac) {
						ih = nw * self.ifac;
						iy = (nh - ih) * pos;
					} else {
						iw = nh * self.xfac;
						ix = (nw - iw) * pos;
					}
				}
				self.data[cnt].mw = Math.round(iw);
				self.data[cnt].mh = Math.round(ih);
				self.data[cnt].ix = Math.round(ix);
				self.data[cnt].iy = Math.round(iy);
				var xf = (self.cw  / iw), ff = xf, yf = (self.ch  / ih), ww = (nw * xf), hh = (nh * yf);
				self.data[cnt].wm = (ww * .75);
				self.data[cnt].hm = (hh * .75);
				pos = 0.5 - pos;
				self.data[cnt].ox = ((self.cw  / ww) - 1) * pos;
				self.data[cnt].oy = ((self.ch  / hh) - 1) * pos;
				self.data[cnt].ww = Math.round(ww);
				self.data[cnt].hh = Math.round(hh);
				self.data[cnt].xx = Math.round(ff *- ix);
				self.data[cnt].yy = Math.round(ff *- iy);
				if (!self.vml) {
					self.data[cnt].img = img;
				}
				if (transm.engine == "Ms" || self.tri && (!document.documentMode || document.documentMode < 9)) {
					img.onload = '';
					img = null;
				}
				if (self.verbose) {
					transm.log('log', 'transm: ' + self.data[cnt].nw + 'x' + self.data[cnt].nh + ' > ' + self.data[cnt].source);
				}
				transm._exec(self);
			} else {
				if (self.verbose) {
					transm.log('warn', 'transm: failed image > ' + self.data[cnt].source);
				}
				transm.next(self, true);
			}
		};
		img.src = self.data[cnt].source;
	} else {
		transm._exec(self);
	}
	return false;
};
transm._exec = function (self) {
	if (self && !self.TLbusy) {
		if (self.parentNode.timer) {
			window.clearInterval(self.parentNode.timer);
		}
		transm._clear(self);
		if (!self.data && self.verbose) {
			transm.log('error', 'transm: data object not defined');
		}
		var alpha = null, a = self.fromB == 'a' ? 1 : 0, i = self.curI, opt1 = self.data[i].option1 || null, 
		opt2 = self.data[i].option2 || null, trans = self.data[i].transition || self.transition, dur = self.data[i].duration || self.duration, 
		caf = self.data[i].callafter || null, caa = self.data[i].argafter || null, cbf = self.data[i].callbefore || null, 
		cba = self.data[i].argbefore || null;
		self.TLacall = caf;
		self.TLaarg = caa;
		self.TLbcall = cbf;
		self.TLbarg = cba;
		if (self.TLbcall) {
			if (typeof window[self.TLbcall] === 'function') {
				try {
					window[self.TLbcall](self.TLbarg);
				} catch (err) {
					if (self.verbose) {
						transm.log('error', 'transm: has failed ' + err.message);
					}
				}
			}
		}
		if (self.w3c) {
			function callTrans() {
				cvi_trans.play('transm_return', self, a ? self.a : self.b, a ? self.b : self.a, alpha, 
				self.layer ? self.c : null, opt1, opt2, trans, tween, cpa, dur, fps);
			};
			self.fromB = a ? 'b' : 'a';
			transm._buffer(self, a ? self.b : self.a, i);
			var mask = self.data[i].alphaimg || null, tween = self.data[i].tweening || self.tweening, 
			cpa = self.data[i].cparray || self.cparray, fps = self.data[i].fps || self.fps;
			if (mask) {
				var suf = mask.substring(1 + mask.lastIndexOf(".")).toLowerCase(), todo = (suf == 'jpg' || suf == 'jpeg' ? 1 : 0);
				if (todo && !self.csp) {
					callTrans();
				} else {
					var img = new Image();
					img.onerror = function () {
						self.data[i].alphaimg = null;
						callTrans();
					};
					img.onload = function () {
						if (img.width && img.height && img.width >= 8 && img.height >= 8) {
							if (todo && self.csp) {
								var ctx, i, n, s, t, w, h;
								alpha = transm.C('canvas');
								alpha.width = w = img.width;
								alpha.height = h = img.height;
								ctx = alpha.getContext("2d");
								ctx.clearRect(0, 0, w, h);
								ctx.drawImage(img, 0, 0, w, h);
								try {
									s = ctx.getImageData(0, 0, w, h);
								} catch (err) {
									var excep = true;
								}
								if (excep) {
									if (self.verbose) {
										transm.log('error', err.message + ". Explanations:\nhttp://en.wikipedia.org/wiki/Same_origin_policy\nhttp://www.w3.org/TR/XMLHttpRequest/#exceptions");
									}
									self.data[i].alphaimg = null;
								} else {
									for (i = 0, n = s.data.length; i < n; i += 4) {
										t = Math.round(s.data[i] * 0.299 + s.data[i + 1] * 0.587 + s.data[i + 2] * 0.114);
										s.data[i] = s.data[i + 1] = s.data[i + 2] = 0;
										s.data[i + 3] = 255 - t;
									}
									ctx.clearRect(0, 0, w, h);
									ctx.putImageData(s, 0, 0);
								}
								callTrans();
							} else {
								alpha = img;
								callTrans();
							}
						} else {
							self.data[i].alphaimg = null;
							callTrans();
						}
					};
					img.src = mask;
				}
			} else {
				callTrans();
			}
		} else if (self.vml) {
			self.fromB = a ? 'b' : 'a';
			cvi_trans.play('transm_return', self, null, self.data[i], null, null, opt1, opt2, trans, null, 
			null, dur, 30);
		} else {
			self.fromB = a ? 'b' : 'a';
			self.TLbusy = true;
			var buffer = transm.G(self.id + "_buffer"), timer = {
				d : null, t : null,
				start : function (){
					timer.d = new Date();
					timer.t = timer.d.getTime();
				},
				stop : function (){
					timer.d = new Date();
					return (timer.d.getTime() - timer.t);
				}
			},
			fps = self.data[i].fps || self.fps, ival = Math.round(1000  / fps), steps = Math.round((dur * 1000)  / ival), 
			c = 0, o = 0, p = 1  / steps;
			if (self.fromB == 'b') {
				if (trans != 'cut') {
					buffer.style[self.opa] = 0;
					buffer.style.filter = "alpha(opacity=0)";
				}
				buffer.style.width = self.data[i].ww + 'px';
				buffer.style.height = self.data[i].hh + 'px';
				buffer.style.left = self.data[i].xx + 'px';
				buffer.style.top = self.data[i].yy + 'px';
				buffer.src = self.data[i].source;
				buffer.style.zIndex = 2;
				self.style.zIndex = 1;
				if (trans != 'cut') {
					if (self.timer) {
						window.clearInterval(self.timer);
					}
					timer.start();
					self.timer = window.setInterval(function () {
						o = p * c;
						buffer.style[self.opa] = o;
						buffer.style.filter = "alpha(opacity=" + (o * 100) + ")";
						c++;
						if (c > steps) {
							var t = timer.stop() - ival;
							window.clearInterval(self.timer);
							buffer.style[self.opa] = 1;
							buffer.style.filter = "alpha(opacity=100)";
							self.TLbusy = false;
							transm._return(self, 'fade', t, fps * ((dur * 1000)  / t));
						}
					}, ival);
				} else {
					self.TLbusy = false;
					transm._return(self, 'cut', 0, fps);
				}
			} else {
				if (trans != 'cut') {
					self.style[self.opa] = 0;
					self.style.filter = "alpha(opacity=0)";
				}
				self.style.width = self.data[i].ww + 'px';
				self.style.height = self.data[i].hh + 'px';
				self.style.left = self.data[i].xx + 'px';
				self.style.top = self.data[i].yy + 'px';
				self.src = self.data[i].source;
				self.style.zIndex = 2;
				buffer.style.zIndex = 1;
				if (trans != 'cut') {
					if (self.timer) {
						window.clearInterval(self.timer);
					}
					timer.start();
					self.timer = window.setInterval(function () {
						o = p * c;
						self.style[self.opa] = o;
						self.style.filter = "alpha(opacity=" + (o * 100) + ")";
						c++;
						if (c > steps) {
							var t = timer.stop() - ival;
							window.clearInterval(self.timer);
							self.style[self.opa] = 1;
							self.style.filter = "alpha(opacity=100)";
							self.TLbusy = false;
							transm._return(self, 'fade', t, fps * ((dur * 1000)  / t));
						}
					}, ival);
				} else {
					self.TLbusy = false;
					transm._return(self, 'cut', 0, fps);
				}
			}
		}
	}
	return false;
};




var transm_return=function (a, b, c, d) {
	var self = transm.G(d);
	if (self) {
		transm._return(self, a, b, c);
	}
	return false;
}



window['transm_return'] = transm_return;





return transm;
	


});