<?php

define('IN_ECS', true);

require(dirname(__FILE__) . '/../../includes/init.php');

if ((DEBUG_MODE & 2) != 2)
{
	$smarty->caching = true;
}
$ua = strtolower($_SERVER['HTTP_USER_AGENT']);

$uachar = "/(nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|mobile)/i";

if(($ua == '' || preg_match($uachar, $ua))&& !strpos(strtolower($_SERVER['REQUEST_URI']),'wap'))
{
	$Loaction = 'mobile/';

	if (!empty($Loaction))
	{
		ecs_header("Location: $Loaction\n");

		exit;
	}

}
$smarty->assign('categories',      get_categories_tree()); // 分类树
$smarty->display('cat.dwt', $cache_id);
?>