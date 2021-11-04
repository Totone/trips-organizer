import { ChangeEventHandler, FC, ReactElement, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import FloatingLabel from "react-bootstrap/FloatingLabel"

import CSTS from "../../_config/constants"
import { LoadingIcon } from "../atoms/LoadingIcon"
import { Stop } from "../atoms/Stop"
import { useStore } from "../../services/store"

/** Displays the UI component used to choose a bus stop */
export const StopSelector: FC = (): ReactElement => {
    const { t } = useTranslation()
    const { 
        currentStop, 
        stopsList,
        updateStop,
        fetchStopsList, 
        stopReqStatus, 
    } = useStore()

    useEffect(
        () => {
            if(stopsList.length === 0) fetchStopsList()
        }, [fetchStopsList, stopsList.length]
    )
    const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        e.preventDefault()
        updateStop(e.target.value)
    } 

    return (
        <Col className="flex-grow-0">
            {
                stopReqStatus === CSTS.REQ_STATUS.FAILED ? (
                    <div>{t("errors:request.stop")}</div>
                ): 
                stopReqStatus === CSTS.REQ_STATUS.LOADING ? (
                    <LoadingIcon icon="grow" />
                ) : (
                    <FloatingLabel label={t("From where")} >
                        <Form.Select onChange={handleSelectChange} value={currentStop}>
                            {
                                [CSTS.SELECT_DEFAULT_VALUE].concat(stopsList).map(
                                    stopName => (
                                        <Stop 
                                            key={stopName} 
                                            label={stopName}
                                            value={stopName  === CSTS.SELECT_DEFAULT_VALUE ? t("Choose bus stop"): stopName}
                                        />
                                    )
                                )
                            }
                        </Form.Select>
                    </FloatingLabel>
                )
            }
        </Col>
    )
}