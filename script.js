var count=0;   // to count no of question
var data={};    // to store the data
var ans="";     // to store the current answer
var pos=0;      // to store count of no of positive answers
var neg=0;      // to store count of no of negative answers
var flag=0;     // flag=1 do not perform any action because we have reached the end
var mark=[];    // to store the mark answer 
var tempmark=[];    // to store the above same
var x=0;            // timer 
var clockflag=0;    // clock flag=1 stop the timer

// start main function 
function start(){
    // data fetching 
    fetch("quiz.json").then((response)=>{
        return response.json();
    }).then((response)=>{
        data=response;
        var x=new Array(data.length).fill("@");
        tempmark=x;
        var y=new Array(data.length).fill("*");
        mark=y;
    });

     setTimeout(()=>{
        document.getElementById("next").innerText="Save";
        document.getElementById("prev").innerText="Previous";
        document.getElementById("clock").innerText=`Time :${x}`;
        document.getElementById("info").style.display="none";
        document.getElementById("optiondisplay").innerText="Option";
        document.getElementById("optionsubmit").innerText="Submit";

        document.getElementById("outside1").setAttribute("style","border: 2px solid rgb(71, 124, 76);border-radius: 10px;");
        document.getElementById("outside2").setAttribute("style","border: 2px solid rgb(71, 124, 76);border-radius: 10px;");
        document.getElementById("optiondisplay").setAttribute("style","background-color: #8bd4d8;border: 2px solid #75cb92;");
        document.getElementById("optionsubmit").setAttribute("style","background-color: #8bd4d8;border: 2px solid #75cb92;");

        document.getElementById("ques").setAttribute("style","padding: 10px;background-color:rosybrown ;");
        document.getElementById("first").setAttribute("style","padding: 10px;");
        document.getElementById("second").setAttribute("style","padding: 10px;");
        document.getElementById("third").setAttribute("style","padding: 10px;");
        document.getElementById("fourth").setAttribute("style","padding: 10px;");

        document.getElementById("clock").setAttribute("style","padding: 10px;");
        document.getElementById("prev").setAttribute("style","padding: 10px;");
        document.getElementById("next").setAttribute("style","padding: 10px;");

        let optionwindow=document.getElementById("optionnumber");
        let optionhtml=``;
        for(var i=0;i<data.length;i++){
            optionhtml=`<div class="mydiv"> ${data[i].id}</div>`;
            optionwindow.insertAdjacentHTML("beforeend",optionhtml);
        }
        clocking();
        optionclick();
        answerclicking();
        previousbutton();
        nextbutton();
        display();
        },21000);
}


// clock dispaly
function clocking() {
    const timer = setInterval(function () {
        x++;
        document.getElementById("clock").innerText=`Time :${x}`;
        if (clockflag) {
          clearInterval(timer);
        }
      }, 1000); // Update every second
}

// to display the data from json response
function display(){
    if(count<data.length && flag===0)
        displaydata();
    else
    {
            // nothing will happen
        
    }
}

// displaying the data
function displaydata(){
    changecolor();
    document.getElementById("ques").innerText=data[count].id+"  "+data[count].question;
    document.getElementById("first").innerText=data[count].one;
    document.getElementById("second").innerText=data[count].two;
    document.getElementById("third").innerText=data[count].three;
    document.getElementById("fourth").innerText=data[count].four;

    // if already mark the answer then display it directly with the mark option 
    if(tempmark[count]!=""){
        ans=tempmark[count];
        const temp3=document.querySelectorAll(".opt");
        temp3.forEach((x) => {
        if(x.innerText==ans)
            x.style.backgroundColor="#90EE90";
    });
    }
}

function displaylastpart()
{
    flag=1;
    clockflag=1;
    document.getElementsByClassName("flex-container1")[0].style.display="none";
    document.getElementById("prev").style.display="none";
    document.getElementById("clock").style.display="none";
    document.getElementById("outside2").style.display="none";
    document.getElementById("next").innerText="RESULT";
    for(var i=0;i<data.length;i++){
        if(mark[i]!=data[i].answer)
        neg++;
        else
        pos++;
    }     
    setTimeout(() => {
        scoreboard()
    },3000);
}

// for maintaining hover part 
function changecolor()
{
    const temp=document.querySelectorAll(".opt");
    temp.forEach((x)=>{
        x.style.backgroundColor="#f1f1f1";
    });
}

