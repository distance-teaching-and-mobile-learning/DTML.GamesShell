import React, { Component } from 'react';
import '../css/font-awesome.min.css';
import '../css/responsive.css';

const imageurl=process.env.PUBLIC_URL;
class Footer extends Component {
  render() {
    return (
      <div>
      	 <div className="footertop-section"><img src={imageurl + 'images/footerbg-01.png'} alt="" /></div>
		 <div className="footersecion">
		  <div className="footersecion-main"> 
		    <div className="footersecion-main-left">
		      <ul>
		          <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
		          <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
		          <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
		          <li><a href="#"><i className="fa fa-youtube" aria-hidden="true"></i></a></li>
		      </ul>
		      <div className="clr"></div>
		    </div>
		    <div className="footersecion-main-right"><p>dtml.org &copy; 2017 All Rights Reserved </p></div>
		    <div className="clr"></div>
		  </div>
		 </div>

      </div>
    );
  }
}

export default Footer;