const map=document.getElementById('map')
function Map_Size(){
    let n=100
    let m=120
    return [n,m]
}
const size=Map_Size()
let n=size[0]
let m=size[1]


//初始化网格以及鼠标操作
function Initialize(){
    let x=1
    let y=1
    let xn=100/n
    let cell=''
    while(x<=n){
        while(y<=m){
        cell+=`<div class="cell" id="${x},${y}"
            style="left:${(x-1)*xn*13}px;top:${(y-1)*xn*13}px; width:${xn*13}px;
            height:${xn*13}px;"></div>`
            y++    }
        y=1
        x++
    }
    map.innerHTML=cell
}//初始化生成网格
let cells=''
document.getElementById('初始化').addEventListener('click',()=>{
    Initialize()
    cells=document.querySelectorAll('.cell')
    map.addEventListener('click',(event)=>{
        const cell=event.target
        if (cell.classList.contains("alive")){
            cell.classList.remove('alive')
        } else {
            cell.classList.add('alive');
        }
    })
})//点击细胞以激活  

//康威的生命游戏的规则
function the_next_moment(){
    let born=[]
    let died=[]
    for(let cell of cells){
        const bianhao=cell.id.split(',').map(Number)
        x=bianhao[0]
        y=bianhao[1]
        let bianhaos=[`${x-1},${y-1}`,`${x-1},${y}`,`${x-1},${y+1}`,`${x},${y-1}`,
        `${x},${y+1}`,`${x+1},${y-1}`,`${x+1},${y}`,`${x+1},${y+1}`,]
        let active_cell=0 
        for(let j in bianhaos){
            const around_cell=document.getElementById(`${bianhaos[j]}`)
            if(around_cell&&around_cell.classList.contains('alive')){ 
                active_cell=active_cell+1
            }
        }          
            if(active_cell==3&&cell.classList.contains('alive')==false){
                born.push(cell)
            }//1.若该位置无活细胞且周围有3个活细胞则变为活细胞
            else if((active_cell<2||active_cell>3)&&cell.classList.contains('alive')){
                died.push(cell)
            }//2&3&4.该位置为活细胞且周围细胞小于2则孤独致死大于三则拥挤致死在2到3之间则继续存活
    }
    born.forEach(cell=>{cell.classList.add('alive')})
    died.forEach(cell=>{cell.classList.remove('alive')})
}

//回车键和空格键控制运行以及运行速度
const Speed_Selection=document.getElementById('speed')
let speed=500//所以说speed既是速度也是速率这里的单位是毫秒/次
let autoRun=0//悲报：这个byd的浏览器能运行的最大更新频率是100ms/次，20倍速不可能了
Speed_Selection.addEventListener('change',()=>{
    speed=500/parseFloat(Speed_Selection.value)
    if(autoRun!==0){
            clearInterval(autoRun)
            autoRun=setInterval(the_next_moment,speed)
        }           
})
document.addEventListener('keydown',(event)=>{
    if(event.key=="Enter"){
        the_next_moment()
    }//按下回车键以进行下一刻
    
    if(event.key==" "){
        if(autoRun==0){
            autoRun=setInterval(the_next_moment,speed)
        }
        else{
            clearInterval(autoRun)
            autoRun=0
        }//按下空格来自动进行或停止
    }
})

//移动地图和放大缩小 


//保存功能
function save(){
    const present=document.querySelectorAll('.alive')
    localStorage+=present.id
}