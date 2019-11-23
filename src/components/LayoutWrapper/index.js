import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link} from "react-router-dom";
import {TOKEN_KEY, USER_TYPE, userType} from "../../constants/constants";
import {isLoggedIn} from "../../utils/utils";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const LayoutWrapper = (WrappedComponent) => {
    class LayoutWrapper extends React.Component {
        render() {
            const user_type = localStorage.getItem(USER_TYPE);
            const token = localStorage.getItem(TOKEN_KEY);
            return (
                <Layout style={{height: "-webkit-fill-available"}}>
                    <Header className="header">
                        <div className="logo">
                            <Link to="/">
                                LMS
                            </Link>
                        </div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{lineHeight: '64px', float: "right"}}
                        >
                            <Menu.Item key="1">
                                <Link to="/search">
                                    <Icon type="search"/>
                                    <span className="nav-text">Search</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/profile">
                                    <Icon type="user"/>
                                    <span className="nav-text">Profile</span>
                                </Link>
                            </Menu.Item>
                            {token ? <Menu.Item key="3">
                                    <Link to="/logout">
                                        <Icon type="logout"/>
                                        <span>Logout</span>
                                    </Link>
                                </Menu.Item> :
                                <Menu.Item key="3">
                                    <Link to="/login">
                                        <Icon type="login"/>
                                        <span>Login</span>
                                    </Link>
                                </Menu.Item>}
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{background: '#fff', height: 'auto'}}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['book']}
                                style={{height: '100%', borderRight: 0}}
                            >
                                <SubMenu
                                    key="book"
                                    title={
                                        <span>
                                            <Icon type="book"/>
                                            Book
                                        </span>
                                    }
                                >
                                    <Menu.Item key="1">
                                        <Link to="/add-book">
                                            <Icon type="user"/>
                                            <span className="nav-text">Add</span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to="/author">
                                            <Icon type="user"/>
                                            <span className="nav-text">Request</span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="3">
                                        <Link to="/author">
                                            <Icon type="user"/>
                                            <span className="nav-text">Issue</span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="4">
                                        <Link to="/author">
                                            <Icon type="user"/>
                                            <span className="nav-text">Return</span>
                                        </Link>
                                    </Menu.Item>
                                </SubMenu>
                                {/*{isLoggedIn(userType.LIBRARIAN) &&*/}
                                <Menu.Item key="2">
                                    <Link to="/author">
                                        <Icon type="user"/>
                                        <span className="nav-text">Authors</span>
                                    </Link>
                                </Menu.Item>
                                {/*}*/}
                                <Menu.Item key="3">
                                    <Link to="/student">
                                        <Icon type="database"/>
                                        <span className="nav-text">Students</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/librarian">
                                        <Icon type="user"/>
                                        <span className="nav-text">Librarians</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Link to="/admin">
                                        <Icon type="user"/>
                                        <span className="nav-text">Admins</span>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content className="content" style={{margin: '24px 16px 0', overflow: 'initial'}}>
                                <WrappedComponent {...this.props}/>
                            </Content>
                            <Footer className="footer">
                                Baylor University ©2018 Created by Software Engineering
                            </Footer>
                        </Layout>
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