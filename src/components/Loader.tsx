import { MutatingDots } from 'react-loader-spinner'
import useTheme from '../hooks/useTheme';


const Loader = () => {
    const { darkMode } = useTheme();

    return (
        <MutatingDots
            visible={true}
            height="100"
            width="100"
            color={darkMode ? "#FFD700" : "#274C77"}
            secondaryColor={darkMode ? "#FFD700" : "#274C77"}
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass="flex flex-col items-center" />
    )
}

export default Loader