export type ItemId = 'bluePhone'|'blackPhone'|'redPhone'|'redCase'|'charger'|'earphones'|'glass'|'cola'|'zeroCola'|'catFood'|'dogFood'|'saltFish'|'keyboard'|'mouse'|'battery'|'card32'|'card128'|'iceCream'|'camera'|'toy';
export type BoxId = 'small'|'medium'|'large';
export type WrapId = 'none'|'bubble'|'ice'|'waterproof';
export type LabelId = 'none'|'fragile'|'cold'|'waterproof';
export interface ItemDefinition { id:ItemId; name:string; glyph:string; color:string; size:number; }
export interface Order { id:number; customer:string; items:Partial<Record<ItemId,number>>; box:BoxId; wrap:WrapId; label:LabelId; seconds:number; reward:number; }
export interface LevelDefinition { id:number; name:string; subtitle:string; target:number; beltSpeed:number; wantedChance:number; timeScale:number; event:'none'|'blackout'|'malfunction'|'both'; }
export interface PackageResult { perfect:boolean; complaint:boolean; reason:string; review:string; coins:number; }

export const ITEMS:ItemDefinition[] = [
  {id:'bluePhone',name:'蓝色手机',glyph:'机',color:'#4C83FF',size:1},{id:'blackPhone',name:'黑色手机',glyph:'机',color:'#414754',size:1},
  {id:'redPhone',name:'红色手机',glyph:'机',color:'#EF5964',size:1},{id:'redCase',name:'红色手机壳',glyph:'壳',color:'#F27E87',size:1},
  {id:'charger',name:'充电器',glyph:'充',color:'#E6E9EC',size:1},{id:'earphones',name:'耳机',glyph:'耳',color:'#A978E8',size:1},
  {id:'glass',name:'玻璃杯',glyph:'杯',color:'#55C9DA',size:1},{id:'cola',name:'普通可乐',glyph:'糖',color:'#DB4C4C',size:1},
  {id:'zeroCola',name:'无糖可乐',glyph:'0',color:'#303640',size:1},{id:'catFood',name:'猫粮',glyph:'猫',color:'#E99D3E',size:2},
  {id:'dogFood',name:'狗粮',glyph:'狗',color:'#B97B43',size:2},{id:'saltFish',name:'咸鱼',glyph:'鱼',color:'#5DAA9D',size:2},
  {id:'keyboard',name:'键盘',glyph:'键',color:'#657487',size:2},{id:'mouse',name:'鼠标',glyph:'鼠',color:'#78818E',size:1},
  {id:'battery',name:'电池',glyph:'电',color:'#65A75B',size:1},{id:'card32',name:'32GB卡',glyph:'32',color:'#3C6F9E',size:1},
  {id:'card128',name:'128GB卡',glyph:'128',color:'#315A80',size:1},{id:'iceCream',name:'冰淇淋',glyph:'冰',color:'#E87FB0',size:1},
  {id:'camera',name:'相机',glyph:'相',color:'#4E565D',size:2},{id:'toy',name:'玩具熊',glyph:'熊',color:'#C78C5B',size:2},
];

