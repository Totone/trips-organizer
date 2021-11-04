import { CSSProperties, FC, ReactElement } from "react"
import Container from "react-bootstrap/Container"
import { useClasses } from "../../hooks"

interface TextProps {
    centered?: boolean
    right?: boolean
    bold?: boolean
    italic?: boolean
    xs?: boolean
    sm?: boolean
    md?: boolean
    lg?: boolean
    xl?: boolean
    xxl?: boolean
    id?: string
    green?: boolean
    red?: boolean
    blue?: boolean
    teal?: boolean
    yellow?: boolean
    styles?: CSSProperties
}

/** Displays a text */
export const Text: FC<TextProps> = ({
    id = undefined,
    centered = false,
    right = false,
    bold = false,
    italic = false,
    xs = false,
    sm = false,
    md = false,
    lg = false,
    xl = false,
    xxl = false,
    green = false,
    red = false,
    blue = false,
    teal = false,
    yellow = false,
    styles = undefined,
    children,
}): ReactElement => {
    const classes = useClasses([
        "w-100",
        "mt-5",

        centered && "text-center",
        right && "text-end",
        bold && "fw-bold",
        italic && "fst-italic",
        
        xxl && "fs-1",
        xl && "fs-2",
        lg && "fs-3",
        md && "fs-4",
        sm && "fs-5",
        xs && "fs-6",
        
        green && "text-success",
        red && "text-danger",
        blue && "text-primary",
        teal && "text-info",
        yellow && "text-warning",
    ])
    
    return (
        <Container className={classes}>
            <p id={id} style={styles}>{ children }</p>
        </Container>
    )
}