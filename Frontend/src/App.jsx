import useFetch from "./useFetch";

const App = () => {
  const { data } = useFetch(
    "https://jobify-backend-blush.vercel.app/v1/jobs",
    []
  );
  return <h1>Hello</h1>;
};
export default App;
