import React, { Component } from 'react';
import Footer from "../common/footer";
import NavBar from "./navBar";

class Blocked extends Component {
    //state = {  }
    render() {
        return (
            <>
                <div>
                    <NavBar />
                   
                    <div className="row">
                        <div className="col-4">
                           
                        </div>
                        <div className="col-4"><h1>
                            You have made more than 4 attempts. 
                            Your access to the Admin Portal is blocked for 24hours
                           
                            </h1></div>
                        
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
 
export default Blocked;