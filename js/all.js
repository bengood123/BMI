//身高體重
var height = document.querySelector('.height-text');
var weight = document.querySelector('.weight-text');
//刪除鈕
var delbtn = document.querySelector('.del-btn');
//將計算後的結果新增到list
var list = document.querySelector('.list');
//包覆結果按鈕的div
var submit = document.querySelector('.submit');
//看結果按鈕
var result = document.querySelector('.btn');
//包覆替換結果鈕的div
var statusbtn = document.querySelector('.status');
var btnresult = document.querySelector('.btn-result');
//取出存在localStorage裡的資料並轉為陣列型別，如果瀏覽器裡沒存資料則跑空值
var data = JSON.parse(localStorage.getItem('bodylist')) || [];

var BMI ={
    "嚴重體重不足":{
        class: "result-gray",
        color: "gray"
    },
    
    "體重不足":{
        class:"result-yellow",
        color:"yellow"
    },
    "體重過輕":{
        class:"result-orange",
        color:"orange"
    },
    "體重正常":{
        class:"result-green",
        color:"green"
    },
    "體重過重":{
        class:"result-red",
        color:"red"
    },
    "超級肥胖":{
        class: "result-pink",
        color:"pink"
    },
}
//監聽
result.addEventListener('click',additem,false)
delbtn.addEventListener('click',delitem,false)
updatelist(data);
//新增資料至localstorage
function additem(){
    //將輸入的身高體重轉為數值
    var heightNum = parseInt(height.value);
    var weightNum = parseInt(weight.value);
    var BMI = (weightNum / (heightNum * heightNum)) * 10000;
    var BMIDOT = BMI.toFixed(2);//取到小數點第二位
    var date = new Date();//獲得當天日期
    var month = date.getMonth()+1;//取得月份
    var year = date.getFullYear();//取得年分
    var day = date.getDate();//取得日期
    var time = month+'-'+day+'-'+year;

    var state = "";
    var color = "";
    if(BMIDOT<=15){
        state = "嚴重體重不足";
        color = "gray";
    }else if(BMIDOT>15 && BMIDOT<=16){
        state = "體重不足";
        color = "yellow";
    }else if(BMIDOT>16 && BMIDOT<=18.5){
        state = "體重過輕";
        color = "orange";
    }else if(BMIDOT>18.5 && BMIDOT<=25){
        state = "體重正常";
        color = "green";
    }else if(BMIDOT>25 && BMIDOT<=30){
        state = "體重過重";
        color = "red";
    }else{
        state = "超級肥胖";
        color = "pink";
    }

    if(isNaN(heightNum) || isNaN(weightNum)){
        alert('請輸入資訊!')
        return;
    }

    var BMIlist = {
        BMI:BMI,
        BMIDOT: BMIDOT,
        height:heightNum,
        weight:weightNum,
        state:state,
        color:color,
        time:time
    };

    data.push(BMIlist);
    localStorage.setItem('bodylist',JSON.stringify(data));
    updatelist(data);
    refresh(BMIDOT,state);
    height.value = '';
    weight.value = '';
}

//更新畫面
function updatelist(data){
    var str = '';
    var len = data.length;
    for(var i = 0;i<len;i++){
        str += '<li class = "'+data[i].color+'">'+'<span data-num = "'+i+'">'+data[i].state+'</span>'+'<span>BMI'+'<em>'+data[i].BMIDOT+'</em>'+'</span>'+
        '<span>Height'+'<em>'+data[i].height+'</em>'+'CM'+'</span>'+
        '<span>Weight'+'<em>'+data[i].weight+'</em>'+'KG'+'</span>'+'<span>'+data[i].time+'</span>'+'</li>';
    }
   list.innerHTML = str;
}
//更新結果按鈕
   function refresh(BMIDOT,state){
    //寫好.hiden{display:none}
    //將替換按鈕刪除.hidebtn
    //原本查看結果按鈕新增.hidebtn
    statusbtn.classList.remove("hidebtn");
    submit.classList.add("hidebtn");
    btnresult.addEventListener('click',function(e){
        if(e.target.className === 'btn'){
            var finalnb = document.querySelector('.final-nb');
            var finalstate = document.querySelector('.final-state');
            btnresult.setAttribute("class",`${BMI[state].class}`);
            finalnb.textContent = `${BMIDOT}`;
            finalstate.textContent = `${state}`;
        //假如選取到的class名稱='refresh'就將替換按鈕新增class(.hidebtn)
        //原本查看結果按鈕刪除calss(.hidebtn)
        }else if(e.target.className === 'refresh-img'){
            statusbtn.classList.add("hidebtn");
            submit.classList.remove("hidebtn");
            height.value = '';
            weight.value = '';
        }
    },false);
   }
//刪除紀錄
function delitem(e){
    e.preventDefault();
    localStorage.clear();
    data=[];
    updatelist(data);
}