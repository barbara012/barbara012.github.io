(function() {
	var createArticleLoad = function () {
			return $('<img src="../images/5.gif" class="article-load">');
		},
		createMusic = function () {
			return $('<audio controls autoplay="autoplay"></audio>').text('你的浏览器不支持音频元素（audio）标签');
		}
		$content = $('.content'),
		$audio = $('.audio'),
		$articleNav = $('.update-article');
		resetArticle = function (txtUrl, musicUrl) {
			$.ajax(
				{
					type: 'GET',
					url: txtUrl,
					success: function (txt) {
						var arrayTxt = txt.split(';'),
							content = '';
						for (var i = 0; i < arrayTxt.length; i++) {
							content += '<p>' + arrayTxt[i] + '</p>';
						};
						$content.html(content);
						$audio.empty().append('<span class="before"></span>');
						console.log(createMusic());
						createMusic().attr('src', musicUrl)
									.appendTo($audio);
					}
				}
			)
		};
	resetArticle('../article/gto.txt', '../audio/gto.mp3');
	$articleNav.click(function () {
		$articleNav.removeClass('selected');
		$(this).addClass('selected');
		$content.empty().append(createArticleLoad());
		var articleUrl = $(this).data('txt'),
			musicUrl = $(this).data('music');
		resetArticle(articleUrl, musicUrl);
	});
})();
