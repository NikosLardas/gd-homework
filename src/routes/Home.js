import React, { Component } from "react";
import FilterBar from "../components/FilterBar";

import Page from "../components/Page";
import { Test } from "../components/Test";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Page>
                <div className="w-75" style={{ margin: "auto" }}>
                    <h1>My Dashboard - </h1>
                    <FilterBar />
                </div>
            </Page>
        );
    }
}

export default Home;
