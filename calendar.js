window.onload = function(){
  let toady,tyear,tmonth,tdate,tday,firstDay,DateNumber,rowNumber;
  let ymYear = document.getElementsByClassName("year")[0];
  let ymMonth = document.getElementsByClassName("month")[0];
  let date = document.getElementsByClassName("date")[0];
  let prev = document.getElementsByClassName("icon-arrowr")[0];
  let next = document.getElementsByClassName("icon-arrowl")[0];
  //初始化年月
  function initialYM(){
    today = new Date();
    tyear = today.getFullYear();
    //月份加一，取值为0-11
    tmonth = today.getMonth()+1;
    tdate = today.getDate();
    //星期取值0-6，0对应星期天
    tday = today.getDay();
  }
  initialYM();
  function judgeDate(tyear,tmonth){
    ymYear.innerText = tyear;
    ymMonth.innerText = tmonth;
    //每月第一天为星期几
    firstDay = new Date(tyear,tmonth-1).getDay();
    //判断该年是否为闰年,得到二月天数,根据月数得到该月天数
    if([1,3,5,7,8,10,12].indexOf(tmonth) !== -1){
      DateNumber = 31;
    }else if([4,6,9,11].indexOf(tmonth) !== -1){
      DateNumber = 30;
    }else{
      if((tyear%4 == 0 && tyear%100 != 0) || tyear%400 == 0){
        //闰年
        DateNumber = 29;
      }else{
        DateNumber = 28;
      }
    }
  }
  //动态增删节点，判断有多少行
  function initialDate(tyear,tmonth){
    //判断每月天数
    judgeDate(tyear,tmonth);
    //判断行数
    if(DateNumber == 28 && firstDay == 0){
      rowNumber = 4;
    }else if((DateNumber ==28 && firstDay != 0) || (DateNumber == 29) || (DateNumber == 30 && firstDay !=6) || (DateNumber == 31 && ![5,6].includes(firstDay))){
      rowNumber = 5;
    }else if((DateNumber == 30 && firstDay == 6) ||(DateNumber == 31 && (firstDay == 5 ||6))){
      rowNumber = 6;
    }
      let div = document.createElement("div");
      let span = document.createElement("span");
      let spans = new Array(7);
      for(let j = 0;j<7;j++){
            spans[j] = span.cloneNode(true)
            div.appendChild(spans[j]);
      }
      let divnum = date.getElementsByTagName("div");
      while(divnum.length < rowNumber){
        date.appendChild(div.cloneNode(true));
      }
      while(divnum.length > rowNumber){
        date.removeChild(date.lastChild);
      }
      let spanTag = date.getElementsByTagName("span");
      for(let i=0;i<7*rowNumber;i++){
        if(i>=firstDay && i<firstDay+DateNumber){
          spanTag[i].innerText = i-firstDay+1;
        }else{
          spanTag[i].innerText = " ";
        }
      }
  }
  initialDate(tyear,tmonth);
  function changeNext(){
    if(tmonth<12){
      tmonth += 1
    }else if(tmonth == 12){
      tyear += 1;
      tmonth = 1;
    }
    initialDate(tyear,tmonth);
  }
  function changePrev(){
    if(tmonth>1){
      tmonth -= 1;
    }else if(tmonth == 1){
      tyear -= 1;
      tmonth = 12;
    }
    initialDate(tyear,tmonth);
  }
  prev.addEventListener("click",changePrev);
  next.addEventListener("click",changeNext);
}