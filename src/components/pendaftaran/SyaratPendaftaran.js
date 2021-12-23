import { Card, CardContent, CardHeader, Divider, Grid, Typography, styled } from "@mui/material";

const DotList = styled('ul')({
    listStylePosition: 'none',
})

export default function SyaratPendaftaran(){ 
    return(
        <>
            <Grid item>
                <Card variant='outlined'>
                    <CardHeader
                        title='SYARAT PENDAFTARAN'
                        sx={{padding: '20px', textAlign: 'center'}}
                    />
                    <Divider/>
                    <CardContent>
                        <Grid container gap={2} direction='column'>
                            <Typography sx={{pb: 4, pl: 2}}>
                                
                                <DotList>
                                    <li>Mengisi formulir pendaftaran</li>
                                    <li>Melunasi biaya pendaftaran minimal 50% dari biaya yang sudah ditentukan dan dilunasi pada saat masuk pesantren .</li>
                                    <li>Menyerahkan dokumen-dokumen berikut:
                                        <ol style={{marginLeft: 20}}>
                                            <li>Fc. Buku rapot</li>
                                            <li>Pas foto calon santri 2×3 dan 3×4 masing-masing 4 lbr berwarna</li>
                                            <li>Fc. Ijazah. Menyusul jika belum ada</li>
                                            <li>Fc. SKHUN. Menyusul jika belum ada</li>
                                            <li>Fc. kartu keluarga</li>
                                            <li>Fc. KTP orang tua</li>
                                            <li>Fc. Akte kelahiran</li>
                                            <li>Fc. kartu indonesia pintar, jika punya</li>
                                            <li>Fc. sertifikat prestasi, jika ada.</li>

                                        </ol>
                                    </li>
                                </DotList>
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            

        </>
    )
}