import { FC, ReactElement } from "react"
import Col from "react-bootstrap/Col"

import { Text } from "../atoms/Text"
import { StopSelector } from "../molecules/StopSelector"

/** Displays the view when trips list is empty */
export const LayoutWhenEmptyList: FC = ({
    children
}): ReactElement => (
    <Col lg={5} className="m-auto">
        <Text centered styles={{fontSize: 250}}>🚏</Text>
        <Text centered lg blue>
            {children}
        </Text>
        <StopSelector />
    </Col>
)