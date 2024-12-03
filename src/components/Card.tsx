import { ReactNode } from "react"

interface Props {
    title?: string,
    children: ReactNode,
    customClass?: string
}

const Card = ({ children, title, customClass }: Props) => {
    return (
        <div className={`${customClass} card shadow-xl`}>
            <h1 className="mb-1">
                {title}
            </h1>
            {children}
        </div>
    );
};

export default Card