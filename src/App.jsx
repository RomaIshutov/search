import Header from "./components/Header";
import Search from "./components/Search";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App flex flex-col justify-between h-[100vh]">
      <Header />
      <Search />
      <Footer />
    </div>
  );
}

export default App;
