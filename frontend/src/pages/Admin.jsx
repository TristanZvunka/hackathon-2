import axios from "axios";
import { useState, useEffect } from "react";

function Admin() {
  const [users, setUsers] = useState([]);
  const [datas, setDatas] = useState([]);
  const [blackLists, setBlackLists] = useState([]);

  const getData = () => {
    const endpoints = [
      "http://localhost:3310/api/users",
      "http://localhost:3310/api/datas",
      "http://localhost:3310/api/blacklists",
    ];
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      ([{ data: user }, { data: donnee }, { data: blacklist }]) => {
        setUsers(user);
        setDatas(donnee);
        setBlackLists(blacklist);
      }
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <p>{user.email}</p>
            </li>
          ))}
      </div>
      <div>
        {datas &&
          datas.map((data) => (
            <li key={data.id}>
              <p>{data.mot}</p>
              <p>{data.count} fois</p>
            </li>
          ))}
      </div>
      <div>
        {blackLists &&
          blackLists.map((blacklist) => (
            <li key={blacklist.id}>
              <p>{blacklist.mot}</p>
            </li>
          ))}
      </div>
    </div>
  );
}

export default Admin;
