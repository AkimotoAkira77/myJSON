//作业：实现一个极简的JSON解析器，即实现JSON.parse函数。
//忽略有多余空格等特殊情况，没有处理报错

var parse = function() {
    var i;
    var jsonStr;

    return parse;//闭包调用

    //递归下降，互相调用
    function parse(input) {
        i = 0;
        jsonStr = input;
        return parseValue();
    }

    var i//指针
    function parseValue() {//解析接下来扫描的对象是什么类型，起到路由的作用
        if (jsonStr[i] === '{') {
            return parseObject();
        }
        if (jsonStr[i] === '[') {
            return parseArray();
        }
        if (jsonStr[i] === '"') {
            return parseString();
        }
        if (jsonStr[i] === 't') {
            return parseTrue();
        }
        if (jsonStr[i] === 'f') {
            return parseFalse();
        }
        if (jsonStr[i] === 'n') {
            return parseNull();
        }
        return parseNumber();//剩下的情况一定是数值
    }


    function parseObject() {
        i++
        var result = {};
        while(jsonStr[i] !== '}') {
    
            // if (jsonStr[i] === '}') {//直接返回
            //     return result;
            // }
            var key = parseString();
            i++//这里一定是冒号
            var value = parseValue();
            result[key] = value;
            if (jsonStr[i] === ',') {//继续操作
                i++
            }
        }
        i++//此时指向右大括号，加一位
        return result;
    }

    function parseTrue() {
        i += 4;
        return true;
    }

    function parseFalse() {
        i += 5;
        return false;
    }

    function parseNull() {
        i += 4;
        return null;
    }

    function parseString() {//进入该函数时，指针指向双引号，需要向后
        var result = '';
        i++
        while(jsonStr[i] !== '"') {
            result += jsonStr[i++]
        }
        i++//最后一次的时候，i指向最后一个引号
        return result;
    }

    function parseNumber() {
        //0-9eE.+-
        var numStr = '';
        while(isNumChar(jsonStr[i])) {
            numStr += jsonStr[i];
            i++
        }
        return parseFloat(numStr);//使用系统自带函数

        function isNumChar(char) {
            return /[0-9.+\-e]/i.test(char);///i表示忽略大小写eE
        }
    }

    function parseArray() {//进来时，i指向中括号
        i++
            // if (jsonStr[i] === ']') {
            //     return [];
            // }
        var result = [];
        while(jsonStr[i] !== ']') {//[,]在json中不合法
            result.push(parseValue());
            if (jsonStr === ',') {
                i++
            }
            if (jsonStr[i] === ']') {//此处比较绕
                break;
            }
        }

        i++//循环结束的时候i指向中括号，加一位
        return result;

    }
    }()//创建一个闭包