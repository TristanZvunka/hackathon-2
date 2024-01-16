import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [allUser, setAllUser] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/users")
      .then((res) => setAllUser(res.data))
      .catch((err) => console.error(err));
  }, [success]);

  const [user, setUser] = useState({
    name: "anthony",
    email: "anthony@gorski.fr",
    password: "azertyuiop",
    avatar: null,
  });

  const handleChange = (event) => {
    if (event.target.name === "avatar") {
      setUser({ ...user, avatar: event.target.files[0] });
    } else {
      setUser({ ...user, [event.target.name]: event.target.value });
    }
    // setUser({ ...user, "firstname": "diogo" });
    // setUser({ ...user, "email": "diogo@wcs.fr" });
    // setUser({ ...user, "password": "azerty" });
  };

  // console.log(user);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("avatar", user.avatar);

    /**
     * 
     * Object.entries(user).forEach(([key, value]) => {
          formData.append(key, value);
        });
     */

    axios
      .post("http://localhost:3310/api/users", formData)
      .then(() => setSuccess(!success))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>
        <ul>
          {allUser.map((uniqueUser) => (
            <>
              <li key={uniqueUser.id}>
                {uniqueUser.name} | {uniqueUser.email}
              </li>
              <img
                src={`http://localhost:3310/${uniqueUser.image}`}
                height="50px"
                width="50px"
                alt=""
              />
            </>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          value={user.name}
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
        />{" "}
        <br />
        <label htmlFor="email">email</label>
        <input
          value={user.email}
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
        />{" "}
        <br />
        <label htmlFor="password">password</label>
        <input
          value={user.password}
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />{" "}
        <br />
        <label htmlFor="avatar">Ton Avatar</label>
        <input type="file" name="avatar" id="avatar" onChange={handleChange} />
        <button type="submit">Envoyer</button>
      </form>
    </>
  );
}

export default App;