export const ORDERS:Order[] = [
  {id:1,customer:'手机侠',items:{bluePhone:1,charger:1},box:'small',wrap:'none',label:'none',seconds:30,reward:100},
  {id:2,customer:'玻璃心小姐',items:{glass:1},box:'small',wrap:'none',label:'none',seconds:28,reward:105},
  {id:3,customer:'游戏少年',items:{mouse:1,battery:1},box:'small',wrap:'none',label:'none',seconds:28,reward:110},
  {id:4,customer:'铲屎官',items:{catFood:1},box:'small',wrap:'none',label:'none',seconds:27,reward:115},
  {id:5,customer:'数码达人',items:{blackPhone:1,earphones:1},box:'small',wrap:'none',label:'none',seconds:27,reward:120},
  {id:6,customer:'红色控',items:{redPhone:1,charger:1},box:'small',wrap:'none',label:'none',seconds:26,reward:125},
  {id:7,customer:'清醒青年',items:{zeroCola:2},box:'small',wrap:'none',label:'none',seconds:25,reward:130},
  {id:8,customer:'摄影师',items:{camera:1},box:'small',wrap:'bubble',label:'fragile',seconds:27,reward:145},
  {id:9,customer:'杯具收藏家',items:{glass:2},box:'small',wrap:'bubble',label:'fragile',seconds:25,reward:150},
  {id:10,customer:'冰爽达人',items:{cola:1,iceCream:1},box:'small',wrap:'ice',label:'cold',seconds:25,reward:155},
  {id:11,customer:'雨天宅家',items:{catFood:1,toy:1},box:'medium',wrap:'waterproof',label:'waterproof',seconds:26,reward:165},
  {id:12,customer:'键鼠党',items:{keyboard:1,mouse:1},box:'medium',wrap:'none',label:'none',seconds:25,reward:170},
  {id:13,customer:'续航焦虑',items:{battery:2,charger:1},box:'small',wrap:'none',label:'none',seconds:24,reward:175},
  {id:14,customer:'容量党',items:{card128:1,card32:1},box:'small',wrap:'none',label:'none',seconds:23,reward:180},
  {id:15,customer:'狗狗队长',items:{dogFood:1,toy:1},box:'medium',wrap:'waterproof',label:'waterproof',seconds:25,reward:185},
  {id:16,customer:'办公达人',items:{keyboard:1,mouse:1,battery:2},box:'medium',wrap:'none',label:'none',seconds:25,reward:195},
  {id:17,customer:'拍照博主',items:{camera:1,card128:1},box:'medium',wrap:'bubble',label:'fragile',seconds:24,reward:205},
  {id:18,customer:'囤货王',items:{cola:2,zeroCola:2},box:'medium',wrap:'ice',label:'cold',seconds:24,reward:210},
  {id:19,customer:'双机党',items:{bluePhone:1,blackPhone:1,charger:1},box:'medium',wrap:'bubble',label:'fragile',seconds:23,reward:220},
  {id:20,customer:'猫狗双全',items:{catFood:1,dogFood:1},box:'medium',wrap:'waterproof',label:'waterproof',seconds:23,reward:225},
  {id:21,customer:'甜品店长',items:{iceCream:3},box:'medium',wrap:'ice',label:'cold',seconds:22,reward:230},
  {id:22,customer:'易碎人生',items:{glass:2,camera:1},box:'medium',wrap:'bubble',label:'fragile',seconds:23,reward:240},
  {id:23,customer:'红红火火',items:{redPhone:1,redCase:1,charger:1},box:'medium',wrap:'bubble',label:'fragile',seconds:22,reward:245},
  {id:24,customer:'存储大户',items:{card32:2,card128:2},box:'medium',wrap:'waterproof',label:'waterproof',seconds:21,reward:250},
  {id:25,customer:'全套玩家',items:{keyboard:1,mouse:1,earphones:1,battery:2},box:'large',wrap:'waterproof',label:'waterproof',seconds:23,reward:265},
  {id:26,customer:'派对采购',items:{cola:2,zeroCola:2,toy:1},box:'large',wrap:'ice',label:'cold',seconds:22,reward:270},
  {id:27,customer:'主播开箱',items:{bluePhone:1,camera:1,earphones:1},box:'large',wrap:'bubble',label:'fragile',seconds:21,reward:280},
  {id:28,customer:'毛孩子之家',items:{catFood:1,dogFood:1,toy:1},box:'large',wrap:'waterproof',label:'waterproof',seconds:21,reward:285},
  {id:29,customer:'极客老板',items:{blackPhone:1,keyboard:1,mouse:1,card128:1},box:'large',wrap:'bubble',label:'fragile',seconds:20,reward:295},
  {id:30,customer:'神秘顾客',items:{redPhone:1,charger:1,earphones:1,card128:1},box:'large',wrap:'waterproof',label:'waterproof',seconds:19,reward:320},
];

