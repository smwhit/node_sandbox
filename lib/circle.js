function Circle(x, y, r) {
	function area(){
		return Math.PI * Math.pow(r, 2);
	}

	function circumference() {
		return Math.PI * 2 * r;
	}

	function translate(dx, dy) {
		return Circle(x + dx, y + dy, r);
	}

	function scale(dr) {
		return Circle(x, y, r *dr);
	}

	return {
		x: x,
		y: y,
		r: r,
		area: area,
		circumference: circumference,
		translate: translate,
		scale: scale
	};
}

module.exports = Circle;