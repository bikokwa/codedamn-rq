import "./App.css";
import { useQuery } from "react-query";

function App() {
  const { data, error, isLoading, isError, isSuccess, isIdle } = useQuery(
    "hello-world",
    () => {
      return new Promise((resolve) => setTimeout(resolve, 1000));
    }
  );

  console.log({ data, error, isLoading, isError, isSuccess, isIdle });

  return <div className="App"></div>;
}

export default App;
