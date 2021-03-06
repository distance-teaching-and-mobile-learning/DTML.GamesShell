﻿/* The Distance Teaching and Mobile learning licenses this file
to you under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

import React, { Component } from "react";
import Rater from "react-rater";
import ReactGA from "react-ga";
import arrayShuffle from "array-shuffle";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import "babel-polyfill";
import * as utils from './utils.js';

const imageurl = `https://dtml.org/esl/`;
const countryRankURL = "https://dtml.org/api/ConfigurationService/GetLeaderBoardsByCountry";
const bestOfBestURL = "https://dtml.org/api/ConfigurationService/BestOfTheBest";


class LeaderBoard extends Component {
    constructor(props) {
        super(props);
		this.state = {
      countries: null,
      countries_error: null,
      best: null,
      config: props.config,
      best_error: null,
    };
    }
	
recordLeaderBoardRegister(e) {
    ReactGA.event({
      		  category: `LeaderBoardRegister`,
       		  action: `click`,
     		 });
  }
	
	
 componentWillMount() {
    const that = this;
    fetch(countryRankURL, { credentials: `include` })
      .then(response => {
        if (response.status >= 300) {
          console.log(`Bad response from server`);
          that.setState({ countries: {} });
		  that.setState({ countries_error: true });
        }
        return response.json();
      })
      .then(data => {
          that.setState({ countries: data });
		  that.setState({ countries_error: false });
        }
      )
      .catch(error => {
        console.log(`Request failed ${error}`);
      });  
	  
	fetch(bestOfBestURL, { credentials: `include` })
      .then(response => {
        if (response.status >= 300) {
          console.log(`Bad response from server`);
          that.setState({ best: {} });
		  that.setState({ best_error: true });
        }
        return response.json();
      })
      .then(data => {
          that.setState({ best: data });
		  that.setState({ best_error: false });
        }
      )
      .catch(error => {
        console.log(`Request failed ${error}`);
      });  
  }

    render() {
    let bannerImageUrl = `/images/banner_new.jpg`;
	let searchStyle = {display: 'none'};
	let titleStyle ={};
	let hideMoreStyle = this.state.hideMore ? {display:'none'}: {};
	
    if (!isEmpty(this.state.config.customization)) {
      const custom = this.state.config.customization;
      bannerImageUrl = custom.BannerURL;
     }
        return (
            <div>
                <div className="bannersection_list">
                    {bannerImageUrl && bannerImageUrl !== '' && (<img src={bannerImageUrl} alt="Banner" />)}
                </div>
                <div className="contentsection">
                    <div className="contentsection-main">
                        <div className="contentsection-main-top">
                            <h6><b>{this.props.config.Leaderboard}</b></h6>
                                <div className="row justify-content-around justify-content-around p-3">{this.props.config.registerMessage}</div>
                                <div className="row justify-content-around">
                                    <div className="col-xs-6 mt-md-3">
                                        <div className="card">
                                            <div className="card-header">
                                                <i className="fa fa-globe" aria-hidden="true"></i> 
                                                <span className="pl-3">World wide ranking</span>
			</div>
  
                                            <div className="card-body">
                                            {this.state.countries && !this.state.countries_error && (
											<div>
                                                <table className="table">
                                                    <thead className="thead-dark">
                                                    <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col"></th>
                                                            <th scope="col">{this.props.config.country}</th>
                                                            <th scope="col">{this.props.config.index}</th>
                                                            <th scope="col">{this.props.config.medals}</th>
                                                        </tr>
                                                        </thead>
														<tbody>
														  {Object.entries(this.state.countries).map((item, index) => (
															<tr>
														  <td>{index + 1}</td>
														  <td className="flag"> 
														  <img className='border' src={`https://dtml.org/images/flags/${item[1].flag}`}></img>
														  </td>
														  <td>{item[0]}</td>
                                                            <td>{item[1].score}</td>
                                                            <td>{item[1].medals}</td>
															</tr>
														  ))}
														  
												</tbody>		  
                                                </table>
												<p className="card-text">{this.props.config.registerMessage}</p>
												<a className="btn btn-primary" onClick={() => this.recordLeaderBoardRegister()} href="https://dtml.org/Registration/Student">{this.props.config.register}</a>
												</div>
								)} 
								 {(!this.state.countries || this.state.countries_error) && (
								
									<div> Loading ... </div>
								 )}
								</div>
								 </div>
                                </div>
                                 <div className="col-xs-6 mt-md-3">
                                        <div className="card">
                                            <div className="card-header">
                                                <i className="fa fa-trophy" aria-hidden="true"></i>
                                                <span className="pl-3">{this.props.config.bestofbest}</span>
  </div>
                                            <div className="card-body">
                                                     {this.state.best && !this.state.best_error && (
													 <div>
                                                <table className="table">
                                                    <thead className="thead-dark">
                                                    <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">{this.props.config.name}</th>
                                                            <th scope="col">{this.props.config.index}</th>
                                                            <th scope="col">{this.props.config.medals}</th>
                                                        </tr>
                                                        </thead>
															<tbody>
														  {Object.entries(this.state.best).map((item, index) => (
															<tr>
														  <td scope="col">{index + 1}</td>
														  <td scope="col">{item[0]}</td>
                                                            <td scope="col">{item[1].score}</td>
                                                            <td scope="col">{item[1].medals}</td>
															</tr>
														  ))}
															</tbody>
                                                </table>
												
												<p className="card-text">{this.props.config.registerMessage}</p>
												<a className="btn btn-primary" onClick={() => this.recordLeaderBoardRegister()}  href="https://dtml.org/Registration/Student">{this.props.config.register}</a>
												</div>
								)} 
								 {(!this.state.best|| this.state.best_error) && (
								
									<div> Loading ... </div>
								 )}
                                            </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeaderBoard;
