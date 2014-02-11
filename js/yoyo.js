(function() {

	var srcThumb = 'images/thumb/',
		srcFull ='images/full/',
		$firstLi = $('.li--first'),
		$moreLi = $('.li--more'),
		flagNum = $('.img-li:last').children('a').children('img').data('num'),
		canNext = true,
		canNextFullPic = true,
		canPreFullPic = true,
		$fullPicNext,
		$fullPicPre,
		$navFull,

		transformRotate = function (num1, num2) {
			if (arguments[1]) {
				return transRotate = {
					'transform': 'rotateY(' + num1 + 'deg)',
					'-webkit-transform': 'rotateY(' + num1 + 'deg)',
					'-ms-transform': 'rotateY(' + num1 + 'deg)',
					'-moz-transform': 'rotateY(' + num1 + 'deg)',
					opacity: num2
				};
			} else {
				return transRotate = {
					'transform': 'rotateY(' + num1 + 'deg)',
					'-webkit-transform': 'rotateY(' + num1 + 'deg)',
					'-ms-transform': 'rotateY(' + num1 + 'deg)',
					'-moz-transform': 'rotateY(' + num1 + 'deg)'
				};
			}
		},

		isLastImg = function (pictureId, picSize, hwh, elemt) {
			$.ajax({
			    url: 'images/' + picSize + '/' + pictureId + '.jpg',
			    type: 'get',
			    success: function () {
			    	if (hwh === 1) {
			    		canNextFullPic = true;
			    	} else if (hwh ===2) {
			    		canPreFullPic = true;
			    	};
			    },
			    error: function (xhr, status) {
			        if (xhr.status == 404) {

			            if (hwh === 1) {
			            	 canNextFullPic = false;

			            	 elemt.children('.txt').text('END')
			            } else if (hwh === 2) {
			            	canPreFullPic = false;

			            	elemt.children('.txt').text('END')
			            } else {
			            	canNext = false;
			            	$moreLi
				            	.empty()
				            	.append(
				            		$('<a javascript:;>end</>')
				            	);
			            }

					}
			    }
			});
		},

		changeImgNext = function () {
			if (canNext === false) {
				return;
			}
			var $img = $('.img-li');
			var lastImgNum = parseInt($($img[$img.length-1]).children('a').children('img').attr('data-num'));

			$img.css(transformRotate(-90, 0));

			var tNext = setTimeout(function(){
				$img.each(function () {
					var index = $(this).index();
					if(index == 0) {
						$(this)
						.html('<a href="javascript:;">previous</a><span class="nav pre"></span>')
					} else {
						lastImgNum ++;
						$(this).children('a').children('img').attr({
							'src': srcThumb + lastImgNum + '.jpg',
							'data-num': lastImgNum
						});
					}
				});
				$img.css(transformRotate(0, 1));
				$firstLi.addClass('li--pre')
				var t = setTimeout(function () {
					$firstLi.removeClass('img-li');
				},400);
			},400);
			$moreLi
				.empty()
				.append(
					$('<a href="javascript:;">next</a>')
				)
				.append(
					$('<span class="nav next"></span>')
				)
			isLastImg((lastImgNum + 11), 'thumb', 3);
		},

		changeImgPre = function () {
			var $img = $('.img-li');
			var firstImgNum = parseInt($($img[0]).children('a').children('img').attr('data-num'));

			$img.css(transformRotate(90, 0));
			if (firstImgNum == 12) {
				$firstLi.css(transformRotate(90, 0));
			};
			var tPre = setTimeout(function () {
				if (firstImgNum == 12) {
					var i = 0
					$firstLi
						.html('<a href="javascript:;"><img src=' + srcThumb + (++i) + ".jpg" +' data-num=' + (i) + '></a>')
						.removeClass('li--pre')
						.addClass('img-li');
					$img.each(function () {
						$(this).children('a').children('img').attr({
							'src': srcThumb + (++i) +'.jpg',
							'data-num': (i)
						});
					});
					$moreLi
						.empty()
						.append(
							$('<a href="javascript:;">more</a>')
						);
				} else {
					currentImg = firstImgNum - 11;
					$img.each(function () {
						currentImg ++;
						$(this).children('a').children('img').attr({
							'src': srcThumb + currentImg + '.jpg',
							'data-num': currentImg
						});
					});
				};
				$img.css(transformRotate(0, 1));
				$firstLi.css(transformRotate(0, 1));
			},400);
		};

	$('.li--more').click(function () {
		changeImgNext();
	});

	$firstLi.on('click', function () {
		if ($(this).hasClass('li--pre')) {
			changeImgPre();
			canNext = true;
			$moreLi
				.empty()
				.append(
					$('<a href="javascript:;">next</a>')
				)
				.append(
					$('<span class="nav next"></span>')
				);
		}
	});

	var $trackMatte = $('.track-matte'),
		$canvs = $('.canvs'),
		createLoad = function () {
			return $('<img src="images/3.gif" class="load">');
		},
		creatDiv = function () {
			return $('<div></div>').addClass('img--full');
		},

		creatImg = function (src, picId) {
			return $('<img>').attr({
						'src': src,
						'data-num': picId
					}).addClass('image-full');
		},

		closeForm = function () {
			$canvs.hide();
			$trackMatte.hide();
			$canvs.empty();
			describeText.css(
				{
					'bottom': '0',
					'opacity': '0'
				}
			)
		},

		getImgFull = function () {
			var $imgFull = $('.img--full').children('.image-full');
			return  {
						'obj': $imgFull,
						'picId': parseInt($imgFull.attr('data-num'), 10)
					};
		},

		changePicNext = function () {

			if (canNextFullPic === false) {
				return;
			};
			var element = getImgFull();
			fullImgDiv.children('.image-full').css('display', 'none');
			loadImg.appendTo(fullImgDiv);

			element.obj.attr({
				'src': srcFull + (element.picId + 1) + '.jpg',
				'data-num': (element.picId + 1)
			});

			element.obj.load(function () {

				fullImgDiv.children('.load').remove();
				$(this).css('display', 'block');


				canPreFullPic = true;
				isLastImg((element.picId + 2), 'full', 1, $fullPicNext);
			});
		},

		changePicPre = function () {

			if (canPreFullPic === false) {
				return;
			};
			var element = getImgFull();
			fullImgDiv.children('.image-full').css('display', 'none');
			loadImg.appendTo(fullImgDiv);

			element.obj.attr({
				'src': srcFull + (element.picId - 1) + '.jpg',
				'data-num': (element.picId - 1)
			});

			element.obj.load(function () {

				fullImgDiv.children('.load').remove();
				$(this).css('display', 'block');


				canNextFullPic = true;
				isLastImg((element.picId - 2), 'full', 2, $fullPicPre);
			});


		},

		creatFullNext = function () {
			return $('<a href="javascript:;" class="nav--full nav--full--next"></a>')
						.click(function () {
							changePicNext();
						});
		},

		creatFullPre = function () {
			return $('<a href="javascript:;" class="nav--full nav--full--pre"></a>')
						.click(function () {
							changePicPre();
						});
		},
		describeText = $('<div class="describe-txt"></div>')
							.html('<p>原创作品：请别让我流浪</p><p>系统分类：原创作品-摄影-生活</p><p>作品版权：Barbara 版权所有，禁止匿名转载；禁止商业使用；禁止个人使用。</p>'),
		fullImgDiv,
		loadImg;

	$('.img-list li').on('click',function () {
		var imgNum,
			src,
			fullImg,
			windowHeight,
			picHeight,
			picWidth,
			fullNext,
			fullPre;

		if ($(this).hasClass('img-li')) {
			windowHeight = parseInt($(window).height(), 10);
			picHeight = windowHeight - windowHeight * 0.3;

			imgNum = parseInt($(this).children('a').children('img').attr('data-num'), 10);
			src = (srcFull + imgNum + '.jpg');
			fullImgDiv = creatDiv();
			fullImg = creatImg(src, imgNum);
			fullNext = creatFullNext();
			fullPre = creatFullPre();
			loadImg = createLoad();

			fullNext
				.append(
					$('<span class="icon-next"></span>')
				)
				.append(
					$('<span class="txt">NEXT</span>')
				).appendTo(fullImgDiv);
			fullPre
				.append(
					$('<span class="txt">PREVIOUS</span>')
				)
				.append(
					$('<span class="icon-pre"></span>')
				)
				.appendTo(fullImgDiv);
			loadImg.appendTo(fullImgDiv);
			describeText.appendTo(fullImgDiv);
			fullImgDiv.appendTo($canvs);

			fullImg.load(function () {

				fullImgDiv.children('.load').remove();
				fullImg.appendTo(fullImgDiv);

				var w = parseInt(fullImg.width(), 10),
					h = parseInt(fullImg.height(), 10);
				picWidth = picHeight * (w / h);

				fullImgDiv.css({
					width: picWidth,
					height: 0,
					marginTop: picHeight/2
				});
				fullImg.css({
					height: picHeight
				});

				fullImgDiv.animate(
					{
						marginTop: 0,
						height: picHeight
					},
					{
						easing: 'easeOutExpo',
						duration: 500,
						complete: function () {
							describeText.animate(
								{
									opacity: 1,
									bottom: '-85px'
								},
								{
									easing: 'easeOutExpo',
									duration: '100'
								}
							);
						}
					}
				);
			});

			$('<a href="javascript:;"></a>')
				.addClass('close')
				.click(function () {
					closeForm();
				})
				.appendTo($canvs);

			$trackMatte.show();
			$canvs.fadeIn();
			$fullPicNext = $('.nav--full--next');
			$fullPicPre = $('.nav--full--pre');
			$navFull = $('.nav--full');
			isLastImg((imgNum + 1), 'full', 1, $navFull);
		}
	});
	isLastImg(12, 'thumb');

	for ( var yoyo = 10; yoyo < 31; yoyo ++) {
		$.ajax(
			{
				url: srcThumb + (yoyo + 1) + '.jpg'
			}
		);
	};
	$.ajax(
			{
				url: 'images/3.gif'
			}
		);
})();
