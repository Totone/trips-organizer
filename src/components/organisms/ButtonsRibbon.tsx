import { FC, ReactElement } from "react"
import Container from "react-bootstrap/Container"
import { Button } from "../atoms/Button"

export const ButtonsRibbon: FC = (): ReactElement => (
    <Container 
        style={{height: 75}} 
        className="d-flex flex-row justify-content-center gap-3 mt-3"
    >
        <Button sortTable sortBy="date"/>
        <Button sortTable sortBy="stop"/>
        <Button resetCache/>
        <Button fetchAll/>
    </Container>
)