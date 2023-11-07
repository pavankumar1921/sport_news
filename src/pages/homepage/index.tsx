import React from "react";
import Matches from "../matches";
import AccountLayout from "../../layouts/account";
import Articles from "../articles";
import Favourites from "../favourites/Favourites";

const HomePage = ( ) =>{
    return (
        <div>
            <AccountLayout/>
            <div className="flex flex-row">
                <Matches/>
            </div>
            <hr/>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-start-1 col-span-3 gap-2 px-3">
                    <Articles/>
                </div>
                <div className="col-start-4 col-span-2 py-5">
                    <Favourites/>
                </div>
            </div>
        </div>
    )
}
export default HomePage