/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  optionPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  optionsBiPolar,
  dataBiPolar
} from "variables/Variables.jsx";

import axios from 'axios';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      dataCoughDaily: {
        labels: [
          "6AM",
          "8AM",
          "10AM",
          "12PM",
          "2PM",
          "4PM",
          "6PM",
          "8AM",
          "10AM",
          "12PM"
        ],
        series: [
          [1, 2, 0, 4, 9, 3, 2, 5, 3, 7]
        ]
      },
      optionCoughDaily: {
        low: 0,
        high: 15,
        showArea: false,
        height: "245px",
        axisX: {
          showGrid: false
        },
        lineSmooth: true,
        showLine: true,
        showPoint: true,
        fullWidth: true,
        chartPadding: {
          right: 50
        }
      },
      dataCoughWeekly: {
        labels: [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ],
        series: [
          [9, 16, 15, 26, 33, 40, 55],
          // [412, 243, 280, 580, 453, 353, 300]
        ]
      },
      optionsCoughWeekly: {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: "245px"
      },
      dataAirWeekly : {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        series: [
          [1, 2, 3, 1, -2, 0, 1, 0],
          [-2, -1, -2, -1, -2.5, -1, -2, -1],
          [0, 0, 0, 1, 2, 2.5, 2, 1],
          //[2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5],
        ]
      },
      optionsAirWeekly : {
        high: 3,
        low: -3,
        showArea: true,
        showLine: false,
        showPoint: false,
        fullWidth: true,
        axisX: {
          showLabel: false,
          showGrid: false
        }
      }
    }
  }

  componentDidMount() {
    //axios.get('https://jsonplaceholder.typicode.com/todos/1')
    axios.get('http://localhost:8080/Cough-Backend/air')
    .then(response => {
      console.log(response);
    });
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>

            {/* Cough Today */}
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Cough Today"
                category=""
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.dataCoughDaily}
                      type="Line"
                      //options={optionsSales}
                      options={this.state.optionCoughDaily}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                //legend={
                //  <div className="legend">{this.createLegend(legendSales)}</div>
                //}
              />
            </Col>
            
            {/* Air Pollution */}
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Air Quality Today"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" options={optionPie} />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>
          
          {/* Weekly Cough Trend */}
          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="Weekly Cough"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.dataCoughWeekly}
                      type="Line"
                      //type="Bar"
                      options={this.state.optionsCoughWeekly}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                //legend={
                  //<div className="legend">{this.createLegend(legendBar)}</div>
                //}
              />
            </Col>

            {/* Weekly Air Pollution Trend */}

            <Col md={6}>
              <Card
                  id="chartActivity"
                  title="Weekly Air Quality"
                  category="All products including Taxes"
                  stats="Data information certified"
                  statsIcon="fa fa-check"
                  content={
                    <div className="ct-chart">
                      <ChartistGraph
                        data={this.state.dataAirWeekly}
                        //type="Bar"
                        type="Line"
                        options={this.state.optionsAirWeekly}
                        responsiveOptions={responsiveBar}
                      />
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(legendBar)}</div>
                  }
                />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
