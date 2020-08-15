import React from "react";
import { getFeatureData } from "../helpers/APImock";

export const FeatureContext = React.createContext(getFeatureData());
