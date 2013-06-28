(function(){
var head = document.getElementsByTagName('HEAD')[0];
var headScript = head.getElementsByTagName('SCRIPT');
var relativeJS = headScript[headScript.length-1];
var path = relativeJS.src;
var libPath = window.libPath = path.substring(0, path.lastIndexOf('/'))+'/lib/';

;(function(m, o, d, u, l, a, r) {
if(m[d]) return;
function f(n,t){return function(){r.push(n,arguments);return t};};
m[d]=a={args:(r=[]),config:f(0,a),use:f(1,a),modify:f(2,a)};
m.define=f(3);
u=o.createElement('script');
u.id=d+'node';
u.src=libPath+'seajs/2.0.0-dev/sea.js';
l=o.getElementsByTagName('head')[0];
a=o.getElementsByTagName('base')[0];
a?l.insertBefore(u,a):l.appendChild(u);
})(window, document, 'seajs');
seajs.config({
    alias:{
        '$':'jquery/jquery'
        ,'jquery.cvi.tween':'cvi/jquery.cvi.tween'
        ,'jquery.cvi':'cvi/jquery.cvi'
        ,'jquery.cvi.stackblur':'cvi/jquery.cvi.stackblur'
        ,'jquery.cvi.tfx':'cvi/jquery.cvi.tfx'
        ,'jquery.cvi.trans':'cvi/jquery.cvi.trans'
        ,'jquery.cvi.transm':'jquery/cvi/jquery.cvi.transm'
        ,'backbone':'backbone/0.9.2/backbone'
        ,'underscore':'underscore/1.3.3/underscore'
    }
    //,preload: ["jquery/jquery"]
});
})();