export const LEVELS:LevelDefinition[] = [
  {id:1,name:'第一天上班',subtitle:'认识商品与装箱',target:4,beltSpeed:.82,wantedChance:.72,timeScale:1.18,event:'none'},
  {id:2,name:'颜色陷阱',subtitle:'相似颜色开始出现',target:5,beltSpeed:.9,wantedChance:.68,timeScale:1.1,event:'none'},
  {id:3,name:'规格大战',subtitle:'别拿错容量和口味',target:5,beltSpeed:.98,wantedChance:.64,timeScale:1.04,event:'none'},
  {id:4,name:'完整打包',subtitle:'包装和标签都要对',target:6,beltSpeed:1.04,wantedChance:.61,timeScale:1,event:'none'},
  {id:5,name:'仓库停电',subtitle:'停电时商品只剩轮廓',target:6,beltSpeed:1.08,wantedChance:.59,timeScale:.98,event:'blackout'},
  {id:6,name:'机器发疯',subtitle:'传送带会突然加速',target:6,beltSpeed:1.12,wantedChance:.57,timeScale:.96,event:'malfunction'},
  {id:7,name:'多件订单',subtitle:'数量判断升级',target:7,beltSpeed:1.16,wantedChance:.55,timeScale:.94,event:'blackout'},
  {id:8,name:'混乱仓库',subtitle:'随机事件轮番登场',target:7,beltSpeed:1.2,wantedChance:.53,timeScale:.92,event:'both'},
  {id:9,name:'金牌考核',subtitle:'复杂订单限时完成',target:8,beltSpeed:1.25,wantedChance:.51,timeScale:.9,event:'both'},
  {id:10,name:'极限营业',subtitle:'成为人形分拣机器',target:8,beltSpeed:1.32,wantedChance:.48,timeScale:.86,event:'both'},
];

const FUNNY_WRONG=['我买的是手机，为什么收到一条咸鱼？','杯子到了，碎得很均匀。','箱子很大，里面的空气也很新鲜。','谢谢赠送的随机商品，我不敢再猜了。','我买的是猫粮，狗倒是吃得很开心。'];
const FUNNY_GOOD=['包装比我的人生还严密。','下单一分钟，发货只用了三秒。','东西没坏，就是拆包装拆了半小时。','快递员一定有强迫症，我喜欢。','每件东西都像住进了单间。'];
export function itemById(id:ItemId):ItemDefinition{return ITEMS.find(i=>i.id===id)!;}
export function getBoxCapacity(box:BoxId):number{return box==='small'?3:box==='medium'?5:7;}
export function usedCapacity(contents:Partial<Record<ItemId,number>>):number{return Object.entries(contents).reduce((s,[id,n])=>s+itemById(id as ItemId).size*(n??0),0);}
export function ordersForLevel(levelId:number):Order[]{const start=Math.min(20,Math.max(0,(levelId-1)*2));return ORDERS.slice(start,Math.min(30,start+10));}
function sameItems(expected:Partial<Record<ItemId,number>>,actual:Partial<Record<ItemId,number>>):'ok'|'missing'|'wrong'{
  if(Object.entries(actual).some(([id,n])=>(n??0)>(expected[id as ItemId]??0)))return'wrong';
  return Object.entries(expected).some(([id,n])=>(actual[id as ItemId]??0)!==n)?'missing':'ok';
}
export function evaluatePackage(order:Order,contents:Partial<Record<ItemId,number>>,box:BoxId,wrap:WrapId,label:LabelId,secondsLeft:number):PackageResult{
  const state=sameItems(order.items,contents);let reason='完美打包',complaint=false;
  if(state==='wrong'){reason='商品错误';complaint=true;}else if(state==='missing'){reason='漏装商品';complaint=true;}
  else if(usedCapacity(contents)>getBoxCapacity(box)){reason='包裹超重';complaint=true;}else if(wrap!==order.wrap){reason='包装错误';complaint=true;}else if(label!==order.label){reason='标签错误';complaint=true;}
  const penalty=!complaint&&getBoxCapacity(box)>getBoxCapacity(order.box)?30:0;
  return{perfect:!complaint,complaint,reason:penalty?'正确，但箱子过大':reason,review:(complaint?FUNNY_WRONG:FUNNY_GOOD)[order.id%5],coins:complaint?0:Math.max(10,order.reward-penalty+Math.max(0,Math.floor(secondsLeft)))};
}
