//实现JSON.stringify函数。
stringify = function(value) {//stringify比parse好写
    if (value === null) {
        return 'null';
    }
    if (typeof value === 'number') {
        return '' + value;
    }
    if (typeof value === 'string') {
        return '"' + value + '"'
    }
    if (typeof value === 'boolean') {
        if (value) {
            return 'true';
        } else {
            return 'false';
        }
    }
    if (Array.isArray(value)) {
        var result = '[';
        for (var i = 0; i < value.length; i++) {
            result += stringify(value[i]);
            if (i !== value.length - 1) {
                result += ',';
            }
        }
        result += ']';
        return result;
    }
    var result = '{';
    for (var prop in value) {
        result += '"' + prop + '"' + ':' + stringify(value[prop]) + ',';
    }
    result = result.slice(0, result.length - 1) + '}';//去掉最后一个逗号
    return result;
}