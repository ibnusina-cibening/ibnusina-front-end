import { Card, CardContent, CardHeader, Divider, Grid, Typography, styled } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Accordions from "../Accordion";

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
                            <Accordions
                                title='Mengisi formulir pendaftaran'
                            />
                            <Accordions
                                title='Melunasi biaya pendaftaran minimal 50% dari biaya yang sudah ditentukan dan dilunasi pada saat masuk pesantren.'
                            />

                            <Accordions
                                isExpand
                                title='Menyerahkan dokumen-dokumen berikut:'
                                icon={<ExpandMore/>}
                            >
                                <Typography component='div' sx={{pt: 1, pl: 2}}>
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
                                </Typography>
                            </Accordions>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            

        </>
    )
}