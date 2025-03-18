import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/redux/slices/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector);