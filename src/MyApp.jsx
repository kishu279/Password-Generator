import Slider from "@mui/material/Slider";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { lengthSaver, sparePass } from "./state/atom";
import { passMaker } from "./state/selector";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function MyApp() {
  const [pass, setPass] = useState("");
  const [passLen, setPassLen] = useRecoilState(lengthSaver);
  const [debounced, setDebounced] = useState(10);
  const text = useRecoilValue(passMaker);

  // const [alphaCheck, setAlphaCheck] = useState(false);
  const [numCheck, setNumCheck] = useState(false);
  const [spcCheck, setSpcCheck] = useState(false);

  const setSparePass = useSetRecoilState(sparePass);

  useEffect(() => {
    setPass(text);
  }, [passLen, numCheck, spcCheck]);

  function handleCopy() {
    const element = document.getElementById("copyInput");

    element.select();

    navigator.clipboard
      .writeText(pass)
      .then(() => {
        alert("Copied");
      })
      .catch((error) => {
        alert(error);
      });
  }

  useEffect(() => {
    const timer = setTimeout(() => setPassLen(debounced), 500);

    return () => clearTimeout(timer);
  }, [debounced]);

  const handleSpare = useCallback((Checked, Num_Spc) => {
    if (Checked) {
      setSparePass("abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
      return;
    }
    setSparePass((prev) => prev + Num_Spc);
  }, []);
  return (
    <div>
      <div className="display flex justify-center font-serif text-6xl mt-10">
        Password Generator
      </div>
      <div className="display flex justify-center gap-8 mt-6">
        <input
          id="copyInput"
          className="border border-zinc-400 rounded-lg outline outline-offset-0 outline-2 h-10 w-[200px] text-xl text-center"
          value={pass}
          type="text"
          readOnly
          placeholder="Pass"
        />
        <button
          className="border rounded-md w-10 h-10"
          onClick={() => {
            handleCopy();
          }}
        >
          <span className="material-symbols-outlined mt-2 ">content_copy</span>
        </button>
      </div>
      <div className="w-[350px] mt-6 ml-[41%]">
        <Slider
          min={5}
          max={15}
          value={debounced}
          valueLabelDisplay="auto"
          onChange={(e) => {
            setDebounced(e.target.value);
          }}
        />
      </div>
      <div className="display flex justify-center">
        <FormControlLabel
          control={<Checkbox defaultChecked disabled />}
          label="Alpha"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={numCheck}
              onChange={(event) => {
                setNumCheck(event.target.checked);
                handleSpare(numCheck, "1234567890");
              }}
            />
          }
          label="Num"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={spcCheck}
              onChange={(e) => {
                setSpcCheck(e.target.checked);
                handleSpare(spcCheck, " !#$%&'()*+,-./:;<=>?@[]^_`{|}~");
              }}
            />
          }
          label="Spc"
        />
      </div>
    </div>
  );
}
