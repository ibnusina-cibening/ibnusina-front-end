import { ExpandMore } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";
import Accordions from "../Accordion";


export default function BiayaRutin(){ 
    return(
        <>
            <Grid item>
                <Card variant='outlined'>
                    <CardHeader
                        title='BIAYA RUTIN'
                        sx={{padding: '20px', textAlign: 'center'}}
                    />
                    <Divider/>
                    <CardContent>
                        <Grid container gap={2} direction='column'>
                            <CardContent variant='outlined' sx={{backgroundColor: '#ffffff1f', color: '#d4e2f1'}}>
                                <Typography component='div' sx={{pl: 2}}>
                                    <ul>
                                        <li>SPP, Makan, Laundry & Biaya Kegiatan : Rp. 700.0000 (bulanan)</li>
                                        <li>Daftar ulang (Khusus untuk santri lama. Bervariasi setiap tingkatan. Sudah termasuk sarpras, makan bulan pertama, buku paket, kitab dll.)</li>
                                        <li>Biaya perpisahan dan kenaikan kelas : Rp. 100.000 (akhir tahun pelajaran, semua santri)</li>
                                        <li>Rihlah ilmiah (study tour): Rp. 200.000 (untuk santri kelas 7, 8, 10, 11, pertengahan tahun)</li>
                                        <li>Study tour kelas akhir : ditentukan dalam rapat (khusus santri kelas 12)</li>
                                        <li>Khusus untuk pengurus (kelas 11), dibebankan biaya pembuatan seragam pengurus. Besarannya disesuaikan dengan model dan bahan seragam.</li>
                                    </ul>
                                </Typography>
                                <br/><br/>
                                <Typography component='p' sx={{fontStyle: 'italic', backgroundColor: '#2d3136', padding: 2}}>
                                    Keterangan<br/><br/>
                                    Beberapa item pembiayaan di atas dapat berubah sewaktu-waktu menyesuaikan perubahan kondisi yang terjadi. Perubahan-perubahan tersebut akan disampaikan melalui surat edaran atau pun melalui rapat wali santri.
                                </Typography>
                            </CardContent>


                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Card variant='outlined' sx={{padding: 2, backgroundColor: '#ffb100', color: '#000'}}>
                    <Typography component='p' sx={{ fontSize: 18, textAlign: 'center'}}>
                        Info selengkapnya dapat menghubungi nomor panitia atau sekretariat pendaftaran santri baru.
                    </Typography>
                    
                </Card>
            </Grid>
            

        </>
    )
}