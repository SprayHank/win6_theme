(function(){
function ID(id){return document.getElementById(id)};



window.navTimeout = null;
window.showon = null;
seajs.use(['$'], function(jQuery) {
	function eSty(id){
		return document.getElementById(id).style;
	}
	function clearShowonBTN(id){
		id = id || showon;
		if(id!=null){
			eSty(id+'_sub').display = 'none';
			eSty(id+'_btn').backgroundColor = '';
			eSty(id+'_btn').color = '';
		}
	};
	//jQuery([ID('category_btn'),ID('brands_btn'),ID('_share_btn')]).hover(function(event){
	jQuery([ID('category_btn'),ID('_share_btn')]).hover(function(event){
		//alert(this.innerHTML)
		var a = this.id.replace('_btn','');
		clearTimeout(navTimeout);
		clearShowonBTN()
		eSty(a+'_sub').display = 'block';
		//alert(!ID(a+'_menu'))

		if(!ID(a+'_menu'))  {
			jQuery.ajax({
				url: "themes/win6/cat.php",
				cache: false,
				success: function(html){
					if(!ID(a+'_menu')) jQuery(ID("category_string").parentNode).append(html);
				}
			});
		}
		eSty(a+'_btn').backgroundColor = (jQuery('#'+a+'_btn').css('background-color'));
		eSty(a+'_btn').color = (jQuery('#'+a+'_btn').css('color'));
		showon = a;
	},function(event){
		var a = this.id.replace('_btn','');
//		if(event.relatedTarget)
		if(event.relatedTarget.id===a+'_sub')	{
			
			
		} else {
			clearTimeout(navTimeout);
			navTimeout = setTimeout(function(){
				clearShowonBTN();
			}, 500);
		}
	});
	jQuery([ID('category_sub'),ID('_share_sub')]).hover(function(){
	//jQuery([ID('category_sub'),ID('brands_sub'),ID('_share_sub')]).hover(function(){
		clearTimeout(navTimeout);
		var a = this.id.replace('_sub','');
		showon = a;
	}, function(){
		var a = this.id.replace('_sub','');
		clearTimeout(navTimeout);
		navTimeout = setTimeout(function(){
			clearShowonBTN();
		}, 1000);
	});
});
})();