﻿/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

const baseURL = process.env.VUE_APP_BASE_API

// 日期格式化
export function parseTime(time, pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
			time = time.replace(new RegExp(/-/gm), '/');
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

// 表单重置
export function resetForm(refName) {
	if (this.$refs[refName]) {
		this.$refs[refName].resetFields();
	}
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
	var search = params;
	search.params = {};
	if (null != dateRange && '' != dateRange) {
		if (typeof(propName) === "undefined") {
			search.params["beginTime"] = dateRange[0];
			search.params["endTime"] = dateRange[1];
		} else {
			search.params["begin" + propName] = dateRange[0];
			search.params["end" + propName] = dateRange[1];
		}
	}
	return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
	var actions = [];
	Object.keys(datas).some((key) => {
		if (datas[key].dictValue == ('' + value)) {
			actions.push(datas[key].dictLabel);
			return true;
		}
	})
	return actions.join('');
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
	var actions = [];
	var currentSeparator = undefined === separator ? "," : separator;
	var temp = value.split(currentSeparator);
	Object.keys(value.split(currentSeparator)).some((val) => {
        Object.keys(datas).some((key) => {
            if (datas[key].dictValue == ('' + temp[val])) {
				actions.push(datas[key].dictLabel + currentSeparator);
			}
		})
	})
	return actions.join('').substring(0, actions.join('').length - 1);
}

// 通用下载方法
export function download(fileName) {
	window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
}

// 字符串格式化(%s )
export function sprintf(str) {
	var args = arguments, flag = true, i = 1;
	str = str.replace(/%s/g, function () {
		var arg = args[i++];
		if (typeof arg === 'undefined') {
			flag = false;
			return '';
		}
		return arg;
	});
	return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
	if (!str || str == "undefined" || str == "null") {
		return "";
	}
	return str;
}

// 数据合并
export function mergeRecursive(source, target) {
    for (var p in target) {
        try {
            if (target[p].constructor == Object) {
                source[p] = mergeRecursive(source[p], target[p]);
            } else {
                source[p] = target[p];
            }
        } catch(e) {
            source[p] = target[p];
        }
    }
    return source;
};


/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
	let config = {
		id: id || 'id',
		parentId: parentId || 'parentId',
		childrenList: children || 'children'
	};

	var childrenListMap = {};
	var nodeIds = {};
	var tree = [];

	for (let d of data) {
		let parentId = d[config.parentId];
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = [];
		}
		nodeIds[d[config.id]] = d;
		childrenListMap[parentId].push(d);
	}

	for (let d of data) {
		let parentId = d[config.parentId];
		if (nodeIds[parentId] == null) {
			tree.push(d);
		}
	}

	for (let t of tree) {
		adaptToChildrenList(t);
	}

	function adaptToChildrenList(o) {
		if (childrenListMap[o[config.id]] !== null) {
			o[config.childrenList] = childrenListMap[o[config.id]];
		}
		if (o[config.childrenList]) {
			for (let c of o[config.childrenList]) {
				adaptToChildrenList(c);
			}
		}
	}
	return tree;
}

/**
* 参数处理
* @param {*} params  参数
*/
export function tansParams(params) {
	let result = ''
	Object.keys(params).forEach((key) => {
		if (!Object.is(params[key], undefined) && !Object.is(params[key], null) && !Object.is(JSON.stringify(params[key]), '{}')) {
			result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
		}
	})
	return result
}

/**
 * 添加开始和结束时间到 params 参数中
 *
 * @param params 参数
 * @param dateRange 时间范围。
 *                大小为 2 的数组，每个时间为 yyyy-MM-dd 格式
 * @param propName 加入的参数名，可以为空
 */
 export function addBeginAndEndTime(params, dateRange, propName) {
	// 必须传入参数
	if (!dateRange) {
	  return params;
	}
	// 如果未传递 propName 属性，默认为 time
	if (!propName) {
	  propName = 'Time';
	} else {
	  propName = propName.charAt(0).toUpperCase() + propName.slice(1);
	}
	// 设置参数
	if (dateRange[0]) {
	  params['begin' + propName] = dateRange[0] + ' 00:00:00';
	}
	if (dateRange[1]) {
	  params['end' + propName] = dateRange[1] + ' 23:59:59';
	}
	return params;
  }

  // 下载 Excel 方法
export function downloadExcel(data, fileName) {
	download0(data, fileName, 'application/vnd.ms-excel');
  }
  
  // 下载 Word 方法
  export function downloadWord(data, fileName) {
	download0(data, fileName, 'application/msword');
  }
  
  // 下载 Zip 方法
  export function downloadZip(data, fileName) {
	download0(data, fileName, 'application/zip');
  }
  
  // 下载 Html 方法
  export function downloadHtml(data, fileName) {
	download0(data, fileName, 'text/html');
  }
  
  // 下载 Markdown 方法
  export function downloadMarkdown(data, fileName) {
	download0(data, fileName, 'text/markdown');
  }

  function download0(data, fileName, mineType) {
	// 创建 blob
	let blob = new Blob([data], {type: mineType});
	// 创建 href 超链接，点击进行下载
	window.URL = window.URL || window.webkitURL;
	let href = URL.createObjectURL(blob);
	let downA = document.createElement("a");
	downA.href =  href;
	downA.download = fileName;
	downA.click();
	// 销毁超连接
	window.URL.revokeObjectURL(href);
  }

  // 验证是否为blob格式
export async function blobValidate(data) {
    try {
      const text = await data.text();
      JSON.parse(text);
      return false;
    } catch (error) {
      return true;
    }
}