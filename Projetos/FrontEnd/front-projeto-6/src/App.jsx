import { ViewportProvider } from "context/Viewport";
import { Header } from "./components";

function App() {
  return (
    <>
      <ViewportProvider>
        <Header />
        teste
      </ViewportProvider>
    </>
  );
}

export default App;
