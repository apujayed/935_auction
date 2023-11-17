import { useEffect } from "react";
function NotFound() {
    useEffect(() => {
        window.location.replace('/dashboard')
    }, [])
    return null
}

export default NotFound;
