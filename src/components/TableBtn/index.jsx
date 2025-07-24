import styles from "./styles.module.scss"
import { HiOutlineTrash } from "react-icons/hi";
import classNames from "classnames";

export default function TableBtn({ onClick = () => { }, props, icon, className }) {

    return (
        <>
            <button
                className={classNames(icon ? styles.edit : styles.btn, className)}
                onClick={(e) => {
                    e.stopPropagation()
                    onClick(props, e)
                }}
            >
                {icon ? icon : <HiOutlineTrash fontSize={"20px"} />}
            </button>
        </>
    );
}