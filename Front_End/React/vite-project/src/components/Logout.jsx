import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {  logout } from "../features/userSlice"
import { useNavigate } from "react-router-dom"
const Logout=()=>{
    const dispatch=useDispatch();
    const navigate= useNavigate();

    useEffect(() =>{
        const confirmed= window.confirm("Are you sure you want to logout?")
        if(confirmed){
        dispatch(logout());
        navigate("/login");
        }
        
    },[dispatch, navigate]);
    return null;


};
export default Logout;