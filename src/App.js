
import { Route, Switch } from "react-router-dom"; //-> 라우팅 위함
import React from "react"; //create-react-app -> 웹 빌드 위함
import Main1 from "./home/Main1";
import ItemList from "./itemList/ItemList";
import Profit from "./profit/Profit";
import change from "./itemList/change";


function App() {
  

  return (
    <div>
      

          
      <Route exact path="/" component={Main1} /> 
    
      <Route path="/itemList" component={ItemList} />
      <Route path="/profit" component={Profit} />
      <Route path="/change" component={change} />
      
      
     
    </div>

   
  );
}
export default App; 
  //change -> itemList 
  //스위치는 래핑 안에 여러 주소들 중 정확한 주소만 실행
  //exact는 일치하는 주소만 실행
   //:id 사용하면 url이 달라도 같은 페이지로 연결? //parms랑 세트 //id 는 파라미터 바뀔 수 있는 값
  //usehistory 사용 가능