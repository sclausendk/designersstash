//Switching and recoloring
function switchModeOnSwitch(){
	var page = document.getElementsByTagName('html')[0]
	var images = document.getElementsByTagName('img')

	if(page.classList.contains('lightui')){
		page.classList.remove('lightui')
		page.classList.add('darkui')

		var index;
		for (index = 0; index < images.length; ++index) {
			var src = images[index].src
			var newSrc = src.replace("-light", "-dark");
			images[index].src = newSrc
		}
	}else{
		page.classList.remove('darkui')
		page.classList.add('lightui')

		var index;
		for (index = 0; index < images.length; ++index) {
			var src = images[index].src
			var newSrc = src.replace("-dark", "-light");
			images[index].src = newSrc
		}
	}
}