import React from 'react';
import {Result, Button} from 'antd';
import {Link} from "react-router-dom";

const SuccessPage = props => (
    <Result
        status="success"
        title="Successfully Registered."
        subTitle="An student account has been successfully created."
        extra={[
            <Link key="1" to="/login">
                <Button type="primary" key="login">
                    Go Login
                </Button>
            </Link>
        ]}
    />
);
export default SuccessPage;