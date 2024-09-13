import classes from "./Page-Loader.module.css";
import { Title } from "@mantine/core";

export function PageLoader() {
    return (
        <div className={classes.wrapper}>
            <div className={classes.loader}>
                <div className={classes.box}>
                    <div className={classes.logo}>
                        <Title className={classes.title} fw={900} order={6}>
                            Loading UI
                        </Title>
                    </div>
                </div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
                <div className={classes.box}></div>
            </div>
        </div>
    );
}
