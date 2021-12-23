import { Card, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";


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
                            <Typography sx={{pb: 4, pl: 2}}>
                                <ul>
                                    <li>SPP & Makan, Laundry & Kegiatan : Rp. 700.0000 (bulanan)</li>
                                    <li>Daftar ulang (Khusus untuk santri lama. Bervariasi setiap tingkatan. Sudah termasuk sarpras, makan bulan pertama, buku paket, kitab dll.)</li>
                                    <li>Biaya perpisahan dan kenaikan kelas : Rp. 100.000 (akhir tahun pelajaran, semua santri)</li>
                                    <li>Rihlah ilmiah (study tour): Rp. 200.000 (untuk santri kelas 7, 8, 10, 11, pertengahan tahun)</li>
                                    <li>Study tour kelas akhir : ditentukan dalam rapat (khusus santri kelas 12)</li>
                                    <li>Khusus untuk pengurus (kelas 11), dibebankan biaya pembuatan seragam pengurus. Besarannya disesuaikan dengan model dan bahan seragam.</li>
                                </ul>
                            </Typography>
                            
                            <Typography variant='h6' sx={{fontStyle: 'italic'}}>
                                Keterangan
                            </Typography>
                            
                            <Typography sx={{fontStyle: 'italic'}}>
                                Beberapa item pembiayaan di atas dapat berubah sewaktu-waktu menyesuaikan perubahan kondisi yang terjadi. Perubahan-perubahan tersebut akan disampaikan melalui surat edaran atau pun melalui rapat wali santri.
                            </Typography>

                            <Typography variant='h6' sx={{fontStyle: 'italic', paddingTop: 3}}>
                                Pembiayaan diatas sudah termasuk
                            </Typography>
                            
                            <Typography sx={{fontStyle: 'italic', pl: 2}}>
                                <ol>
                                    <li>Lemari (milik pesantren)</li>
                                    <li>Kasur dan bantal (milik sendiri)</li>
                                    <li>SPP bulanan sudah termasuk : makan 3 kali sehari, laundry, SPP sekolah, Biaya kegiatan dll.</li>
                                </ol>
                                <p>Info selengkapnya dapat menghubungi nomor panitia atau sekretariat pendaftaran santri baru.</p>
                            </Typography>

                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            

        </>
    )
}