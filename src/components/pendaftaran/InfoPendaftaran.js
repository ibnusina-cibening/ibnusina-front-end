import { ExpandMore } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Divider, Grid, Typography, styled, Table, TableBody, TableContainer, Paper, TableHead, TableRow, tableCellClasses, TableCell, Box, useTheme, useMediaQuery , Chip as Chips} from "@mui/material";
import Accordions from "../Accordion";

const StyledTable = styled(Table)(({theme}) => ({
    // display: 'block',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff1f !important',
    [theme.breakpoints.up('md')]: {
        overflowX: 'hidden'
    },
    '& tbody': {
    },
    '& .MuiTableCell-root': {
        boxShadow: 'none !important',
    }
}))


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        margin: 0
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    }));

const Chip = styled(Chips)({
    fontSize: 9,
    fontWeight: 'bold'
})


export default function InfoPendaftaran(){
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Grid item xs={12}>
                <Card variant='outlined'>
                    <CardHeader
                        title='BIAYA PENDAFTARAN'
                        sx={{padding: '20px', textAlign: 'center'}}
                    />
                    <Divider/>
                    <CardContent>
                        <Grid container spacing={2}>
                                <Grid item md={6}>
                                    <TableContainer component={Paper} sx={{margin: 0, height: '100%', ...(isMobile ? {width: 'calc(100vw - 82px)'} : {width: '100%'})}}>
                                        <StyledTable>
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell width='40%'>Gelombang</StyledTableCell>
                                                    <StyledTableCell width='30%'>Kelas 7</StyledTableCell>
                                                    <StyledTableCell width='30%'>Kelas 10</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>
                                                        Gelombang 1<br/>
                                                        <Chip color='warning' label='1 Des 2021 - 31 Jan 2022' size='small' />
                                                    </TableCell>
                                                    <TableCell>Rp. 6.600.000</TableCell>
                                                    <TableCell>Rp. 6.750.000</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        Gelombang 2<br/>
                                                        <Chip color='warning' label='1 Feb 2021 - 30 Apr 2022' size='small' />
                                                    </TableCell>
                                                    <TableCell>Rp. 7.100.000</TableCell>
                                                    <TableCell>Rp. 7.250.000</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        Gelombang 3<br/>
                                                        <Chip color='warning' label='1 Mei 2021 - 31 Jul 2022' size='small' />
                                                    </TableCell>
                                                    <TableCell>Rp. 7.600.000</TableCell>
                                                    <TableCell>Rp. 7.750.000</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </StyledTable>
                                    </TableContainer>
                                </Grid>
                            <Grid item md={6}>

                                <CardContent variant='outlined' sx={{backgroundColor: '#ffffff1f', color: '#d4e2f1', height: '100%'}}>
                                    <Typography component='p' sx={{fontStyle: 'italic'}}>
                                        Biaya pendaftaran sudah termasuk<br/><br/>
                                    </Typography>
                                    <Typography component='div' sx={{fontStyle: 'italic', pl: 2}}>
                                        <ol>
                                            <li>Lemari (milik pesantren)</li>
                                            <li>Kasur dan bantal (milik sendiri)</li>
                                            <li>SPP bulan Juli</li>
                                        </ol>
                                    </Typography>


                                </CardContent>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}