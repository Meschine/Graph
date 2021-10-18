function agreeForm(f) {
	if (f.auto.checked) {
		f.ymin.value = ""
		f.ymax.value = ""
		f.ymin.disabled = 1
		f.ymax.disabled = 1
	}
	else {
		f.ymin.disabled = 0
		f.ymax.disabled = 0
	}
}

function clearForm(f, canvas) {
	f.ymin.value = "";
	f.ymax.value = "";
	f.xmin.value = "";
	f.xmax.value = "";
	f.ymin.disabled = 0;
	f.ymax.disabled = 0;
	f.clear.checked = 0;
}