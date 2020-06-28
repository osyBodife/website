import React, { Component } from 'react';
import MenuListGroup from './menuListGroup';
import SlideShow from "../common/slideShow";
import Footer from "../common/footer";
import NavBar from "./navBar";

class Home extends Component {
    //state = {  }
    render() { 
        return (
          <>
            <div>
              <NavBar />

              <SlideShow />
              <div className="row">
                <div className="col-2">
                  <MenuListGroup />
                </div>
                <div className="col">Menu Table</div>
              </div>
              <Footer />
            </div>
          </>
        );
    }
}
 
export default Home;