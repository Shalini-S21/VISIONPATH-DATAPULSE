import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setDarkMode } from '../redux/slices/themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme?.darkMode ?? state.theme?.isDark ?? false);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  const setDark = (val) => {
    dispatch(setDarkMode(val));
  };

  return {
    darkMode,
    isDark: darkMode,
    toggleTheme: toggle,
    setDarkMode: setDark,
  };
};

export default useTheme;
