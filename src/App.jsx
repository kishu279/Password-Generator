import { RecoilRoot } from "recoil";
import MyApp from "./MyApp.jsx";

export default function App() {
  return (
    <>
      <RecoilRoot>
        <MyApp />
      </RecoilRoot>
    </>
  );
}
