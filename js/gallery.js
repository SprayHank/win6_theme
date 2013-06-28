(function (w,d){
/*var objects = [
	{
		source:'data/afficheimg/T2A6irXXpaXXXXXXXX_!!188229960.jpg'
		,callbefore:'currentNum'
		,callafter:'showInfo'
	},{
		source:'data/afficheimg/T2ozqrXmRXXXXXXXXX_!!188229960.jpg'
		,callbefore:'currentNum'
		,callafter:'showInfo'
	},{
		source:'data/afficheimg/T2p6mrXodXXXXXXXXX_!!188229960.jpg'
		,callbefore:'currentNum'
		,callafter:'showInfo'
	}
];*/

var picxml = 'data/flashdata/'+w.indexGalleryFolder+'/data.js' ;
seajs.use(['jquery/jquery', 'jquery.cvi.transm'], function($,tsm) {

	$.ajax({
		type: "GET",
		url: picxml,
		dataType: "script",
		success: function (result){
			var objects=[];
			//alert(pics);
			//pics = pics.split('|');
			//links = links.split('|');
			//texts = texts.split('|');
			delete pics;
			delete links;
			delete texts;
			for(var i=1;!!w['imgUrl'+i];i++){
				objects.push({
					source:w['imgUrl'+i]
					,href:unescape(w['imgLink'+i])
					,title:w['imgText'+i]
					,callbefore:'currentNum'
					,target: '_blank'
				});
				//delete w['imgUrl'+i];
				//delete w['imgLink'+i];
				//delete w['imgText'+i];
			};
			/*
			$(result).find('bcaster>item').each(function(){
				objects.push({
					source:$(this).attr('item_url')
					,callbefore:'currentNum'
					,href:$(this).attr('link')
					,title:
				});
			}); */
			var edit = function(){return d.getElementById("edit");}
			var str='';
			for(var i=0;i<objects.length;i++){
				str+=('<li style="background-position:-'+(i*32)+'px 0;"><a></a></li>');
			};
			var tri = d.getElementById('gallery').getElementsByTagName('ul')[0];
			tri.innerHTML=(str);
			var opsions = {
				duration:0.5
				,autoplay:true
				,width:1920
			//	,verbose:true
				,height:658
				,clearbg:true
				,name:'edit'
				,data: objects
				,fps:25
			};
			var li = tri.getElementsByTagName('LI');
			w.currentNum=function (){
				var info = tsm.get(edit(), 'current');

				for(var i=0;i<li.length;i++){
					$(li[i]).removeClass('current').css('background-position',function(index,value){return value.split(' ')[0]+' top';});
				}
				$(li[info]).addClass( 'current').css('background-position',function(index,value){return value.split(' ')[0]+' bottom';});
			}
			$(li).bind({
				'mouseover':function(event){
					var dd = $(li).index(this);
					tsm.stop(edit());
					tsm.show(edit(), dd);
				},
				'mouseout':function(event){
					tsm.play(edit());
				}
			})/**/
			$('#gallery_prev').bind({
				'click':function(event){
					tsm.stop(edit());
					tsm.prev(edit());
				},
				'mouseout':function(event){
					tsm.play(edit());
				}

			});
			$('#gallery_next').bind({
				'click':function(event){
					tsm.stop(edit());
					tsm.next(edit());
				},
				'mouseout':function(event){
					tsm.play(edit());
				}

			});
			tsm.add(d.getElementById("transmit"), opsions);
			d.getElementById('gallery').style.height='658px';
		}
	});
});
})(window,document);