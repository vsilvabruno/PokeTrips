import { Route, Switch } from "wouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./views/HomeView";
import NotFoundView from "./views/NotFoundView";
import TownView from "./views/TownView";
import FormView from "./views/FormView";
import AboutView from "./views/AboutView";
import useTripData from "./hooks/useTripData";

function App() {
  // Use the custom hook to get trip data, loading, and error state
  const { tripInfo, loading, error } = useTripData();

  // Show loading state while trip data is being fetched
  if (loading) {
    return (
      <div className="loading-container">
        <img src="/images/icons/loading.png" alt="Loading..." />
        Loading...
      </div>
    );
  }
  
  // Show error state if there was an issue fetching trip data
  if (error) {
    console.error("Problem fetching data: " + error.message);
    return (
      <div className="error-container">
        <img src="/images/icons/error.png" alt="Error" />
        Error
      </div>
    );
  };

  // Main App rendering with all the main routes once trip data is fetched without errors
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={() => <HomeView tripInfo={tripInfo} />} />
        <Route path="/404" component={NotFoundView} />
        <Route path="/newlocation" component={FormView} />
        <Route path="/about" component={AboutView} />
        <Route path="/town/:id" component={({ params }) => <TownView tripInfo={tripInfo} params={params} />} />
        <Route component={NotFoundView} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;