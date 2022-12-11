// @ts-nocheck
import { modifyMeasure } from "@gooddata/sdk-model";
import { LineChart } from "@gooddata/sdk-ui-charts";
import { DateFilter, DateFilterHelpers } from "@gooddata/sdk-ui-filters";
import React, { useState } from "react";
import * as Md from "../md/full";

const dateFrom = new Date();
dateFrom.setMonth(dateFrom.getMonth() - 1);

const availableGranularities = ["GDC.time.date", "GDC.time.month", "GDC.time.quarter", "GDC.time.year"];

const Revenue = modifyMeasure(Md.Revenue, (m) => m.format("#,##0").alias("$ Revenue"));
const segment = Md.Product.Default;

const measures = [Revenue];

const defaultDateFilterOptions = {
    allTime: {
        localIdentifier: "ALL_TIME",
        type: "allTime",
        name: "All Time",
        visible: true,
    },

    absoluteForm: {
        localIdentifier: "ABSOLUTE_FORM",
        type: "absoluteForm",
        from: dateFrom.toISOString().substr(0, 10), // 'YYYY-MM-DD'
        to: new Date().toISOString().substr(0, 10), // 'YYYY-MM-DD'
        name: "Selected dates",
        visible: true,
    },

    absolutePreset: [
        {
            from: "2019-12-24",
            to: "2019-12-26",
            name: "Christmas 2019",
            localIdentifier: "christmas-2019",
            visible: true,
            type: "absolutePreset",
        },

        {
            from: "2018-01-01",
            to: "2018-12-31",
            name: "Year 2018",
            localIdentifier: "year-2018",
            visible: true,
            type: "absolutePreset",
        },
    ],

    relativeForm: {
        localIdentifier: "RELATIVE_FORM",
        type: "relativeForm",
        granularity: "GDC.time.month",
        from: undefined,
        to: undefined,
        name: "Selected Month",
        visible: true,
    },

    relativePreset: {
        "GDC.time.date": [
            {
                from: -6,
                to: 0,
                granularity: "GDC.time.date",
                localIdentifier: "LAST_7_DAYS",
                type: "relativePreset",
                visible: true,
                name: "Last 7 days",
            },

            {
                from: -29,
                to: 0,
                granularity: "GDC.time.date",
                localIdentifier: "LAST_30_DAYS",
                type: "relativePreset",
                visible: true,
                name: "Last 30 days",
            },

            {
                from: -89,
                to: 0,
                granularity: "GDC.time.date",
                localIdentifier: "LAST_90_DAYS",
                type: "relativePreset",
                visible: true,
                name: "Last 90 days",
            },
        ],

        "GDC.time.month": [
            {
                from: 0,
                to: 0,
                granularity: "GDC.time.month",
                localIdentifier: "THIS_MONTH",
                type: "relativePreset",
                visible: true,
                name: "This month",
            },

            {
                from: -1,
                to: -1,
                granularity: "GDC.time.month",
                localIdentifier: "LAST_MONTH",
                type: "relativePreset",
                visible: true,
                name: "Last month",
            },

            {
                from: -11,
                to: 0,
                granularity: "GDC.time.month",
                localIdentifier: "LAST_12_MONTHS",
                type: "relativePreset",
                visible: true,
                name: "Last 12 months",
            },
        ],

        "GDC.time.quarter": [
            {
                from: 0,
                to: 0,
                granularity: "GDC.time.quarter",
                localIdentifier: "THIS_QUARTER",
                type: "relativePreset",
                visible: true,
                name: "This quarter",
            },

            {
                from: -1,
                to: -1,
                granularity: "GDC.time.quarter",
                localIdentifier: "LAST_QUARTER",
                type: "relativePreset",
                visible: true,
                name: "Last quarter",
            },

            {
                from: -3,
                to: 0,
                granularity: "GDC.time.quarter",
                localIdentifier: "LAST_4_QUARTERS",
                type: "relativePreset",
                visible: true,
                name: "Last 4 quartes",
            },
        ],

        "GDC.time.year": [
            {
                from: 0,
                to: 0,
                granularity: "GDC.time.year",
                localIdentifier: "THIS_YEAR",
                type: "relativePreset",
                visible: true,
                name: "This year",
            },

            {
                from: -1,
                to: -1,
                granularity: "GDC.time.year",
                localIdentifier: "LAST_YEAR",
                type: "relativePreset",
                visible: true,
                name: "Last year",
            },
        ],
    },
};

export const Dashboard = () => {
    const [state, setState] = useState({
        selectedFilterOption: defaultDateFilterOptions.allTime,
        excludeCurrentPeriod: false,
    });

    const onApply = (selectedFilterOption, excludeCurrentPeriod) => {
        setState({
            selectedFilterOption,
            excludeCurrentPeriod,
        });
    };

    const dateFilter = DateFilterHelpers.mapOptionToAfm(
        state.selectedFilterOption,
        Md.DateDatasets.Date.ref,
        state.excludeCurrentPeriod,
    );

    return (
        <div id="test" className="py-3" style={{ paddingBottom: "1000000px" }}>
            <h1>My Dashboard - {state.selectedFilterOption.name}</h1>
            <div className="border border-3 border-dark" style={{ height: "100px" }}>
                <div className="text-end me-3 mt-1 fw-bold">Filter Bar</div>
                <div style={{ width: "200px" }}>
                    <DateFilter
                        excludeCurrentPeriod={state.excludeCurrentPeriod}
                        selectedFilterOption={state.selectedFilterOption}
                        filterOptions={defaultDateFilterOptions}
                        availableGranularities={availableGranularities}
                        customFilterName="Selected date range"
                        dateFilterMode="active"
                        dateFormat="MM/dd/yyyy"
                        onApply={onApply}
                    />
                </div>
                <div className="border border-start border-bottom border-3 border-dark mt-5">
                    <LineChart
                        className="s-line-chart"
                        measures={measures}
                        trendBy={Md.DateDatasets.Date.Month.Short}
                        segmentBy={segment}
                        filters={dateFilter ? [dateFilter] : []}
                    />
                </div>
            </div>
        </div>
    );
};
