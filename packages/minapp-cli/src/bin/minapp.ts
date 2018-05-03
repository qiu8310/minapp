/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

if (require('import-local')(__filename)) {
	console.log('Using local version of @minapp/cli');
} else {
	require('./minapp-')
}
