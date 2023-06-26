/**
 * Created by hao.cheng on 2017/4/16.
 */
import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Table, Button, Row, Col, Card, Badge, Dropdown, Space } from 'antd';
import { fetchDevices } from '../../service';
import BreadcrumbCustom from '../widget/BreadcrumbCustom';
import S from '../ui/Modals';

const items = [
    {
        key: '1',
        label: 'Action 1',
    },
    {
        key: '2',
        label: 'Action 2',
    },
];

const columns = [
    // {
    //     title: '新闻标题',
    //     dataIndex: 'title',
    //     width: 100,
    //     render: (text: any, record: any) => (
    //         <a href={record.url} target="_blank" rel="noopener noreferrer">
    //             {text}
    //         </a>
    //     ),
    // },
    {
        title: 'name',
        dataIndex: 'name',
        width: 80,
        key: 'name',
    },
    {
        title: 'ip',
        dataIndex: 'ip',
        width: 80,
        key: 'ip',
    },
    {
        title: 'arch',
        dataIndex: 'arch',
        width: 80,
        key: 'arch',
    },
    {
        title: 'OS',
        dataIndex: 'os',
        width: 80,
        key: 'os',
    },
    {
        title: 'CPU',
        dataIndex: 'CPU',
        width: 80,
        key: 'cpu',
    },
    {
        title: 'Memory',
        dataIndex: 'Memory',
        width: 80,
        key: 'mem',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        width: 80,
        key: 'loc',
    },
];

const Nodes = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true);
        fetchDevices().then((devices: any) => {
            setData(devices);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // expanded columns
    const expandedRowRender = (record: any) => {
        let labels = record.labels;
        const columns = [
            {
                title: 'label-key',
                dataIndex: 'labelkey',
                key: 'labelkey',
            },
            {
                title: 'label-value',
                dataIndex: 'labelvalue',
                key: 'labelvalue',
            },
        ];

        const data = [];

        for (let key in labels) {
            if (labels.hasOwnProperty(key)) {
                const value = labels[key];
                data.push({
                    key: key,
                    labelkey: key,
                    labelvalue: value,
                });
            }
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    return (
        <div className="gutter-example">
            <BreadcrumbCustom breads={['table', 'node-table']} />
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Card title="Node List in Cluster" bordered={false}>
                            <div style={{ marginBottom: 16 }}>
                                <Button
                                    type="primary"
                                    onClick={fetchData}
                                    disabled={loading}
                                    loading={loading}
                                >
                                    Reload
                                </Button>
                            </div>
                            <Table
                                expandable={{
                                    expandedRowRender: (record) => expandedRowRender(record),
                                    defaultExpandedRowKeys: ['0'],
                                }}
                                columns={columns}
                                dataSource={data}
                            />
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Nodes;
