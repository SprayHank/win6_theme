// JavaScript Document


define("jquery/cvi/jquery.cvi.rfx", ["./jquery.cvi.tfx"], function(require, exports, module) {

var tfx= require('./jquery.cvi.tfx');
    	
var cvi_i,cvi_c=0,rfx=new Array();
for(cvi_i in tfx){
	rfx[cvi_c++]=cvi_i;
};

module.exports = rfx;
});