import React, { useEffect, useState } from 'react';
import { fetchDevices } from '../../service';
import {List, Card} from "antd"


const DeviceLib = () => {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetchDevices().then((devices) => {
            setData(devices);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{border:"1px solid #000", margin: "0 2px"}}>
          <h3>Devices</h3>
    <List className='gutter-list'
            grid={{ gutter: 8, column: 4 }}
            dataSource={data}
            renderItem={item => (
      <List.Item>
        <Card title={item.name}>{item.type}</Card>
      </List.Item>
    )}
  />
        </div>
    )
}

export default DeviceLib