// for calculating total score and displaying result in same main window
function scoreboard() {
    changecolor();
    let mainWindow = document.getElementsByClassName("mainoutside")[0];
        html_score=`<div id="pos" >Corrected Answer : ${pos}</div><br>`;
        html_score+=`<div id="neg">Wronged Answer : ${neg}</div><br>`;
        html_score+=`<div id="clk">Total Time : ${x+" s"}</div><br>`;

        table_html_string = `<tr><th>${"question"}</th><th>${"marked answer"}</th><th>${"correct answer"}</th></tr>`;
        for(var i=0; i<data.length;i++)
        {
            const row = document.createElement("tr");
            if(mark[i]!=data[i].answer)
            {
                neg++;
                table_html_string += `<tr><td style="background-color:#F5F5DC;">${data[i].question}</td><td style="background-color:#FF7F7F;">${mark[i]}</td><td style="background-color:#59E659;">${data[i].answer}</td></tr>`;
            }
            else
            {
                pos++;
                table_html_string += `<tr><td style="background-color:#F5F5DC;">${data[i].question}</td><td>${mark[i]}</td><td>${data[i].answer}</td></tr>`;
            }
            
        }
        table_html_string  = `<table id="customers">` + table_html_string + `</table>`;
        mainWindow.innerHTML = html_score+table_html_string; 
}

// for storing the marked answer by user + clicking green 
function answerclicking(){
    const temp2=document.querySelectorAll(".opt");
temp2.forEach((x)=>{
    x.addEventListener("click",()=>{
        changecolor();
        x.style.backgroundColor="green";
        if(x.id=="first"){
            ans=data[count].one;
        }
        else if(x.id=="second"){
            ans=data[count].two;
        }
        else if(x.id=="third"){
            ans=data[count].three;
        }
        else if(x.id=="fourth"){
            ans=data[count].four;
        }
    }); 
});
}

function optionclick(){
    const temp3=document.querySelectorAll(".mydiv");
    temp3.forEach((div,index)=>{
        const newdiv=`div_${index}`;
        div.setAttribute("id","newdiv");
        div.addEventListener("click",()=>{
            var y=div.innerText;
            count=y-1;
            display();
        });
    })
}


// evaluate when user click on next button
function nextbutton(){

    document.getElementById("next").addEventListener("click",()=>{ 
        if(flag===0)
        {
            var y=count+1;
            const temp3=document.querySelectorAll(".mydiv");
            temp3.forEach((div,index)=>{

                if(div.innerText==y) {
                    div.style.backgroundColor="green";
                }
                else
                console.log(div.innerText)
                   
                });
          
            tempmark[count]=ans;
            mark[count]=ans;
            ans="";
            count++;
            display();
        }
    });

}


// to display already answeres option for a question 
function previousanswer(){
    const temp3=document.querySelectorAll(".opt");
    temp3.forEach((x) => {
        if(x.innerText==mark[count])
            x.style.backgroundColor="green";
    });
    // mark.pop();
    mark[count]="*";
}
// previous button
function previousbutton(){
    document.getElementById("prev").addEventListener("click",()=>{ 
        if(flag==0)
        {
            if (count === 0) {
                display();
              } else if (count > 0) {
                count--;
                display();
              }
              previousanswer();
        }
    });
}


// JavaScript to create a countdown for 10 seconds

var countdownElement = document.getElementById("countdown");
var remainingSeconds = 20;

function updateCountdown() {
    countdownElement.textContent = remainingSeconds;
    remainingSeconds--;

    if (remainingSeconds < 0) {
        clearInterval(countdownInterval);
    }
}
var countdownInterval = setInterval(updateCountdown, 1000);




document.getElementById("optionsubmit").addEventListener("click",()=>{
    // console.log("== lenght ==" + data.length);
    count=data.length;
    flag=1;
    clockflag=1;
    document.getElementsByClassName("flex-container1")[0].style.display="none";
    document.getElementById("prev").style.display="none";
    document.getElementById("clock").style.display="none";
    document.getElementById("outside2").style.display="none";
    document.getElementById("next").innerText="RESULT";
    for(var i=0;i<data.length;i++){
        // console.log(i);
        // console.log(data[i]);
        if(mark[i]!=data[i].answer)
            neg++;
        else
            pos++;
        console.log(mark);
    }     
    setTimeout(() => {
        scoreboard()
    },3000);
});
// starting the code --> using the concept of clouser
start();


