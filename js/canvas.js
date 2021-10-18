function sin(x) {
	return Math.sin(x)
}
function cos(x) {
	return Math.cos(x)
}
function tan(x) {
	return Math.tan(x)
}
function asin(x) {
	return Math.asin(x)
}
function acos(x) {
	return Math.acos(x)
}
function atan(x) {
	return Math.atan(x)
}
function sqrt(x) {
	return Math.sqrt(x)
}
function log(x) {
	return Math.log(x)
}
function abs(x) {
	return Math.abs(x)
}
function exp(x) {
	return Math.exp(x)
}

function DrawFunction(f){
	var canvas = document.getElementById("canvas");
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		if (!f.func.value) {
			window.alert("Введите функцию");
			return;
		}
		var func = f.func.value;
		if (!f.xmin.value || !f.xmax.value) {
			window.alert("Введите интервал X");
			return;
		}
		if (f.xmin.value >= f.xmax.value) {
			window.alert("Некорректный интервал X");
			return;
		}
		var xmin = +f.xmin.value;
		var xmax = +f.xmax.value;
		var x = +xmin;
		var y = +ymin;
		var ymin, ymax;
		if (f.auto.checked) {
			x = xmin
			ymin = eval(func);
			ymax = eval(func);
			var wasInfinite = 0;
			for (x = xmin; x <= xmax; x += 0.01) {
				y = eval(func);
				if (!isFinite(ymax) || (y > ymax)) {
					ymax = y;
				}
				if (!isFinite(ymin) || (y < ymin)) {
					ymin = y;
				}
			}
			if (!isFinite(ymax) || !isFinite(ymin)){
				window.alert("Ошибка");
				return;
			}
		}
		else {
			if (!f.ymin.value || !f.ymax.value) {
				window.alert("Введите интервал Y");
				return;
			}
			if (f.ymin.value >= f.ymax.value) {
				window.alert("Некорректный интервал Y");
				return;
			}
			ymin = f.ymin.value;
			ymax = f.ymax.value;
		}
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var m = Math.max(ymax - ymin, xmax - xmin);
		var p = canvas.width * 0.9 / m;
		var step = m / 10;
		if (ymax - ymin >= xmax - xmin) {
			ctx.setTransform(1, 0, 0, 1, (+ymax - +ymin - +xmax + +xmin) / 2 * p, canvas.height);
			ctx.strokeStyle = "red";
			ctx.lineWidth = 2;
			ctx.beginPath();
			for (let i = 0, f = 0; i <= (xmax - xmin) * p; i++) {
				var x = +xmin + (i / p);
				y = eval(func);
				if ((y >= ymin) && (y <= ymax)) {
					if (f == 0) {
						f = 1;
						ctx.beginPath();
						ctx.moveTo(0.05 * canvas.width + i, -(0.05 * canvas.height + (y - ymin) * p));
					}
					else {
						ctx.lineTo(0.05 * canvas.width + i, -(0.05 * canvas.height + (y - ymin) * p));
					}
				}
				else {
					if (f == 1) {
						f = 0;
						ctx.stroke();
					}
				}
			}
			ctx.stroke();
			ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			ctx.beginPath();
			m = (xmax - xmin) / 2
			ctx.moveTo(-0.025 * canvas.width - m * p, 0);
			ctx.textAlign = "right";
			ctx.textBaseline = "top";
			ctx.font = "15px Verdana";
			for (let i = - m * p, k = xmin; i < 0.025 * canvas.width + m * p; i += 0.09 * canvas.width) {
				ctx.lineTo(i, 0);
				ctx.lineTo(i, 0.005 * canvas.width);
				ctx.lineTo(i, -0.005 * canvas.width);
				ctx.lineTo(i, 0);
				k--;k++;
				ctx.fillText(k.toFixed(1), -0.0025 * canvas.width + i, 0.0025 * canvas.width);
				k += step;
			}
			ctx.lineTo(0.025 * canvas.width + m * p, 0);
			ctx.lineTo(0.01 * canvas.width + m * p, -0.01 * canvas.height);
			ctx.lineTo(0.025 * canvas.width + m * p, 0);
			ctx.lineTo(0.01 * canvas.width + m * p, 0.01 * canvas.height);
			ctx.stroke();
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.font = "20px Verdana";
			ctx.fillText("x", 0.025 * canvas.width + m * p, 0);
			ctx.beginPath();
			ctx.moveTo(0, 0.475 * canvas.width);
			ctx.textAlign = "right";
			ctx.textBaseline = "top";
			ctx.font = "15px Verdana";
			for (let i = 0.45 * canvas.width, k = ymin; i >= -0.475 * canvas.width; i -= 0.09 * canvas.width) {
				ctx.lineTo(0, i);
				ctx.lineTo(0.005 * canvas.width, i);
				ctx.lineTo(-0.005 * canvas.width, i);
				ctx.lineTo(0, i);
				k--;k++;
				if (Math.abs(i) < 0.025 * canvas.height) {
					ctx.textBaseline = "bottom";
					ctx.fillText(k.toFixed(1), -0.0025 * canvas.width, -0.0025 * canvas.height);
					ctx.textBaseline = "top";
				}
				else {
					ctx.fillText(k.toFixed(1), -0.0025 * canvas.width, 0.0025 * canvas.height + i);
				}
				k += step;
			}
			ctx.lineTo(0, -0.475 * canvas.width);
			ctx.lineTo(0.01 * canvas.width, -0.46 * canvas.height);
			ctx.lineTo(0, -0.475 * canvas.width);
			ctx.lineTo(-0.01 * canvas.width, -0.46 * canvas.height);
			ctx.stroke();
			ctx.textAlign = "left";
			ctx.textBaseline = "bottom";
			ctx.font = "20px Verdana";
			ctx.fillText("y", 0.01 * canvas.width, -0.46 * canvas.height);
		}
		else {
			ctx.setTransform(1, 0, 0, 1, 0, canvas.height - (+xmax - +xmin - +ymax + +ymin) / 2 * p);
			ctx.strokeStyle = "red";
			ctx.lineWidth = 2;
			ctx.beginPath();
			x = xmin;
			for (let i = 0, f = 0; i <= 0.9 * canvas.width; i++) {
				var x = +xmin + (i / p);
				y = eval(func);
				if ((y >= ymin) && (y <= ymax)) {
					if (f == 0) {
						f = 1;
						ctx.moveTo(0.05 * canvas.width + i, -(0.05 * canvas.height + (y - ymin) * p));
					}
					else {
						ctx.lineTo(0.05 * canvas.width + i, -(0.05 * canvas.height + (y - ymin) * p));
					}
				}
				else {
					if (f == 1) {
						f = 0;
						ctx.stroke();
					}
				}                   
			}
			ctx.stroke();
			ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(-0.475 * canvas.width, 0);
			ctx.textAlign = "right";
			ctx.textBaseline = "top";
			ctx.font = "15px Verdana";
			for (let i = -0.45 * canvas.width, k = xmin; i <= 0.475 * canvas.width; i += 0.09 * canvas.width) {
				ctx.lineTo(i, 0);
				ctx.lineTo(i, 0.005 * canvas.height);
				ctx.lineTo(i, -0.005 * canvas.height);
				ctx.lineTo(i, 0);
				k--;k++;
				ctx.fillText(k.toFixed(1), -0.0025 * canvas.width + i, 0.0025 * canvas.width);
				k += step;
			}
			ctx.lineTo(0.475 * canvas.width, 0);
			ctx.lineTo(0.46 * canvas.width, -0.01 * canvas.height);
			ctx.lineTo(0.475 * canvas.width, 0);
			ctx.lineTo(0.46 * canvas.width, 0.01 * canvas.height);
			ctx.stroke();
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.font = "20px Verdana";
			ctx.fillText("x", 0.46 * canvas.width, 0.01 * canvas.height);
			ctx.beginPath();
			m = (ymax - ymin) / 2
			ctx.textAlign = "right";
			ctx.textBaseline = "top";
			ctx.font = "15px Verdana";
			ctx.moveTo(0, 0.025 * canvas.width + m * p);
			for (let i = m * p, k = ymin; i > -0.025 * canvas.height - m * p; i -= 0.09 * canvas.height) {
				ctx.lineTo(0, i);
				ctx.lineTo(0.005 * canvas.width, i);
				ctx.lineTo(-0.005 * canvas.width, i);
				ctx.lineTo(0, i);
				k--;k++;
				if (Math.abs(i) < 0.025 * canvas.width) {
					ctx.textBaseline = "bottom";
					ctx.fillText(k.toFixed(1), -0.0025 * canvas.width, -0.0025 * canvas.width);
					ctx.textBaseline = "top";
				}
				else {
					ctx.fillText(k.toFixed(1), -0.0025 * canvas.width, 0.0025 * canvas.width + i);
				}
				k += step;
			}
			ctx.lineTo(0, -0.025 * canvas.height - m * p);
			ctx.lineTo(0.01 * canvas.width, -0.01 * canvas.height - m * p);
			ctx.lineTo(0, -0.025 * canvas.height - m * p);
			ctx.lineTo(-0.01 * canvas.width, -0.01 * canvas.height - m * p);
			ctx.stroke();
			ctx.textAlign = "left";
			ctx.textBaseline = "bottom";
			ctx.font = "20px Verdana";
			ctx.fillText("y", 0.01 * canvas.width, -0.01 * canvas.height - m * p);
		}
	}
}

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(75,50);
    ctx.lineTo(100,75);
    ctx.lineTo(100,25);
    ctx.fill();
  }
}

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

function clearForm(f) {
	f.ymin.value = "";
	f.ymax.value = "";
	f.xmin.value = "";
	f.xmax.value = "";
	f.ymin.disabled = 0;
	f.ymax.disabled = 0;
	f.clear.checked = 0;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}