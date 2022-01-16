import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import styles from"./Main1.module.css";


function Main1() { //함수 선언식
    return (
        <div>
            <div className ={styles.title}>DOLLAE POS</div>
            
                     
            <div className = {styles.mainbutton}>
                
            <span className = {styles.button1}>
                <Button type="primary">
                <Link to='/itemList'>상품 목록 뷰</Link>
                </Button>
            </span>
           
            <span className = {styles.button2}>
                <Button type="primary" >
                <Link to='/profit'>수익 뷰</Link>
                </Button>
             </span>
         </div>    

        </div>
     );
 }
     // ex) Main1(); -> Main1 함수 실행
export default Main1; 