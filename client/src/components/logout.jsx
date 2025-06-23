import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
const navigate = useNavigate();

useEffect(() => {
axios
.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true })
.then(() => {
alert("You have been logged out.");
navigate("/login");
})
.catch((err) => {
console.error("Logout failed", err);
alert("Logout failed. Try again.");
});
}, [navigate]);

return (
<div className="text-center mt-5">
<p>Logging out...</p>
</div>
);
};

export default Logout;