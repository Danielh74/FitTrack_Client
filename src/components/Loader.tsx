import { MutatingDots } from 'react-loader-spinner'


const Loader = () => {
    return (
        <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#2563EB"
            secondaryColor="#2563EB"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass="flex flex-col items-center" />
    )
}

export default Loader