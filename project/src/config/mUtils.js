import { rejects } from "assert";

export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

export const readExcel = data => {
	return new Promise(function(resolve, reject){
		let reader = new FileReader();
		reader.readAsBinaryString(data);
		reader.onload = function(e) {
			try {
				var content = e.target.result;
				var workbook = XLSX.read(content, {
						type: 'binary'
					}); // 以二进制流方式读取得到整份excel表格对象
					resolve(workbook)
			} catch (e) {
				reject('文件类型不正确');
				return;
			}
		}
	})
}

export const downExcel = (data) => {
	const defaultCellStyle =  { font: { name: "Verdana", sz: 11, color: "FF00FF88"}, fill: {fgColor: {rgb: "FFFFAA00"}}};
	const wopts = { bookType:'xlsx', bookSST:false, type:'binary', defaultCellStyle: defaultCellStyle, showGridLines: false};
	const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
	//完整excel
	let templet = [];
	//前6行
	let templet_head=data[0]
	//中间数据
	
	let templet_body=data.filter((item,key)=>key>0);
	//底部数据
	//完整excel
	templet.push(templet_head)
	templet_body.forEach(item=>{
		templet.push(item)
	})
	wb.Sheets['Sheet1'] = XLSX.utils.aoa_to_sheet(templet);
	// wb.Sheets['Sheet1']['!merges'] = [//单元格合并
	// 	{
	// 		s:{r:1,c:0},
	// 		e:{r:1,c:11}
	// 	},{
	// 		s:{r:2,c:0},
	// 		e:{r:2,c:1}
	// 	},{
	// 		s:{r:2,c:2},
	// 		e:{r:2,c:5}
	// 	},{
	// 		s:{r:2,c:6},
	// 		e:{r:2,c:8}
	// 	},{
	// 		s:{r:2,c:9},
	// 		e:{r:2,c:11}
	// 	},{
	// 		s:{r:3,c:0},
	// 		e:{r:3,c:1}
	// 	},{
	// 		s:{r:3,c:2},
	// 		e:{r:3,c:5}
	// 	},{
	// 		s:{r:3,c:6},
	// 		e:{r:3,c:8}
	// 	},{
	// 		s:{r:3,c:9},
	// 		e:{r:3,c:11}
	// 	},{
	// 		s:{r:4,c:0},
	// 		e:{r:5,c:0}
	// 	},{
	// 		s:{r:4,c:1},
	// 		e:{r:5,c:1}
	// 	},{
	// 		s:{r:4,c:2},
	// 		e:{r:5,c:2}
	// 	},{
	// 		s:{r:4,c:3},
	// 		e:{r:5,c:3}
	// 	},{
	// 		s:{r:4,c:4},
	// 		e:{r:4,c:5}
	// 	},{
	// 		s:{r:4,c:11},
	// 		e:{r:5,c:11}
	// 	},{
	// 		s:{r:26,c:0},
	// 		e:{r:26,c:3}
	// 	},{
	// 		s:{r:27,c:0},
	// 		e:{r:31,c:11}
	// 	},{
	// 		s:{r:32,c:0},
	// 		e:{r:32,c:1}
	// 	},{
	// 		s:{r:32,c:2},
	// 		e:{r:32,c:3}
	// 	},{
	// 		s:{r:32,c:4},
	// 		e:{r:32,c:5}
	// 	},{
	// 		s:{r:33,c:0},
	// 		e:{r:33,c:1}
	// 	},{
	// 		s:{r:33,c:2},
	// 		e:{r:33,c:3}
	// 	},{
	// 		s:{r:33,c:4},
	// 		e:{r:33,c:5}
	// 	},{
	// 		s:{r:34,c:0},
	// 		e:{r:34,c:1}
	// 	},{
	// 		s:{r:34,c:2},
	// 		e:{r:34,c:3}
	// 	},{
	// 		s:{r:34,c:4},
	// 		e:{r:34,c:5}
	// 	},{
	// 		s:{r:32,c:7},
	// 		e:{r:34,c:9}
	// 	},{
	// 		s:{r:32,c:10},
	// 		e:{r:34,c:11}
	// 	}
	// ]
	// wb.Sheets['Sheet1']['A2'].s={
	// 	font: {
	// 		name: '宋体',
	// 		sz: 14,
	// 		color: {rgb: "#FFFF0000"},
	// 		bold: false,
	// 		italic: false,
	// 		underline: false
	// 	  },
	// 	  alignment: {
	// 		horizontal: "center" ,
	// 		vertical: "center"
	// 	  },
	// 	  border:{
	// 		top:{style:'thin'}, left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}
	// 	  }
	// }
	return new Blob([s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" })
}

function s2ab (s) {
	if (typeof ArrayBuffer !== 'undefined') {  
		var buf = new ArrayBuffer(s.length);  
		var view = new Uint8Array(buf);  
		for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;  
		return buf;  
	} else {  
		var buf = new Array(s.length);  
		for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;  
		return buf;  
	}
}
