import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeaders";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tasks, setTasks] = useState(null);

  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  // Sort by Date
  const tasksSortByDate = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"🏝️ Holiday tick list"} getData={getData} />
          <p className="user-email">Welcome back {userEmail}</p>
          {tasksSortByDate?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
      <p className="copyright">© github/taha0998</p>
    </div>
  );
};

export default App;
