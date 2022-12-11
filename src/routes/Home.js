import React, { Component } from "react";
import { Dashboard } from "../components/Dashboard";

import Page from "../components/Page";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Page>
                <Dashboard />
            </Page>
        );
    }
}

export default Home;
