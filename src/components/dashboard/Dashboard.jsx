/**
 * Created by hao.cheng on 2017/5/3.
 */
import React, {useState, useEffect} from 'react';
import ReactJson from 'react-json-view'
import { Row, Col, Card, Timeline, Button, Modal, List  } from 'antd';
import BreadcrumbCustom from '../widget/BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import b1 from '../../style/imgs/b1.jpg';
import DeviceLib from './DeviceLib';
import OperatorLib from './OperatorLib';
import EchartsForce from '../charts/EchartsForce';
import { fetchDeploymentPlan, fetchResults, getAndstartDeployment } from '../../service';
import {
    CameraOutlined,
    CloudOutlined,
    HeartOutlined,
    MailOutlined,
    SyncOutlined,
} from '@ant-design/icons';

const Dashboard = () => {
    const [plan, setPlan] = useState([])
    const [graph, setGraph] = useState({})
    const [selectedOps, setSelectedOps] = useState([])
    const [result, setResult] = useState([])
    const onDeployButtonClicked = () => {
        console.log(selectedOps);
        fetchDeploymentPlan(selectedOps).then((data) => {
            setPlan(data);
        })
        showModal()
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const getResult = ()=> {
        fetchResults().then((data) => {
            setResult(data)
        });
    }

    useEffect(() => {
        getResult()
        getAndstartDeployment({}).then(res => {
            setGraph(res);
        })
    }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    let params = {
        data: plan
    }
    getAndstartDeployment(params).then(res => {
        // loading
        setGraph(res);
        setIsModalOpen(false);
    })
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <Row gutter={12}>
                    <Col className="gutter-row" md={12}>
                        <Card bordered={false}>
                        <div className='gutter-box' style={{display:"flex"}}>
                            <DeviceLib />
                            <OperatorLib setSelectedOps={setSelectedOps}/>
                        </div>
                        <Button onClick={onDeployButtonClicked}>Create Deployment Plan</Button>
                        <Modal onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}>
                            <p>Deployment plan generated. Confirm to proceed.</p>
                            <ReactJson src={plan} />
                        </Modal>
                        </Card>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                {/* <EchartsProjects /> */}
                                <EchartsForce graph={graph}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col className="gutter-row" md={24}>
                        <div className='gutter-box'>
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>Results</h3>
                                </div>
                                <span className="card-tool">
                                    <SyncOutlined onClick={getResult}/>
                                </span>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={result}
                                    renderItem={item => (
                                    <List.Item style={{display:"block"}}>
                                        <List.Item.Meta
                                        title={<a href="https://ant.design">{item['link']}</a>}
                                        />
                                     
                                            <ReactJson src={item['value']} />
 
                                    </List.Item>
                                    )}
                                />
                            </Card>
                            </div>
                    </Col>
                </Row>
            </div>
        );
    }

export default Dashboard;
