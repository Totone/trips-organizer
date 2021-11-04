import { FC, ReactElement, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Table from "react-bootstrap/Table"

import { LoadingIcon } from "../atoms/LoadingIcon"
import { LayoutWhenEmptyList as EmptyList } from "../molecules/LayoutWhenEmptyList"
import { TripData } from "../molecules/TripData"
import { useStore } from "../../services/store"

/** Displays the list of available trips */
export const Trips: FC = (): ReactElement => {
    const { t } = useTranslation()
    const { 
        updateTrips, 
        currentStop, 
        tripsList,
        tripReqStatus,
    } = useStore()
    useEffect(
        () => {
            if(currentStop !== "default") {
                updateTrips(currentStop)
            }
        }, [currentStop, updateTrips]
    )
    return (
        tripReqStatus === "loading" ? <LoadingIcon/> : 
        tripsList.length === 0 ? <EmptyList>{t("From where")}</EmptyList> : (
            <Table hover size="xl">
                <thead>
                    <Row as="tr" className="text-center m-0 p-0 text-primary">
                        <Col as="th" xs={5} lg={6}>{t("Trip")}</Col>
                        <Col as="th" 
                            xs={{span: 3, order: "first"}} 
                            lg={{span:1, order: 0}} 
                            xl={2}
                        >
                            {t("Date")}
                        </Col>
                        <Col as="th" xs={2} lg={3}>{t("Hour")}</Col>
                        <Col as="th" xs={2} xl={1}>{t("Book")}</Col>
                    </Row>
                </thead>
                <tbody>
                    {
                        tripsList.map(
                            trip => <TripData key={trip.id} trip={trip} />
                        )
                    }
                </tbody>
            </Table>
        )
    )
}