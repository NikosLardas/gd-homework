// @ts-nocheck
import React from "react";
import { LoadingComponent, useExecutionDataView } from "@gooddata/sdk-ui";
import * as Md from "../md/full";

export const Calculator = () => {
    const revenue = Md.Revenue;
    const seriesBy = [revenue];
    const { result, error, status } = useExecutionDataView({ execution: { seriesBy } });

    const revenueSeries = result?.data().series().firstForMeasure(revenue);

    return (
        <div className="px-5 mt-3">
            {status === "error" ? (
                <div>
                    <div className="gd-message error">
                        <div className="gd-message-text">Oops, there was an error? Try again!</div>
                    </div>
                </div>
            ) : null}
            {status === "loading" ? (
                <div>
                    <div className="gd-message progress" style={{ height: "40px" }}>
                        <div className="gd-message-text">Loading…</div>
                    </div>
                    <LoadingComponent />
                </div>
            ) : null}
            {status === "success" ? (
                <div style={{ height: "400px" }}>
                    <style jsx>
                        {`
                            .kpi {
                                height: 60px;
                                margin: 10px 0;
                                font-size: 50px;
                                line-height: 60px;
                                white-space: nowrap;
                                vertical-align: bottom;
                                font-weight: 700;
                            }
                        `}
                    </style>

                    <p className="kpi s-execute-kpi mt-4">{revenueSeries.dataPoints()[0].formattedValue()}</p>

                    <select className="form-select" style={{ marginTop: "200px" }}>
                        <option selected value="Max Revenue">
                            Max Revenue Across Products
                        </option>
                        <option value="Min Revenue">Min Revenue Across Products</option>
                    </select>
                </div>
            ) : null}
        </div>
    );
};
