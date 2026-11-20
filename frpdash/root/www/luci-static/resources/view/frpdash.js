'use strict';
'require view';
'require uci';

return view.extend({
	load: function() {
		return uci.load('frpdash');
	},

	render: function() {
		var url = uci.get('frpdash', 'main', 'url');
		if (url) {
			window.location.href = url;
			return E('p', {}, [ '正在跳转到 FRP 控制台…' ]);
		}
		return E('p', {}, [ '尚未配置 FRP 控制台地址（/etc/config/frpdash 里的 url）。' ]);
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
