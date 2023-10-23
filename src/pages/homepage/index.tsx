import React from "react";
import Matches from "../matches";
import AccountLayout from "../../layouts/account";
import Articles from "../articles";

const HomePage = ( ) =>{
    return (
        <div>
            <AccountLayout/>
            <div className="flex flex-row">
                <Matches/>
            </div>
            <div className="flex">
                <Articles/>
            </div>
        </div>
    )
}
export default HomePage