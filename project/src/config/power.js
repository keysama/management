//操作权限集
const _createOrder=10;//创建订单
const _createSheet=11;//创建提料单
const _createfile=12;//上传附件
const _createDaily=13;//上传日志
const _createDensity=14;//添加线密度

const _deleteOrder=20;//删除订单
const _deleteSheet=21;//删除提料单
const _deletefile=22;//删除附件
const _deleteDaily=23;//删除日志
const _deleteDensity=24;//删除线密度

const _orderControll=40;//对订单的流程（提交、撤销、删除、等操作）

const _editOrder=30;//修改订单
const _editSheet=31;//修改提料单


export const jobList={//user.job某一工程下的账号属性
    0:[//创建者
        _createOrder,_createSheet,_createfile,_createDaily,_createDensity,
        _deleteOrder,_deleteSheet,_deletefile,_deleteDaily,_deleteDensity,
        _editOrder,_editSheet,_orderControll
    ],
    1:[//参与人
        _createOrder,_createDaily,_createDensity
    ],
    2:[//材料商
        _createDaily,_createDensity
    ],
    3:[//领导

    ]
}
// const powerList={//user.type全局的账号属性
//     0:[],//管理员，拥有全部权限
//     1:[],//普通用户，可以创建工程、查看与自己相关工程
// }
