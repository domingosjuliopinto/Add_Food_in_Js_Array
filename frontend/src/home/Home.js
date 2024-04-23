import './Home.css'

import { Button, Layout, Space } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';

function Home(){
    const handleLogout = async () => {
        try {
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/success";
        }
    }

    return(
        <div>
            <Layout>
                <Header style={{backgroundColor:'white'}}>
                    <Container fluid>
                        <Row>
                            <Col style={{textAlign:'right'}}>
                                <Button type="text">Home</Button>
                                <Button type="text" onClick={handleLogout}>Logout</Button>
                            </Col>
                            <Col xs={2} style={{textAlign:'center',borderLeft:"1px solid grey"}}>
                            <Space direction="vertical" size="1" style={{display: 'flex'}}>
                                <Title level={5}><b>Name</b></Title>
                                <Title level={5}>ID</Title>
                            </Space>
                            </Col>
                        </Row>
                    </Container>
                </Header>
                <Content style={{height:"91.5vh"}}>
                <div
                style={{
                    backgroundColor: "white",
                    minHeight: 280,
                    padding: 24,
                    margin:24,
                    borderRadius: 5,
                }}
                >
                Content
                </div>
                </Content>
            </Layout>
        </div>
    )
}

export default Home