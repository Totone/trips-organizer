import { FC, ReactElement } from "react"
import { useTranslation } from "react-i18next"
import ListGroup from "react-bootstrap/ListGroup"
import Col from "react-bootstrap/Col"

import CSTS from "../../_config/constants"
import { Text } from "../atoms/Text"
import { BookedTrip } from "../molecules/BookedTrip"
import { useStore } from "../../services/store"

/** Displays the list of booked trips */
export const BookedList: FC = (): ReactElement => {
    const { t } = useTranslation()
    const { bookedList } = useStore()
    return (
        <Col
            className="pb-5 flex-grow-0"
            xs={{order: "first"}} 
            md={{order: "last"}} 
        >
            <Text id={CSTS.IDS.BOOKED_TRIPS} centered lg blue>
                {t("Booked trips")}
            </Text>
            {
                bookedList.length === 0 ? (
                    <Text centered sm italic red>
                        {t("No booked trip")}
                    </Text>
                ) : (
                    <ListGroup aria-labelledby={CSTS.IDS.BOOKED_TRIPS}>
                        {
                            bookedList.map(
                                (trip) => (
                                    <BookedTrip key={trip.id} trip={trip}/>
                                )
                            )
                        }
                    </ListGroup>
                )
            }
        </Col>
    )
}