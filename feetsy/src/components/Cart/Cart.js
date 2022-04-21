import {Row, Col, Card, Input, Button, Select} from 'antd';
import 'antd/dist/antd.css';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";
import Navbar from '../Navbar/Navbar';
const Cart = () =>
{
    const data = [{  
    Name: 'Glass Photo Frame',  
    Price:"USD 10.99",
    Quantity:1,

    },{  
        Name: 'Mobile Phone',  
        Price: "USD 300",
        Quantity:1,
    
        }]  
     const columns = [{  
       Header: 'Name',  
       accessor: 'Name'  
       },
       {
       Header: 'Price',  
       accessor: 'Price'  
       },
       {
        Header: 'Quantity',  
        accessor: 'Quantity'  
        }
      ]  
      return (  
        <div>  
            <Navbar/>
            <ReactTable  
                data={data}  
                columns={columns}  
                defaultPageSize = {2}  
                pageSizeOptions = {[2,4, 6]}  
                style={{marginTop:"2%"}}
            />  
            <br/>
            <Button type="primary" size="large" onClick={(e)=>alert("Order placed your purchase ID is:0f0f9934-e055-454e-b83a-7ed8ed1d0c2e")}>Proceed to Checkout USD 310.99</Button>
        </div>        
    )  
    {/*return(
    <div>
        <h2><b>Cart Page</b></h2>
        <p>Items in the Cart:</p>
        <div>
        <p>Mobile Phone</p>
        <p>Price: USD 300</p>
        <p>Quantity: 1</p>
        </div>
        <div>
        <p>Glass Photo Frame</p>
        <p>Price: USD 10.99</p>
        <p>Quantity: 1</p>
        </div>
        <Button type="primary" size="large" onClick={(e)=>alert("Order placed your purchase ID is:0f0f9934-e055-454e-b83a-7ed8ed1d0c2e")}>Proceed to Checkout USD 310.99</Button>
    </div>


    )*/}
}

export default Cart;