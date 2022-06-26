import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../testEnv";

function Profit() {
  let [profit, setState] = useState("");

  let getProfit = async () => {
    let result = await axios.get(`${baseUrl}/profit`);

    setState(result.data.profit);
  };

  return (
    <div>
      <h3>수익</h3>
      <div>{`${profit}원 수익이 발생했습니다.`}</div>
      <Button type="default" onClick={getProfit}>
        수익 가져오기
      </Button>
    </div>
  );
}

export default Profit;
