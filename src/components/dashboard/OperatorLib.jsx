import React, { useEffect, useState } from 'react';
import { fetchOperators } from '../../service';
import {List, Card, Checkbox} from "antd"


const OperatorLib = (props) => {
    const [data, setData] = useState([]);
    const { setSelectedOps } = props;

    const fetchData = () => {
        fetchOperators().then((operators) => {
            setData(operators);
        });
    };

    const handleCheckboxChange = (checkedValues) => {
        setSelectedOps(checkedValues);
        // console.log(checkedValues);
      };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{border:"1px solid #000", margin: "0 2px"}}>
            <h3>Operators</h3>
    {/* <List className='gutter-list'
            grid={{ gutter: 8, column: 3 }}
            dataSource={data}
            renderItem={item => (
      <List.Item>
        <Card style={{borderRadius:"50%"}}>{item.name}</Card>
      </List.Item> */}
    {/* )}
  /> */}
  <Checkbox.Group options={data.map((item) =>({ label: item.name, value: item.name }))} onChange={handleCheckboxChange}/>
        </div>
    )
}

export default OperatorLib