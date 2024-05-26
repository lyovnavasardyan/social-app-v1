import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { Rootstate, AppDispatch } from "../store/store";

export const useCustomDispatch = () => useDispatch<AppDispatch>();
export const useCustomSelector: TypedUseSelectorHook<Rootstate> = useSelector
