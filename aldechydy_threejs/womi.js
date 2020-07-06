define([ 'declare', 'reader.api', 'reader.avatar.api', 'require', 'jquery' ], function(declare, api, avatar, require, $) {
	return declare({
		instance : {
			iframe : null,
			start : function(placeholder) {
				// Load document
				var readerApi = new api(require);
				var src = readerApi.getFullPath('./index.html');

				this.iframe = $('<iframe src="' + src + '" style="border: none; frameborder: 0; overflow: hidden; width: 720px; height: 520px; position: relative; left: 50%; transform: translateX(-50%); " scrolling="no"></iframe></div></div>');
				$(placeholder).append(this.iframe);
				var context = this;
				// Init API
				$(this.iframe).load(function() {
					try {
						this.contentWindow.$.gamesRegistry('setApi', $.extend({
							updateContainerSize : function(height) {
								context.updateSize();
							}
						}, readerApi));
					} catch (v) {
						console.warn('Game does not support API : ' + v);
					}
					context.updateSize();
				});
			},
			sizeChange : function(width) {
// 				this.width = width;
				this.updateSize();
			},
			updateSize : function() {
				if (!this.iframe)
					return;

// 				this.iframe.css({
// 					width : this.width,
// 				});

//				this.height = $(this.iframe[0].contentWindow.document).find('body')[0].scrollHeight;

//				this.iframe.css({
//					height : this.height
//				});
			}
		}
	});
});
