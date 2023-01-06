import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const GetThreeJsInfo = () => {
  const { gl } = useThree();
  useEffect(() => {
    // gl === WebGLRenderer
    // gl.info.calls
    console.log(gl.info);
  });
  return null;
};

export default GetThreeJsInfo;
