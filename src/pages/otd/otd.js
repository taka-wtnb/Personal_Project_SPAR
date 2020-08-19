import React from 'react';

import {
  Row,
  Col,
} from 'reactstrap';

import SupplierSelection from '../../components/SupplierSelection/SupplierSelection';
import DashboardOTDChart from '../../components/Charts/DashboardOTDChart/DashboardOTDChart';
import OTDPieChart from '../../components/Charts/OTDPieChart/OTDPieChart'
import Widget from '../../components/Widget/Widget';

//import s from './Charts.module.scss';
import s from './otd.module.scss';
import {chartData, liveChart, liveChartInterval} from './mock';

import ReactEchartsCore from 'echarts-for-react/lib/core';

import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/themeRiver';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

exporting(Highcharts);
exportData(Highcharts);

class OTD extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cd: chartData,
      ld: liveChart,
      initEchartsOptions: {
        renderer: 'canvas'
      },
      sparklineData: {
        series: [{data: [1,7,3,5,7,8]}],
        options1: {
          colors: ['#ffc247'],
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        },
        options2: {
          colors: ['#ffc0d9'],
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      }
    }
  }

  componentWillUnmount() {
    clearInterval(liveChartInterval);
  }

  render() {
    const { cd, initEchartsOptions } = this.state

    return( 
      <div className={s.root}>
        <SupplierSelection />
        <div>
          <Row>
            <Col xl={7} xs={12}>
              <DashboardOTDChart />
            </Col>
            <Col xl={5} xs={12}>
              <OTDPieChart />
            </Col>
                
            {/* <Col lg={5} xs={12}>
              <Widget
                title={<h5>Echarts <span className='fw-semi-bold'>Line Chart</span></h5>}
                close collapse
              >
                <ReactEchartsCore
                  echarts={echarts}
                  option={cd.echarts.line}
                  opts={initEchartsOptions}
                  style={{height: "365px"}}
                />
              </Widget>
            </Col> */}
          </Row>
        </div>
      </div>
    );
  }
}

export default OTD;

// const Typography = () => (
//     <div>
//         <h1 className="page-title">Typography - <span className="fw-semi-bold">Texts & Display</span></h1>
//         <Row>
//             <Col xs={12} md={6}>
//                 <Widget
//                     title={<h5>Headings <small className="text-muted">Default and customized</small></h5>}
//                     close collapse
//                 >
//                     <h4>Default headings</h4>
//                     <p>Basic headings for everyday use</p>
//                     <div className="widget-padding-md w-100 h-100 text-left border rounded">
//                         <Row>
//                             <Col sm={6}>
//                                 <h1>h1. Heading</h1>
//                                 <h2>h2. Heading</h2>
//                                 <h3>h3. Heading</h3>
//                                 <h4>h4. Heading</h4>
//                                 <h5>h5. Heading</h5>
//                                 <h6>h6. Heading</h6>
//                             </Col>
//                             <Col sm={6}>
//                                 <h1 className="text-danger">h1. Heading</h1>
//                                 <h2 className="text-warning">h2. Heading</h2>
//                                 <h3 className="text-success">h3. Heading</h3>
//                                 <h4 className="text-primary">h4. Heading</h4>
//                                 <h5 className="text-info">h5. Heading</h5>
//                                 <h6 className="text-inverse">h6. Heading</h6>
//                             </Col>
//                         </Row>
//                     </div>
//                     <h4 className="mt-5">Customized headings</h4>
//                     <p>Enhanced with additional text</p>
//                     <div className="widget-padding-md w-100 h-100 text-left border rounded">
//                         <h3>
//                             Headings <small>And some clarification text</small>
//                         </h3>
//                     </div>
//                     <h4 className="mt-5">Display</h4>
//                     <p>Headings to stand out</p>
//                     <div className="widget-padding-md w-100 h-100 text-left border rounded">
//                         <h1 className="display-1">Display 1</h1>
//                         <h1 className="display-2">Display 2</h1>
//                         <h1 className="display-3">Display 3</h1>
//                         <h1 className="display-4">Display 4</h1>
//                     </div>
//                     <h4 className="mt-5">Lead</h4>
//                     <p>Make a paragraph stand out by adding <code className="highlighter-rouge">.lead</code>.</p>
//                     <div className="widget-padding-md w-100 h-100 text-left border rounded">
//                         <p className="lead">Light Blue Template is admin dashboard template built with Bootstrap</p>
//                     </div>
//                 </Widget>
//             </Col>
//             <Col xs={12} md={6}>
//                 <Widget
//                     title={<h5>Body texts <small className="text-muted">Variations</small></h5>}
//                     close collapse
//                 >
//                     <h4>Basic texts</h4>
//                     <p>Styling for common texts</p>
//                     <div className="widget-padding-md w-100 h-100 text-left border rounded">
//                         <p>You can use the mark tag to <mark>highlight</mark> text.</p>
//                         <p><del>This line of text is meant to be treated as deleted text.</del></p>
//                         <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
//                         <p><small>This line of text is meant to be treated as fine print.</small></p>
//                         <p><em>This line rendered as italicized text.</em></p>
//                         <p><strong>This line rendered as bold text.</strong></p>
//                     </div>
//                     <h4 className="mt-5">Font weights</h4>
//                     <p>Various font weights supported</p>
//                     <div className="widget-padding-md w-100 h-100 text-left border rounded">
//                         <p>Thin (default) font weight</p>
//                         <p className="fw-normal">Normal font weight</p>
//                         <p className="fw-semi-bold">Semi bold to empasize important thing</p>
//                         <p className="fw-bold">Bold font as a high priority</p>
//                     </div>
//                     <h4 className="mt-5">Colors</h4>
//                     <p>Bootstrap state colors can be applied to texts too</p>
//                     <div className="widget-padding-md w-100 h-100 text-left border rounded">
//                         <p className="text-danger">Some danger text</p>
//                         <p className="text-warning">Some warning text</p>
//                         <p className="text-success">Some succes text</p>
//                         <p className="text-primary">Some primary text</p>
//                         <p className="text-info">Some info text</p>
//                     </div>
//                     <h4 className="mt-5">Blockquotes</h4>
//                     <p>Citing someone is really easy</p>
//                     <div className="widget-padding-md w-100 h-100 text-left border rounded">
//                         <blockquote className="blockquote">
//                             <p>Don&apos;t get set into one form, adapt it and build your own, and let
//                                 it grow, be like water. Empty your mind, be formless, shapeless — like water.
//                                 Now you put water in a cup, it becomes the cup; You put water into a bottle it
//                                 becomes the bottle; You put it in a teapot it becomes the teapot. Now water can
//                                 flow or it can crash. Be water, my friend.</p>
//                             <footer className="blockquote-footer">Bruce Lee in <cite title="A Warrior's Journey">A Warrior&apos;s Journey</cite></footer>
//                         </blockquote>
//                     </div>
//                 </Widget>
//             </Col>
//         </Row>
//     </div>
// );

// export default Typography;
