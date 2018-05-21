var fixFullscreenMethod=function(element,method){
	var methodDone;
	["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
        if (methodDone) return;
        if (prefix === "") {
            // 无前缀，方法首字母小写
            method = method.slice(0,1).toLowerCase() + method.slice(1);     
        }            
        var typeMethod = typeof element[prefix + method];            
        if (typeMethod + "" !== "undefined") {
            if (typeMethod === "function") {
                methodDone = element[prefix + method]();
            } else {
                methodDone = element[prefix + method];
            }
        }
    });
	return methodDone;
};

export default fixFullscreenMethod;