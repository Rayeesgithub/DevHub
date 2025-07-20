
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Connections from "./components/Connections"
import Request from "./components/Request"
import Home from "./components/Home"
import Signup from "./components/Signup"
function App() {


  return (
   <>
   <Provider store={appStore}>
     <BrowserRouter basename="/">
      <Routes>
        <Route  path="/" element={<Body/>}>
    
          <Route path="/" element={<Feed/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/signup" element={<Signup/>}/>
         <Route path="/login" element={<Login/>} />
          <Route path="/connection" element={<Connections/>} />
           <Route path="/requests" element={<Request/>} />
        </Route>
      </Routes>
    </BrowserRouter>
   </Provider>
    </>
  )
}

export default App
