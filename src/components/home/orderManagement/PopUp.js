import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import React from 'react'
const PopUp = (props) => {
    const {title, children, openPopup, setOpenPopup} = props
    const closeWindow = () => {
        setOpenPopup(false)
    }
    return (
        <Dialog open={openPopup} maxWidth="md" >
            <DialogTitle>
                <div className="pop__titlediv">
                    <Typography variant="h6" component="div" className="pop__title">
                        {title}
                    </Typography>
                    <div>    
                        <IconButton onClick={closeWindow}>
                            <CloseIcon size="large" />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default PopUp
