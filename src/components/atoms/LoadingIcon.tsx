import { FC, ReactElement } from "react"
import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"

interface LoadingIconProps {
    icon?: "border"|"grow"
}
/** Displays a loading icon */
export const LoadingIcon: FC<LoadingIconProps> = ({
    icon = "border",
}): ReactElement => (
    <Container className="w-100 text-center">
        <Spinner 
            role="status" 
            animation={icon} 
            variant={icon === "border"? "primary":"primary"}
        >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </Container>
)