import React, {Fragment} from "react";

import LayoutWrapper from "../LayoutWrapper";
import {Icon, Result} from "antd";

export function Home() {
    const message = (
        <Fragment>
            <div style={{fontSize: "40px", color: "#1890ff"}}>Need a book?</div>
            <div style={{fontSize: "30px", color: "#ff7a45"}}>Just search for the book and request it.</div>
        </Fragment>
    );
    return (
        <div className="body-content">
            <Result
                icon={<Icon type="smile" theme="twoTone"/>}
                title={message}
            />


        </div>
    )
}

const WrappedHome = LayoutWrapper(Home);
export default WrappedHome;