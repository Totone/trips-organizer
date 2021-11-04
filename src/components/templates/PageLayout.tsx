import { FC, ReactElement } from "react"
import { StopSelector } from "../molecules/StopSelector"
import { BookedList } from "../organisms/BookedList"
import { Trips } from "../organisms/Trips"
import { Text } from "../atoms/Text"
// import GLOBALS from "../../_config/globals"
import { useTranslation } from "react-i18next"

import { ButtonsRibbon } from "../organisms/ButtonsRibbon"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"

export const PageLayout: FC = (): ReactElement => {
    const  { t } = useTranslation()
    return (
        <Container 
            as="main"
            className="d-flex flex-row flex-wrap bg-light min-vh-100 p-0" 
            fluid 
        >
            <Col 
                xs={12} 
                md={4} 
                xl={3} 
                className="h-lg-100 py-5 px-sm-2 d-flex flex-column bg-warning"
            >
                <StopSelector />
                <ButtonsRibbon />
                <BookedList />
            </Col>
            <Col 
                xs={12} 
                md={8} 
                xl={9} 
                className="px-md-2 px-lg-2 px-xl-5 my-5"
            >
                <Text xxl bold centered blue>
                    {t("Available trips list")}
                </Text>
                <Trips />
            </Col>
        </Container>
    )
}