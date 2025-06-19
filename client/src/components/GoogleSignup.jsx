import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GoogleSignup() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const { email, name: full_name, sub: googleId } = decoded;

    try {
      const res = await axios.post('http://localhost:5000/api/auth/google-login', {
        email,
        full_name,
        googleId,
      });
      alert("Google login successful");
      navigate("/home");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={() => alert('Google login failed')} />
    </div>
  );
}

export default GoogleSignup;
