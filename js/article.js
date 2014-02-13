(function() {
	var createArticleLoad = function () {
			return $('<img src="../images/5.gif" class="article-load">');
		},
		createMusic = function () {
			return $('<audio controls="controls" ></audio>').text('你的浏览器不支持音频元素（audio）标签');
		}
		$content = $('.content'),
		$audio = $('.audio'),
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
						$audio.empty();
						console.log(createMusic());
						createMusic().attr('src', musicUrl)
									.appendTo($audio);
					}
				}
			)
		};
	resetArticle('../article/time.txt', '../audio/sjdqnl.mp3');
	$('.update-article').click(function () {

		$content.empty().append(createArticleLoad());
		var articleUrl = $(this).data('txt'),
			musicUrl = $(this).data('music');
		resetArticle(articleUrl, musicUrl);
	});
})();
