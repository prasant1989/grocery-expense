import * as React from "react";

export const navigationRef = React.createRef();

export function navigate(name) {
	// console.log("--------------------");
	// console.log("nr", navigationRef);
	// console.log("rrc", navigationRef.current);
	// console.log("--------------------");
	navigationRef.current?.navigate(name);
}
