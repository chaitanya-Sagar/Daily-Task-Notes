var app = angular.module("dtr", []);

app.controller("main", function ($scope, $http, $compile, $rootScope, $window, $timeout, $parse) {
var  today = new Date();
month = today.getMonth() + 1
$scope.task = [];
//$scope.updateTime = new Date();

$scope.init = function(){
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if(isChrome){

}else{

    //alert('Please Open File in Chrome only for webStorage')
    $('body').html('<h5>:-( Please open file in Chrome browser </h5>')
    return false
}
    if(localStorage.task){

       var dataa =  localStorage.getItem("task");

     let lastTime = parseInt(localStorage.getItem("updateTime"));
       
      // lastTime = 1572822792000 //11pm 6 nov

   let dd = new Date(lastTime).setHours(0,0,0,0)
   let ee = today.setHours(0,0,0,0)
       
       let daysDiff =  0;

        daysDiff =  (ee - dd) /86400000;

       console.log('Last Saved '+ daysDiff+'Days ago')
       
       $scope.task = dataa;
       $scope.task = angular.fromJson($scope.task)



if(daysDiff > 0 && daysDiff < 40){

           for(let i = 0; i < daysDiff ; i++){
           
            $scope.task.pop()

            let datee = new Date() - i*(1000*3600*24)

            let obj = {
                "day":datee,
                "project":"",
                "hrs":9,
                "progress":false,
                "task":""
            }
        
            $scope.task.unshift(obj)
        
           }
        }
    }else{
        for(let i=0;i<40;i++){

            let datee = new Date() - i*(1000*3600*24)

            let obj = {
                "day":datee,
                "project":"",
                "hrs":9,
                "progress":false,
                "task":""
            }
        
            $scope.task.push(obj)
        
        }

    }
}
$scope.init()
$scope.copy = function(id) {
    let idd = JSON.stringify(id)
    let textarea = document.getElementById(idd);
    textarea.select();
    document.execCommand("copy");
  }

$scope.update = function(){

    if(localStorage.task){
        localStorage.removeItem("task");
        localStorage.removeItem("updateTime");
    }

let strgii = JSON.stringify($scope.task),

time = new Date()//.format('dd/mm/yyyy');


    localStorage.setItem("task",strgii );
    localStorage.setItem("updateTime", JSON.stringify(time.getTime()));

    alert('Updated all records')
}
$scope.exportToCsv = function(Results) {


    let fileName = 'TimeSheet_'+today.getDate()+'_'+ (today.getMonth()+1)+'_'+today.getFullYear()+'.csv'
    
        var CsvString = "";
        CsvString = 'Date , Hours, Project, Progress , Task ,';
        CsvString += "\r\n";

        Results.forEach(function(RowItem, RowIndex) {
         // RowItem.forEach(function(ColItem, ColIndex) {
          //   console.log(RowItem)
             let date = new Date(RowItem.day), prg = 'In Progress';

             let day = date.getDate(), mon = date.getMonth() + 1, yy = date.getFullYear()

             if(RowItem.progress){
                  prg = 'Completed'
                }
            CsvString += day+' / '+mon+' / '+ yy+','+ RowItem.hrs+','+ RowItem.project+','+prg+','+RowItem.task+',';
         // });
          CsvString += "\r\n";
          console.log(CsvString)
        });
        CsvString = "data:application/csv," + encodeURIComponent(CsvString);
        var x = document.createElement("A");
        x.setAttribute("href", CsvString );
        x.setAttribute("download",fileName);
        document.body.appendChild(x);
        x.click();
      }

     // $scope.exportToCsv($scope.task)
    //   $scope.exportToCsv([['test',124],['test',124],['test',124]])
})//controler end