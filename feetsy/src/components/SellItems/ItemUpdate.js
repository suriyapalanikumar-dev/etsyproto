import React, {Component, useState} from 'react';
import {Row, Col, Card, Input, Button, Select} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const { Option } = Select;
const ItemUpdate = () =>{
    return (
        <div>
            <h4><b>Update Item</b></h4>
            <label>Select Item to edit:</label>
            <Select defaultValue="Table Cloth" >
            <Option value="Glass Photo Frame">Glass Photo Frame</Option>
            </Select>
            <br/>
            <br/>
            <label>Edit Quantity Available</label>
            <Input size="large" placeholder="large size" placeholder="Enter quantity"/>
            <br/>
            <br/>
            <label>Edit Price</label>
            <Input size="large" placeholder="large size" placeholder="Enter Price"/>
            <br/>
            <br/>
            <Button type="primary" size="large" onClick={(e)=>alert("Updates made to the item")}>Update Details</Button>
        </div>
    )
}

export default ItemUpdate;