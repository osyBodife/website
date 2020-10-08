import React, { Component } from 'react';
import Footer from "../common/footer";
import NavBar from "./navBar";

class NotFound extends Component {
    //state = {  }
    render() {
        return (
            <>
                <div>
                    <NavBar />
                   
                    <div className="row">
                        <div className="col-4">
                           
                        </div>
                        <div className="col-4"><h1>FILE NOT FOUND</h1></div>
                        
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Footer />
                </div>
            </>
        );
    }
}
 
export default NotFound;