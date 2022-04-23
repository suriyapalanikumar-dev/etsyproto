import React, {Component, useState, useEffect} from 'react';
import {Row, Col, Card, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../../features/userSlice';
import { authenticateUser, login, logout, shopSelect } from '../../features/userSlice';
import {
    HeartOutlined,
    HeartFilled,
    EditOutlined
  } from '@ant-design/icons';

const {Search} = Input;
const Fav = () =>{
    const dispatch = useDispatch();
    const loguser = useSelector(authenticateUser)
    const [itemsall, setItemsAll] = useState([])
    
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER + "/getFavorite",{headers: {"Authorization" : `Bearer ${loguser.token}`} })
        .then(response => {
          console.log(response)
          if(typeof response.data=="string")
          {
            alert("String Check")
          }
          else{
            alert("Object Check")
            console.log(response.data)
            //setItemsAll(response.data)
          }
        })
        .catch(function (err) {
          alert(err)
          console.log(err)
        })
        
    }, []);
    return (
        <div>
        <Navbar/>
        <div  style={{marginTop:"2%"}}>
        <h2><b>Hi {loguser.username}. Your Favorites!</b></h2>
        <br/><br/>
        <Search placeholder="search.."  style={{ width: 200 }} />
        <div style={{ marginTop: "2%", width: "100%", height: "50%", float: "left", paddingLeft:"2px" }}>
          {/* <h2><b> Collection Preview</b></h2> */}

          <Row>
            {/* {itemsall.map((element) => <Col span={6} style={{paddingLeft:"2%"}}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" }}
                cover={<img alt="example" src={process.env.REACT_APP_SERVER+"/image/"+element.itemphoto} />}
                
              >
                <div>
                  <Row>
                    <Col span={21}>
                      <p align="center" style={{fontSize:"15px"}}><b>{element.itemname}</b></p>
                
                      <p style={{ visibility: "hidden" }}>{element._id}</p>

                    </Col>
                    <Col span={3}>
                      {
                        <HeartFilled  />
                      }
                    </Col>
                  </Row>
                </div>
                <p><b><span>{loguser.dollar}</span><span> {element.price} </span></b></p>
              </Card>
            </Col>)} */}
          </Row>
          </div>
        </div>
        </div>
        
    )
}

export default Fav;