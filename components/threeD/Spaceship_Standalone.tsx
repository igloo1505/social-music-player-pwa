import React, { ForwardedRef, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import UFOTransformed from "../../public/threeJs/UFO-transformed.glb";
// const modelPath = "/threeJs/UFO-transformed.glb";

type GLTFResult = GLTF & {
	nodes: {
		Ufo_Main_Body: Mesh;
		Ufo_Engine_1: Mesh;
		Circle: Mesh;
		Ufo_Ring_5: Mesh;
		Ufo_Ring_6: Mesh;
		Ufo_Ufo_Engine_2: Mesh;
		Ufo_Ufo_Engine_2001: Mesh;
		Ufo_Body_Up: Mesh;
		Ufo_Body_Up001: Mesh;
		Ufo_Body_Up002: Mesh;
		Ufo_Body_Up003: Mesh;
		Ufo_Body_Up004: Mesh;
		Ufo_Emi_Blue: Mesh;
		Ufo_Emi_Blue001: Mesh;
		Ufo_Emi_Blue002: Mesh;
		Ufo_Emi_Blue003: Mesh;
		Ufo_Emi_Blue004: Mesh;
		Ufo_Kabel: Mesh;
		Ufo_Kabel001: Mesh;
		Ufo_Kabel002: Mesh;
		Ufo_Kabel003: Mesh;
		Ufo_Kabel004: Mesh;
		Ufo_Large_2: Mesh;
		Ufo_Large_2001: Mesh;
		Ufo_Large_2002: Mesh;
		Ufo_Large_2003: Mesh;
		Ufo_Large_2004: Mesh;
		Ufo_Mid_1: Mesh;
		Ufo_Mid_1001: Mesh;
		Ufo_Mid_1002: Mesh;
		Ufo_Mid_1003: Mesh;
		Ufo_Mid_1004: Mesh;
		Ufo_Ring_2: Mesh;
		Ufo_Ring_2001: Mesh;
		Ufo_Ring_2002: Mesh;
		Ufo_Ring_2003: Mesh;
		Ufo_Ring_2004: Mesh;
		Ufo_Ring_3: Mesh;
		Ufo_Ring_3001: Mesh;
		Ufo_Ring_3002: Mesh;
		Ufo_Ring_3003: Mesh;
		Ufo_Ring_3004: Mesh;
		Ufo_Ring_4: Mesh;
		Ufo_Sensoren: Mesh;
		Ufo_Sensoren001: Mesh;
		Ufo_Sensoren002: Mesh;
		Ufo_Sensoren003: Mesh;
		Ufo_Sensoren004: Mesh;
		Ufo_Small_1: Mesh;
		Ufo_Small_1001: Mesh;
		Ufo_Small_1002: Mesh;
		Ufo_Small_1003: Mesh;
		Ufo_Small_1004: Mesh;
		Ufo_Small_2: Mesh;
		Ufo_Small_2001: Mesh;
		Ufo_Small_2002: Mesh;
		Ufo_Small_2003: Mesh;
		Ufo_Small_2004: Mesh;
		Ufo_Small_3: Mesh;
		Ufo_Small_3001: Mesh;
		Ufo_Small_3002: Mesh;
		Ufo_Small_3003: Mesh;
		Ufo_Small_3004: Mesh;
		Ufo_Small_4: Mesh;
		Ufo_Small_4001: Mesh;
		Ufo_Small_4002: Mesh;
		Ufo_Small_4003: Mesh;
		Ufo_Small_4004: Mesh;
		Ufo_Small_5: Mesh;
		Ufo_Small_5001: Mesh;
		Ufo_Small_5002: Mesh;
		Ufo_Small_5003: Mesh;
		Ufo_Small_5004: Mesh;
		Ufo_Small_6: Mesh;
		Ufo_Small_6001: Mesh;
		Ufo_Small_6002: Mesh;
		Ufo_Small_6003: Mesh;
		Ufo_Small_6004: Mesh;
	};
	materials: {
		UFO: MeshStandardMaterial;
		["Material.002"]: MeshStandardMaterial;
	};
};

const Spaceship_standalone = forwardRef(
	(props: JSX.IntrinsicElements["group"], ref: ForwardedRef<Group>) => {
		// const group = useRef<Group>(null!);
		console.log("UFOTransformed.src: ", UFOTransformed);
		// const { nodes, materials } = useGLTF(modelPath) as unknown as GLTFResult;
		const { nodes, materials } = useGLTF(
			UFOTransformed
		) as unknown as GLTFResult;
		// const { nodes, materials } = useLoader(GLTFLoader, UFOTransformed.src);
		return (
			<group ref={ref} {...props} dispose={null}>
				<group name="Scene">
					<group name="Empty">
						<mesh
							name="Ufo_Main_Body"
							geometry={nodes.Ufo_Main_Body.geometry}
							material={materials.UFO}
						>
							<mesh
								name="Ufo_Engine_1"
								geometry={nodes.Ufo_Engine_1.geometry}
								material={materials.UFO}
								position={[0, -0.56, 0]}
							/>
							<group name="Ufo_Ring_1">
								<mesh
									name="Circle"
									geometry={nodes.Circle.geometry}
									material={materials.UFO}
									position={[0, -0.79, 0]}
								/>
							</group>
							<mesh
								name="Ufo_Ring_5"
								geometry={nodes.Ufo_Ring_5.geometry}
								material={materials.UFO}
							/>
							<mesh
								name="Ufo_Ring_6"
								geometry={nodes.Ufo_Ring_6.geometry}
								material={materials.UFO}
							/>
							<mesh
								name="Ufo_Ufo_Engine_2"
								geometry={nodes.Ufo_Ufo_Engine_2.geometry}
								material={materials.UFO}
								position={[0, -0.78, 0]}
								rotation={[0, -0.03, 0]}
							/>
							{/* <mesh
							name="Ufo_Ufo_Engine_2001"
							geometry={nodes.Ufo_Ufo_Engine_2001.geometry}
							material={materials["Material.002"]}
							position={[0, -0.78, 0]}
							rotation={[0, -0.03, 0]}
						/> */}
							<mesh
								name="Ufo_Body_Up"
								geometry={nodes.Ufo_Body_Up.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Body_Up001"
								geometry={nodes.Ufo_Body_Up001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Body_Up002"
								geometry={nodes.Ufo_Body_Up002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Body_Up003"
								geometry={nodes.Ufo_Body_Up003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Body_Up004"
								geometry={nodes.Ufo_Body_Up004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Emi_Blue"
								geometry={nodes.Ufo_Emi_Blue.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Emi_Blue001"
								geometry={nodes.Ufo_Emi_Blue001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Emi_Blue002"
								geometry={nodes.Ufo_Emi_Blue002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Emi_Blue003"
								geometry={nodes.Ufo_Emi_Blue003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Emi_Blue004"
								geometry={nodes.Ufo_Emi_Blue004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Kabel"
								geometry={nodes.Ufo_Kabel.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Kabel001"
								geometry={nodes.Ufo_Kabel001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Kabel002"
								geometry={nodes.Ufo_Kabel002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Kabel003"
								geometry={nodes.Ufo_Kabel003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Kabel004"
								geometry={nodes.Ufo_Kabel004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Large_2"
								geometry={nodes.Ufo_Large_2.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Large_2001"
								geometry={nodes.Ufo_Large_2001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Large_2002"
								geometry={nodes.Ufo_Large_2002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Large_2003"
								geometry={nodes.Ufo_Large_2003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Large_2004"
								geometry={nodes.Ufo_Large_2004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Mid_1"
								geometry={nodes.Ufo_Mid_1.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Mid_1001"
								geometry={nodes.Ufo_Mid_1001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Mid_1002"
								geometry={nodes.Ufo_Mid_1002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Mid_1003"
								geometry={nodes.Ufo_Mid_1003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Mid_1004"
								geometry={nodes.Ufo_Mid_1004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Ring_2"
								geometry={nodes.Ufo_Ring_2.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Ring_2001"
								geometry={nodes.Ufo_Ring_2001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Ring_2002"
								geometry={nodes.Ufo_Ring_2002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Ring_2003"
								geometry={nodes.Ufo_Ring_2003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Ring_2004"
								geometry={nodes.Ufo_Ring_2004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Ring_3"
								geometry={nodes.Ufo_Ring_3.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Ring_3001"
								geometry={nodes.Ufo_Ring_3001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Ring_3002"
								geometry={nodes.Ufo_Ring_3002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Ring_3003"
								geometry={nodes.Ufo_Ring_3003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Ring_3004"
								geometry={nodes.Ufo_Ring_3004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Ring_4"
								geometry={nodes.Ufo_Ring_4.geometry}
								material={materials.UFO}
							/>
							<mesh
								name="Ufo_Sensoren"
								geometry={nodes.Ufo_Sensoren.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Sensoren001"
								geometry={nodes.Ufo_Sensoren001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Sensoren002"
								geometry={nodes.Ufo_Sensoren002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Sensoren003"
								geometry={nodes.Ufo_Sensoren003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Sensoren004"
								geometry={nodes.Ufo_Sensoren004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Small_1"
								geometry={nodes.Ufo_Small_1.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Small_1001"
								geometry={nodes.Ufo_Small_1001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Small_1002"
								geometry={nodes.Ufo_Small_1002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Small_1003"
								geometry={nodes.Ufo_Small_1003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Small_1004"
								geometry={nodes.Ufo_Small_1004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Small_2"
								geometry={nodes.Ufo_Small_2.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Small_2001"
								geometry={nodes.Ufo_Small_2001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Small_2002"
								geometry={nodes.Ufo_Small_2002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Small_2003"
								geometry={nodes.Ufo_Small_2003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Small_2004"
								geometry={nodes.Ufo_Small_2004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Small_3"
								geometry={nodes.Ufo_Small_3.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Small_3001"
								geometry={nodes.Ufo_Small_3001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Small_3002"
								geometry={nodes.Ufo_Small_3002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Small_3003"
								geometry={nodes.Ufo_Small_3003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Small_3004"
								geometry={nodes.Ufo_Small_3004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Small_4"
								geometry={nodes.Ufo_Small_4.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Small_4001"
								geometry={nodes.Ufo_Small_4001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Small_4002"
								geometry={nodes.Ufo_Small_4002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Small_4003"
								geometry={nodes.Ufo_Small_4003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Small_4004"
								geometry={nodes.Ufo_Small_4004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Small_5"
								geometry={nodes.Ufo_Small_5.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Small_5001"
								geometry={nodes.Ufo_Small_5001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Small_5002"
								geometry={nodes.Ufo_Small_5002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Small_5003"
								geometry={nodes.Ufo_Small_5003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Small_5004"
								geometry={nodes.Ufo_Small_5004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
							<mesh
								name="Ufo_Small_6"
								geometry={nodes.Ufo_Small_6.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							<mesh
								name="Ufo_Small_6001"
								geometry={nodes.Ufo_Small_6001.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 1.26]}
							/>
							<mesh
								name="Ufo_Small_6002"
								geometry={nodes.Ufo_Small_6002.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, 2.51]}
							/>
							<mesh
								name="Ufo_Small_6003"
								geometry={nodes.Ufo_Small_6003.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -2.51]}
							/>
							<mesh
								name="Ufo_Small_6004"
								geometry={nodes.Ufo_Small_6004.geometry}
								material={materials.UFO}
								rotation={[Math.PI / 2, 0, -1.26]}
							/>
						</mesh>
					</group>
				</group>
			</group>
		);
	}
);

export default Spaceship_standalone;
