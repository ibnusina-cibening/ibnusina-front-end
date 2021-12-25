import { ExpandMore } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";
import Accordions from "../Accordion";


export default function InfoPendaftaran(){
    return (
        <>
            <Grid item>
                <Card variant='outlined'>
                    <CardHeader
                        title='BIAYA PENDAFTARAN'
                        sx={{padding: '20px', textAlign: 'center'}}
                    />
                    <Divider/>
                    <CardContent>
                        <Grid container gap={2} direction='column'>
                            <CardContent variant='outlined' sx={{backgroundColor: '#ffffff1f', color: '#d4e2f1'}}>
                                <Typography component='div' sx={{pl: 2}}>
                                    <ol>
                                        <li>Gelombang 1 (1 Desember 2020 s.d. 31 Januari 2022 ) : Rp. 6.600.000 ( untuk kelas 7 ), Rp. 6.750.000 ( untuk kelas 10 baru )</li>
                                        <li>Gelombang 2 (1 Februari 2022 s.d. 30 April 2022 ) : Rp. 7.100.000 ( untuk kelas 7 ), Rp. 7.250.000 ( untuk kelas 10 baru )</li>
                                        <li>Gelombang 3 ( 1 Mei 2022 s.d 10 Juli 2022 ) : Rp. 7.600.000 ( untuk kelas 7 ), Rp. 7.750.000 ( untuk kelas 10 baru )</li>
                                    </ol>
                                </Typography>
                            </CardContent>

                            <Accordions
                                title='Keterangan'
                                isExpand
                                icon={<ExpandMore/>}
                            >
                                <Typography component='div' sx={{fontStyle: 'italic'}}>
                                    Disetiap gelombang akan ada tambahan biaya dari item bangunan, gelombang 1 Rp. 3.500.000 gelombang ke 2 Rp. 4.000.000 gelombang ke 3 Rp. 4.500.000
                                </Typography>
                            </Accordions>
                            
                            <Accordions
                                title='Pembiayaan diatas sudah termasuk'
                                isExpand
                                icon={<ExpandMore/>}
                            >
                                <Typography component='div' sx={{fontStyle: 'italic', pl: 2}}>
                                    <ol>
                                        <li>Lemari (milik pesantren)</li>
                                        <li>Kasur dan bantal (milik sendiri)</li>
                                        <li>SPP bulanan sudah termasuk : makan 3 kali sehari, laundry, SPP sekolah, Biaya kegiatan dll.</li>
                                    </ol>
                                    
                                </Typography>
                            </Accordions>
                            

                            <Typography component='p' sx={{fontStyle: 'italic'}}>
                                Info selengkapnya dapat menghubungi nomor panitia atau sekretariat pendaftaran santri baru.
                            </Typography>

                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}