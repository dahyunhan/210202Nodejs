const express = require("express"); 
const app = express();
const { PgConn } = require("./pgUtils");
const { config } = require("./config");



const port = config.server.port || 5000 ;
const pgConn = new PgConn(config.db);  

app.get("/itemList",  async (req, res) => {
  let itemlist = await pgConn.query("SELECT * FROM itemlist");
  

  res.json({ itemlist });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 

//포트번호 기다리는 중
//함수 표현식
// config.server.port -> 5000 , config.db -> 5432
//url /itemList 가면 PgConn.query실행하고  
//불러온 itemlist데이터를 json 형식 저장?