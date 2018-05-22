

function getCSS (obj,sty) {
	return window.getComputedStyle(obj, null)[sty]?window.getComputedStyle(obj, null)[sty]:obj.currentStyle[sty];
};

export default getCSS;