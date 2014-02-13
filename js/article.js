(function() {
	var createArticleLoad = function () {
			return $('<img src="../images/5.gif" class="article-load">');
		},
		$content = $('.content');
	$('.update-article').click(function () {
		$content.empty().append(createArticleLoad());
		$.ajax(
			{
				type: 'GET',
				url: '../article/child.txt',
				success: function (txt) {
					var arrayTxt = txt.split(';'),
						content = '';
					for (var i = 0; i < arrayTxt.length; i++) {
						content += '<p>' + arrayTxt[i] + '</p>';
					};
					console.log(arrayTxt[0]);
					$content.html(content);
				}

			}
		)
	});
})();
