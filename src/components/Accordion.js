import PropTypes from 'prop-types';
import { Typography, Accordion, AccordionSummary, AccordionDetails, styled } from "@mui/material";

const Acrd = styled(Accordion)({
    overflow: 'hidden',
    '& > div:first-child': {
        backgroundColor: '#12181e'
    },
    '& > div:nth-child(2)':{
        backgroundColor: '#ffffff1f',
        color: '#d4e2f1'
    }
})


export default function Accordions({variant='outlined', title='', isExpand=false, icon, children, ...other}){
    return (
        <Acrd variant={variant} {...(isExpand && {defaultExpanded: true})}>
            <AccordionSummary {...(icon && {expandIcon: icon})} >
                <Typography>
                    {title}
                </Typography>
            </AccordionSummary>
            {
                children && (
                    <AccordionDetails>
                        {children}
                    </AccordionDetails>
                )
            }
        </Acrd>
    )
}

Accordions.propTypes = {
    variant: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
    title: PropTypes.string.isRequired,
    isExpand: PropTypes.bool,
    icon: PropTypes.node
};