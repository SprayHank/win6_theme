;define("jquery/cvi/jquery.cvi.tween", [],function(require, exports, module) {
	

	


/**********************************************************************
TERMS OF USE - EASING EQUATIONS
Open source under the BSD License.
Copyright (c) 2001 Robert Penner
All rights reserved.

JavaScript version 1.0 (24-oct-2009) by Christian Effenberger 

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

* Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
* Neither the name of the author nor the names of contributors may
be used to endorse or promote products derived from this software
without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*****************************************/
/**
 syntax:
	FLOAT = cvi_tween[ name ]( steps, count );
	returns a float between 0.0 and 1.0
	back & elastic returns also floats < 0 and > 1
 *
**/

var cvi_tween={
	linear : function (s, c) {
		return (1 / s) * c;
	},
	sineEaseIn : function (s, c) {
		return - 1 * Math.cos(c / s * (Math.PI / 2)) + 1;
	},
	sineEaseOut : function (s, c) {
		return Math.sin(c / s * (Math.PI / 2));
	},
	sineEaseInOut : function (s, c) {
		return - 1 / 2 * (Math.cos(Math.PI * c / s) - 1);
	},
	quadEaseIn : function (s, c) {
		return (c /= s) * c;
	},
	quadEaseOut : function (s, c) {
		return - 1 * (c /= s) * (c - 2);
	},
	quadEaseInOut : function (s, c) {
		if ((c /= s / 2) < 1) {
			return 1 / 2 * c * c;
		}
		return - 1 / 2 * ((--c) * (c - 2) - 1);
	},
	cubicEaseIn : function (s, c) {
		return (c /= s) * c * c;
	},
	cubicEaseOut : function (s, c) {
		return ((c = c / s - 1) * c * c + 1);
	},
	cubicEaseInOut : function (s, c) {
		if ((c /= s / 2) < 1) {
			return 1 / 2 * c * c * c;
		}
		return 1 / 2 * ((c -= 2) * c * c + 2);
	},
	quartEaseIn : function (s, c) {
		return (c /= s) * c * c * c;
	},
	quartEaseOut : function (s, c) {
		return - 1 * ((c = c / s - 1) * c * c * c - 1);
	},
	quartEaseInOut : function (s, c) {
		if ((c /= s / 2) < 1) {
			return 1 / 2 * c * c * c * c;
		}
		return - 1 / 2 * ((c -= 2) * c * c * c - 2);
	},
	quintEaseIn : function (s, c) {
		return (c /= s) * c * c * c * c;
	},
	quintEaseOut : function (s, c) {
		return ((c = c / s - 1) * c * c * c * c + 1);
	},
	quintEaseInOut : function (s, c) {
		if ((c /= s / 2) < 1) {
			return 1 / 2 * c * c * c * c * c;
		}
		return 1 / 2 * ((c -= 2) * c * c * c * c + 2);
	},
	expoEaseIn : function (s, c) {
		return (c == 0) ? 0 : Math.pow(2, 10 * (c / s - 1));
	},
	expoEaseOut : function (s, c) {
		return (c == s) ? 1 : (-Math.pow(2, - 10 * c / s) + 1);
	},
	expoEaseInOut : function (s, c) {
		if (c == 0) {
			return 0;
		}
		if (c == s) {
			return 1;
		}
		if ((c /= s / 2) < 1) {
			return 1 / 2 * Math.pow(2, 10 * (c - 1));
		}
		return 1 / 2 * (-Math.pow(2, - 10 *--c) + 2);
	},
	circEaseIn : function (s, c) {
		return - 1 * (Math.sqrt(1 - (c /= s) * c) - 1);
	},
	circEaseOut : function (s, c) {
		return Math.sqrt(1 - (c = c / s - 1) * c);
	},
	circEaseInOut : function (s, c) {
		if ((c /= s / 2) < 1) {
			return - 1 / 2 * (Math.sqrt(1 - c * c) - 1);
		}
		return 1 / 2 * (Math.sqrt(1 - (c -= 2) * c) + 1);
	},
	bounceEaseIn : function (s, c) {
		return 1 - cvi_tween.bounceEaseOut(s, s - c);
	},
	bounceEaseOut : function (s, c) {
		var k = 7.5625;
		if ((c /= s) < (1 / 2.75)) {
			return (k * c * c);
		}
		else if (c < (2 / 2.75)) {
			return (k * (c -= (1.5 / 2.75)) * c + .75);
		}
		else if (c < (2.5 / 2.75)) {
			return (k * (c -= (2.25 / 2.75)) * c + .9375);
		}
		else {
			return (k * (c -= (2.625 / 2.75)) * c + .984375);
		}
	},
	bounceEaseInOut : function (s, c) {
		if (c < s / 2) {
			return cvi_tween.bounceEaseIn(s, c * 2) * .5;
		}
		else {
			return cvi_tween.bounceEaseOut(s, c * 2 - s) * .5 + 1 * .5;
		}
	},
	backEaseIn : function (s, c) {
		var k = 1.70158;
		return (c /= s) * c * ((k + 1) * c - k);
	},
	backEaseOut : function (s, c) {
		var k = 1.70158;
		return ((c = c / s - 1) * c * ((k + 1) * c + k) + 1);
	},
	backEaseInOut : function (s, c) {
		var k = 1.70158;
		if ((c /= s / 2) < 1) {
			return 1 / 2 * (c * c * (((k *= (1.525)) + 1) * c - k));
		}
		return 1 / 2 * ((c -= 2) * c * (((k *= (1.525)) + 1) * c + k) + 2);
	},
	elasticEaseIn : function (s, c, p, a, z) {
		if (c == 0) {
			return 0;
		}
		if ((c /= s) == 1) {
			return 1;
		}
		if (!z) {
			z = s * .3;
		}
		if (!a || a < 1) {
			a = 1;
			var k = z / 4;
		}
		else {
			var k = z / (2 * Math.PI) * Math.asin(1 / a);
		}
		return - (a * Math.pow(2, 10 * (c -= 1)) * Math.sin((c * s - k) * (2 * Math.PI) / z));
	},
	elasticEaseOut : function (s, c, p, a, z) {
		if (c == 0) {
			return 0;
		}
		if ((c /= s) == 1) {
			return 1;
		}
		if (!z) {
			z = s * .3;
		}
		if (!a || a < 1) {
			a = 1;
			var k = z / 4;
		}
		else {
			var k = z / (2 * Math.PI) * Math.asin(1 / a);
		}
		return (a * Math.pow(2, - 10 * c) * Math.sin((c * s - k) * (2 * Math.PI) / z) + 1);
	},
	elasticEaseInOut : function (s, c, p, a, z) {
		if (c == 0) {
			return 0;
		}
		if ((c /= s / 2) == 2) {
			return 1;
		}
		if (!z) {
			z = s * (.3 * 1.5);
		}
		if (!a || a < 1) {
			a = 1;
			var k = z / 4;
		}
		else {
			var k = z / (2 * Math.PI) * Math.asin(1 / a);
		}
		if (c < 1) {
			return - .5 * (a * Math.pow(2, 10 * (c -= 1)) * Math.sin((c * s - k) * (2 * Math.PI) / z));
		}
		return a * Math.pow(2, - 10 * (c -= 1)) * Math.sin((c * s - k) * (2 * Math.PI) / z) * .5 + 1;
	},
	/***************************************************************************************************
	JavaScript cubicBezierCurve 1.0 (24-oct-2009) by Christian Effenberger 
	1:1 conversion to js from webkit source files UnitBezier.h, WebCore_animation_AnimationBase.cpp
	The timing function is specified using a cubic Bezier curve, which is defined by four control points.
	The first and last control points are always set to (0,0) and (1,1), so you just need to specify the
	two in-between control points. The points are specified as a percentage of the overall duration
	(percentage: interpolated as a real number between 0 and 1). 
	The timing function takes as its input the current elapsed percentage of the transition duration and

	outputs a percentage that determines how close the transition is to its goal state.
	****************************************************************************************************/
	/**
	syntax:
	FLOAT = cvi_tween[ name ]( steps, count, array );
	array == [ cp1x, cp1y, cp2x, cp2y ]
	returns a float between 0.0 and 1.0
	*
	**/
	cubicBezierCurve : function (s, c, p, d) {
		var t = (1 / s) * c, ax = 0, bx = 0, cx = 0, ay = 0, by = 0, cy = 0;
		d = d || 50;
		function sCX(t) {
			return ((ax * t + bx) * t + cx) * t;
		};
		function sCY(t) {
			return ((ay * t + by) * t + cy) * t;
		};
		function sCDX(t) {
			return (3 * ax * t + 2 * bx) * t + cx;
		};
		function sE(d) {
			return 1 / (200 * d);
		};
		function sv(x, e) {
			return sCY(svCX(x, e));
		};
		function fa(n) {
			return (n >= 0 ? n : 0 - n);
		};
		function svCX(x, e) {
			var t0, t1, t2, x2, d2, i;
			for (t2 = x, i = 0; i < 8; i++) {
				x2 = sCX(t2) - x;
				if (fa(x2) < e) {
					return t2;
				}
				d2 = sCDX(t2);
				if (fa(d2) < 1e-6) {
					break;
				}
				t2 = t2 - x2 / d2;
			}
			t0 = 0;
			t1 = 1;
			t2 = x;
			if (t2 < t0) {
				return t0;
			}
			if (t2 > t1) {
				return t1;
			}
			while (t0 < t1) {
				x2 = sCX(t2);
				if (fa(x2 - x) < e) {
					return t2;
				}
				if (x > x2) {
					t0 = t2;
				}
				else {
					t1 = t2;
				}
				t2 = (t1 - t0) * .5 + t0;
			}
			return t2;
		};
		cx = 3 * p[0];
		bx = 3 * (p[2] - p[0]) - cx;
		ax = 1 - cx - bx;
		cy = 3 * p[1];
		by = 3 * (p[3] - p[1]) - cy;
		ay = 1 - cy - by;
		return sv(t, sE(d));
	}
}
	
module.exports = cvi_tween;
	
});