import Button from "@mui/material/Button"
import s from "./Page404.module.css"
import { Link } from "react-router"
import { Path } from "common/routing/Routing"

export const Page404 = () => {
    return (
        <>
            <h1 className={s.title}>404</h1>
            <h2 className={s.subTitle}>page not found</h2>
            <div className={s.buttonWrapper}>
                <Button component={Link} to={Path.Main} variant="contained" size="large">
                    main page
                </Button>
            </div>
        </>
    )
}
