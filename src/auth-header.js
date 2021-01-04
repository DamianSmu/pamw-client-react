export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      return {  Authorization: token,
                email: user.email,
              };
    } else {
      console.log("Token not found")
      return {};
    }
  }