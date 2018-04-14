var showBannerButton = document.getElementById("showBannerButton");
var	banner1 = document.getElementById("banner1");
var interval;//间歇调用
var banner = document.getElementById("banner2");//三幅图
var pictures = banner.getElementsByTagName("img");//三幅图的数组
var numberOfPictures = pictures.length;//图的数量
var indexOfPictures = 0;//现在播放的图片索引
var preBtn = document.getElementById("preBtn");
var posBtn = document.getElementById("posBtn");//前后切换图片按钮
var dot = document.getElementById("dot");//三个圆点
var dots = dot.getElementsByTagName("span");//三个圆点的数组

showBannerButton.onclick = function(){
	banner1.style.display = "none";
	banner2.style.display = "block";
	//自动轮播图片
	changePicture();
	//播放音乐
	var audio = new Audio();
	audio.setAttribute("src","music/WhereIstheLove.mp3");
	audio.play();
}


//按箭头切换图片
posBtn.onclick = cutNextPicture;
preBtn.onclick = cutLastPicture;

//按圆点切换图片
for (var i = 0; i < dots.length; i++) {
	dots[i].id = i;
	dots[i].onmousemove = function(){
		indexOfPictures = this.id;
		showPicture(indexOfPictures);
	}
}

//鼠标悬浮图片上图片不切换
banner.onmousemove = function(){
	clearInterval(interval);
}
banner.onmouseout = function(){
	changePicture();
}

//切换到上一张图片
function cutLastPicture(){
	if (isNaN(indexOfPictures)) { console.log("cuut"); return; }
	if ((--indexOfPictures)<0) { indexOfPictures = numberOfPictures - 1; }
	showPicture(indexOfPictures);
}

//切换到下一张图片
function cutNextPicture(){
	if (isNaN(indexOfPictures)) { console.log("cuut"); return; }
	if ((++indexOfPictures)>=numberOfPictures) { indexOfPictures = 0; }
	showPicture(indexOfPictures);
}

//间隔调用切换图片
function changePicture(){
	var i = indexOfPictures + 1;
	interval = setInterval(
		function(){
			if (i >= numberOfPictures) {
				i = 0;
			}
			showPicture(i);
			i++;
		},1500)
	return;
}

//将某张图显示出来并将其它图隐藏
function showPicture(index){
	for (var i = 0; i < numberOfPictures; i++) {
		//隐藏其它图片
		pictures[i].style.display = "none";
		//将其它图片的圆点挖空
		dots[i].className = "";
	}
	//显示图片和圆点
	console.log(index);
	console.log(dots[0]);
	//if (null != dots[index] ) {}
	(dots[index]||dots[0]).className = "activity";	
	(pictures[index]||pictures[0]).style.display = "block";
	//此时赋值正在播放的图片索引
	indexOfPictures = index;
}


