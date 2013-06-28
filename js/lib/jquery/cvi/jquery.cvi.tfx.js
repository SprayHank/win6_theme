;define("jquery/cvi/jquery.cvi.tfx", [],function(require, exports, module) {

var tfx=new Object();
tfx.alpha={val:0,min:0,max:3,fail:"fade",tween:"linear",buffer:1,mask:1,alpha:1};
tfx.barn_horizontal_in=tfx.barn_vertical_in=tfx.barn_horizontal_out=tfx.barn_vertical_out={tween:"quadEaseOut",buffer:1,mask:0,alpha:0};
tfx.blinds_left=tfx.blinds_right=tfx.blinds_up=tfx.blinds_down={val:8,min:1,max:100,tween:"quadEaseIn",buffer:1,mask:0,alpha:0};
tfx.checkerboard_left=tfx.checkerboard_up=tfx.checkerboard_right=tfx.checkerboard_down={val:8,min:2,max:100,tween:"linear",buffer:1,mask:0,alpha:0};
tfx.circles_in=tfx.circles_out={val:8,min:1,max:50,fail:"checkerboard_right",tween:"linear",buffer:1,mask:0,alpha:0};
tfx.color={val:"#fff",fail:"fade",tween:"linear",buffer:1,mask:0,alpha:0};
tfx.copy_right={fail:"gradientwipe_right",tween:"linear",buffer:1,mask:0,alpha:0};
tfx.copy_left={fail:"gradientwipe_left",tween:"linear",buffer:1,mask:0,alpha:0};
tfx.copy_up={fail:"gradientwipe_up",tween:"linear",buffer:1,mask:0,alpha:0};
tfx.copy_down={fail:"gradientwipe_down",tween:"linear",buffer:1,mask:0,alpha:0};
tfx.corner_lefttop_in=tfx.corner_righttop_in=tfx.corner_leftbottom_in=tfx.corner_rightbottom_in={fail:"radialwipe_radial",tween:"bounceEaseOut",buffer:0,mask:0,alpha:0};
tfx.corner_lefttop_out=tfx.corner_righttop_out=tfx.corner_leftbottom_out=tfx.corner_rightbottom_out={fail:"radialwipe_radial",tween:"backEaseInOut",buffer:0,mask:0,alpha:0};
tfx.curl_horizontal={val:6,min:2,max:10,fail:"gradientwipe_left",tween:"sineEaseOut",buffer:1,mask:0,alpha:0};
tfx.curl_vertical={val:6,min:2,max:10,fail:"gradientwipe_up",tween:"sineEaseOut",buffer:1,mask:0,alpha:0};
tfx.cut={buffer:0,mask:0,alpha:0};
tfx.fade={val:100,min:0,max:100,tween:"linear",buffer:1,mask:0,alpha:0};
tfx.flash={fail:"fade",tween:"linear",buffer:0,mask:0,alpha:0};
tfx.gradientwipe_left=tfx.gradientwipe_right=tfx.gradientwipe_up=tfx.gradientwipe_down={val:25,min:5,max:100,tween:"sineEaseInOut",buffer:1,mask:0,alpha:0};
tfx.inset_leftup=tfx.inset_rightup=tfx.inset_leftdown=tfx.inset_rightdown={fail:"inset_rightdown",tween:"cubicEaseInOut",buffer:0,mask:0,alpha:0};
tfx.iris_cross_in=tfx.iris_plus_in=tfx.iris_square_in=tfx.iris_circle_in=tfx.iris_diamond_in=tfx.iris_star_in={tween:"sineEaseIn",buffer:1,mask:0,alpha:0};
tfx.iris_cross_out=tfx.iris_plus_out=tfx.iris_diamond_out=tfx.iris_star_out=tfx.iris_square_out=tfx.iris_circle_out={tween:"sineEaseOut",buffer:1,mask:0,alpha:0};
tfx.pixelate={val:40,min:10,max:50,tween:"linear",buffer:1,mask:0,alpha:0};
tfx.pull_left=tfx.pull_right=tfx.pull_up=tfx.pull_down={fail:"slide_hide",tween:"backEaseOut",buffer:0,mask:0,alpha:0};
tfx.push_left=tfx.push_right=tfx.push_up=tfx.push_down={fail:"slide_push",tween:"cubicEaseOut",buffer:0,mask:0,alpha:0};
tfx.radialgradient={fail:"fade",tween:"linear",buffer:1,mask:0,alpha:0};
tfx.radialwipe_clock=tfx.radialwipe_wedge=tfx.radialwipe_radial={tween:"sineEaseInOut",buffer:1,mask:0,alpha:0};
tfx.randombars_horizontal=tfx.randombars_vertical={buffer:1,mask:1,alpha:0};
tfx.reveal_left=tfx.reveal_right=tfx.reveal_up=tfx.reveal_down={fail:"slide_hide",tween:"backEaseIn",buffer:0,mask:0,alpha:0};
tfx.rotate_in={fail:"iris_circle_out",tween:"backEaseIn",buffer:1,mask:0,alpha:0}; 
tfx.rotate_out={fail:"iris_circle_in",tween:"backEaseOut",buffer:1,mask:0,alpha:0};
tfx.scale_in={fail:"iris_square_out",tween:"backEaseIn",buffer:1,mask:0,alpha:0}; 
tfx.scale_out={fail:"iris_square_in",tween:"backEaseOut",buffer:1,mask:0,alpha:0};
tfx.slide_swap=tfx.slide_push=tfx.slide_hide={val:1,min:1,max:100,tween:"sineEaseInOut",buffer:0,mask:0,alpha:0};
tfx.spiral={val:8,min:1,max:100,buffer:1,mask:1,alpha:0};
tfx.split_horizontal_in={fail:"barn_vertical_in",tween:"quadEaseOut",buffer:0,mask:0,alpha:0};
tfx.split_vertical_in={fail:"barn_horizontal_in",tween:"quadEaseOut",buffer:0,mask:0,alpha:0};
tfx.split_horizontal_out={fail:"barn_vertical_out",tween:"quadEaseOut",buffer:0,mask:0,alpha:0}; 
tfx.split_vertical_out={fail:"barn_horizontal_out",tween:"quadEaseOut",buffer:0,mask:0,alpha:0};
tfx.smudge={fail:"gradientwipe_down",tween:"circEaseInOut",buffer:1,mask:0,alpha:0};
tfx.squares_in=tfx.squares_out={val:8,min:1,max:50,fail:"checkerboard_right",tween:"linear",buffer:1,mask:0,alpha:0};
tfx.stretch_hide_right=tfx.stretch_hide_left=tfx.stretch_hide_up=tfx.stretch_hide_down={fail:"stretch_hide_right",tween:"backEaseOut",buffer:0,mask:0,alpha:0};
tfx.stretch_push_up=tfx.stretch_push_down=tfx.stretch_push_left=tfx.stretch_push_right={fail:"stretch_push_right",tween:"backEaseOut",buffer:0,mask:0,alpha:0};
tfx.stretch_vertical_out=tfx.stretch_horizontal_out=tfx.stretch_vertical_in=tfx.stretch_horizontal_in={fail:"stretch_horizontal_in",tween:"backEaseOut",buffer:0,mask:0,alpha:0};
tfx.strips_leftup=tfx.strips_rightup=tfx.strips_leftdown=tfx.strips_rightdown={tween:"cubicEaseInOut",buffer:1,mask:0,alpha:0};
tfx.turn_horizontal_down={val:4,min:2,max:12,fail:"blinds_down",tween:"bounceEaseOut",buffer:0,mask:0,alpha:0};
tfx.turn_horizontal_up={val:4,min:2,max:12,fail:"blinds_up",tween:"bounceEaseOut",buffer:0,mask:0,alpha:0};
tfx.turn_vertical_right={val:4,min:2,max:12,fail:"blinds_right",tween:"bounceEaseOut",buffer:0,mask:0,alpha:0};
tfx.turn_vertical_left={val:4,min:2,max:12,fail:"blinds_left",tween:"bounceEaseOut",buffer:0,mask:0,alpha:0};
tfx.wheel={val:4,min:2,max:20,tween:"sineEaseInOut",buffer:1,mask:0,alpha:0};
tfx.wrench_horizontal=tfx.wrench_vertical={fail:"pixelate",tween:"linear",buffer:1,mask:0,alpha:0};
tfx.zigzag={val:8,min:1,max:100,buffer:1,mask:1,alpha:0};
tfx.zoom_in=tfx.zoom_out={fail:"fade",tween:"linear",buffer:1,mask:0,alpha:0};

return tfx

});

