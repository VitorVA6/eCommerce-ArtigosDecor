import { useMediaQuery } from "react-responsive"; 

const verifyScreen = (width) => {

    const isTabletOrMobile = useMediaQuery({ maxWidth: width })
    return isTabletOrMobile

}

export default verifyScreen