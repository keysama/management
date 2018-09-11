import App from '../App';
const home= r => require.ensure([],() => r(require('../page/home/home')),'home')
const login= r => require.ensure([],() => r(require('../page/login/login')),'login')
const registe= r => require.ensure([],() => r(require('../page/registe/registe')),'registe')
const user= r => require.ensure([],() => r(require('../page/user/user')),'user')
const addPro= r => require.ensure([],() => r(require('../page/addPro/addPro')),'addPro')

const user_index= r => require.ensure([],() => r(require('../page/user/children/index')),'user_index')
const book= r => require.ensure([],() => r(require('../page/user/children/book')),'book')
const set= r => require.ensure([],() => r(require('../page/user/children/set')),'set')

const step1= r => require.ensure([],() => r(require('../page/addPro/children/step1')),'step1')
const step2= r => require.ensure([],() => r(require('../page/addPro/children/step2')),'step2')
const step3= r => require.ensure([],() => r(require('../page/addPro/children/step3')),'step3')

const pro= r => require.ensure([],() => r(require('../page/pro/pro')))
const pro_main= r => require.ensure([],() => r(require('../page/pro/children/main')))
const pro_set= r => require.ensure([],() => r(require('../page/pro/children/set')),'pro_set')
const pro_order= r => require.ensure([],() => r(require('../page/pro/children/order')),'pro_order')
const pro_collect= r => require.ensure([],() => r(require('../page/pro/children/collect')),'pro_collect')
const pro_timeline= r => require.ensure([],() => r(require('../page/pro/children/timeline')),'timeline')

const order_add= r => require.ensure([],() => r(require('../page/addOrder/order_add')),'order_add')
const order_add_1= r => require.ensure([],() => r(require('../page/addOrder/children/step1')),'order_add_1')
const order_add_2= r => require.ensure([],() => r(require('../page/addOrder/children/step2')),'order_add_2')
const order_add_3= r => require.ensure([],() => r(require('../page/addOrder/children/step3')),'order_add_3')
const order_add_4= r => require.ensure([],() => r(require('../page/addOrder/children/step4')),'order_add_4')

const order= r => require.ensure([],() => r(require('../page/order/order')),'order')

const result=r => require.ensure([],() => r(require('../page/result/result')),'result')

const daily= r => require.ensure([],() => r(require('../page/daily/daily')),'daily')

const density= r => require.ensure([],() => r(require('../page/pro/children/density')),'density')
export default [{
	path:'/',
	component:App,				//顶级路由，www.xxx.com/#/
	children:[
		{						//二级路由
			path:'',			//www.xxx.com/#/
			redirect:'/login'	//为空的时候调转到/home
		},
		{
			path:'/home',
			component:home,		//www.xxx.com/#/home
			meta:{checkLogin:true}
		},
		{
			path:'/login',
			component:login		//www.xxx.com/#/home
		},
		{
			path:'/registe',
			component:registe		//www.xxx.com/#/home
		},
		{
			path:'/result/:text',
			component:result		//www.xxx.com/#/home
		},
		{
			path:'/user',
			component:user,		//www.xxx.com/#/home
			meta:{checkLogin:true},
			children:[
				{						//二级路由
					path:'',			//www.xxx.com/#/
					redirect:'/user/index', //为空的时候调转到/home
					meta:{checkLogin:true},
				},
				{
					path:'index',
					component:user_index,//www.xxx.com/#/home
					meta:{checkLogin:true},
				},
				{
					path:'book',
					component:book,		//www.xxx.com/#/home
					meta:{checkLogin:true},
				},
				{
					path:'set',
					component:set,		//www.xxx.com/#/home
					meta:{checkLogin:true},
				}
			]
		},
		{
			path:'addPro',
			component:addPro,
			meta:{checkLogin:true},
			children:[
				{
					path:'',
					redirect:'/addPro/step1'
				},
				{
					path:'step1',
					component:step1,
					meta:{checkLogin:true},
				},
				{
					path:'step2',
					component:step2,
					meta:{checkLogin:true},
				},
				{
					path:'step3',
					component:step3,
					meta:{checkLogin:true},
				}
			]
		},
		{
			path:'pro/:id',
			component:pro,
			children:[
				{
					path:'',
					redirect:'/pro/:id/index'
				},
				{
					path:'index',
					component:pro_main
				},
				{
					path:'set',
					component:pro_set
				},
				{
					path:'order',
					component:pro_order
				},
				{
					path:'order/:oid',
					component:order
				},
				{
					path:'density',
					component:density
				},
				{
					path:'daily',
					component:daily
				},
				{
					path:'orderAdd',
					component:order_add,
					children:[
						{
							path:'',
							redirect:'/pro/:id/orderAdd/step1'
						},
						{
							path:'step1',
							component:order_add_1,
						},
						{
							path:'step2',
							component:order_add_2,
						},
						{
							path:'step3',
							component:order_add_3,
						},
						{
							path:'step4',
							component:order_add_4,
						}
					]
				},
				{
					path:'collect',
					component:pro_collect
				},
				{
					path:'timeline',
					component:pro_timeline
				}
			]
		}
		// {
		// 	path:'/user',
		// 	component:user,      //www.xxx.com/#/user
		// 	meta:{ checkLogin:true }
		// },
	]

}]
