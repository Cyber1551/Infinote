import TitleBar from "./components/TitleBar";
import ContextWrapper from "./context/ContextWrapper";
import SideBar from "./components/SideBar";
import ContentArea from "./components/ContentArea";

function App() {
  return (
      <div>
          <TitleBar />
          <div id="editor" className="h-screen flex items-start overflow-hidden bg-primary">
              <ContextWrapper>
                  <SideBar />
                  <ContentArea />
              </ContextWrapper>
          </div>
      </div>
  );
}

export default App;
