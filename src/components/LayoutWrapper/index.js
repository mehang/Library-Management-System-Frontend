import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link} from "react-router-dom";

const {Header, Content, Footer, Sider} = Layout;

const LayoutWrapper = (WrappedComponent) => {
    class LayoutWrapper extends React.Component {
        render() {
            return (
                <Layout>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}
                    >
                        <div className="logo slider-header">LMS</div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                            <Menu.Item key="1">
                                <Link to="/">
                                    <Icon type="home"/>
                                    <span className="nav-text">Home</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/author">
                                    <Icon type="user"/>
                                    <span className="nav-text">Author</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/book">
                                    <Icon type="book"/>
                                    <span className="nav-text">Book</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{marginLeft: 200}}>
                        <Header className="header" style={{background: '#fff', padding: 0}}>
                            <span>Demonstration of React app</span>
                        </Header>
                        <Content className="content" style={{margin: '24px 16px 0', overflow: 'initial'}}>
                            <WrappedComponent {...this.props}/>
                        </Content>
                        <Footer className="footer" style={{textAlign: 'center'}}>Baylor University ©2018 Created by
                            Software Engineering</Footer>
                    </Layout>
                </Layout>
            );
        }
    }

    //Display name with the wrapped component for ease in debugging using react debugger tools
    LayoutWrapper.displayName = `LayoutWrapper(${getDisplayName(WrappedComponent)})`;
    return LayoutWrapper;
};

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default LayoutWrapper;